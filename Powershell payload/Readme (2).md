

\*\*A Security Research Project on PowerShell Payload Obfuscation Techniques\*\*



This repository contains a detailed analysis and educational breakdown of \*\*BufferWatch\*\*, a PowerShell script designed to generate highly obfuscated reverse shell payloads. The tool is derived from the Invoke-PSObfuscation framework and demonstrates advanced techniques used to evade signature-based and heuristic detection by antivirus and EDR solutions.



Through source code review and execution analysis, we explore real-world obfuscation methods employed in offensive PowerShell scripts, including:

\- Random variable and cmdlet renaming

\- String encoding via character arrays and arithmetic expressions

\- Pipe and pipeline variable substitution

\- Namespace and method call obfuscation

\- Integer and operator encapsulation

\- Beacon-based multi-stage replacement for safe transformations



The primary goal of this project is to enhance understanding of modern PowerShell obfuscation techniques, improve detection capabilities, and educate developers and security professionals on defensive strategies against living-off-the-land attacks using PowerShell.



\## Project Files



\- `PS buffer exploit.ps` – Full source code of the obfuscation framework (analyzed for educational purposes)

\- Related files include execution examples and deobfuscation notes



> \*\*Important Note\*\*: This code is provided strictly for educational, research, and defensive security purposes only. It must not be used for unauthorized access or malicious activities. Use only in controlled lab environments with proper authorization.



\## Key Learning Outcomes



\- Deep dive into multi-layer PowerShell obfuscation

\- Understanding randomization in payload generation

\- Techniques for bypassing static and behavioral detection

\- Importance of AMSI bypass research and PowerShell logging

\- Real-world application of living-off-the-land binaries (LOLBins)



\## Team Members



\- \*\*Nadir Rizwan Kayani\*\* - 45811

\- \*\*Muhammad Hammad\*\* - 47326

\- \*\*Muhammad Abdul Basit Khan\*\* - 35754



\## References



\- Project Repository: \[https://github.com/nkayani2/BufferWatch](https://github.com/nkayani2/BufferWatch)

\*\*Research. Learn. Defend.\*\*

