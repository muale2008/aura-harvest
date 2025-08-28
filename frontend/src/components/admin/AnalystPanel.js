import { useEffect, useState } from 'react'

export default function AnalyticsPanel() {
  const [stats, setStats] = useState({})

  useEffect(() => {
    fetch('/api/referral-stats')
      .then(res => res.json())
      .then(data => setStats(data))
  }, [])

  return (
    <div className="mb-6">
      <h2 className="font-semibold">Analytics</h2>
      <p>Views: 1,204</p>
      <p>Completions: 87</p>
      <p>Referral ROI: 3.2x</p>
      <p>Referral Unlocks: {stats.unlocks}</p>
      <p>Suspicious Attempts: {stats.abuseFlags}</p>
      <p>Top Referrer: {stats.topReferrer}</p>
    </div>
  )
}