import dbConnect from '@/lib/dbConnect';
import UserProgress from '@/lib/models/UserProgress';

export default async function handler(req, res) {
  await dbConnect();
  const { userId } = req.query;
  const progress = await UserProgress.findOne({ userId });
  res.status(200).json(progress);
}