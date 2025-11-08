"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Trophy, Target, Zap, BookOpen, CheckCircle2, Clock, TrendingUp, Award, Shield } from "lucide-react"

export default function DashboardPage() {
  const userStats = {
    username: "CyberStudent",
    rank: 127,
    totalPoints: 450,
    completedChallenges: 2,
    totalChallenges: 6,
    currentStreak: 3,
    lessonsCompleted: 2,
    totalLessons: 24,
    hoursLearned: 4.5,
  }

  const recentActivity = [
    {
      type: "challenge",
      title: "Password Bypass",
      points: 150,
      timestamp: "2 hours ago",
      status: "completed",
    },
    {
      type: "lesson",
      title: "What is a Buffer?",
      points: 0,
      timestamp: "5 hours ago",
      status: "completed",
    },
    {
      type: "challenge",
      title: "Basic Stack Overflow",
      points: 100,
      timestamp: "1 day ago",
      status: "completed",
    },
    {
      type: "lesson",
      title: "Memory Layout Basics",
      points: 0,
      timestamp: "2 days ago",
      status: "completed",
    },
  ]

  const achievements = [
    {
      id: 1,
      title: "First Blood",
      description: "Complete your first challenge",
      icon: "🎯",
      unlocked: true,
      date: "Jan 15, 2025",
    },
    {
      id: 2,
      title: "Quick Learner",
      description: "Complete 3 lessons in one day",
      icon: "⚡",
      unlocked: true,
      date: "Jan 16, 2025",
    },
    {
      id: 3,
      title: "Buffer Master",
      description: "Complete all beginner challenges",
      icon: "🏆",
      unlocked: false,
      date: null,
    },
    {
      id: 4,
      title: "Week Warrior",
      description: "Maintain a 7-day streak",
      icon: "🔥",
      unlocked: false,
      date: null,
    },
    {
      id: 5,
      title: "Point Collector",
      description: "Earn 1000 total points",
      icon: "💎",
      unlocked: false,
      date: null,
    },
    {
      id: 6,
      title: "Exploit Expert",
      description: "Complete all intermediate challenges",
      icon: "👑",
      unlocked: false,
      date: null,
    },
  ]

  const learningPaths = [
    {
      title: "Introduction to Buffer Overflows",
      progress: 33,
      completed: 2,
      total: 6,
      color: "primary",
    },
    {
      title: "Exploitation Techniques",
      progress: 0,
      completed: 0,
      total: 8,
      color: "chart-2",
    },
    {
      title: "Modern Protections & Bypasses",
      progress: 0,
      completed: 0,
      total: 10,
      color: "chart-3",
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
          <div className="flex items-center gap-3">
            <Link href="/learn">
              <Button variant="outline" size="sm">
                Continue Learning
              </Button>
            </Link>
            <Link href="/challenges">
              <Button size="sm">View Challenges</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">Welcome back, {userStats.username}!</h1>
          <p className="text-lg text-muted-foreground">Track your progress and continue your cybersecurity journey</p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="mb-1 text-sm text-muted-foreground">Total Points</div>
                <div className="text-3xl font-bold text-primary">{userStats.totalPoints}</div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">Rank #{userStats.rank} globally</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="mb-1 text-sm text-muted-foreground">Challenges</div>
                <div className="text-3xl font-bold text-chart-2">
                  {userStats.completedChallenges}/{userStats.totalChallenges}
                </div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-chart-2/10">
                <Target className="h-6 w-6 text-chart-2" />
              </div>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              {Math.round((userStats.completedChallenges / userStats.totalChallenges) * 100)}% complete
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="mb-1 text-sm text-muted-foreground">Current Streak</div>
                <div className="text-3xl font-bold text-chart-3">{userStats.currentStreak} days</div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-chart-3/10">
                <Zap className="h-6 w-6 text-chart-3" />
              </div>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">Keep it up!</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="mb-1 text-sm text-muted-foreground">Lessons</div>
                <div className="text-3xl font-bold text-chart-4">
                  {userStats.lessonsCompleted}/{userStats.totalLessons}
                </div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-chart-4/10">
                <BookOpen className="h-6 w-6 text-chart-4" />
              </div>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">{userStats.hoursLearned} hours learned</div>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Learning Paths Progress */}
            <Card className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Learning Paths</h2>
                <Link href="/learn">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>

              <div className="space-y-6">
                {learningPaths.map((path, index) => (
                  <div key={index}>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="font-semibold">{path.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {path.completed}/{path.total} complete
                      </div>
                    </div>
                    <Progress value={path.progress} className="h-2" />
                    <div className="mt-1 text-xs text-muted-foreground">{path.progress}%</div>
                  </div>
                ))}
              </div>

              <Link href="/learn" className="mt-6 block">
                <Button className="w-full">Continue Learning</Button>
              </Link>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <div className="mb-6 flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <h2 className="text-2xl font-bold">Recent Activity</h2>
              </div>

              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
                  >
                    <div className="flex items-center gap-3">
                      {activity.type === "challenge" ? (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Target className="h-5 w-5 text-primary" />
                        </div>
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-2/10">
                          <BookOpen className="h-5 w-5 text-chart-2" />
                        </div>
                      )}
                      <div>
                        <div className="font-semibold">{activity.title}</div>
                        <div className="text-sm text-muted-foreground">{activity.timestamp}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {activity.points > 0 && (
                        <Badge variant="secondary" className="font-semibold">
                          +{activity.points} pts
                        </Badge>
                      )}
                      <CheckCircle2 className="h-5 w-5 text-chart-2" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-chart-2" />
                <h3 className="font-bold">This Week</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Points Earned</span>
                  <span className="font-semibold text-primary">+250</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Challenges Solved</span>
                  <span className="font-semibold text-chart-2">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Lessons Completed</span>
                  <span className="font-semibold text-chart-3">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Study Time</span>
                  <span className="font-semibold text-chart-4">4.5 hrs</span>
                </div>
              </div>
            </Card>

            {/* Achievements */}
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-chart-3" />
                  <h3 className="font-bold">Achievements</h3>
                </div>
                <span className="text-sm text-muted-foreground">2/6</span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`group relative flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 transition-all ${
                      achievement.unlocked
                        ? "border-chart-3 bg-chart-3/10 hover:bg-chart-3/20"
                        : "border-border bg-muted/30 opacity-40"
                    }`}
                    title={achievement.description}
                  >
                    <div className="text-3xl">{achievement.icon}</div>
                    {achievement.unlocked && (
                      <div className="absolute -right-1 -top-1">
                        <CheckCircle2 className="h-5 w-5 text-chart-2" />
                      </div>
                    )}
                    <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden w-48 -translate-x-1/2 rounded-lg border border-border bg-card p-3 text-xs shadow-lg group-hover:block">
                      <div className="mb-1 font-semibold">{achievement.title}</div>
                      <div className="text-muted-foreground">{achievement.description}</div>
                      {achievement.date && <div className="mt-1 text-chart-2">{achievement.date}</div>}
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" size="sm" className="mt-4 w-full bg-transparent">
                View All Achievements
              </Button>
            </Card>

            {/* Next Challenge */}
            <Card className="overflow-hidden border-primary bg-primary/5">
              <div className="p-6">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
                  <Target className="h-4 w-4" />
                  Recommended Next
                </div>
                <h3 className="mb-2 text-lg font-bold">Return to Win</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Redirect execution to a hidden win() function using buffer overflow
                </p>
                <div className="mb-4 flex gap-2">
                  <Badge variant="secondary">Medium</Badge>
                  <Badge variant="secondary">250 pts</Badge>
                </div>
                <Link href="/challenges/3">
                  <Button className="w-full">Start Challenge</Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
