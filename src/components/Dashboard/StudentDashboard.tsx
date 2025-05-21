export default function StudentDashboardContent() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Student Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="border rounded-lg p-4">
          <h3 className="font-medium">Your Courses</h3>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-medium">Upcoming Quizzes</h3>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-medium">Learning Progress</h3>
        </div>
      </div>
    </div>
  );
}
