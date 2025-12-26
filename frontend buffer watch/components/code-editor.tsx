"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

interface CodeEditorProps {
  initialCode?: string
  language?: string
  readOnly?: boolean
  onCodeChange?: (code: string) => void
}

export function CodeEditor({ initialCode = "", language = "c", readOnly = false, onCodeChange }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleChange = (newCode: string) => {
    setCode(newCode)
    onCodeChange?.(newCode)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">
          Code Editor <span className="text-muted-foreground">({language})</span>
        </div>
        <Button onClick={handleCopy} size="sm" variant="ghost" className="gap-2">
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy
            </>
          )}
        </Button>
      </div>

      <div className="rounded-lg border-2 border-border bg-muted/30 p-4">
        {readOnly ? (
          <pre className="overflow-x-auto font-mono text-sm text-foreground">
            <code>{code}</code>
          </pre>
        ) : (
          <textarea
            value={code}
            onChange={(e) => handleChange(e.target.value)}
            className="min-h-[400px] w-full bg-transparent font-mono text-sm text-foreground outline-none"
            spellCheck={false}
          />
        )}
      </div>

      {!readOnly && (
        <div className="text-xs text-muted-foreground">
          Tip: Modify the code to test different exploits and vulnerability fixes
        </div>
      )}
    </div>
  )
}
