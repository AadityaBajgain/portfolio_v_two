// pages/api/latest-push.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = await redis.get('latest-push');

  if (!data) {
    return res.status(404).json({ error: 'No push data found.' });
  }

  res.status(200).json(data);
}
