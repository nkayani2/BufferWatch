import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle2, AlertTriangle, BookOpen } from "lucide-react"
import { InteractiveTerminal } from "@/components/interactive-terminal"
import { CodeEditor } from "@/components/code-editor"
import { MemoryViewer } from "@/components/memory-viewer"

export default function ChallengePage({ params }: { params: { id: string } }) {
  const challengeId = Number.parseInt(params.id)

  // Mock challenge data
  const challenge = {
    id: challengeId,
    title: "Basic Stack Overflow",
    difficulty: "Easy",
    points: 100,
    description:
      "In this challenge, you'll exploit a simple buffer overflow vulnerability to gain control of the program's execution flow. The vulnerable program reads user input without proper bounds checking.",
    objective: "Overwrite the return address to redirect execution to the secret_function()",
    hints: [
      "The buffer is only 64 bytes, but there's no length check on input",
      "The return address is stored right after the buffer on the stack",
      "Try entering more than 64 characters to see what happens",
      'Try a payload of 72 "A" characters followed by the address of secret_function',
    ],
    vulnerableCode: `#include <stdio.h>
#include <string.h>

void secret_function() {
    printf("You win!\\n");
    printf("Flag: BWF{st4ck_0v3rfl0w}\\n");
}

void vulnerable() {
    char buffer[64];
    printf("Enter text: ");
    gets(buffer);  // Unsafe! No bounds check
    printf("You entered: %s\\n", buffer);
}

int main() {
    printf("Buffer address: %p\\n", buffer);
    printf("secret_function address: 0x00401234\\n");
    vulnerable();
    printf("Program exited normally\\n");
    return 0;
}`,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/challenges">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Challenges
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Badge variant="default">{challenge.difficulty}</Badge>
            <span className="text-sm font-semibold text-primary">{challenge.points} points</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Instructions */}
          <div className="space-y-6 lg:col-span-1">
            <Card className="p-6">
              <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                Challenge Brief
              </div>
              <h1 className="mb-4 text-2xl font-bold">{challenge.title}</h1>
              <p className="mb-4 leading-relaxed text-muted-foreground">{challenge.description}</p>

              {/* Objective */}
              <div className="mb-4 rounded-lg border border-primary bg-primary/5 p-4">
                <div className="mb-2 flex items-center gap-2 font-semibold text-primary">
                  <AlertTriangle className="h-4 w-4" />
                  Objective
                </div>
                <p className="text-sm leading-relaxed">{challenge.objective}</p>
              </div>

              <div className="mb-4">
                <h3 className="mb-3 font-semibold">Hints</h3>
                <div className="space-y-2">
                  {challenge.hints.map((hint, i) => (
                    <details key={i} className="group cursor-pointer">
                      <summary className="rounded-lg border border-border bg-muted/30 p-3 text-sm font-medium transition-colors hover:bg-muted">
                        Hint {i + 1} (Click to reveal)
                      </summary>
                      <div className="mt-2 rounded-lg bg-card p-3 text-sm leading-relaxed text-muted-foreground">
                        {hint}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </Card>

            {/* Vulnerable Code */}
            <div>
              <h3 className="mb-3 font-semibold">Vulnerable Code</h3>
              <CodeEditor initialCode={challenge.vulnerableCode} language="c" readOnly />
            </div>
          </div>

          {/* Right Column - Interactive Environment */}
          <div className="space-y-6 lg:col-span-2">
            {/* Interactive Terminal */}
            <Card className="p-6">
              <InteractiveTerminal
                initialLines={[
                  { type: "output", content: "Buffer address: 0x7fff1220" },
                  { type: "output", content: "secret_function address: 0x00401234" },
                  { type: "output", content: "Enter text: " },
                ]}
              />
            </Card>

            {/* Memory View */}
            <MemoryViewer />

            {/* Solution Checker */}
            <Card className="border-chart-2 bg-chart-2/5 p-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-chart-2" />
                <div className="flex-1">
                  <h3 className="mb-2 text-lg font-semibold">Submit Your Flag</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Once you successfully exploit the vulnerability and see "You win!", submit the flag you discover.
                  </p>
                  <div className="mb-3 flex gap-2">
                    <input
                      type="text"
                      placeholder="BWF{your_flag_here}"
                      className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    />
                    <Button>Check Flag</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Flag format: BWF&#123;...&#125;</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
