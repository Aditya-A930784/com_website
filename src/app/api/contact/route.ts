import { NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';

import { getAdminDb } from '@/lib/firebase/admin';

type ContactRequestBody = {
  name?: unknown;
  mobile?: unknown;
  email?: unknown;
  message?: unknown;
};

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string) {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 5;
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) return false;

  record.count += 1;
  return true;
}

function cleanText(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function validateContactMessage(body: ContactRequestBody) {
  const name = cleanText(body.name);
  const mobile = cleanText(body.mobile);
  const email = cleanText(body.email);
  const message = cleanText(body.message);
  const errors: Record<string, string> = {};

  if (!name) errors.name = 'Name is required.';
  if (!/^\d{10}$/.test(mobile)) errors.mobile = 'Valid 10-digit mobile number is required.';
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Provide a valid email.';
  if (!message) errors.message = 'Message is required.';
  if (message.length > 2000) errors.message = 'Message must be 2000 characters or fewer.';

  return {
    data: { name, mobile, email, message },
    errors,
  };
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = (await request.json()) as ContactRequestBody;
    const { data, errors } = validateContactMessage(body);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { error: 'Please correct the highlighted fields.', errors },
        { status: 400 }
      );
    }

    const db = getAdminDb();
    const docRef = await db.collection('contactMessages').add({
      ...data,
      status: 'new',
      source: 'public-contact-page',
      ipAddress: ip,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      id: docRef.id,
      message: 'Contact message submitted successfully.',
    });
  } catch (error) {
    console.error('Error submitting contact message:', error);

    if (error instanceof Error && error.message.includes('Firebase Admin credentials')) {
      return NextResponse.json(
        { error: 'Contact service is not configured. Please try again later.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Unable to submit message. Please try again later.' },
      { status: 500 }
    );
  }
}
