import type React from "react"
import { cn } from "@/lib/utils"

interface ProjectFeatureCardProps {
  title: string
  items: string[]
  icon: React.ReactNode
  className?: string
}

export default function ProjectFeatureCard({ title, items, icon, className }: ProjectFeatureCardProps) {
  return (
    <div className={cn("rounded-xl border border-border p-6 h-full", className)}>
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-primary/10 p-2 rounded-md">{icon}</div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>

      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="text-primary mr-2">•</span>
            <span className="text-muted-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

