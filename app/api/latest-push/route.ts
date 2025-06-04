import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET() {
  try {
    const data = await redis.get('latest-push');
    
    if (!data) {
      return NextResponse.json(
        { error: 'No push data found.' },
        { status: 404 }
      );
    }
    console.log("Latest push data:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Redis error:", error);
    return NextResponse.json(
      { error: 'Failed to fetch push data' },
      { status: 500 }
    );
  }
}