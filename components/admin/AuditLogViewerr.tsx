import useSWR from 'swr';
import axios from 'axios';

export default function AuditLogViewer() {
  const { data, error } = useSWR('/api/admin/logs', url => axios.get(url).then(res => res.data));

  if (error) return <div>Error loading logs</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h2>Admin Audit Logs</h2>
      <ul>
        {data.map((log, i) => (
          <li key={i}>
            {log.action} on {log.target} by {log.adminId} at {new Date(log.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}