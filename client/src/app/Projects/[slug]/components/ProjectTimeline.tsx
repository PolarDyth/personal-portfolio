import { cn } from "@/lib/utils"

interface TimelineItemProps {
  title: string
  date: string
  description: string
}

function TimelineItem({ title, date, description }: TimelineItemProps) {
  return (
    <div className="relative pl-8 pb-8 last:pb-0">
      {/* Timeline connector */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border"></div>

      {/* Timeline dot */}
      <div className="absolute left-0 top-1 w-5 h-5 -ml-2.5 rounded-full bg-primary"></div>

      <div className="text-sm text-muted-foreground mb-1">{date}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

interface ProjectTimelineProps {
  items: TimelineItemProps[]
  className?: string
}

export default function ProjectTimeline({ items, className }: ProjectTimelineProps) {
  return (
    <div className={cn("text-left border border-border rounded-xl p-6", className)}>
      <h3 className="text-xl font-bold mb-6">Development Timeline</h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <TimelineItem key={index} {...item} />
        ))}
      </div>
    </div>
  )
}
