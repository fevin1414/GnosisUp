"use client";
import {
  Home,
  BookOpenText,
  GraduationCap,
  User,
  ClipboardList,
  Calendar,
  School,
  Settings,
} from "lucide-react";
import React from "react";

export interface NavLink {
  title: string;
  href: string;
  icon: React.ReactNode;
}

export const studentLinks: NavLink[] = [
  {
    title: "Home",
    href: "/dashboard",
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "Courses",
    href: "/courses",
    icon: <BookOpenText className="h-5 w-5" />,
  },
  {
    title: "Quizzes",
    href: "/quizzes",
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    title: "Schedule",
    href: "/schedule",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    title: "Certificates",
    href: "/certificates",
    icon: <GraduationCap className="h-5 w-5" />,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: <User className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

export const teacherLinks: NavLink[] = [
  {
    title: "Dashboard",
    href: "/teacher",
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "My Courses",
    href: "/teacher/courses",
    icon: <BookOpenText className="h-5 w-5" />,
  },
  {
    title: "Create Quiz",
    href: "/teacher/quizzes/create",
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    title: "Schedule",
    href: "/teacher/schedule",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    title: "Students",
    href: "/teacher/students",
    icon: <School className="h-5 w-5" />,
  },
  {
    title: "Profile",
    href: "/teacher/profile",
    icon: <User className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/teacher/settings",
    icon: <Settings className="h-5 w-5" />,
  },
];
