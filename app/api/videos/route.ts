import { NextResponse } from 'next/server';
import { dbRepo } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await dbRepo.listVideos();
    // Short CDN cache so admin changes appear within about a minute.
    return NextResponse.json({ success: true, data }, { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } });
  } catch (error) {
    console.error('Videos GET error:', error);
    return NextResponse.json({ success: false, error: 'Unable to load videos' }, { status: 500 });
  }
}
