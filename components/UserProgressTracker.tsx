import axios from 'axios';
import useSWR from 'swr';

interface UserProgressTrackerProps {
  userId: string;
}

export default function UserProgressTracker({ userId }: UserProgressTrackerProps) {
  const { data, error } = useSWR(
    `/api/progress?userId=${userId}`,
    url => axios.get(url).then(res => res.data)
  );

  if (error) return <div>Error loading progress</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h2>User Progress</h2>
      <ul>
        {data.milestones.map((milestone: any, index: number) => (
          <li key={index}>{milestone.label}</li>
        ))}
      </ul>
    </div>
  );
}