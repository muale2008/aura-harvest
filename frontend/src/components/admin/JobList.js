import { useEffect, useState } from 'react'
import AdComponent from '../ads/AdComponent'

export default function JobList() {
  const [jobs, setJobs] = useState([])
  const [showAds, setShowAds] = useState(false)

  useEffect(() => {
    fetch('/api/jobs')
      .then(res => res.json())
      .then(data => setJobs(data))

    fetch('/api/admin/ad-settings')
      .then(res => res.json())
      .then(data => setShowAds(data.enabled))
  }, [])

  const handleRepost = async (jobId) => {
    await fetch(`/api/jobs/${jobId}/repost`, { method: 'POST' })
  }

  return (
    <div className="mb-6">
      <h2 className="font-semibold">Job Listings</h2>
      {jobs.map(job => (
        <div key={job._id} className="border p-2 mb-2">
          <h3>{job.title}</h3>
          <p>Status: {job.status}</p>
          <button onClick={() => handleRepost(job._id)}>Repost</button>
        </div>
      ))}
      {showAds && <AdComponent />}
    </div>
  )
}