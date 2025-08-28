import dbConnect from '@/lib/dbConnect';
import AdminLog from '@/lib/models/AdminLog';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const log = await AdminLog.create(req.body);
      return res.status(201).json(log);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create log' });
    }
  }

  if (req.method === 'GET') {
    try {
      const logs = await AdminLog.find({});
      return res.status(200).json(logs);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch logs' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
 res.status(405).end('Method Not Allowed');
}
