import { SiGithub } from "@icons-pack/react-simple-icons";
import { Linkedin, Mail } from "lucide-react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="flex justify-between container mx-auto py-8 border-t border-border">
      <div className="font-bold text-xl animate-slide-down space-x-4">
        <span className="text-primary">WILLIAMS</span>
        <span>PORTFOLIO</span>
      </div>
      <div className="text-muted-foreground text-sm">
        © {new Date().getFullYear()} William Alexander. All rights reserved.
      </div>
      <div className="flex gap-5 items-center">
        <Link to="github.com">
          <SiGithub className="w-5px h-5px text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200" />
        </Link>
        <Link to="linkedin.com">
          <Linkedin className="w-5px h-5px text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200" />
        </Link>
        <Link to="linkedin.com">
          <Mail className="w-5px h-5px text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200" />
        </Link>
      </div>
    </footer>
  )
}