import { requireRole } from '@/lib/auth'
import { currentUser } from '@clerk/nextjs/server'  

export default async function TeacherDashboard() {
  await requireRole('teacher')
  const user = await currentUser()

  return (
    <>
      <div className="max-w-6xl mx-auto mt-8 p-6">
        <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome, {user?.firstName}!</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800">My Courses</h3>
              <p className="text-blue-600">Manage your courses</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">Students</h3>
              <p className="text-green-600">View enrolled students</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800">Assignments</h3>
              <p className="text-purple-600">Create and grade assignments</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}