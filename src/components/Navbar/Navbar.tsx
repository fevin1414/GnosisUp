"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/ThemeToggle";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "All Courses" },
  { href: "/students", label: "About" },
  { href: "/settings", label: "Contact Us" },
  { href: "/seings", label: "SignUp/SignIn" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          GnosisUp
        </Link>

        <nav className="hidden md:flex items-center space-x-2">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href}>
              <Button variant={pathname === href ? "secondary" : "ghost"}>
                {label}
              </Button>
            </Link>
          ))}
          <ModeToggle />
        </nav>

        <div className="md:hidden flex items-center gap-2">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 space-y-2 bg-background border-t border-border">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
              <Button
                variant={pathname === href ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                {label}
              </Button>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
