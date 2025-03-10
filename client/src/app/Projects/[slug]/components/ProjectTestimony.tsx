import { cn } from "@/lib/utils"
import { Quote } from "lucide-react"

interface ProjectTestimonialProps {
  quote: string
  author: {
    name: string
    role: string
    avatar?: string
  }
  className?: string
}

export default function ProjectTestimonial({ quote, author, className }: ProjectTestimonialProps) {
  return (
    <div className={cn("border border-border rounded-xl p-6", className)}>
      <div className="flex items-start mb-4">
        <Quote className="text-primary h-8 w-8 mr-2 flex-shrink-0" />
        <p className="text-lg italic text-muted-foreground">{quote}</p>
      </div>

      <div className="flex items-center mt-4">
        {author.avatar ? (
          <img
            src={author.avatar || "/placeholder.svg"}
            alt={author.name}
            width={40}
            height={40}
            className="rounded-full mr-3"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
            <span className="text-primary font-medium">{author.name.charAt(0)}</span>
          </div>
        )}
        <div>
          <div className="font-medium">{author.name}</div>
          <div className="text-sm text-muted-foreground">{author.role}</div>
        </div>
      </div>
    </div>
  )
}