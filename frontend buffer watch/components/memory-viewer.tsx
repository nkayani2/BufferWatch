"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface MemoryBlock {
  address: string
  value: string
  description: string
  type: "buffer" | "saved-bp" | "return-addr" | "parameter" | "other"
}

interface MemoryViewerProps {
  blocks?: MemoryBlock[]
  highlight?: string[]
}

export function MemoryViewer({ blocks = [], highlight = [] }: MemoryViewerProps) {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null)

  const defaultBlocks: MemoryBlock[] = [
    { address: "0x7fff1240", value: "0x00401234", description: "Return Address (main+45)", type: "return-addr" },
    { address: "0x7fff123c", value: "0x7fff1260", description: "Saved Base Pointer", type: "saved-bp" },
    { address: "0x7fff1238", value: "0x00000000", description: "buffer[60-63]", type: "buffer" },
    { address: "0x7fff1234", value: "0x00000000", description: "buffer[56-59]", type: "buffer" },
    { address: "0x7fff1230", value: "0x00000000", description: "buffer[52-55]", type: "buffer" },
    { address: "0x7fff122c", value: "0x00000000", description: "buffer[48-51]", type: "buffer" },
    { address: "0x7fff1228", value: "0x00000000", description: "buffer[44-47]", type: "buffer" },
    { address: "0x7fff1224", value: "0x00000000", description: "buffer[40-43]", type: "buffer" },
    { address: "0x7fff1220", value: "0x00000000", description: "buffer[0-3]", type: "buffer" },
  ]

  const memoryBlocks = blocks.length > 0 ? blocks : defaultBlocks

  const getTypeColor = (type: string) => {
    switch (type) {
      case "return-addr":
        return "border-l-chart-4 bg-chart-4/5"
      case "saved-bp":
        return "border-l-primary bg-primary/5"
      case "buffer":
        return "border-l-chart-2 bg-chart-2/5"
      case "parameter":
        return "border-l-chart-3 bg-chart-3/5"
      default:
        return "border-l-muted bg-muted/30"
    }
  }

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Stack Memory View</h3>
        <div className="flex gap-2">
          <Badge variant="outline" className="gap-1 border-chart-4 text-chart-4">
            <div className="h-2 w-2 rounded-full bg-chart-4" />
            Return
          </Badge>
          <Badge variant="outline" className="gap-1 border-primary text-primary">
            <div className="h-2 w-2 rounded-full bg-primary" />
            Base Ptr
          </Badge>
          <Badge variant="outline" className="gap-1 border-chart-2 text-chart-2">
            <div className="h-2 w-2 rounded-full bg-chart-2" />
            Buffer
          </Badge>
        </div>
      </div>

      <div className="mb-4 rounded-lg border border-border bg-background p-4">
        <div className="mb-3 grid grid-cols-[auto,1fr,1fr] gap-x-4 text-xs font-semibold text-muted-foreground">
          <div>Address</div>
          <div>Value</div>
          <div>Description</div>
        </div>

        <div className="space-y-1.5">
          {memoryBlocks.map((block) => (
            <div
              key={block.address}
              onClick={() => setSelectedAddress(block.address)}
              className={`grid cursor-pointer grid-cols-[auto,1fr,1fr] gap-x-4 rounded border-l-4 p-3 transition-colors ${getTypeColor(block.type)} ${
                selectedAddress === block.address ? "ring-2 ring-primary" : ""
              } ${highlight.includes(block.address) ? "animate-pulse ring-2 ring-chart-3" : ""}`}
            >
              <div className="font-mono text-sm font-semibold text-foreground">{block.address}</div>
              <div className="font-mono text-sm text-foreground">{block.value}</div>
              <div className="text-sm text-muted-foreground">{block.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2 rounded-lg bg-muted/30 p-4 text-xs leading-relaxed text-muted-foreground">
        <p>
          <strong>Stack grows downward:</strong> Higher addresses at top, lower at bottom
        </p>
        <p>
          <strong>Buffer overflow:</strong> Writing past buffer[63] will overwrite the saved base pointer and return
          address
        </p>
        <p>
          <strong>Goal:</strong> Overwrite the return address to redirect execution to your target function
        </p>
      </div>
    </Card>
  )
}
