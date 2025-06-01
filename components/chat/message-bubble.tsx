"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, User, Copy, ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MessageBubbleProps {
  content: string
  sender: "user" | "ai"
  timestamp: Date
  context?: any
}

export function MessageBubble({ content, sender, timestamp, context }: MessageBubbleProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(content)
  }

  return (
    <div className={cn("flex gap-3", sender === "user" ? "justify-end" : "justify-start")}>
      {sender === "ai" && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Bot className="h-4 w-4" />
        </div>
      )}

      <div className={cn("max-w-[80%] space-y-2")}>
        <Card
          className={cn(
            "px-4 py-3",
            sender === "user" ? "bg-primary text-primary-foreground border-primary" : "bg-muted",
          )}
        >
          <div className="text-sm whitespace-pre-wrap">{content}</div>
        </Card>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{timestamp.toLocaleTimeString()}</span>

          {sender === "ai" && (
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                <Copy className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm">
                <ThumbsUp className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm">
                <ThumbsDown className="h-3 w-3" />
              </Button>
            </div>
          )}

          {context && (
            <Badge variant="outline" className="text-xs">
              Data-driven
            </Badge>
          )}
        </div>
      </div>

      {sender === "user" && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  )
}
