import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET!;

function isSignatureValid(signature: string, payload: string) {
  const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
  const digest = 'sha256=' + hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get('x-hub-signature-256') || '';

  if (!isSignatureValid(signature, rawBody)) {
    return new NextResponse('Invalid signature', { status: 401 });
  }

  const event = req.headers.get('x-github-event');
  const payload = JSON.parse(rawBody);

  if (event === 'push') {
    console.log('📦 Push to:', payload.repository.full_name);
    // Optionally: Revalidate ISR pages or update DB/cache here
  }

  return new NextResponse('ok', { status: 200 });
}
