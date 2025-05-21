"use client";
import { useRoleStore } from "@/store/roleStore";
import StudentDashboardContent from "@/components/Dashboard/StudentDashboard";
import TeacherDashboardContent from "@/components/Dashboard/TeacherDashboard";

export default function DashboardPage() {
  const viewAs = useRoleStore((state) => state.viewAs);

  return viewAs === "teacher" ? (
    <TeacherDashboardContent />
  ) : (
    <StudentDashboardContent />
  );
}
