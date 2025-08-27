import useSWR from "swr";
import axios from "axios";
import JobCard from "../../src/components/JobCard";

const fetcher = url => axios.get(url).then(r => r.data);
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function Jobs() {
  const { data: jobs } = useSWR(`${API}/api/jobs`, fetcher);
  return (
    <div>
      <h2>Jobs</h2>
      <p style={{ color: "var(--muted)" }}>Partial reveal: snippets shown. View full details after ad view, referral unlock, or slot use.</p>
      <div style={{ display: "grid", gap: 12 }}>
        {jobs?.map(j => <JobCard key={j._id} job={j} />)}
      </div>
    </div>
  );
}
