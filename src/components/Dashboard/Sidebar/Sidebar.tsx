"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GraduationCap, UserRound } from "lucide-react";
import { studentLinks, teacherLinks, NavLink } from "./NavLinks";

// Hardcoded user role
const isUserTeacher = true;

const RoleToggle = ({
  isTeacher,
  setIsTeacher,
}: {
  isTeacher: boolean;
  setIsTeacher: (value: boolean) => void;
}) => {
  if (!isUserTeacher) return null;

  return (
    <div className="flex items-center justify-center p-4 border-b dark:border-gray-700">
      <div className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isTeacher}
          onChange={() => setIsTeacher(!isTeacher)}
          className="sr-only peer"
          id="role-toggle"
        />
        <div className="flex items-center">
          <label
            htmlFor="role-toggle"
            className={cn(
              "px-3 py-1.5 rounded-l-lg text-sm font-medium border border-r-0 cursor-pointer",
              !isTeacher
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-muted-foreground border-input"
            )}
          >
            <div className="flex items-center gap-2">
              <UserRound className="h-4 w-4" />
              <span>Student</span>
            </div>
          </label>
          <label
            htmlFor="role-toggle"
            className={cn(
              "px-3 py-1.5 rounded-r-lg text-sm font-medium border border-l-0 cursor-pointer",
              isTeacher
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-muted-foreground border-input"
            )}
          >
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span>Teacher</span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export function Sidebar() {
  const pathname = usePathname();
  const [isTeacher, setIsTeacher] = useState(isUserTeacher); // Initialize with user role
  const currentLinks = isTeacher ? teacherLinks : studentLinks;

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 border-r bg-background dark:bg-gray-900">
        <div className="p-4 h-16 flex items-center justify-between border-b dark:border-gray-700">
          <h1 className="text-xl font-bold font-sans text-foreground dark:text-white">
            GnosisUp
          </h1>
        </div>

        <RoleToggle isTeacher={isTeacher} setIsTeacher={setIsTeacher} />

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {currentLinks.map((link: NavLink) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center px-3 py-3 rounded-lg font-medium transition-colors",
                pathname === link.href
                  ? "bg-primary text-primary-foreground dark:bg-primary/90"
                  : "hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-800"
              )}
            >
              {link.icon}
              <span className="ml-3">{link.title}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Top Bar */}
      <div className="md:hidden">
        <div className="fixed top-0 left-0 right-0 h-16 bg-background dark:bg-gray-900 border-b dark:border-gray-700 px-4 flex items-center justify-between z-40">
          <h1 className="text-lg font-bold text-foreground dark:text-white">
            GnosisUp
          </h1>
          {isUserTeacher && (
            <RoleToggle isTeacher={isTeacher} setIsTeacher={setIsTeacher} />
          )}
        </div>

        {/* Mobile Bottom Tab Navigation */}
        <div className="fixed bottom-0 left-0 right-0 border-t bg-background dark:bg-gray-900 dark:border-gray-700 z-40">
          <nav className="flex justify-around items-center h-16">
            {currentLinks.slice(0, 5).map((link: NavLink) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex flex-col items-center justify-center p-2 w-full h-full",
                  pathname === link.href
                    ? "text-primary dark:text-primary-400 font-bold"
                    : "text-muted-foreground dark:text-gray-400 font-semibold"
                )}
              >
                {link.icon}
                <span className="text-xs mt-1 font-bold">{link.title}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
