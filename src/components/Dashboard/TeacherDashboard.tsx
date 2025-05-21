export default function TeacherDashboardContent() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="border rounded-lg p-4">
          <h3 className="font-medium">Your Classes</h3>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-medium">Quiz Management</h3>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-medium">Student Performance</h3>
        </div>
      </div>
    </div>
  );
}
