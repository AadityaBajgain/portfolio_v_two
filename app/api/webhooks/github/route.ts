import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import crypto from 'crypto';
import { App } from 'octokit';

const GITHUB_SECRET = process.env.GITHUB_WEBHOOK_SECRET!;
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const app = new App({
  appId: process.env.GITHUB_APP_ID!,
  privateKey: process.env.GITHUB_APP_PRIVATE_KEY!,
  webhooks: {
    secret: GITHUB_SECRET,
  }
});

export async function GET() {
  try {
    const latestPush = await redis.get('latest-push');
    return NextResponse.json({
      success: true,
      data: latestPush ? JSON.parse(latestPush as string) : null
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-hub-signature-256') || '';
    const event = req.headers.get('x-github-event');

    // Verify webhook signature
    const hmac = crypto.createHmac('sha256', GITHUB_SECRET);
    const digest = 'sha256=' + hmac.update(rawBody).digest('hex');

    if (signature !== digest) {
      console.error('Invalid signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);

    // Handle push events
    if (event === 'push') {
      const pushInfo = {
        event_type: 'push',
        repo: payload.repository.full_name,
        branch: payload.ref.replace('refs/heads/', ''),
        commits: payload.commits.map((commit: any) => ({
          id: commit.id,
          message: commit.message,
          timestamp: commit.timestamp,
          url: commit.url,
          author: commit.author.name,
        })),
        head_commit: {
          id: payload.head_commit.id,
          message: payload.head_commit.message,
          timestamp: payload.head_commit.timestamp,
          url: payload.head_commit.url,
          author: payload.head_commit.author.name,
        },
        pusher: payload.pusher.name,
        timestamp: new Date().toISOString(),
      };

      // Store in Redis
      await redis.set('latest-push', JSON.stringify(pushInfo));
      
      // Store in a time-series list (keep last 10 pushes)
      await redis.lpush('push-history', JSON.stringify(pushInfo));
      await redis.ltrim('push-history', 0, 9);

      console.log('✅ Push event stored:', pushInfo);
      
      return NextResponse.json({ 
        status: 'success', 
        message: 'Push event processed',
        data: pushInfo 
      });
    }

    // Handle other events
    return NextResponse.json({ 
      status: 'ignored', 
      message: `Event type: ${event} ignored` 
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ 
      error: 'Webhook processing failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { 
      status: 500 
    });
  }
}
