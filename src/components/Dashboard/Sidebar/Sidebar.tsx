"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { studentLinks, teacherLinks, NavLink } from "./NavLinks";

export function Sidebar({ isTeacherView }: { isTeacherView: boolean }) {
  const pathname = usePathname();
  const currentLinks = isTeacherView ? teacherLinks : studentLinks;

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 border-r bg-background dark:bg-gray-900">
        <div className="p-4 h-16 flex items-center justify-between border-b dark:border-gray-700">
          <h1 className="text-xl font-bold font-sans text-foreground dark:text-white">
            GnosisUp
          </h1>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {currentLinks.map((link: NavLink) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center px-3 py-3 rounded-lg font-medium transition-colors relative",
                isActive(link.href)
                  ? "bg-primary/10 text-primary dark:bg-primary/20"
                  : "hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-800"
              )}
            >
              {link.icon}
              <span className="ml-3">{link.title}</span>
              {isActive(link.href) && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-primary" />
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Bottom Tab Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background dark:bg-gray-900 dark:border-gray-700 z-40">
        <nav className="flex justify-around items-center h-16">
          {currentLinks.slice(0, 5).map((link: NavLink) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-col items-center justify-center p-2 w-full h-full relative",
                isActive(link.href)
                  ? "text-primary dark:text-primary-400"
                  : "text-muted-foreground dark:text-gray-400"
              )}
            >
              {link.icon}
              <span className="text-xs mt-1">{link.title}</span>
              {isActive(link.href) && (
                <span className="absolute top-0 w-8 h-1 rounded-b-full bg-primary" />
              )}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
