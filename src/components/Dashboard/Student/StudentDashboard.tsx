import { StatCard } from "../StatCard";
import { CourseData, CourseTable } from "../CourseTable";
import DeadlinesCard from "../DeadlinesCard";

const studentCourses: CourseData[] = [
  {
    id: "1",
    name: "Algebra Basics",
    lessonsCompleted: 8,
    totalLessons: 10,
    price: "$20",
  },
  {
    id: "2",
    name: "Physics 101",
    lessonsCompleted: 12,
    totalLessons: 15,
    price: "$35",
  },
];

const relatedCourses = [
  {
    id: "3",
    title: "Advanced Algebra",
    description: "Dive deeper into quadratic equations and polynomials.",
  },
  {
    id: "4",
    title: "Introduction to Mechanics",
    description: "Explore Newton's laws and kinematics fundamentals.",
  },
];

export default function StudentDashboardContent() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome Student</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Course Progress"
          progress={72}
          footer="3 out of 5 courses completed"
        />
        <StatCard
          title="Certificates Earned"
          value={2}
          footer="2 pending certificates"
        />
        <StatCard
          title="Quizzes Completed"
          value={5}
          footer="1 upcoming quiz"
        />
      </div>

      <DeadlinesCard />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Courses</h2>
        <CourseTable
          columns={["Course Name", "Lessons", "Price"]}
          data={studentCourses}
          isTeacher={false}
        />
      </div>
    </div>
  );
}
