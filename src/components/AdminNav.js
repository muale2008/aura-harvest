import Link from 'next/link';

export default function AdminNav() {
  return (
    <nav>
      <Link href="/admin/jobs">📋 Jobs</Link>
      <Link href="/admin/analytics">📊 Analytics</Link>
      <Link href="/admin/announcements">📣 Announcements</Link>
    </nav>
  );
}