import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
interface SimpleProject {
  key: number;
  image: {
    src: string
    alt: string
    description?: string
  }
  title: string;
  description: string;
  skills: string[];
  github: string;
  demo?: string;
  slug: string;
}

export default function ProjectCard(props: SimpleProject) {
  return (
    <div className="bg-card rounded-xl overflow-hidden flex flex-col group hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-2 animate-fade-in h-[440px]">
      <div key={props.key} className="relative h-[240px]">
        <img
          src={props.image.src}
          alt={props.image.alt}
          className="object-cover w-full h-full transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-primary/80 p-6 opacity-0 group-hover:opacity-100 flex items-end justify-between transition-opacity duration-300">
          <Button asChild variant="secondary" className="scale-90 group-hover:scale-100 transition-transform duration-300">
            <Link to={props.github}>
              <span><SiGithub /></span>
              <span>GitHub</span>
            </Link>
          </Button>
          {props.demo && (
            <Button asChild variant="secondary" className="scale-90 group-hover:scale-100 transition-transform duration-300">
              <Link to={props.demo}>
                <span><ExternalLink /></span>
                <span>Demo</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
      <div className="flex-1 p-6 flex flex-col">
        <h3 className="text-xl font-bold mb-2">
          <Link to={"/projects/" + props.slug} className="hover:text-primary group/link transition-colors inline-flex items-center">
            {props.title}
            <ArrowRight
              size={16}
              className="ml-1 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all"
            />
          </Link>
        </h3>

        <p className="text-muted-foreground line-clamp-3 mt-2">{props.description}</p>
        <div className="mt-auto pt-4">
          {props.skills.map((skill: string, skillIndex: number) => (
            <span
              key={skillIndex}
              className="bg-background cursor-pointer rounded-full px-2 py-1 text-sm inline-block m-1 hover:bg-primary/10 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}