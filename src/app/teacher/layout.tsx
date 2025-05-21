import React from "react";
import DashboardLayout from "../(dashboard)/dashboard/layout";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
