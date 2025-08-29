import type { NextApiRequest, NextApiResponse } from 'next';
import ReferralUnlock from '@/lib/models/ReferralUnlock';
import dbConnect from '@/lib/dbConnect';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { userId } = req.query;

  const history = await ReferralUnlock.find({ userId }).sort({ timestamp: -1 });

  res.status(200).json(history);
}