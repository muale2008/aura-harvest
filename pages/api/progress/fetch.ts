import type { NextApiRequest, NextApiResponse } from 'next';
import UserProgress from '@/lib/models/UserProgress';
import dbConnect from '@/lib/dbConnect';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { userId } = req.query;

  const progress = await UserProgress.findOne({ userId });

  res.status(200).json(progress);
}