import { isAdmin } from '../../../lib/auth'

export default async function handler(req, res) {
  if (!isAdmin(req)) return res.status(403).json({ error: 'Unauthorized' })

  const history = [
    { content: 'Welcome to Aura Harvest!' },
    { content: 'Referral unlocks now live.' },
  ]

  res.status(200).json(history)
}