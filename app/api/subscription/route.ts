import { NextResponse } from 'next/server';
import { z } from 'zod';
import { dbRepo } from '@/lib/db';

const subscriptionSchema = z.object({
  // Section 1: Subscriber Details
  title: z.string().min(1, 'Title is required'),
  surname: z.string().min(2, 'Surname is required'),
  otherNames: z.string().min(2, 'Other names are required'),
  spouseName: z.string().optional().default(''),
  address: z.string().min(5, 'Residential address is required'),
  dob: z.string().min(6, 'Date of birth is required'),
  gender: z.string().min(1, 'Gender is required'),
  maritalStatus: z.string().min(1, 'Marital status is required'),
  nationality: z.string().min(2, 'Nationality is required'),
  occupation: z.string().optional().default(''),
  employerName: z.string().optional().default(''),
  natureOfBusiness: z.string().optional().default(''),
  yearsOfEmployment: z.string().optional().default(''),
  countryOfResidence: z.string().optional().default('Nigeria'),
  languageSpoken: z.string().optional().default('English'),
  email: z.string().email('Valid email address is required'),
  otherIncome: z.string().optional().default(''),
  mobileNumber: z.string().min(7, 'Mobile phone number is required'),
  idType: z.string().min(1, 'Identification type is required'),
  isPep: z.string().min(1, 'Please indicate PEP status'),
  pepCategory: z.string().optional().default(''),

  // Section 2: Next of Kin
  nokName: z.string().min(2, 'Next of kin name is required'),
  nokAddress: z.string().min(5, 'Next of kin address is required'),
  nokPhone: z.string().min(7, 'Next of kin phone number is required'),
  nokEmail: z.string().optional().default(''),

  // Section 3: Plot Declaration
  plotType: z.string().min(1, 'Plot type is required'),
  numberOfPlots: z.number().min(1, 'Must subscribe to at least 1 plot'),
  plotSize: z.string().default('464 SQM'),
  paymentPlan: z.string().min(1, 'Payment plan is required'),
  isCornerPiece: z.boolean().default(false),
  declarationName: z.string().min(2, 'Subscriber declaration name is required'),
  declarationDate: z.string().min(4, 'Declaration date is required'),
  signatureData: z.string().min(2, 'Digital signature confirmation is required'),

  // Referral Details
  referralName: z.string().optional().default(''),
  referralDate: z.string().optional().default(''),
  referralPhone: z.string().optional().default(''),
  referralEmail: z.string().optional().default(''),

  // Terms Acceptance
  termsVersion: z.string().default('v1.0-2026'),
  termsAccepted: z.boolean().refine(v => v === true, 'You must accept the terms and conditions'),
  acceptanceSignature: z.string().min(2, 'Subscriber signature acknowledgement is required'),
  acceptanceDate: z.string().min(4, 'Acceptance date is required')
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = subscriptionSchema.parse(body);

    const result = dbRepo.createElevationSubscription({
      title: validated.title,
      surname: validated.surname,
      otherNames: validated.otherNames,
      spouseName: validated.spouseName,
      address: validated.address,
      dob: validated.dob,
      gender: validated.gender,
      maritalStatus: validated.maritalStatus,
      nationality: validated.nationality,
      occupation: validated.occupation,
      employerName: validated.employerName,
      natureOfBusiness: validated.natureOfBusiness,
      yearsOfEmployment: validated.yearsOfEmployment,
      countryOfResidence: validated.countryOfResidence,
      languageSpoken: validated.languageSpoken,
      email: validated.email,
      otherIncome: validated.otherIncome,
      mobileNumber: validated.mobileNumber,
      idType: validated.idType,
      isPep: validated.isPep,
      pepCategory: validated.pepCategory,
      nokName: validated.nokName,
      nokAddress: validated.nokAddress,
      nokPhone: validated.nokPhone,
      nokEmail: validated.nokEmail,
      plotType: validated.plotType,
      numberOfPlots: validated.numberOfPlots,
      plotSize: validated.plotSize,
      paymentPlan: validated.paymentPlan,
      isCornerPiece: validated.isCornerPiece,
      declarationName: validated.declarationName,
      declarationDate: validated.declarationDate,
      signatureData: validated.signatureData,
      referralName: validated.referralName,
      referralDate: validated.referralDate,
      referralPhone: validated.referralPhone,
      referralEmail: validated.referralEmail,
      termsVersion: validated.termsVersion,
      termsAccepted: validated.termsAccepted,
      acceptanceSignature: validated.acceptanceSignature,
      acceptanceDate: validated.acceptanceDate
    });

    return NextResponse.json({
      success: true,
      message: 'Your Elevation Estate subscription has been registered successfully.',
      subscriptionRef: result.subscriptionRef
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.issues[0]?.message || 'Validation error in subscription form' },
        { status: 400 }
      );
    }
    console.error('Subscription error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error processing estate subscription. Please try again.' },
      { status: 500 }
    );
  }
}
