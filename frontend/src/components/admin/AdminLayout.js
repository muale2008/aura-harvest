import { useEffect } from 'react'
import Link from 'next/link'

export default function AdminLayout({ children }) {
  useEffect(() => {
    fetch('/api/blueprint/sync', {
      method: 'POST',
      body: JSON.stringify({
        feature: 'Admin Dashboard v1.1.1',
        timestamp: Date.now(),
      }),
      headers: { 'Content-Type': 'application/json' },
    })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <nav className="mb-6 flex gap-4 text-blue-600">
        <Link href="/admin/dashboard">Dashboard</Link>
        <Link href="/admin/jobs">Jobs</Link>
        <Link href="/admin/analytics">Analytics</Link>
      </nav>
      {children}
    </div>
  )
}