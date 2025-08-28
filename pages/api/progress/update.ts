import dbConnect from '@/lib/dbConnect';
import UserProgress from '@/lib/models/UserProgress';

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === 'POST') {
    const { userId, onboardingStep, resumeStatus, jobCompletion } = req.body;
    const progress = await UserProgress.findOneAndUpdate(
      { userId },
      { onboardingStep, resumeStatus, jobCompletion, lastUpdated: new Date() },
      { upsert: true, new: true }
    );
    return res.status(200).json(progress);
  }
  res.status(405).end();
}