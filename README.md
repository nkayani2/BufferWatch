\# BufferWatch



\*\*A Security Analysis Project Focusing on Memory Corruption Vulnerabilities\*\*



\## Team Members



\- \*\*Nadir Rizwan Kayani\*\* - 45811

\- \*\*Muhammad Hammad\*\* - 47326

\- \*\*Muhammad Abdul Basit Khan\*\* - 35754



\## Supervised by



\- \*\*Muhammad Osama Raza\*\*



This repository contains a detailed analysis and demonstration of critical memory safety vulnerabilities, specifically \*\*buffer overflow\*\* exploits in C/C++ Windows applications. The project examines real-world malicious code (a backdoor implant) to identify insecure programming patterns that lead to exploitable conditions.



Through reverse engineering and source review, we highlight common anti-safety practices such as:

\- Use of unsafe functions (`strcpy`, `strncpy` without bounds)

\- Lack of input validation on network data

\- Custom string manipulation with out-of-bounds access

\- Fixed-size buffers handling untrusted input



The goal is to educate developers and security researchers on recognizing, understanding, and preventing buffer overflow vulnerabilities — one of the most dangerous and historically exploited classes of memory corruption bugs.



\## Project Files



\- `Win11bypass.c` – Backdoor client with persistence, remote shell, keylogger, and file download capabilities (contains analyzed vulnerabilities)

\- `keylogger.h` – Header for keylogging functionality

\- `server.c` – Companion remote control server (for demonstration purposes)

\- Other files contain related experiments and variants



> \*\*Note\*\*: This code is provided strictly for educational and research purposes in a controlled environment. It must not be used for malicious activities.



\## Learning Outcomes



\- Understanding stack and heap-based buffer overflows

\- Identifying unsafe string handling in legacy Windows code

\- Importance of bounds checking and safe APIs

\- Real-world impact of memory vulnerabilities in malware



\*\*Stay safe. Code responsibly.\*\*

