
import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import crypto from 'crypto';

const GITHUB_SECRET = process.env.GITHUB_WEBHOOK_SECRET!;
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET(){
  return Response.json({
    success: true,
    message: 'GitHub webhook endpoint is ready to receive POST requests.'
  })
}

export async function POST(req: Request) {
  const rawBody = await req.text();
  console.log('Raw body:', rawBody);
  const signature = req.headers.get('x-hub-signature-256') || '';

  const hmac = crypto.createHmac('sha256', GITHUB_SECRET);
  const digest = 'sha256=' + hmac.update(rawBody).digest('hex');

  const sigBuffer = Buffer.from(signature);
  const digestBuffer = Buffer.from(digest);

  console.log('Incoming signature:', signature);
console.log('Expected digest:', digest);

  if (sigBuffer.length !== digestBuffer.length || !crypto.timingSafeEqual(sigBuffer, digestBuffer)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  if (payload?.head_commit) {
    const pushInfo = {
      repo: payload.repository.full_name,
      message: payload.head_commit.message,
      time: payload.head_commit.timestamp,
      url: payload.head_commit.url,
    };

    await redis.set('latest-push', pushInfo);
    console.log('✅ Saved to Redis:', pushInfo);
  }

  return NextResponse.json({ status: 'Webhook received' });
}
