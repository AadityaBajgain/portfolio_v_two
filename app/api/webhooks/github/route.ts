import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import crypto from 'crypto';

const GITHUB_SECRET = process.env.GITHUB_WEBHOOK_SECRET!;
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});
export async function GET(){
  return Response.json({ message: 'This is a POST endpoint for GitHub webhooks.' }, { status: 200 });
}
export async function POST(req: Request) {
  console.log('🎯 Webhook received at:', new Date().toISOString());
  
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-hub-signature-256') || '';
    const event = req.headers.get('x-github-event');
    
    console.log('📦 Payload:', rawBody.slice(0, 200) + '...');
    console.log('🔑 Event Type:', event);
    console.log('🔐 Signature:', signature);
    // Verify signature
    const hmac = crypto.createHmac('sha256', GITHUB_SECRET);
    const digest = 'sha256=' + hmac.update(rawBody).digest('hex');
    
    if (signature !== digest) {
      console.error('❌ Invalid signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    if (event === 'push') {
      const payload = JSON.parse(rawBody);
      const pushInfo = {
        repo: payload.repository.full_name,
        message: payload.head_commit.message,
        time: new Date().toISOString(),
        url: payload.head_commit.url
      };

      await redis.set('latest-push', JSON.stringify(pushInfo));
      console.log('✅ Push event stored:', pushInfo);

      return NextResponse.json({ success: true, data: pushInfo });
    }

    return NextResponse.json({ status: 'ignored', event });

  } catch (error) {
    console.error('💥 Error:', error);
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 });
  }
}
