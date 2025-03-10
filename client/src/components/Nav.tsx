import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const navLocations = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Skills", href: "/skills" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
]

export default function Nav() {
  return (
    <nav className="flex justify-between items-center animate-fade-in">
      <div className="font-bold text-2xl animate-slide-down">
        <Link to="/" className="flex gap-4">
          <span className="text-primary">WILLIAMS</span>
          <span>PORTFOLIO</span>
        </Link>
      </div>
      <div className="flex gap-4 items-center animate-slide-down" style={{ animationDelay: '200ms' }}>
        {navLocations.map((location, index) => (
          <Link
            to={location.href}
            key={index}
            className="font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary after:transition-all">
            {location.name}
          </Link>
        ))}
      </div>
      <div className="animate-slide-down" style={{ animationDelay: '400ms' }}>
        <Button
          asChild
          className="font-semibold hover:animate-pulse">
          <Link to="/contact">
            Contact Me
          </Link>
        </Button>
      </div>
    </nav>
  )
}