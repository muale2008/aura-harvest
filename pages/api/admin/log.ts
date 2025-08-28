import dbConnect from '@/lib/dbConnect';
import AdminLog from '@/lib/models/AdminLog';

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === 'POST') {
    const { adminId, action, target, metadata } = req.body;
    const log = new AdminLog({ adminId, action, target, metadata });
    await log.save();
    return res.status(201).json({ success: true });
  }
  res.status(405).end();
}