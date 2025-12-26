"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FileSearch, Activity, PlayCircle, Shield, FileText, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  {
    title: "Main",
    items: [{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    title: "Analysis",
    items: [
      { name: "Static Analysis", href: "/analysis/static", icon: FileSearch },
      { name: "Dynamic Analysis", href: "/analysis/dynamic", icon: Activity },
    ],
  },
  {
    title: "Testing",
    items: [
      { name: "RCE Simulation", href: "/simulation", icon: PlayCircle },
      { name: "Mitigation Testing", href: "/mitigations", icon: Shield },
    ],
  },
  {
    title: "Documentation",
    items: [
      { name: "Reports", href: "/reports", icon: FileText },
      { name: "Ethics & Safety", href: "/ethics", icon: BookOpen },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-sidebar-border px-6 py-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Shield className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-sidebar-foreground">Buffer Watch</span>
            <span className="text-xs text-muted-foreground">Educational Framework</span>
          </div>
        </Link>
      </div>
      <nav className="flex-1 space-y-6 p-4">
        {navigation.map((section) => (
          <div key={section.title} className="space-y-2">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{section.title}</p>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  )
}
