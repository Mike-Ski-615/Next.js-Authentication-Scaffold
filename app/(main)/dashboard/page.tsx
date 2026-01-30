import { connection } from "next/server"
import { verifySession, getUser } from "@/lib/dal"

/**
 * Dashboard Page - Protected Route Example
 * 
 * Security Notes:
 * 1. Proxy performs first Optimistic check (checks if cookie exists)
 * 2. verifySession() performs real authorization check (validates database session)
 * 3. Use cache() to ensure only one database query per request
 */
export default async function DashboardPage() {
  // Next.js 16 requires calling connection() before accessing dynamic data
  await connection()
  
  // Verify session - automatically redirects if not authenticated
  const session = await verifySession()
  
  // Can also get user info separately
  const user = await getUser()

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p>Welcome back, {user.name}!</p>
          <p className="text-sm text-gray-600">Email: {user.email}</p>
          <p className="text-sm text-gray-600">User ID: {session.userId}</p>
        </div>
      </div>
    </div>
  )
}
