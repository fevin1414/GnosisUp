import { CourseData, CourseTable } from "@/components/Dashboard/CourseTable";

export default function CoursesPage() {
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
  return (
    <div className="text-foreground text-lg font-semibold">
      Student Courses Page
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
