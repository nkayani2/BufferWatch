import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, Play, Trophy, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">BufferWatch</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/learn">
              <Button variant="ghost">Learning Paths</Button>
            </Link>
            <Link href="/challenges">
              <Button variant="ghost">Challenges</Button>
            </Link>
            <Link href="/learn">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Interactive Cybersecurity Learning
            </div>
            <h1 className="mb-6 text-balance text-5xl font-bold leading-tight lg:text-6xl">
              Master Buffer Overflow Exploits Through Hands-On Practice
            </h1>
            <p className="mb-8 text-pretty text-xl leading-relaxed text-muted-foreground">
              Learn memory corruption vulnerabilities step-by-step with interactive lessons, real challenges, and safe
              simulations. From beginner to advanced exploitation techniques.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/learn">
                <Button size="lg" className="gap-2 text-lg">
                  <Play className="h-5 w-5" />
                  Start Learning
                </Button>
              </Link>
              <Link href="/challenges">
                <Button size="lg" variant="outline" className="gap-2 text-lg bg-transparent">
                  <Trophy className="h-5 w-5" />
                  View Challenges
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y border-border bg-muted/30 py-12">
          <div className="container mx-auto px-6">
            <div className="grid gap-8 text-center md:grid-cols-3">
              <div>
                <div className="mb-2 text-4xl font-bold text-primary">12+</div>
                <div className="text-sm text-muted-foreground">Interactive Lessons</div>
              </div>
              <div>
                <div className="mb-2 text-4xl font-bold text-chart-2">8+</div>
                <div className="text-sm text-muted-foreground">Hands-On Challenges</div>
              </div>
              <div>
                <div className="mb-2 text-4xl font-bold text-chart-3">100%</div>
                <div className="text-sm text-muted-foreground">Safe VM Environment</div>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Paths */}
        <section className="container mx-auto px-6 py-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Learning Paths</h2>
            <p className="text-lg text-muted-foreground">Structured courses from basics to advanced exploitation</p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
            <Card className="overflow-hidden transition-shadow hover:shadow-lg">
              <div className="h-2 bg-gradient-to-r from-primary to-chart-2" />
              <div className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="mb-2 text-xl font-bold">Introduction to Buffer Overflows</h3>
                    <p className="text-sm text-muted-foreground">Learn the fundamentals of memory management</p>
                  </div>
                  <div className="rounded-lg bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Beginner</div>
                </div>
                <div className="mb-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Memory layout and stack structure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Understanding buffer boundaries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>First overflow demonstration</span>
                  </div>
                </div>
                <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <span>6 lessons</span>
                  <span>•</span>
                  <span>3 challenges</span>
                </div>
                <Link href="/learn/intro">
                  <Button className="w-full">Start Learning</Button>
                </Link>
              </div>
            </Card>

            <Card className="overflow-hidden transition-shadow hover:shadow-lg">
              <div className="h-2 bg-gradient-to-r from-chart-2 to-chart-3" />
              <div className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="mb-2 text-xl font-bold">Exploitation Techniques</h3>
                    <p className="text-sm text-muted-foreground">Master advanced exploitation methods</p>
                  </div>
                  <div className="rounded-lg bg-chart-2/10 px-3 py-1 text-xs font-semibold text-chart-2">
                    Intermediate
                  </div>
                </div>
                <div className="mb-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-chart-2" />
                    <span>Return-oriented programming (ROP)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-chart-2" />
                    <span>Shellcode injection techniques</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-chart-2" />
                    <span>Bypassing basic protections</span>
                  </div>
                </div>
                <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <span>8 lessons</span>
                  <span>•</span>
                  <span>5 challenges</span>
                </div>
                <Link href="/learn/exploitation">
                  <Button className="w-full">Start Learning</Button>
                </Link>
              </div>
            </Card>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">How It Works</h2>
              <p className="text-lg text-muted-foreground">Interactive learning in three simple steps</p>
            </div>

            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    1
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Learn Concepts</h3>
                <p className="leading-relaxed text-muted-foreground">
                  Follow step-by-step lessons with visual diagrams and clear explanations of memory vulnerabilities
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-chart-2 text-2xl font-bold text-chart-2-foreground">
                    2
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Practice Skills</h3>
                <p className="leading-relaxed text-muted-foreground">
                  Write and test exploit code in our safe browser-based terminal with instant feedback
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-chart-3 text-2xl font-bold text-chart-3-foreground">
                    3
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Complete Challenges</h3>
                <p className="leading-relaxed text-muted-foreground">
                  Apply your knowledge to realistic scenarios and earn completion badges
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-20">
          <Card className="overflow-hidden bg-gradient-to-br from-primary/10 via-chart-2/10 to-chart-3/10">
            <div className="p-12 text-center">
              <Users className="mx-auto mb-4 h-12 w-12 text-primary" />
              <h2 className="mb-4 text-3xl font-bold">Join Thousands of Students</h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Start your cybersecurity journey today with hands-on buffer overflow training
              </p>
              <Link href="/learn">
                <Button size="lg" className="text-lg">
                  Begin Your First Lesson
                </Button>
              </Link>
            </div>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-8">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>Educational use only. All simulations run in isolated VM environments.</p>
        </div>
      </footer>
    </div>
  )
}
