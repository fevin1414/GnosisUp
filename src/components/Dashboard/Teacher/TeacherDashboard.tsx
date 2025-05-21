import { StatCard } from "../StatCard";
import { CourseData, CourseTable } from "../CourseTable";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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

const chartData = [
  { month: "January", "Last Year": 186, "Current Year": 80 },
  { month: "February", "Last Year": 305, "Current Year": 200 },
  { month: "March", "Last Year": 237, "Current Year": 120 },
  { month: "April", "Last Year": 73, "Current Year": 190 },
  { month: "May", "Last Year": 209, "Current Year": 130 },
  { month: "June", "Last Year": 214, "Current Year": 140 },
];

export default function TeacherDashboardContent() {
  const handleAdd = (id: string) => {
    console.log("Add course with ID:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete course with ID:", id);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome Teacher</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Your Classes" value={8} />
        <StatCard title="Quiz Management" value="12 Quizzes" />
        <StatCard title="Student Performance" footer="View analytics" />
      </div>
      <h2 className="text-xl font-semibold">Your Performance</h2>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Last Year" fill="#2563eb" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Current Year" fill="#60a5fa" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h2 className="text-xl font-semibold">Your Courses</h2>
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
