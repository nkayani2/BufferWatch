# BufferWatch

**A Security Analysis Project Focusing on Memory Corruption Vulnerabilities**

## Team Members

- **Nadir Rizwan Kayani** — 45811  
- **Muhammad Hammad** — 47326  
- **Muhammad Abdul Basit Khan** — 35754  

## Supervised By

- **Muhammad Osama Raza**

## Project Overview

This repository contains a detailed analysis and demonstration of critical memory safety vulnerabilities, with a focus on **buffer overflow** exploits in C/C++ Windows applications. The project examines real-world malicious code (a backdoor implant) to identify insecure programming patterns that lead to exploitable conditions.

Through reverse engineering and source code review, we highlight common unsafe practices, including:

- Use of unsafe functions (`strcpy`, `strncpy` without proper bounds)
- Lack of input validation on network-supplied data
- Custom string manipulation with out-of-bounds access
- Fixed-size buffers handling untrusted input

The goal is to educate developers and security researchers on how to recognize, understand, and prevent buffer overflow vulnerabilities—one of the most dangerous and historically exploited classes of memory corruption bugs.

## Project Files

- `Win11bypass.c` — Backdoor client with persistence, remote shell, keylogging, and file download capabilities (contains analyzed vulnerabilities)
- `keylogger.h` — Header file for keylogging functionality
- `server.c` — Companion remote control server (for demonstration purposes)
- Other files include related experiments and variant implementations

> **Note:** This code is provided strictly for educational and research purposes in a controlled environment. It must not be used for malicious or unauthorized activities.

## Learning Outcomes

- Understanding stack-based and heap-based buffer overflows
- Identifying unsafe string handling in legacy Windows applications
- Recognizing the importance of bounds checking and safe APIs
- Understanding the real-world impact of memory vulnerabilities in malware

**Stay safe. Code responsibly.**

