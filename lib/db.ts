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

    CREATE TABLE IF NOT EXISTS agents (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      position TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      photo TEXT,
      bio TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  // Marketplace columns are added in place so existing databases upgrade without a reset.
  ensureColumn(db, 'properties', 'listing_type', "TEXT NOT NULL DEFAULT 'sale'");
  ensureColumn(db, 'properties', 'video_url', 'TEXT');
  ensureColumn(db, 'properties', 'agent_id', 'TEXT REFERENCES agents(id)');
  ensureColumn(db, 'properties', 'floor_plans', 'TEXT');
  ensureColumn(db, 'properties', 'image_caption', 'TEXT');

  seedProperties(db);
  seedAgents(db);
  seedAbujaListing(db);

  // Company line changed from +2348038357773 (October 2026).
  db.prepare("UPDATE agents SET phone = '+2348038535773' WHERE phone = '+2348038357773'").run();
}

// Details from the architectural drawings (Arc. Yemi O. Oladapo, sheets A01–A08); price and title still to be supplied.
function seedAbujaListing(db: DatabaseSync) {
  const now = new Date().toISOString();
  const listing = {
    slug: 'lugbe-4-bedroom-duplex-abuja',
    name: '4-Bedroom Duplex, Lugbe 1 Layout',
    tagline: 'Under construction • Three detached duplexes in Lugbe, Abuja',
    location: 'Lugbe 1 Layout, Cadastral Zone E30',
    state: 'Abuja',
    category: 'RESIDENTIAL',
    price: 0,
    price_formatted: 'Price on Request',
    price_note: 'Contact us for current pricing',
    plot_size: '4 Bedrooms · approx. 330 SQM plot',
    title_type: 'Title documentation to be published',
    status: 'UNDER CONSTRUCTION',
    description: 'A proposed residential development of three detached 4-bedroom duplexes at Lugbe 1 Layout, Cadastral Zone E30, FCT Abuja. Each two-storey home sits on its own plot of approximately 330 SQM with a private driveway, and construction is underway with foundations in progress. The ground floor has a living room, dining area, kitchen with store, a guest bedroom and a guest toilet; the first floor has the master bedroom with built-in wardrobe, two further bedrooms, a walk-in closet and two balconies.',
    highlights: ['4 bedrooms, 4 bathrooms plus guest toilet', 'Construction underway — foundations in progress', 'Private driveway with parking for up to 5 cars', 'Two first-floor balconies'],
    features: ['Living room, dining area and kitchen with store', 'Ground-floor guest bedroom', 'Master bedroom with built-in wardrobe', 'Walk-in closet', 'Bronze powder-coated aluminium windows with tinted glazing', 'Long-span aluminium roofing'],
    image: '/images/abuja-lugbe/render.jpg',
    gallery: ['/images/abuja-lugbe/site-progress-1.jpg', '/images/abuja-lugbe/site-progress-2.jpg'],
    floor_plans: [
      { src: '/images/abuja-lugbe/ground-floor.jpg', label: 'Ground floor' },
      { src: '/images/abuja-lugbe/first-floor.jpg', label: 'First floor' },
    ],
    image_caption: 'Artist’s impression. Site photographs show construction in progress.',
  };

  db.prepare(`
    INSERT INTO properties (
      id, slug, name, tagline, location, state, category, price, price_formatted,
      price_note, plot_size, title_type, is_featured, status, description,
      highlights, features, image, gallery, floor_plans, image_caption,
      listing_type, agent_id, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?, ?, ?, ?, ?, ?, 'sale', 'agent-sales-desk', ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      slug = excluded.slug, name = excluded.name, tagline = excluded.tagline, location = excluded.location,
      state = excluded.state, category = excluded.category, price = excluded.price,
      price_formatted = excluded.price_formatted, price_note = excluded.price_note,
      plot_size = excluded.plot_size, title_type = excluded.title_type, status = excluded.status,
      description = excluded.description, highlights = excluded.highlights, features = excluded.features,
      image = excluded.image, gallery = excluded.gallery, floor_plans = excluded.floor_plans,
      image_caption = excluded.image_caption
  `).run(
    'prop-abuja', listing.slug, listing.name, listing.tagline, listing.location, listing.state,
    listing.category, listing.price, listing.price_formatted, listing.price_note, listing.plot_size,
    listing.title_type, listing.status, listing.description, JSON.stringify(listing.highlights),
    JSON.stringify(listing.features), listing.image, JSON.stringify(listing.gallery),
    JSON.stringify(listing.floor_plans), listing.image_caption, now, now
  );
}

function ensureColumn(db: DatabaseSync, table: string, column: string, definition: string) {
  const columns = db.prepare(`PRAGMA table_info(${table})`).all() as { name: string }[];
  if (!columns.some(c => c.name === column)) {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
  }
}

function seedAgents(db: DatabaseSync) {
  const countRow = db.prepare('SELECT COUNT(*) as count FROM agents').get() as { count: number };
  if (countRow && countRow.count > 0) {
    return;
  }

  const now = new Date().toISOString();

  // Company desk until individual agent profiles (name, photo, email, position) are supplied.
  db.prepare(`
    INSERT INTO agents (id, name, position, email, phone, photo, bio, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    'agent-sales-desk',
    'Benton Sales Desk',
    'Sales & Allocation Office, Effurun',
    'enquiries@bentonhomes.com',
    '+2348038535773',
    null,
    'Handles inspections, documentation and plot allocation from the Summer Plazza head office.',
    now,
    now
  );

  db.prepare('UPDATE properties SET agent_id = ? WHERE agent_id IS NULL').run('agent-sales-desk');
}

export interface PropertySearch {
  type?: 'sale' | 'rent';
  location?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

const propertyWithAgent = `
  SELECT p.*, a.name AS agent_name, a.position AS agent_position, a.photo AS agent_photo
  FROM properties p
  LEFT JOIN agents a ON a.id = p.agent_id
`;

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
    return db.prepare(`${propertyWithAgent} ORDER BY p.is_featured DESC, p.created_at DESC`).all();
  },

  searchProperties(search: PropertySearch) {
    const db = getDb();
    const where: string[] = [];
    const params: (string | number)[] = [];
    if (search.type) { where.push('p.listing_type = ?'); params.push(search.type); }
    if (search.location) { where.push('p.state = ?'); params.push(search.location); }
    if (search.category) { where.push('p.category = ?'); params.push(search.category); }
    // Listings without a published price (stored as 0) only match unfiltered searches.
    if (search.minPrice !== undefined || search.maxPrice !== undefined) where.push('p.price > 0');
    if (search.minPrice !== undefined) { where.push('p.price >= ?'); params.push(search.minPrice); }
    if (search.maxPrice !== undefined) { where.push('p.price <= ?'); params.push(search.maxPrice); }
    const clause = where.length ? `WHERE ${where.join(' AND ')}` : '';
    return db.prepare(`${propertyWithAgent} ${clause} ORDER BY p.is_featured DESC, p.created_at DESC`).all(...params);
  },

  listLocations() {
    const db = getDb();
    return db.prepare(`
      SELECT state, COUNT(*) AS count, MIN(image) AS image, GROUP_CONCAT(DISTINCT location) AS areas
      FROM properties GROUP BY state ORDER BY count DESC, state
    `).all() as { state: string; count: number; image: string; areas: string }[];
  },

  getPropertyBySlug(slug: string) {
    const db = getDb();
    return db.prepare(`${propertyWithAgent} WHERE p.slug = ?`).get(slug);
  },

  // Agents
  listAgents() {
    const db = getDb();
    return db.prepare(`
      SELECT a.*, COUNT(p.id) AS listing_count
      FROM agents a LEFT JOIN properties p ON p.agent_id = a.id
      GROUP BY a.id ORDER BY a.name
    `).all();
  },

  getAgent(id: string) {
    const db = getDb();
    return db.prepare('SELECT * FROM agents WHERE id = ?').get(id);
  }
};
