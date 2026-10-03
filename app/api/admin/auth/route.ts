import { NextResponse } from 'next/server';
import { checkPasscode, isAdminConfigured, issueAdminToken } from '@/lib/adminAuth';

export async function POST(req: Request) {
  if (!isAdminConfigured()) {
    console.error('Admin login attempted but ADMIN_SECRET_KEY is not set.');
    return NextResponse.json(
      { success: false, error: 'Administrative access is not configured' },
      { status: 503 }
    );
  }

  try {
    const { passcode } = await req.json();

    if (checkPasscode(passcode)) {
      return NextResponse.json({ success: true, token: issueAdminToken() });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid administrative security passcode' },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Authentication error' },
      { status: 500 }
    );
  }
}
