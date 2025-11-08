import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Lock, Trophy, Zap, Target, Shield } from "lucide-react"

export default function ChallengesPage() {
  const challenges = [
    {
      id: 1,
      title: "Basic Stack Overflow",
      difficulty: "Easy",
      points: 100,
      solved: 1243,
      description: "Exploit a simple buffer overflow to gain control of the return address",
      tags: ["Stack", "RIP Control"],
      unlocked: true,
      completed: false,
    },
    {
      id: 2,
      title: "Password Bypass",
      difficulty: "Easy",
      points: 150,
      solved: 987,
      description: "Overflow a buffer to overwrite an adjacent password variable",
      tags: ["Stack", "Variable Overwrite"],
      unlocked: true,
      completed: true,
    },
    {
      id: 3,
      title: "Return to Win",
      difficulty: "Medium",
      points: 250,
      solved: 654,
      description: "Redirect execution to a hidden win() function using buffer overflow",
      tags: ["RIP Control", "Return Address"],
      unlocked: true,
      completed: false,
    },
    {
      id: 4,
      title: "Shellcode Injection",
      difficulty: "Medium",
      points: 300,
      solved: 432,
      description: "Inject and execute your own shellcode on the stack",
      tags: ["Shellcode", "Code Injection"],
      unlocked: false,
      completed: false,
    },
    {
      id: 5,
      title: "ROP Chain Builder",
      difficulty: "Hard",
      points: 500,
      solved: 187,
      description: "Build a ROP chain to bypass DEP protection",
      tags: ["ROP", "DEP Bypass"],
      unlocked: false,
      completed: false,
    },
    {
      id: 6,
      title: "ASLR Defeat",
      difficulty: "Hard",
      points: 600,
      solved: 98,
      description: "Exploit an information leak to defeat ASLR",
      tags: ["ASLR", "Info Leak"],
      unlocked: false,
      completed: false,
    },
  ]

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
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">Challenge Rooms</h1>
          <p className="text-lg text-muted-foreground">
            Test your skills with hands-on buffer overflow challenges. Earn points and climb the leaderboard!
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">450</div>
                <div className="text-xs text-muted-foreground">Total Points</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-2/10">
                <Target className="h-5 w-5 text-chart-2" />
              </div>
              <div>
                <div className="text-2xl font-bold">2/6</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-3/10">
                <Zap className="h-5 w-5 text-chart-3" />
              </div>
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-4/10">
                <Trophy className="h-5 w-5 text-chart-4" />
              </div>
              <div>
                <div className="text-2xl font-bold">#127</div>
                <div className="text-xs text-muted-foreground">Rank</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Challenges Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {challenges.map((challenge) => (
            <Card
              key={challenge.id}
              className={`overflow-hidden transition-shadow ${challenge.unlocked ? "hover:shadow-lg" : "opacity-60"}`}
            >
              {challenge.completed && <div className="h-1 bg-chart-2" />}
              <div className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <h3 className="text-xl font-bold">{challenge.title}</h3>
                      {challenge.completed && <Trophy className="h-5 w-5 text-chart-2" />}
                      {!challenge.unlocked && <Lock className="h-5 w-5 text-muted-foreground" />}
                    </div>
                    <p className="mb-3 text-sm text-muted-foreground">{challenge.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {challenge.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-4 flex items-center justify-between border-t border-border pt-4">
                  <div className="flex items-center gap-4 text-sm">
                    <Badge
                      variant={
                        challenge.difficulty === "Easy"
                          ? "default"
                          : challenge.difficulty === "Medium"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {challenge.difficulty}
                    </Badge>
                    <span className="font-semibold text-primary">{challenge.points} pts</span>
                    <span className="text-muted-foreground">{challenge.solved} solved</span>
                  </div>
                </div>

                {challenge.unlocked ? (
                  <Link href={`/challenges/${challenge.id}`}>
                    <Button className="w-full">{challenge.completed ? "View Solution" : "Start Challenge"}</Button>
                  </Link>
                ) : (
                  <Button disabled className="w-full">
                    Locked - Complete Previous Challenges
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Leaderboard Preview */}
        <Card className="mt-12 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Top Hackers This Week</h2>
            <Button variant="outline" size="sm">
              View Full Leaderboard
            </Button>
          </div>
          <div className="space-y-3">
            {[
              { rank: 1, name: "CyberNinja", points: 2450, badge: "🥇" },
              { rank: 2, name: "StackMaster", points: 2280, badge: "🥈" },
              { rank: 3, name: "BufferKing", points: 2150, badge: "🥉" },
              { rank: 4, name: "MemHacker", points: 1890, badge: "" },
              { rank: 5, name: "ROPWizard", points: 1670, badge: "" },
            ].map((user) => (
              <div key={user.rank} className="flex items-center justify-between rounded-lg bg-muted/30 p-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 text-center font-mono text-sm font-semibold">{user.badge || `#${user.rank}`}</div>
                  <div className="font-semibold">{user.name}</div>
                </div>
                <div className="text-sm font-semibold text-primary">{user.points} pts</div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  )
}
