"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideNavbarPaths = [
    "/dashboard",
    "/teacher/courses",
    "/teacher/schedule",
    "/teacher/students",
    "/teacher/settings",
    "/student/courses",
    "/student/schedule",
    "/student/certificates",
    "/student/profile",
    "/student/settings",
  ];

  const shouldHideNavbar = hideNavbarPaths.some((path) =>
    pathname.startsWith(path)
  );

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      {children}
    </>
  );
}
