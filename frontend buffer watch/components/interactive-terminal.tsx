"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Play, RotateCcw, Terminal } from "lucide-react"

interface TerminalLine {
  type: "command" | "output" | "success" | "error"
  content: string
}

interface InteractiveTerminalProps {
  onExecute?: (input: string) => Promise<TerminalLine[]>
  initialLines?: TerminalLine[]
}

export function InteractiveTerminal({ onExecute, initialLines = [] }: InteractiveTerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>(initialLines)
  const [input, setInput] = useState("")
  const [isExecuting, setIsExecuting] = useState(false)

  const handleExecute = async () => {
    if (!input.trim() || isExecuting) return

    setIsExecuting(true)
    const userCommand: TerminalLine = { type: "command", content: `$ ${input}` }
    setLines((prev) => [...prev, userCommand])

    if (onExecute) {
      const result = await onExecute(input)
      setLines((prev) => [...prev, ...result])
    } else {
      // Default mock execution
      setLines((prev) => [
        ...prev,
        { type: "output", content: "Executing program..." },
        { type: "output", content: `Input length: ${input.length} bytes` },
      ])

      // Simulate buffer overflow detection
      if (input.length > 64) {
        setTimeout(() => {
          setLines((prev) => [
            ...prev,
            { type: "error", content: "*** stack smashing detected ***: terminated" },
            { type: "success", content: "Segmentation fault (core dumped)" },
            { type: "success", content: "Return address overwritten! Flag: BWF{st4ck_0v3rfl0w}" },
          ])
          setIsExecuting(false)
        }, 500)
        return
      } else {
        setTimeout(() => {
          setLines((prev) => [...prev, { type: "output", content: `You entered: ${input}` }])
          setIsExecuting(false)
        }, 300)
        return
      }
    }

    setIsExecuting(false)
    setInput("")
  }

  const handleReset = () => {
    setLines(initialLines)
    setInput("")
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Terminal className="h-4 w-4" />
          Interactive Terminal
        </div>
        <Button onClick={handleReset} size="sm" variant="outline" className="gap-2 bg-transparent">
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>

      {/* Terminal Display */}
      <div className="min-h-[300px] rounded-lg border-2 border-border bg-black p-4 font-mono text-sm">
        <div className="mb-2 text-green-400">root@bufferwatch:~#</div>

        {/* Terminal Output */}
        <div className="space-y-1">
          {lines.map((line, i) => (
            <div
              key={i}
              className={
                line.type === "command"
                  ? "text-gray-400"
                  : line.type === "error"
                    ? "text-red-400"
                    : line.type === "success"
                      ? "text-green-400"
                      : "text-white"
              }
            >
              {line.content}
            </div>
          ))}
        </div>

        {/* Current Command Line */}
        {!isExecuting && (
          <div className="mt-2 flex items-center gap-2">
            <span className="text-gray-400">$ ./vulnerable_program</span>
          </div>
        )}

        {isExecuting && <div className="mt-2 animate-pulse text-yellow-400">Executing...</div>}
      </div>

      {/* Input Area */}
      <div className="space-y-3">
        <div>
          <label className="mb-2 block text-sm font-medium">Your Input (Payload)</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.ctrlKey) {
                e.preventDefault()
                handleExecute()
              }
            }}
            className="min-h-[100px] w-full rounded-lg border border-input bg-background p-3 font-mono text-sm"
            placeholder="Enter your payload here... Try entering more than 64 'A' characters!"
            disabled={isExecuting}
          />
          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Length: {input.length} bytes {input.length > 64 && "(Buffer overflow!)"}
            </span>
            <span>Press Ctrl+Enter to execute</span>
          </div>
        </div>

        <Button onClick={handleExecute} disabled={!input.trim() || isExecuting} className="w-full gap-2">
          <Play className="h-4 w-4" />
          {isExecuting ? "Executing..." : "Run Exploit"}
        </Button>
      </div>
    </div>
  )
}
