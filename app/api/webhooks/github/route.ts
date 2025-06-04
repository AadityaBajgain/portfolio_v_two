import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import crypto from 'crypto';

const GITHUB_APP_SECRET = process.env.GITHUB_APP_WEBHOOK_SECRET!;
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET() {
  try {
    const data = await redis.get('latest-push');
    return NextResponse.json({
      ready: true,
      data: data ? JSON.parse(data as string) : null
    });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-hub-signature-256');
    const event = req.headers.get('x-github-event');

    console.log('Event type:', event);
    console.log('Signature:', signature);

    if (!signature) {
      console.error('No signature found');
      return NextResponse.json({ error: 'No signature' }, { status: 401 });
    }

    // Verify webhook signature
    const hmac = crypto.createHmac('sha256', GITHUB_APP_SECRET);
    const digest = `sha256=${hmac.update(rawBody).digest('hex')}`;
    
    if (signature !== digest) {
      console.error('Invalid signature');
      console.log('Received:', signature);
      console.log('Expected:', digest);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);

    // Handle push events
    if (event === 'push' && payload?.head_commit) {
      const pushInfo = {
        repo: payload.repository.full_name,
        message: payload.head_commit.message,
        time: payload.head_commit.timestamp,
        url: payload.head_commit.url,
        branch: payload.ref.replace('refs/heads/', ''),
        installation: payload.installation.id
      };

      // Store in Redis with JSON.stringify
      await redis.set('latest-push', JSON.stringify(pushInfo));
      console.log('✅ Stored push info:', pushInfo);

      return NextResponse.json({ 
        status: 'Success', 
        data: pushInfo 
      });
    }

    // Handle installation events
    if (event === 'installation' || event === 'installation_repositories') {
      console.log('Installation event received:', payload.action);
      return NextResponse.json({ 
        status: 'Success', 
        action: payload.action 
      });
    }

    return NextResponse.json({ 
      status: 'Ignored', 
      event 
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { 
      status: 500 
    });
  }
}
