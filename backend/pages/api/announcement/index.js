import { isAdmin } from '../../../lib/auth'

export default async function handler(req, res) {
  if (!isAdmin(req)) return res.status(403).json({ error: 'Unauthorized' })

  const { message } = req.body
  // Save to DB or broadcast via Resend
  res.status(200).json({ success: true })
}