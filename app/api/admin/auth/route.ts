import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { passcode } = await req.json();
    const adminKey = process.env.ADMIN_SECRET_KEY || 'benton2026!admin';

    if (passcode === adminKey) {
      return NextResponse.json({
        success: true,
        token: 'bnt_adm_auth_' + Buffer.from(Date.now().toString()).toString('base64')
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid administrative security passcode' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Authentication error' },
      { status: 500 }
    );
  }
}
