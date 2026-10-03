import { NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/adminAuth';
import { dbRepo } from '@/lib/db';

export async function GET(req: Request) {
  if (!verifyAdminRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized administrative access' }, { status: 401 });
  }

  const enquiries = dbRepo.listEnquiries();
  const realtors = dbRepo.listRealtors();
  const subscriptions = dbRepo.listElevationSubscriptions();
  const properties = dbRepo.listProperties();

  return NextResponse.json({
    success: true,
    data: {
      enquiries,
      realtors,
      subscriptions,
      properties
    }
  });
}

export async function PATCH(req: Request) {
  if (!verifyAdminRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized administrative access' }, { status: 401 });
  }

  try {
    const { action, id, status, assignedManager, adminNotes } = await req.json();

    if (action === 'update_realtor') {
      dbRepo.updateRealtorStatus(id, status, assignedManager, adminNotes);
      return NextResponse.json({ success: true, message: 'Realtor application updated' });
    }

    if (action === 'update_enquiry') {
      dbRepo.updateEnquiryStatus(id, status);
      return NextResponse.json({ success: true, message: 'Contact enquiry status updated' });
    }

    if (action === 'update_subscription') {
      dbRepo.updateSubscriptionStatus(id, status, adminNotes);
      return NextResponse.json({ success: true, message: 'Subscription status updated' });
    }

    return NextResponse.json({ error: 'Invalid action specified' }, { status: 400 });
  } catch (err) {
    console.error('Admin PATCH error:', err);
    return NextResponse.json({ error: 'Error processing admin update' }, { status: 500 });
  }
}
