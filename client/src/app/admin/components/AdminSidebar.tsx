import { FileText, FolderPlus, LayoutDashboard, Settings, Users } from "lucide-react";
import { Link } from "react-router-dom";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: FolderPlus, label: "Projects", href: "/admin/projects" },
  { icon: FileText, label: "Blog Posts", href: "/admin/blog" },
  { icon: Users, label: "User Messages", href: "/admin/messages" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
]

export default function AdminSidebar() {
  return (
    <div className="w-64 h-screen sticky my-6 top-0 border-r border-border p-4 hidden md:block">
      <div className="flex items-center gap-2 mb-8 px-2">
        <span className="text-primary text-xl font-bold">WILLIAMS</span>
        <span className="text-foreground text-xl font-bold">ADMIN</span>
      </div>

      <nav className="space-y-1">
        {sidebarItems.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}