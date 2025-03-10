import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export default function Projects() {

  const projects = [

    {
      img: "https://kzmqem5a2thfoqjtshg0.lite.vusercontent.net/placeholder.svg",
      title: "Project 1",
      description:
        "A full-stack e-commerce solution with user authentication, product management, and payment integration.",
      skills: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
      github: "github.com/polardyth",
      demo: "test.com"

    },
    {
      img: "https://kzmqem5a2thfoqjtshg0.lite.vusercontent.net/placeholder.svg",
      title: "Project 2",
      description:
        "A responsive web application for a local business, built with React and hosted on Netlify.",
      skills: ["React", "Netlify"],
      github: "github.com/polardyth",
      demo: "test.com"
    },
  ];


  return (
    <section className="py-20 animate-fade-in">
      <div className="text-left flex flex-col">
        <h2 className="text-4xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Featured Projects</h2>
        <div className="flex items-center justify-between animate-slide-up" style={{ animationDelay: '100ms' }}>
          <p className="text-muted-foreground">
            A collection of my recent work showcasing my skills and expertise.
          </p>

          <Link to="/projects" className="p-0">
            <Button variant="link" className="cursor-pointer p-0 group">
              View All <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            img={[project.img]}
            title={project.title}
            description={project.description}
            skills={project.skills}
            github={project.github}
            demoLink={project.demo}
          />
        ))}
      </div>
    </section>
  );
}
