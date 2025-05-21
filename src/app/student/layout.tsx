import React from "react";
import DashboardLayout from "../(dashboard)/dashboard/layout";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
