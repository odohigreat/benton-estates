import fs from 'fs';
import path from 'path';
import { DatabaseSync } from 'node:sqlite';

const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'benton.db');
let dbInstance: DatabaseSync | null = null;

export function getDb(): DatabaseSync {
  if (!dbInstance) {
    dbInstance = new DatabaseSync(dbPath);
    initSchema(dbInstance);
  }
  return dbInstance;
}

function initSchema(db: DatabaseSync) {
  db.exec(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS contact_enquiries (
      id TEXT PRIMARY KEY,
      reference_id TEXT UNIQUE,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      enquiry_type TEXT NOT NULL,
      property_of_interest TEXT,
      message TEXT NOT NULL,
      consent INTEGER DEFAULT 1,
      status TEXT DEFAULT 'NEW',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS realtor_applications (
      id TEXT PRIMARY KEY,
      application_ref TEXT UNIQUE,
      full_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      city_state TEXT NOT NULL,
      residential_address TEXT NOT NULL,
      is_realtor TEXT NOT NULL,
      experience TEXT NOT NULL,
      current_company TEXT,
      role TEXT NOT NULL,
      areas_operate TEXT NOT NULL,
      other_area TEXT,
      properties_closed TEXT NOT NULL,
      strongest_skill TEXT NOT NULL,
      main_lead_source TEXT NOT NULL,
      available_inspections TEXT NOT NULL,
      instagram TEXT,
      facebook TEXT,
      tiktok TEXT,
      linkedin_other TEXT,
      why_partner TEXT NOT NULL,
      hopes_to_achieve TEXT NOT NULL,
      heard_about_us TEXT NOT NULL,
      heard_about_us_other TEXT,
      means_of_id TEXT NOT NULL,
      id_number TEXT NOT NULL,
      next_of_kin_name TEXT NOT NULL,
      next_of_kin_phone TEXT NOT NULL,
      declaration_agreed INTEGER DEFAULT 1,
      signature_name TEXT NOT NULL,
      signature_date TEXT NOT NULL,
      realtor_id TEXT,
      date_registered TEXT,
      assigned_manager TEXT,
      status TEXT DEFAULT 'Pending',
      admin_notes TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS elevation_subscriptions (
      id TEXT PRIMARY KEY,
      subscription_ref TEXT UNIQUE,
      title TEXT NOT NULL,
      surname TEXT NOT NULL,
      other_names TEXT NOT NULL,
      spouse_name TEXT,
      address TEXT NOT NULL,
      dob TEXT NOT NULL,
      gender TEXT NOT NULL,
      marital_status TEXT NOT NULL,
      nationality TEXT NOT NULL,
      occupation TEXT,
      employer_name TEXT,
      nature_of_business TEXT,
      years_of_employment TEXT,
      country_of_residence TEXT,
      language_spoken TEXT,
      email TEXT NOT NULL,
      other_income TEXT,
      mobile_number TEXT NOT NULL,
      id_type TEXT NOT NULL,
      is_pep TEXT NOT NULL,
      pep_category TEXT,
      nok_name TEXT NOT NULL,
      nok_address TEXT NOT NULL,
      nok_phone TEXT NOT NULL,
      nok_email TEXT,
      plot_type TEXT NOT NULL,
      number_of_plots INTEGER DEFAULT 1,
      plot_size TEXT DEFAULT '464 SQM',
      payment_plan TEXT NOT NULL,
      is_corner_piece INTEGER DEFAULT 0,
      declaration_name TEXT NOT NULL,
      declaration_date TEXT NOT NULL,
      signature_data TEXT NOT NULL,
      referral_name TEXT,
      referral_date TEXT,
      referral_phone TEXT,
      referral_email TEXT,
      terms_version TEXT DEFAULT 'v1.0-2026',
      terms_accepted INTEGER DEFAULT 1,
      acceptance_signature TEXT NOT NULL,
      acceptance_date TEXT NOT NULL,
      status TEXT DEFAULT 'Pending',
      admin_notes TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS properties (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE,
      name TEXT NOT NULL,
      tagline TEXT NOT NULL,
      location TEXT NOT NULL,
      state TEXT DEFAULT 'Delta State',
      category TEXT NOT NULL,
      price REAL NOT NULL,
      price_formatted TEXT NOT NULL,
      price_note TEXT,
      plot_size TEXT DEFAULT '464 SQM',
      title_type TEXT NOT NULL,
      is_featured INTEGER DEFAULT 0,
      status TEXT DEFAULT 'AVAILABLE',
      description TEXT NOT NULL,
      highlights TEXT NOT NULL,
      features TEXT NOT NULL,
      image TEXT NOT NULL,
      gallery TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  seedProperties(db);
}

function seedProperties(db: DatabaseSync) {
  const countRow = db.prepare('SELECT COUNT(*) as count FROM properties').get() as { count: number };
  if (countRow && countRow.count > 0) {
    return;
  }

  const now = new Date().toISOString();

  const insert = db.prepare(`
    INSERT INTO properties (
      id, slug, name, tagline, location, state, category, price, price_formatted,
      price_note, plot_size, title_type, is_featured, status, description,
      highlights, features, image, gallery, created_at, updated_at
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?
    )
  `);

  // 1. Elevation Estate, Ekrerahwe
  insert.run(
    'prop-elevation-estate',
    'elevation-estate',
    'Elevation Estate, Ekrerahwe',
    'Own a piece of mind in a fast rising investment',
    'Ekrerahwe, Ughelli North LGA',
    'Delta State',
    'LAND',
    1195000,
    '₦1,195,000',
    'Outright payment per 464 SQM plot (Installment options: 3, 6, or 12 months)',
    '464 SQM',
    'Registered Survey & Deed of Assignment',
    1,
    'SELLING FAST',
    'Elevation Estate is a prime undeveloped residential and commercial land development located in Ekrerahwe, Ughelli North Local Government Area of Delta State. Developed by Benton Homes and Development Limited, the estate is completely free from all known government encumbrances or adverse claims, features motorable road access, and is situated in a high-growth appreciation corridor.',
    JSON.stringify([
      'Registered Survey & Deed of Assignment',
      'Free from all adverse claims and government encumbrances',
      'Immediate motorable road access',
      'Physical allocation upon completion of payment',
      'Fencing and estate infrastructure in progress'
    ]),
    JSON.stringify([
      '100% Dry Land',
      'Standard 464 SQM Plots',
      'Residential & Commercial Zoning (Commercial +10%)',
      'Corner Piece Plots (Attracts +10%)',
      'Flexible 3, 6 & 12 Month Payment Plans',
      'Transfer documentation with developer approval'
    ]),
    '/images/elevation-estate.jpg',
    JSON.stringify(['/images/elevation-estate.jpg', '/images/hero.jpg']),
    now,
    now
  );

  // 2. Benton Crest Residences
  insert.run(
    'prop-benton-crest',
    'benton-crest-residences',
    'Benton Crest Luxury Scheme',
    'Sample Development • Upcoming Residential Scheme',
    'Effurun / Warri Corridor',
    'Delta State',
    'RESIDENTIAL',
    65000000,
    'Price on Request',
    'Proposed 4/5 Bedroom contemporary duplex layouts',
    '4/5 Bedroom Duplex Layouts',
    'Governor’s Consent / C of O in Process',
    1,
    'COMING SOON',
    'An upcoming exclusive residential development crafted for high-comfort living, featuring modern architectural aesthetics, perimeter security, and planned underground drainage.',
    JSON.stringify([
      'Sample Development Scheme for Planning & Registration',
      'Modern open-concept architectural duplex designs',
      '24/7 Gated security & access control',
      'High capital appreciation corridor'
    ]),
    JSON.stringify([
      'All En-Suite Bedrooms',
      'Smart Home Ready',
      'Dedicated Utility Transformer',
      'Paved Estate Access Roads'
    ]),
    '/images/modern-duplex.jpg',
    JSON.stringify(['/images/modern-duplex.jpg', '/images/hero.jpg']),
    now,
    now
  );

  // 3. Benton Commercial Corridor
  insert.run(
    'prop-commercial-hub',
    'benton-commercial-plots',
    'Benton Commercial Corridor',
    'Sample Development • Strategic Commercial Scheme',
    'Airport Junction / Sapele Road Axis, Effurun',
    'Delta State',
    'COMMERCIAL',
    4500000,
    '₦4,500,000',
    'Commercial plots with high thoroughfare visibility',
    '928 SQM (Double Plot)',
    'Registered Survey & Deed of Assignment',
    1,
    'AVAILABLE',
    'Strategically situated commercial plots tailored for warehousing, enterprise offices, shopping plazas, and logistics centers along the bustling Sapele Road / Airport corridor.',
    JSON.stringify([
      'Sample Development Scheme',
      'High-traffic commercial corridor',
      'Dual road access for heavy vehicles',
      'Instant documentation on full payment'
    ]),
    JSON.stringify([
      '928 SQM Commercial Parcel',
      'Heavy vehicle accessible',
      'Grid proximity',
      'Direct title transfer'
    ]),
    '/images/hero.jpg',
    JSON.stringify(['/images/hero.jpg', '/images/elevation-estate.jpg']),
    now,
    now
  );
}

// Data Access Methods
export const dbRepo = {
  // Contact Enquiries
  createEnquiry(data: {
    fullName: string;
    email: string;
    phone: string;
    enquiryType: string;
    propertyOfInterest?: string;
    message: string;
    consent: boolean;
  }) {
    const db = getDb();
    const id = 'enq_' + Math.random().toString(36).substring(2, 9);
    const referenceId = 'BNT-ENQ-' + Math.floor(100000 + Math.random() * 900000);
    const now = new Date().toISOString();

    const stmt = db.prepare(`
      INSERT INTO contact_enquiries (
        id, reference_id, full_name, email, phone, enquiry_type,
        property_of_interest, message, consent, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'NEW', ?, ?)
    `);

    stmt.run(
      id,
      referenceId,
      data.fullName,
      data.email,
      data.phone,
      data.enquiryType,
      data.propertyOfInterest || null,
      data.message,
      data.consent ? 1 : 0,
      now,
      now
    );

    return { id, referenceId };
  },

  listEnquiries() {
    const db = getDb();
    return db.prepare('SELECT * FROM contact_enquiries ORDER BY created_at DESC').all();
  },

  updateEnquiryStatus(id: string, status: string) {
    const db = getDb();
    const now = new Date().toISOString();
    db.prepare('UPDATE contact_enquiries SET status = ?, updated_at = ? WHERE id = ?').run(status, now, id);
  },

  // Realtor Applications
  createRealtorApplication(data: {
    fullName: string;
    phone: string;
    email: string;
    cityState: string;
    residentialAddress: string;
    isRealtor: string;
    experience: string;
    currentCompany?: string;
    role: string;
    areasOperate: string;
    otherArea?: string;
    propertiesClosed: string;
    strongestSkill: string;
    mainLeadSource: string;
    availableInspections: string;
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    linkedinOther?: string;
    whyPartner: string;
    hopesToAchieve: string;
    heardAboutUs: string;
    heardAboutUsOther?: string;
    meansOfId: string;
    idNumber: string;
    nextOfKinName: string;
    nextOfKinPhone: string;
    declarationAgreed: boolean;
    signatureName: string;
    signatureDate: string;
  }) {
    const db = getDb();
    const id = 'realtor_' + Math.random().toString(36).substring(2, 9);
    const applicationRef = 'BNT-R-' + Math.floor(10000 + Math.random() * 90000);
    const now = new Date().toISOString();

    const stmt = db.prepare(`
      INSERT INTO realtor_applications (
        id, application_ref, full_name, phone, email, city_state, residential_address,
        is_realtor, experience, current_company, role, areas_operate, other_area,
        properties_closed, strongest_skill, main_lead_source, available_inspections,
        instagram, facebook, tiktok, linkedin_other, why_partner, hopes_to_achieve,
        heard_about_us, heard_about_us_other, means_of_id, id_number,
        next_of_kin_name, next_of_kin_phone, declaration_agreed, signature_name,
        signature_date, status, created_at, updated_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, 'Pending', ?, ?
      )
    `);

    stmt.run(
      id,
      applicationRef,
      data.fullName,
      data.phone,
      data.email,
      data.cityState,
      data.residentialAddress,
      data.isRealtor,
      data.experience,
      data.currentCompany || null,
      data.role,
      data.areasOperate,
      data.otherArea || null,
      data.propertiesClosed,
      data.strongestSkill,
      data.mainLeadSource,
      data.availableInspections,
      data.instagram || null,
      data.facebook || null,
      data.tiktok || null,
      data.linkedinOther || null,
      data.whyPartner,
      data.hopesToAchieve,
      data.heardAboutUs,
      data.heardAboutUsOther || null,
      data.meansOfId,
      data.idNumber,
      data.nextOfKinName,
      data.nextOfKinPhone,
      data.declarationAgreed ? 1 : 0,
      data.signatureName,
      data.signatureDate,
      now,
      now
    );

    return { id, applicationRef };
  },

  listRealtors() {
    const db = getDb();
    return db.prepare('SELECT * FROM realtor_applications ORDER BY created_at DESC').all();
  },

  updateRealtorStatus(id: string, status: string, assignedManager?: string, adminNotes?: string) {
    const db = getDb();
    const now = new Date().toISOString();
    db.prepare(`
      UPDATE realtor_applications 
      SET status = ?, 
          assigned_manager = COALESCE(?, assigned_manager),
          admin_notes = COALESCE(?, admin_notes),
          updated_at = ? 
      WHERE id = ?
    `).run(status, assignedManager || null, adminNotes || null, now, id);
  },

  // Elevation Subscriptions
  createElevationSubscription(data: {
    title: string;
    surname: string;
    otherNames: string;
    spouseName?: string;
    address: string;
    dob: string;
    gender: string;
    maritalStatus: string;
    nationality: string;
    occupation?: string;
    employerName?: string;
    natureOfBusiness?: string;
    yearsOfEmployment?: string;
    countryOfResidence?: string;
    languageSpoken?: string;
    email: string;
    otherIncome?: string;
    mobileNumber: string;
    idType: string;
    isPep: string;
    pepCategory?: string;
    nokName: string;
    nokAddress: string;
    nokPhone: string;
    nokEmail?: string;
    plotType: string;
    numberOfPlots: number;
    plotSize: string;
    paymentPlan: string;
    isCornerPiece: boolean;
    declarationName: string;
    declarationDate: string;
    signatureData: string;
    referralName?: string;
    referralDate?: string;
    referralPhone?: string;
    referralEmail?: string;
    termsVersion: string;
    termsAccepted: boolean;
    acceptanceSignature: string;
    acceptanceDate: string;
  }) {
    const db = getDb();
    const id = 'sub_' + Math.random().toString(36).substring(2, 9);
    const subscriptionRef = 'BNT-SUB-' + Math.floor(100000 + Math.random() * 900000);
    const now = new Date().toISOString();

    const stmt = db.prepare(`
      INSERT INTO elevation_subscriptions (
        id, subscription_ref, title, surname, other_names, spouse_name, address,
        dob, gender, marital_status, nationality, occupation, employer_name,
        nature_of_business, years_of_employment, country_of_residence, language_spoken,
        email, other_income, mobile_number, id_type, is_pep, pep_category,
        nok_name, nok_address, nok_phone, nok_email,
        plot_type, number_of_plots, plot_size, payment_plan, is_corner_piece,
        declaration_name, declaration_date, signature_data,
        referral_name, referral_date, referral_phone, referral_email,
        terms_version, terms_accepted, acceptance_signature, acceptance_date,
        status, created_at, updated_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?,
        'Pending', ?, ?
      )
    `);

    stmt.run(
      id,
      subscriptionRef,
      data.title,
      data.surname,
      data.otherNames,
      data.spouseName || null,
      data.address,
      data.dob,
      data.gender,
      data.maritalStatus,
      data.nationality,
      data.occupation || null,
      data.employerName || null,
      data.natureOfBusiness || null,
      data.yearsOfEmployment || null,
      data.countryOfResidence || null,
      data.languageSpoken || null,
      data.email,
      data.otherIncome || null,
      data.mobileNumber,
      data.idType,
      data.isPep,
      data.pepCategory || null,
      data.nokName,
      data.nokAddress,
      data.nokPhone,
      data.nokEmail || null,
      data.plotType,
      data.numberOfPlots,
      data.plotSize,
      data.paymentPlan,
      data.isCornerPiece ? 1 : 0,
      data.declarationName,
      data.declarationDate,
      data.signatureData,
      data.referralName || null,
      data.referralDate || null,
      data.referralPhone || null,
      data.referralEmail || null,
      data.termsVersion,
      data.termsAccepted ? 1 : 0,
      data.acceptanceSignature,
      data.acceptanceDate,
      now,
      now
    );

    return { id, subscriptionRef };
  },

  listElevationSubscriptions() {
    const db = getDb();
    return db.prepare('SELECT * FROM elevation_subscriptions ORDER BY created_at DESC').all();
  },

  updateSubscriptionStatus(id: string, status: string, adminNotes?: string) {
    const db = getDb();
    const now = new Date().toISOString();
    db.prepare(`
      UPDATE elevation_subscriptions 
      SET status = ?, 
          admin_notes = COALESCE(?, admin_notes),
          updated_at = ? 
      WHERE id = ?
    `).run(status, adminNotes || null, now, id);
  },

  // Properties
  listProperties() {
    const db = getDb();
    return db.prepare('SELECT * FROM properties ORDER BY is_featured DESC, created_at DESC').all();
  },

  getPropertyBySlug(slug: string) {
    const db = getDb();
    return db.prepare('SELECT * FROM properties WHERE slug = ?').get(slug);
  }
};
