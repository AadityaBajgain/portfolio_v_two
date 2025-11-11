import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { randomUUID } from 'crypto';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const CONTACT_KEY = 'contact_messages';

const isEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.toLowerCase());

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = (body?.name || '').trim();
    const email = (body?.email || '').trim();
    const message = (body?.message || '').trim();

    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: 'Please provide your name (2-100 characters).' },
        { status: 400 }
      );
    }

    if (!isEmail(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (message.length < 10 || message.length > 1000) {
      return NextResponse.json(
        { error: 'Message should be between 10 and 1000 characters.' },
        { status: 400 }
      );
    }

    const entry = {
      id: randomUUID(),
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
    };

    await redis.lpush(CONTACT_KEY, JSON.stringify(entry));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form submission failed:', error);
    return NextResponse.json(
      { error: 'Unable to send your message right now. Please try again later.' },
      { status: 500 }
    );
  }
}
