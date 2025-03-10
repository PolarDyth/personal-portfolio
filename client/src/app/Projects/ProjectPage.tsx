import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import ProjectCard from "@/components/ProjectCard";
import projectService, { Project } from "@/services/ProjectService";
import { useEffect, useState } from "react";

export default function ProjectPage() {

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
    <>
      <Nav />
      <div className="flex flex-col py-20 gap-4">
        <div className="mb-12 text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            My Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Explore my portfolio of projects spanning web development, data science, and more. Each project represents a
            unique challenge and learning opportunity.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-4">
          {projects.map((project: Project, index: number) => (
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
      </div>
      <Footer />
    </>
  );
}