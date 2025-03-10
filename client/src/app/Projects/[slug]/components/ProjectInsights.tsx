import type React from "react"
import { cn } from "@/lib/utils"
import StringToIcon from "../../../utility/StringToIcon"

interface InsightItemProps {
  title: string
  content: string
  icon: {
    name: keyof typeof StringToIcon
    styling?: string
  }
}

function InsightItem({ title, content, icon }: InsightItemProps) {
  return (
    <div className="flex items-start p-4 rounded-lg border border-border">
      <div className="bg-primary/10 p-2 rounded-md mr-4 mt-1">{StringToIcon(icon)}</div>
      <div>
        <h4 className="font-medium mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground">{content}</p>
      </div>
    </div>
  )
}

interface ProjectInsightsProps {
  insights: InsightItemProps[]
  className?: string
}

export default function ProjectInsights({ insights, className }: ProjectInsightsProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-xl font-bold mb-4">Project Insights</h3>
      <div className="grid gap-4">
        {insights.map((insight, index) => (
          <InsightItem key={index} {...insight} />
        ))}
      </div>
    </div>
  )
}

