import type { NextApiRequest, NextApiResponse } from 'next';
import UserProgress from '@/lib/models/UserProgress';
import dbConnect from '@/lib/dbConnect';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === 'POST') {
    const {
      userId,
      onboardingStep,
      resumeStatus,
      jobCompletion,
    } = req.body;

    // Your update logic here...
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}