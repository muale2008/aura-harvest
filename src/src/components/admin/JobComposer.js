import { useState } from 'react'

export default function JobComposer() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')

  const handleSubmit = async () => {
    await fetch('/api/jobs', {
      method: 'POST',
      body: JSON.stringify({ title, description, tags: tags.split(',') }),
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return (
    <div className="mb-6">
      <h2 className="font-semibold">Post a Job</h2>
      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Description" onChange={e => setDescription(e.target.value)} />
      <input placeholder="Tags (comma-separated)" onChange={e => setTags(e.target.value)} />
      <button onClick={handleSubmit}>Publish</button>
    </div>
  )
}