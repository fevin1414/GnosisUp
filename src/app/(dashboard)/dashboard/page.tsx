import StudentDashboardContent from "@/components/Dashboard/StudentDashboard";
import TeacherDashboardContent from "@/components/Dashboard/TeacherDashboard";

export default function DashboardPage() {
  const isTeacherView = true;
  return isTeacherView ? (
    <TeacherDashboardContent />
  ) : (
    <StudentDashboardContent />
  );
}
