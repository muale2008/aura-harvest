import dbConnect from '@/lib/dbConnect';
import MonetizationSettings from '@/lib/models/MonetizationSettings';

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === 'POST') {
    const { adEnabled, affiliateJobsEnabled, microPaymentsEnabled, updatedBy } = req.body;
    const settings = await MonetizationSettings.findOneAndUpdate(
      {},
      { adEnabled, affiliateJobsEnabled, microPaymentsEnabled, updatedBy, updatedAt: new Date() },
      { upsert: true, new: true }
    );
    return res.status(200).json(settings);
  }
  res.status(405).end();
}