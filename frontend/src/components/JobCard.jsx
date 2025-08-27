import Link from "next/link";
import AdSlot from "./AdSlot";

export default function JobCard({ job }) {
  const preview = (job.description || "").slice(0, 140);
  return (
    <div className="card">
      <h3>{job.title}</h3>
      <p style={{ color: "var(--muted)" }}>{preview}...</p>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {job.tags?.map(t => <span key={t} className="badge">{t}</span>)}
      </div>
      <AdSlot context={{ tags: job.tags, adIntensity: job.adIntensity }} />
      <Link className="btn" href={`/jobs/${job._id}`}>View</Link>
    </div>
  );
}
