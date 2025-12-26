import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, AlertTriangle } from "lucide-react"
import { InteractiveTerminal } from "@/components/interactive-terminal"
import { CodeEditor } from "@/components/code-editor"

export default function Lesson3Page() {
  const vulnerableCode = `#include <stdio.h>
#include <string.h>

int main() {
    char buffer[8];
    printf("Enter your name: ");
    gets(buffer);  // UNSAFE! No bounds check
    printf("Hello, %s!\\n", buffer);
    return 0;
}`

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/learn">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Learning Paths
            </Button>
          </Link>
          <div className="text-sm text-muted-foreground">Lesson 3 of 6</div>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-6 py-12">
        {/* Lesson Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>Introduction to Buffer Overflows</span>
          </div>
          <h1 className="mb-4 text-4xl font-bold">Your First Buffer Overflow</h1>
          <p className="text-lg text-muted-foreground">
            Time to see a real buffer overflow in action! In this lesson, you'll create and observe your first memory
            corruption.
          </p>
        </div>

        {/* Lesson Content */}
        <div className="space-y-8">
          {/* Section 1 */}
          <Card className="p-8">
            <h2 className="mb-4 text-2xl font-semibold">The Vulnerable Program</h2>
            <p className="mb-4 leading-relaxed text-foreground">
              Below is a simple C program with a buffer overflow vulnerability. The program declares an 8-byte buffer
              but uses gets(), which doesn't check input length.
            </p>
            <div className="mb-4">
              <CodeEditor initialCode={vulnerableCode} language="c" readOnly />
            </div>
            <div className="rounded-lg border border-warning bg-warning/5 p-4">
              <div className="flex gap-3">
                <AlertTriangle className="h-5 w-5 flex-shrink-0 text-warning" />
                <div className="text-sm">
                  <div className="mb-1 font-semibold text-warning-foreground">Why is this dangerous?</div>
                  <div className="text-muted-foreground">
                    The gets() function reads input until a newline without checking buffer size. If you enter more than
                    7 characters (8 minus null terminator), it will overflow the buffer!
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Interactive Demo */}
          <Card className="p-8">
            <h2 className="mb-4 text-2xl font-semibold">Try It Yourself</h2>
            <p className="mb-4 text-muted-foreground">
              Use the terminal below to interact with the vulnerable program. Try entering different lengths of input to
              see what happens!
            </p>

            <InteractiveTerminal
              initialLines={[
                { type: "output", content: "Compiling vulnerable program..." },
                { type: "output", content: "Running: ./buffer_demo" },
                { type: "output", content: "Enter your name: " },
              ]}
            />

            <div className="mt-6 space-y-3 rounded-lg bg-muted/30 p-4 text-sm">
              <div className="font-semibold">Experiment Ideas:</div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <div>
                    <strong>Normal input:</strong> Try "Alice" (5 chars) - program works fine
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <div>
                    <strong>Boundary:</strong> Try "1234567" (7 chars) - still works
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-warning" />
                  <div>
                    <strong>Overflow:</strong> Try "AAAAAAAAAAAAAAAA" (16+ chars) - crash!
                  </div>
                </li>
              </ul>
            </div>
          </Card>

          {/* What Happened */}
          <Card className="p-8">
            <h2 className="mb-4 text-2xl font-semibold">What Just Happened?</h2>
            <p className="mb-4 leading-relaxed text-foreground">
              When you entered more than 8 characters, the extra data overflowed into adjacent memory locations on the
              stack. This corrupted important data like:
            </p>
            <ul className="mb-4 space-y-2">
              <li className="flex items-start gap-3">
                <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-chart-4" />
                <div>
                  <span className="font-semibold">Saved Base Pointer:</span> Used to restore the previous stack frame
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-chart-4" />
                <div>
                  <span className="font-semibold">Return Address:</span> Where the program should go after the function
                  ends
                </div>
              </li>
            </ul>
            <div className="rounded-lg border-2 border-chart-4 bg-chart-4/5 p-4">
              <div className="mb-2 font-semibold text-chart-4">Key Takeaway</div>
              <p className="text-sm leading-relaxed">
                Buffer overflows let attackers write data beyond intended boundaries, corrupting memory and potentially
                taking control of program execution. In the next lesson, you'll learn how to exploit this!
              </p>
            </div>
          </Card>

          {/* Completion Card */}
          <Card className="border-chart-2 bg-chart-2/5 p-6">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-6 w-6 text-chart-2" />
              <div>
                <h3 className="mb-2 text-lg font-semibold">Lesson Complete!</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  You've successfully created and observed your first buffer overflow! Next, you'll learn how attackers
                  weaponize this vulnerability to control program execution.
                </p>
                <div className="flex gap-3">
                  <Link href="/learn">
                    <Button variant="outline" size="sm">
                      Back to Path
                    </Button>
                  </Link>
                  <Link href="/learn/intro/lesson-4">
                    <Button size="sm" className="gap-2">
                      Next Lesson
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
