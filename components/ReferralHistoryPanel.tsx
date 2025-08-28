import useSWR from 'swr';
import axios from 'axios';

export default function ReferralHistoryPanel({ userId }) {
  const { data, error } = useSWR(`/api/referrals/history?userId=${userId}`, url => axios.get(url).then(res => res.data));

  if (error) return <div>Error loading history</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h2>Referral Unlock History</h2>
      <ul>
        {data.map((entry, i) => (
          <li key={i}>
            {entry.unlockedFeature} via {entry.source} on {new Date(entry.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}