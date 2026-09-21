import { NextResponse } from 'next/server';
import { z } from 'zod';
import { dbRepo } from '@/lib/db';

const contactSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  enquiryType: z.string().min(1, 'Please select an enquiry type'),
  propertyOfInterest: z.string().optional(),
  message: z.string().min(5, 'Message must be at least 5 characters'),
  consent: z.boolean().refine(val => val === true, 'Consent is required to submit this enquiry')
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = contactSchema.parse(body);

    const result = dbRepo.createEnquiry({
      fullName: validated.fullName,
      email: validated.email,
      phone: validated.phone,
      enquiryType: validated.enquiryType,
      propertyOfInterest: validated.propertyOfInterest,
      message: validated.message,
      consent: validated.consent
    });

    return NextResponse.json({
      success: true,
      message: 'Your enquiry has been received successfully. A Benton representative will contact you shortly.',
      referenceId: result.referenceId
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.issues[0]?.message || 'Validation error' },
        { status: 400 }
      );
    }
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred while processing your request. Please try again.' },
      { status: 500 }
    );
  }
}
