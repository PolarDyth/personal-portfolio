import { Edit, Trash2, Eye, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import projectService, { Project } from "@/services/ProjectService";

export default function AdminProjectList({ searchQuery = "" }) {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectData = await projectService.getProjects();
        setProjects(projectData);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
        console.log(projects[0]);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    // Filter projects based on search query
    const filtered = projects.filter(
      (project) =>
        project.data.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.data.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        project.data.skills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
    setFilteredProjects(filtered);
  }, [searchQuery, projects]);

  const handleDeleteProject = async (id: number) => {
    try {
      await projectService.deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      // This way, the UI updates without a full page reload.
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="grid grid-cols-12 gap-4 p-4 font-medium text-sm border-b border-border">
        <div className="col-span-5">Project</div>
        <div className="col-span-3 hidden md:block">Skills</div>
        <div className="col-span-2 hidden md:block">Status</div>
        <div className="col-span-2 md:col-span-1">Created</div>
        <div className="col-span-1 text-right">Actions</div>
      </div>

      {loading ? (
        <div className="relative flex justify-center items-center min-h-30">
          <div className="absolute animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">
          No projects found. Try a different search term or add a new project.
        </div>
      ) : (
        filteredProjects.map((project) => (
          <div
            key={project.id}
            className="grid grid-cols-12 gap-4 p-4 items-center border-b border-border last:border-0 hover:bg-muted/20"
          >
            <div className="col-span-5 flex items-center gap-3">
              <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                <img
                  src={project.data.images[0].src || "/placeholder.svg"}
                  alt={project.data.images[0].alt}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h3 className="font-medium">{project.data.title}</h3>
                <p className="text-muted-foreground text-sm truncate max-w-xs">
                  {project.data.description}
                </p>
              </div>
            </div>

            <div className="col-span-3 hidden md:flex flex-wrap gap-1">
              {project.data.skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
              {project.data.skills.length > 3 && (
                <span className="text-muted-foreground text-xs">
                  +{project.data.skills.length - 3} more
                </span>
              )}
            </div>

            {/* <div className="col-span-2 hidden md:block">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  project.data.status === "Published"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                }`}
              >
                {project.data.status}
              </span>
            </div> */}

            <div className="col-span-2 md:col-span-1 text-muted-foreground text-sm">
              {new Date(project.created_at).toLocaleDateString("en-UK", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>

            <div className="col-span-1 text-right [&_*]:cursor-pointer">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to={`/projects/${project.slug}`} target="_blank">
                      <Eye className="h-4 w-4 mr-2" /> View
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={`/admin/projects/edit/${project.id}`}>
                      <Edit className="h-4 w-4 mr-2" /> Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onSelect={(e) => {
                      // Prevent the dropdown from closing
                      e.preventDefault();
                    }}
                  >
                    <AlertDialog>
                      <AlertDialogTrigger className="flex gap-2 w-full">
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteProject(project.id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
