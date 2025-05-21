"use client";
import { useRoleStore } from "@/store/roleStore";
import StudentDashboardContent from "@/components/Dashboard/Student/StudentDashboard";
import TeacherDashboardContent from "@/components/Dashboard/Teacher/TeacherDashboard";

export default function DashboardPage() {
  const viewAs = useRoleStore((state) => state.viewAs);

  return viewAs === "teacher" ? (
    <TeacherDashboardContent />
  ) : (
    <StudentDashboardContent />
  );
}
