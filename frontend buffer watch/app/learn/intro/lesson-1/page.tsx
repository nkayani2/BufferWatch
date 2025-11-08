import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2 } from "lucide-react"

export default function Lesson1Page() {
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
          <div className="text-sm text-muted-foreground">Lesson 1 of 6</div>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-6 py-12">
        {/* Lesson Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>Introduction to Buffer Overflows</span>
          </div>
          <h1 className="mb-4 text-4xl font-bold">Memory Layout Basics</h1>
          <p className="text-lg text-muted-foreground">
            Understanding how programs organize memory is essential for learning about buffer overflows.
          </p>
        </div>

        {/* Lesson Content */}
        <div className="space-y-8">
          {/* Section 1 */}
          <Card className="p-8">
            <h2 className="mb-4 text-2xl font-semibold">What is Memory?</h2>
            <p className="mb-4 leading-relaxed text-foreground">
              When a program runs, the operating system allocates memory to store its code, data, and execution state.
              This memory is organized into different sections, each serving a specific purpose.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Think of memory like a giant array of boxes, where each box can hold a piece of information. Your program
              needs to know where everything is stored to function correctly.
            </p>
          </Card>

          {/* Section 2 - Memory Diagram */}
          <Card className="p-8">
            <h2 className="mb-4 text-2xl font-semibold">The Four Main Memory Regions</h2>
            <div className="mb-6 space-y-4 rounded-lg border-2 border-border bg-muted/30 p-6 font-mono text-sm">
              <div className="rounded border-l-4 border-l-chart-4 bg-card p-4">
                <div className="mb-1 font-semibold text-chart-4">Stack (High Addresses)</div>
                <div className="text-xs text-muted-foreground">
                  Local variables, function parameters, return addresses
                </div>
              </div>
              <div className="my-4 text-center text-muted-foreground">↓ Grows Downward</div>
              <div className="my-8 border-t-2 border-dashed border-border" />
              <div className="my-4 text-center text-muted-foreground">↑ Grows Upward</div>
              <div className="rounded border-l-4 border-l-chart-2 bg-card p-4">
                <div className="mb-1 font-semibold text-chart-2">Heap</div>
                <div className="text-xs text-muted-foreground">Dynamically allocated memory (malloc, new)</div>
              </div>
              <div className="rounded border-l-4 border-l-chart-3 bg-card p-4">
                <div className="mb-1 font-semibold text-chart-3">Data Segment</div>
                <div className="text-xs text-muted-foreground">Global and static variables</div>
              </div>
              <div className="rounded border-l-4 border-l-primary bg-card p-4">
                <div className="mb-1 font-semibold text-primary">Code Segment (Low Addresses)</div>
                <div className="text-xs text-muted-foreground">Executable program instructions</div>
              </div>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              Notice how the stack grows downward (from high to low addresses) while the heap grows upward. This design
              allows both to expand as needed without immediately colliding.
            </p>
          </Card>

          {/* Section 3 - Focus on Stack */}
          <Card className="p-8">
            <h2 className="mb-4 text-2xl font-semibold">The Stack: Where Buffer Overflows Happen</h2>
            <p className="mb-4 leading-relaxed text-foreground">
              The stack is the most important region for understanding buffer overflows. It stores:
            </p>
            <ul className="mb-4 space-y-2">
              <li className="flex items-start gap-3">
                <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                <div>
                  <span className="font-semibold">Local variables:</span> Variables declared inside functions
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                <div>
                  <span className="font-semibold">Function parameters:</span> Arguments passed to functions
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                <div>
                  <span className="font-semibold">Return addresses:</span> Where to go back when a function finishes
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                <div>
                  <span className="font-semibold">Saved registers:</span> CPU state that needs to be preserved
                </div>
              </li>
            </ul>
            <div className="rounded-lg border border-warning bg-warning/5 p-4">
              <div className="flex gap-3">
                <div className="text-warning">⚠️</div>
                <div className="text-sm">
                  <div className="mb-1 font-semibold">Key Insight</div>
                  <div className="text-muted-foreground">
                    When data on the stack exceeds its allocated space (buffer overflow), it can overwrite adjacent
                    memory - including critical control data like return addresses!
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Section 4 - Example */}
          <Card className="p-8">
            <h2 className="mb-4 text-2xl font-semibold">Simple Stack Example</h2>
            <p className="mb-4 text-muted-foreground">
              Here's what the stack might look like when a function is called:
            </p>
            <div className="rounded-lg bg-muted p-6 font-mono text-sm">
              <div className="mb-4 text-muted-foreground">// C Code</div>
              <pre className="mb-6 text-foreground">
                {`void greet(char* name) {
    char buffer[16];
    strcpy(buffer, name);
    printf("Hello, %s!\\n", buffer);
}`}
              </pre>
              <div className="mb-4 text-muted-foreground">// Stack Layout</div>
              <div className="space-y-1 text-foreground">
                <div className="border-l-2 border-l-chart-4 pl-3">[Return Address] ← Where to go after function</div>
                <div className="border-l-2 border-l-primary pl-3">[Saved Base Pointer]</div>
                <div className="border-l-2 border-l-chart-2 pl-3">[buffer[0-15]] ← 16 bytes for our buffer</div>
                <div className="border-l-2 border-l-muted-foreground pl-3">[name parameter]</div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              If 'name' contains more than 16 characters, strcpy() will write beyond the buffer, potentially overwriting
              the saved base pointer and return address!
            </p>
          </Card>

          {/* Completion Card */}
          <Card className="border-chart-2 bg-chart-2/5 p-6">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-6 w-6 text-chart-2" />
              <div>
                <h3 className="mb-2 text-lg font-semibold">Lesson Complete!</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  You now understand the basic memory layout and why the stack is vulnerable to buffer overflows. Ready
                  to learn what a buffer actually is?
                </p>
                <div className="flex gap-3">
                  <Link href="/learn">
                    <Button variant="outline" size="sm">
                      Back to Path
                    </Button>
                  </Link>
                  <Link href="/learn/intro/lesson-2">
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
