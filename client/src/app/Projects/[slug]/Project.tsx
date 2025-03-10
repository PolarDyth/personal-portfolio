import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectGallery from "./components/ProjectGallery";
import ProjectHeader from "./components/ProjectHeader";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProjectStats from "./components/ProjectStats";
import ProjectTimeline from "./components/ProjectTimeline";
import ProjectTestimony from "./components/ProjectTestimony";
import ProjectInsights from "./components/ProjectInsights";
import ProjectFeatureCard from "./components/ProjectFeatureCard";
import { Button } from "@/components/ui/button";
import { Code, Lightbulb, Puzzle } from "lucide-react";
import projectService, { Project } from "@/services/ProjectService";

export default function ProjectPage() {
  const { slug } = useParams();
  const [projects, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (!slug) {
          throw new Error("Slug is undefined");
        }
        const projectData = await projectService.getProject(slug);
        setProject(projectData);
      } catch (error) {
        console.error("Failed to fetch project:", error);
      }
    };
    if (slug) fetchProject();
  }, [slug]);

  if (!projects) {
    return <div>Couldn't find project</div>;
  }

  return (
    <div>
      <Nav />
      <ProjectHeader
        title={projects.data.title}
        description={projects.data.description}
        skills={projects.data.skills}
        github={projects.data.github}
        demoLink={projects.data.liveLink}
      />
      <ProjectGallery images={projects.data.images} />
      <ProjectStats stats={projects.data.stats} />

      <div className="mb-16 text-left">
        <h2 className="text-3xl font-bold mb-6">Project Overview</h2>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {projects.data.overview}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-2">
          <ProjectTimeline items={projects.data.timeline} />
        </div>
        <div>
          <ProjectTestimony
            quote={projects.data.testimonial.quote}
            author={projects.data.testimonial.author}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-2">
          <div className="text-left border border-border rounded-xl p-6">
            <h2 className="text-xl font-bold mb-12">Development Process</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
                {projects.data.process}
              </p>
            </div>
          </div>
        </div>
        <div>
          <ProjectInsights insights={projects.data.insights} />
        </div>
      </div>

      {/* Features, Challenges, Learnings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <ProjectFeatureCard
          title="Key Features"
          items={projects.data.features}
          icon={<Code className="h-5 w-5 text-primary" />}
        />
        <ProjectFeatureCard
          title="Challenges"
          items={projects.data.challenges}
          icon={<Puzzle className="h-5 w-5 text-primary" />}
        />
        <ProjectFeatureCard
          title="Learnings"
          items={projects.data.learnings}
          icon={<Lightbulb className="h-5 w-5 text-primary" />}
        />
      </div>
      <div className="border border-border rounded-xl p-8 mb-16 w-full text-center">
          <h2 className="text-2xl font-bold mb-4">
            Interested in working together?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            I'm always open to discussing new projects and opportunities. Feel
            free to reach out if you'd like to collaborate.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <a href="/#contact">Contact Me</a>
            </Button>
            <Button variant="outline" asChild size="lg">
              <a href="/projects">View More Projects</a>
            </Button>
          </div>
        </div>
      
      <Footer />
    </div>
  );
}
