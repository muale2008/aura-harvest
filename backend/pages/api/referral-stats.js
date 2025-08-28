import { isAdmin } from '../../lib/auth'

export default async function handler(req, res) {
  if (!isAdmin(req)) return res.status(403).json({ error: 'Unauthorized' })

  const stats = {
    unlocks: 42,
    abuseFlags: 3,
    topReferrer: 'ref123',
  }

  res.status(200).json(stats)
}