import { NextResponse } from 'next/server';
import { z } from 'zod';
import { dbRepo } from '@/lib/db';

const realtorSchema = z.object({
  // Section 1
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().min(7, 'Phone/WhatsApp number is required'),
  email: z.string().email('Valid email address is required'),
  cityState: z.string().min(2, 'City/State is required'),
  residentialAddress: z.string().min(5, 'Residential address is required'),

  // Section 2
  isRealtor: z.string().min(1, 'Please indicate if you are currently a realtor'),
  experience: z.string().min(1, 'Please select your experience level'),
  currentCompany: z.string().optional().default(''),
  role: z.string().min(1, 'Please select your role'),
  areasOperate: z.string().min(1, 'Please specify the areas where you operate'),
  otherArea: z.string().optional().default(''),

  // Section 3
  propertiesClosed: z.string().min(1, 'Please select property deals closed'),
  strongestSkill: z.string().min(1, 'Please select your strongest skill'),
  mainLeadSource: z.string().min(1, 'Please select your main lead source'),
  availableInspections: z.string().min(1, 'Please indicate inspection availability'),

  // Section 4
  instagram: z.string().optional().default(''),
  facebook: z.string().optional().default(''),
  tiktok: z.string().optional().default(''),
  linkedinOther: z.string().optional().default(''),

  // Section 5
  whyPartner: z.string().min(5, 'Please tell us why you want to partner with Benton Homes'),
  hopesToAchieve: z.string().min(1, 'Please select what you hope to achieve'),
  heardAboutUs: z.string().min(1, 'Please indicate how you heard about us'),
  heardAboutUsOther: z.string().optional().default(''),

  // Section 6
  meansOfId: z.string().min(1, 'Please select a means of identification'),
  idNumber: z.string().min(3, 'Please provide your ID number'),
  nextOfKinName: z.string().min(2, 'Next of kin / reference name is required'),
  nextOfKinPhone: z.string().min(7, 'Next of kin phone number is required'),

  // Section 7
  declarationAgreed: z.boolean().refine(v => v === true, 'You must accept the ethical declaration'),
  signatureName: z.string().min(2, 'Applicant typed signature is required'),
  signatureDate: z.string().min(4, 'Declaration date is required')
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = realtorSchema.parse(body);

    const result = dbRepo.createRealtorApplication({
      fullName: validated.fullName,
      phone: validated.phone,
      email: validated.email,
      cityState: validated.cityState,
      residentialAddress: validated.residentialAddress,
      isRealtor: validated.isRealtor,
      experience: validated.experience,
      currentCompany: validated.currentCompany,
      role: validated.role,
      areasOperate: validated.areasOperate,
      otherArea: validated.otherArea,
      propertiesClosed: validated.propertiesClosed,
      strongestSkill: validated.strongestSkill,
      mainLeadSource: validated.mainLeadSource,
      availableInspections: validated.availableInspections,
      instagram: validated.instagram,
      facebook: validated.facebook,
      tiktok: validated.tiktok,
      linkedinOther: validated.linkedinOther,
      whyPartner: validated.whyPartner,
      hopesToAchieve: validated.hopesToAchieve,
      heardAboutUs: validated.heardAboutUs,
      heardAboutUsOther: validated.heardAboutUsOther,
      meansOfId: validated.meansOfId,
      idNumber: validated.idNumber,
      nextOfKinName: validated.nextOfKinName,
      nextOfKinPhone: validated.nextOfKinPhone,
      declarationAgreed: validated.declarationAgreed,
      signatureName: validated.signatureName,
      signatureDate: validated.signatureDate
    });

    return NextResponse.json({
      success: true,
      message: 'Your Realtor Registration application has been submitted successfully.',
      applicationRef: result.applicationRef
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.issues[0]?.message || 'Validation error in submitted form' },
        { status: 400 }
      );
    }
    console.error('Realtor application error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error processing realtor application. Please check your entries and try again.' },
      { status: 500 }
    );
  }
}
