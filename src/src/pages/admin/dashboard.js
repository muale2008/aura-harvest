import AdminLayout from '../../components/admin/AdminLayout'
import JobComposer from '../../components/admin/JobComposer'
import JobList from '../../components/admin/JobList'
import AnalyticsPanel from '../../components/admin/AnalyticsPanel'
import AnnouncementEditor from '../../components/admin/AnnouncementEditor'

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <JobComposer />
      <JobList />
      <AnalyticsPanel />
      <AnnouncementEditor />
    </AdminLayout>
  )
}