"use client";
import { CourseTable, CourseData } from "@/components/Dashboard/CourseTable";

const teacherCourses: CourseData[] = [
  {
    id: "101",
    name: "Chemistry Advanced",
    studentsEnrolled: 24,
    price: "$40",
  },
  {
    id: "102",
    name: "Intro to Programming",
    studentsEnrolled: 30,
    price: "$50",
  },
];
export default function TeacherCoursesPage() {
  const handleAdd = (id: string) => {
    console.log("Add course with ID:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete course with ID:", id);
  };
  return (
    <div className="text-foreground text-lg font-semibold">
      Teacher Courses Page
      <CourseTable
        columns={["Course Name", "Students", "Price"]}
        data={teacherCourses}
        isTeacher
        onAdd={handleAdd}
        onDelete={handleDelete}
      />
    </div>
  );
}
