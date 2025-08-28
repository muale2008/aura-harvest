import { isAdmin } from '../../../lib/auth'

export default async function handler(req, res) {
  if (!isAdmin(req)) return res.status(403).json({ error: 'Unauthorized' })

  if (req.method === 'GET') {
    return res.status(200).json({ enabled: true })
  }

  if (req.method === 'POST') {
    const { enabled } = req.body
    // Save to DB or config file
    return res.status(200).json({ success: true })
  }

  res.status(405).end()
}