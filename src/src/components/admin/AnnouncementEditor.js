import { useState, useEffect } from 'react'
import { marked } from 'marked'

export default function AnnouncementEditor() {
  const [message, setMessage] = useState('')
  const [history, setHistory] = useState([])

  const handleSend = async () => {
    await fetch('/api/announcement', {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: { 'Content-Type': 'application/json' },
    })
  }

  useEffect(() => {
    fetch('/api/announcement/history')
      .then(res => res.json())
      .then(data => setHistory(data))
  }, [])

  return (
    <div className="mb-6">
      <h2 className="font-semibold">Announcements</h2>
      <textarea placeholder="Write your message…" onChange={e => setMessage(e.target.value)} />
      <button onClick={handleSend}>Send Announcement</button>

      <div className="mt-4">
        <h3 className="font-medium">History</h3>
        {history.map((msg, i) => (
          <div key={i} dangerouslySetInnerHTML={{ __html: marked(msg.content) }} />
        ))}
      </div>
    </div>
  )
}