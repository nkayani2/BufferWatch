import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Shield, Lock, CheckCircle2, Circle, ArrowLeft } from "lucide-react"

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Home
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">BufferWatch</span>
            </div>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              My Progress
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">Learning Paths</h1>
          <p className="text-lg text-muted-foreground">
            Master buffer overflow vulnerabilities through structured lessons and challenges
          </p>
        </div>

        {/* Path 1: Introduction */}
        <Card className="mb-6 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-primary to-chart-2" />
          <div className="p-8">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <div className="mb-2 inline-block rounded-lg bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  BEGINNER PATH
                </div>
                <h2 className="mb-2 text-2xl font-bold">Introduction to Buffer Overflows</h2>
                <p className="mb-4 text-muted-foreground">
                  Learn the fundamentals of memory management and how buffer overflows occur
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>6 lessons</span>
                  <span>•</span>
                  <span>3 challenges</span>
                  <span>•</span>
                  <span>~2 hours</span>
                </div>
              </div>
              <div className="text-right">
                <div className="mb-2 text-3xl font-bold text-primary">33%</div>
                <div className="text-sm text-muted-foreground">Complete</div>
              </div>
            </div>

            <div className="mb-6">
              <Progress value={33} className="h-2" />
            </div>

            {/* Lessons */}
            <div className="space-y-3">
              <Link href="/learn/intro/lesson-1">
                <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-chart-2" />
                  <div className="flex-1">
                    <div className="font-semibold">Lesson 1: Memory Layout Basics</div>
                    <div className="text-sm text-muted-foreground">
                      Understanding the stack, heap, and memory organization
                    </div>
                  </div>
                  <div className="text-xs text-chart-2">Completed</div>
                </div>
              </Link>

              <Link href="/learn/intro/lesson-2">
                <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-chart-2" />
                  <div className="flex-1">
                    <div className="font-semibold">Lesson 2: What is a Buffer?</div>
                    <div className="text-sm text-muted-foreground">Arrays, strings, and memory allocation</div>
                  </div>
                  <div className="text-xs text-chart-2">Completed</div>
                </div>
              </Link>

              <Link href="/learn/intro/lesson-3">
                <div className="flex items-center gap-4 rounded-lg border-2 border-primary bg-primary/5 p-4 transition-colors hover:bg-primary/10">
                  <Circle className="h-5 w-5 flex-shrink-0 text-primary" />
                  <div className="flex-1">
                    <div className="font-semibold">Lesson 3: Your First Buffer Overflow</div>
                    <div className="text-sm text-muted-foreground">Hands-on demo with vulnerable C code</div>
                  </div>
                  <div className="rounded-lg bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    In Progress
                  </div>
                </div>
              </Link>

              <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/30 p-4 opacity-60">
                <Lock className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                <div className="flex-1">
                  <div className="font-semibold">Lesson 4: Overwriting Return Addresses</div>
                  <div className="text-sm text-muted-foreground">Control flow hijacking fundamentals</div>
                </div>
                <div className="text-xs text-muted-foreground">Locked</div>
              </div>

              <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/30 p-4 opacity-60">
                <Lock className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                <div className="flex-1">
                  <div className="font-semibold">Challenge 1: Basic Overflow Exploit</div>
                  <div className="text-sm text-muted-foreground">Apply your knowledge to solve a challenge</div>
                </div>
                <div className="text-xs text-muted-foreground">Locked</div>
              </div>

              <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/30 p-4 opacity-60">
                <Lock className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                <div className="flex-1">
                  <div className="font-semibold">Lesson 5: Debugging Buffer Overflows</div>
                  <div className="text-sm text-muted-foreground">Using GDB to analyze crashes</div>
                </div>
                <div className="text-xs text-muted-foreground">Locked</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Path 2: Exploitation */}
        <Card className="mb-6 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-chart-2 to-chart-3" />
          <div className="p-8">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <div className="mb-2 inline-block rounded-lg bg-chart-2/10 px-3 py-1 text-xs font-semibold text-chart-2">
                  INTERMEDIATE PATH
                </div>
                <h2 className="mb-2 text-2xl font-bold">Exploitation Techniques</h2>
                <p className="mb-4 text-muted-foreground">
                  Advanced methods for exploiting buffer overflows and bypassing protections
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>8 lessons</span>
                  <span>•</span>
                  <span>5 challenges</span>
                  <span>•</span>
                  <span>~4 hours</span>
                </div>
              </div>
              <div className="text-right">
                <div className="mb-2 text-3xl font-bold text-muted-foreground">0%</div>
                <div className="text-sm text-muted-foreground">Complete</div>
              </div>
            </div>

            <div className="mb-6">
              <Progress value={0} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/30 p-4 opacity-60">
                <Lock className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                <div className="flex-1">
                  <div className="font-semibold">Lesson 1: Introduction to Shellcode</div>
                  <div className="text-sm text-muted-foreground">Writing and injecting malicious payloads</div>
                </div>
                <div className="text-xs text-muted-foreground">Complete Intro Path First</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Path 3: Protections */}
        <Card className="overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-chart-3 to-chart-4" />
          <div className="p-8">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <div className="mb-2 inline-block rounded-lg bg-chart-3/10 px-3 py-1 text-xs font-semibold text-chart-3">
                  ADVANCED PATH
                </div>
                <h2 className="mb-2 text-2xl font-bold">Modern Protections & Bypasses</h2>
                <p className="mb-4 text-muted-foreground">
                  Learn about ASLR, DEP, stack canaries and advanced bypass techniques
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>10 lessons</span>
                  <span>•</span>
                  <span>6 challenges</span>
                  <span>•</span>
                  <span>~5 hours</span>
                </div>
              </div>
              <div className="text-right">
                <div className="mb-2 text-3xl font-bold text-muted-foreground">0%</div>
                <div className="text-sm text-muted-foreground">Complete</div>
              </div>
            </div>

            <div className="mb-6">
              <Progress value={0} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/30 p-4 opacity-60">
                <Lock className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                <div className="flex-1">
                  <div className="font-semibold">Lesson 1: Understanding ASLR</div>
                  <div className="text-sm text-muted-foreground">Address space layout randomization explained</div>
                </div>
                <div className="text-xs text-muted-foreground">Complete Exploitation Path First</div>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
