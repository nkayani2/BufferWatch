import socket

print("Trying to connect...", flush=True)
s = socket.socket()
s.connect(('127.0.0.1', 50005))          # Block until connected
s.sendall(b'FAKEVICTIM READY\n')         # Send banner
print("Connected and ready.", flush=True)

# Remove any timeout – wait indefinitely for commands
s.settimeout(None)

try:
    while True:
        data = s.recv(4096)
        if not data:
            print("[*] Connection closed by server.", flush=True)
            break
        cmd = data.decode(errors='ignore').strip()
        if cmd.lower() in ('q', 'exit'):
            print("[*] Exit command received.", flush=True)
            break
        # Echo the command back
        response = f"You sent: {cmd}\n"
        s.sendall(response.encode())
        print(f"Got: {cmd}", flush=True)
except KeyboardInterrupt:
    print("\n[*] Stopped by user.", flush=True)

s.close()
print("[*] Fake victim disconnected.", flush=True)