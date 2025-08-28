import { isAdmin } from '../../../lib/auth'

export default async function handler(req, res) {
  if (!isAdmin(req)) return res.status(403).json({ error: 'Unauthorized' })

  const { feature, timestamp } = req.body
  console.log(`Blueprint synced: ${feature} at ${new Date(timestamp).toISOString()}`)
  res.status(200).json({ synced: true })
}