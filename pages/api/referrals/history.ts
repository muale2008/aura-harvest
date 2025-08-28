import dbConnect from '@/lib/dbConnect';
import ReferralUnlock from '@/lib/models/ReferralUnlock';

export default async function handler(req, res) {
  await dbConnect();
  const { userId } = req.query;
  const history = await ReferralUnlock.find({ userId }).sort({ timestamp: -1 });
  res.status(200).json(history);
}