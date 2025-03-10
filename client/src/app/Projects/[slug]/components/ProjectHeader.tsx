import { Button } from "@/components/ui/button";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface ProjectHeaderProps {
  title: string;
  description: string;
  skills: string[];
  github: string;
  demoLink?: string;
}

export default function ProjectHeader(props: ProjectHeaderProps) {

  return (
    <section className="text-left py-20">
      <Link to="/projects" className="p-0">
        <Button variant="link" className="cursor-pointer p-0 group">
          <ArrowLeft className="transition-transform group-hover:-translate-x-1" /> Back to All Projects
        </Button>
      </Link>
      <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">{ props.title }</h1>
      <p className="text-xl text-muted-foreground mb-6 max-w-3xl">{props.description}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {props.skills.map((skill: string, skillIndex: number) => (
          <span
            key={skillIndex}
            className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
      <div>
        <Button asChild>
          <Link to={props.github}><SiGithub className="mr-2"/> View on GitHub</Link>
        </Button>
        {props.demoLink && (
          <Button asChild variant={"outline"} className="ml-4">
            <Link to={props.demoLink}><ExternalLink className="mr-2"/> View Demo</Link>
          </Button>
        )}
      </div>
    </section>
  )

}