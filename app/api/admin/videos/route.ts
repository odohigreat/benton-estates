import { NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyAdminRequest } from '@/lib/adminAuth';
import { dbRepo } from '@/lib/db';
import { getYouTubeId, VIDEO_CATEGORIES } from '@/lib/videos';

const videoSchema = z.object({
  title: z.string().trim().min(1, 'Video title is required'),
  url: z.string().trim().min(1, 'YouTube URL is required').refine(url => getYouTubeId(url) !== null, 'Must be a valid YouTube link.'),
  category: z.enum(VIDEO_CATEGORIES, 'Choose a valid category'),
  publishedAt: z.iso.date('Choose a valid published date')
});
const idSchema = z.uuid('Invalid video ID');

const unauthorized = () => NextResponse.json({ error: 'Unauthorized administrative access' }, { status: 401 });

function failure(error: unknown, action: string) {
  if (error instanceof z.ZodError) {
    return NextResponse.json({ success: false, error: error.issues[0]?.message || 'Validation error' }, { status: 400 });
  }
  if (error instanceof Error && error.message === 'Record not found') {
    return NextResponse.json({ success: false, error: 'Video not found' }, { status: 404 });
  }
  console.error(`Admin videos ${action} error:`, error);
  return NextResponse.json({ success: false, error: `Error processing video ${action}` }, { status: 500 });
}

export async function GET(req: Request) {
  if (!verifyAdminRequest(req)) return unauthorized();
  try {
    return NextResponse.json({ success: true, data: await dbRepo.listAllVideos() });
  } catch (error) { return failure(error, 'load'); }
}

export async function POST(req: Request) {
  if (!verifyAdminRequest(req)) return unauthorized();
  try {
    const video = videoSchema.parse(await req.json());
    return NextResponse.json({ success: true, data: await dbRepo.createVideo(video), message: 'Video added' });
  } catch (error) { return failure(error, 'create'); }
}

export async function PATCH(req: Request) {
  if (!verifyAdminRequest(req)) return unauthorized();
  try {
    const { id, ...body } = await req.json();
    await dbRepo.updateVideo(idSchema.parse(id), videoSchema.parse(body));
    return NextResponse.json({ success: true, message: 'Video updated' });
  } catch (error) { return failure(error, 'update'); }
}

export async function DELETE(req: Request) {
  if (!verifyAdminRequest(req)) return unauthorized();
  try {
    await dbRepo.deleteVideo(idSchema.parse(new URL(req.url).searchParams.get('id')));
    return NextResponse.json({ success: true, message: 'Video deleted' });
  } catch (error) { return failure(error, 'delete'); }
}
