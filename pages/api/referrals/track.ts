import dbConnect from '@/lib/dbConnect';
import ReferralUnlock from '@/lib/models/ReferralUnlock';

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === 'POST') {
    const { userId, referrerId, unlockedFeature, source } = req.body;
    const unlock = new ReferralUnlock({ userId, referrerId, unlockedFeature, source });
    await unlock.save();
    return res.status(201).json({ success: true });
  }
  res.status(405).end();
}