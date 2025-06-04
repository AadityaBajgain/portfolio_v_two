import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import { Redis } from '@upstash/redis';

const GITHUB_SECRET = process.env.GITHUB_WEBHOOK_SECRET!;
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

function verifySignature(req: NextApiRequest, body: string) {
  const signature = req.headers['x-hub-signature-256'] as string;
  const hmac = crypto.createHmac('sha256', GITHUB_SECRET);
  const digest = 'sha256=' + hmac.update(body).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  let body = '';
  req.on('data', (chunk) => { body += chunk; });
  req.on('end', async () => {
    if (!verifySignature(req, body)) {
      return res.status(401).end('Invalid signature');
    }

    const payload = JSON.parse(body);
    if (payload && payload.head_commit) {
      const pushInfo = {
        repo: payload.repository.full_name,
        message: payload.head_commit.message,
        time: payload.head_commit.timestamp,
        url: payload.head_commit.url,
      };

      // ✅ Save to Upstash Redis
      await redis.set('latest-push', pushInfo);
      console.log('Saved to Redis:', pushInfo);
    }

    res.status(200).end('Webhook received');
  });
}
