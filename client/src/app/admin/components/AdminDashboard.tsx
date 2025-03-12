import { useState } from "react";
import { Filter, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AdminProjectList from "./AdminProjectList";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      <Nav />
      <div className="min-h-screen bg-background flex">
        <AdminSidebar />

        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <header className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your portfolio projects and content
              </p>
            </header>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div className="relative w-full md:w-auto flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search projects..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-2 w-full md:w-auto">
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button asChild>
                  <Link to="/admin/projects/new">
                    <Plus className="h-4 w-4 mr-2" /> Add Project
                  </Link>
                </Button>
              </div>
            </div>

            <AdminProjectList searchQuery={searchQuery} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
