import useSWR from 'swr';
import axios from 'axios';

interface ReferralHistoryPanelProps {
  userId: string;
}

export default function ReferralHistoryPanel({ userId }: ReferralHistoryPanelProps) {
  const { data, error } = useSWR(
    `/api/referrals/history?userId=${userId}`,
    url => axios.get(url).then(res => res.data)
  );

  if (error) return <div>Error loading history</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h2>Referral History</h2>
      <ul>
        {data.map((referral: any, index: number) => (
          <li key={index}>{referral.email}</li>
        ))}
      </ul>
    </div>
  );
}