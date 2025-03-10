import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import projectService, { Project } from "@/services/ProjectService";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectData = await projectService.getProjects();
        setProjects(projectData);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    fetchProjects();
  }, []);

  if (!projects.length) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-20 animate-fade-in">
      <div className="text-left flex flex-col">
        <h2 className="text-4xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Featured Projects
        </h2>
        <div
          className="flex items-center justify-between animate-slide-up"
          style={{ animationDelay: "100ms" }}
        >
          <p className="text-muted-foreground">
            A collection of my recent work showcasing my skills and expertise.
          </p>

          <Link to="/projects" className="p-0">
            <Button variant="link" className="cursor-pointer p-0 group">
              View All{" "}
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {projects.slice(0, 2).map((project, index) => (
          <ProjectCard
            key={index}
            image={project.data.images[0]}
            title={project.data.title}
            description={project.data.description}
            skills={project.data.skills}
            github={project.data.github}
            demo={project.data.liveLink}
            slug={project.slug}
          />
        ))}
      </div>
    </section>
  );
}
