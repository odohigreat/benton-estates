-- Run in the Supabase SQL Editor. Safe to rerun; existing rows are preserved.
BEGIN;

    

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
      price DOUBLE PRECISION NOT NULL,
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
  
ALTER TABLE properties ADD COLUMN IF NOT EXISTS listing_type TEXT NOT NULL DEFAULT 'sale';
ALTER TABLE properties ADD COLUMN IF NOT EXISTS video_url TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS agent_id TEXT REFERENCES agents(id);
ALTER TABLE properties ADD COLUMN IF NOT EXISTS floor_plans TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS image_caption TEXT;
ALTER TABLE public.contact_enquiries ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.contact_enquiries FROM anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_enquiries TO service_role;
CREATE INDEX IF NOT EXISTS contact_enquiries_created_at_idx ON public.contact_enquiries(created_at DESC);
ALTER TABLE public.realtor_applications ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.realtor_applications FROM anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.realtor_applications TO service_role;
CREATE INDEX IF NOT EXISTS realtor_applications_created_at_idx ON public.realtor_applications(created_at DESC);
ALTER TABLE public.elevation_subscriptions ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.elevation_subscriptions FROM anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.elevation_subscriptions TO service_role;
CREATE INDEX IF NOT EXISTS elevation_subscriptions_created_at_idx ON public.elevation_subscriptions(created_at DESC);
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.properties FROM anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.properties TO service_role;
CREATE INDEX IF NOT EXISTS properties_created_at_idx ON public.properties(created_at DESC);
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.agents FROM anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.agents TO service_role;
CREATE INDEX IF NOT EXISTS agents_created_at_idx ON public.agents(created_at DESC);
INSERT INTO public.agents (id, name, position, email, phone, photo, bio, created_at, updated_at) VALUES ('agent-sales-desk', 'Benton Sales Desk', 'Sales & Allocation Office, Effurun', 'enquiries@bentonhomes.com', '+2348038535773', NULL, 'Handles inspections, documentation and plot allocation from the Summer Plazza head office.', '2026-10-10T22:57:31.014Z', '2026-10-10T22:57:31.014Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.properties (id, slug, name, tagline, location, state, category, price, price_formatted, price_note, plot_size, title_type, is_featured, status, description, highlights, features, image, gallery, created_at, updated_at, listing_type, video_url, agent_id, floor_plans, image_caption) VALUES ('prop-elevation-estate', 'elevation-estate', 'Elevation Estate, Ekrerahwe', 'Own a piece of mind in a fast rising investment', 'Ekrerahwe, Ughelli North LGA', 'Delta State', 'LAND', 1195000, '₦1,195,000', 'Outright payment per 464 SQM plot (Installment options: 3, 6, or 12 months)', '464 SQM', 'Registered Survey & Deed of Assignment', 1, 'SELLING FAST', 'Elevation Estate is a prime undeveloped residential and commercial land development located in Ekrerahwe, Ughelli North Local Government Area of Delta State. Developed by Benton Homes and Development Limited, the estate is completely free from all known government encumbrances or adverse claims, features motorable road access, and is situated in a high-growth appreciation corridor.', '["Registered Survey & Deed of Assignment","Free from all adverse claims and government encumbrances","Immediate motorable road access","Physical allocation upon completion of payment","Fencing and estate infrastructure in progress"]', '["100% Dry Land","Standard 464 SQM Plots","Residential & Commercial Zoning (Commercial +10%)","Corner Piece Plots (Attracts +10%)","Flexible 3, 6 & 12 Month Payment Plans","Transfer documentation with developer approval"]', '/images/elevation-estate.jpg', '["/images/elevation-estate.jpg","/images/hero.jpg"]', '2026-10-10T22:57:31.008Z', '2026-10-10T22:57:31.008Z', 'sale', NULL, 'agent-sales-desk', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.properties (id, slug, name, tagline, location, state, category, price, price_formatted, price_note, plot_size, title_type, is_featured, status, description, highlights, features, image, gallery, created_at, updated_at, listing_type, video_url, agent_id, floor_plans, image_caption) VALUES ('prop-benton-crest', 'benton-crest-residences', 'Benton Crest Luxury Scheme', 'Sample Development • Upcoming Residential Scheme', 'Effurun / Warri Corridor', 'Delta State', 'RESIDENTIAL', 65000000, 'Price on Request', 'Proposed 4/5 Bedroom contemporary duplex layouts', '4/5 Bedroom Duplex Layouts', 'Governor’s Consent / C of O in Process', 1, 'COMING SOON', 'An upcoming exclusive residential development crafted for high-comfort living, featuring modern architectural aesthetics, perimeter security, and planned underground drainage.', '["Sample Development Scheme for Planning & Registration","Modern open-concept architectural duplex designs","24/7 Gated security & access control","High capital appreciation corridor"]', '["All En-Suite Bedrooms","Smart Home Ready","Dedicated Utility Transformer","Paved Estate Access Roads"]', '/images/modern-duplex.jpg', '["/images/modern-duplex.jpg","/images/hero.jpg"]', '2026-10-10T22:57:31.008Z', '2026-10-10T22:57:31.008Z', 'sale', NULL, 'agent-sales-desk', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.properties (id, slug, name, tagline, location, state, category, price, price_formatted, price_note, plot_size, title_type, is_featured, status, description, highlights, features, image, gallery, created_at, updated_at, listing_type, video_url, agent_id, floor_plans, image_caption) VALUES ('prop-commercial-hub', 'benton-commercial-plots', 'Benton Commercial Corridor', 'Sample Development • Strategic Commercial Scheme', 'Airport Junction / Sapele Road Axis, Effurun', 'Delta State', 'COMMERCIAL', 4500000, '₦4,500,000', 'Commercial plots with high thoroughfare visibility', '928 SQM (Double Plot)', 'Registered Survey & Deed of Assignment', 1, 'AVAILABLE', 'Strategically situated commercial plots tailored for warehousing, enterprise offices, shopping plazas, and logistics centers along the bustling Sapele Road / Airport corridor.', '["Sample Development Scheme","High-traffic commercial corridor","Dual road access for heavy vehicles","Instant documentation on full payment"]', '["928 SQM Commercial Parcel","Heavy vehicle accessible","Grid proximity","Direct title transfer"]', '/images/hero.jpg', '["/images/hero.jpg","/images/elevation-estate.jpg"]', '2026-10-10T22:57:31.008Z', '2026-10-10T22:57:31.008Z', 'sale', NULL, 'agent-sales-desk', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.properties (id, slug, name, tagline, location, state, category, price, price_formatted, price_note, plot_size, title_type, is_featured, status, description, highlights, features, image, gallery, created_at, updated_at, listing_type, video_url, agent_id, floor_plans, image_caption) VALUES ('prop-abuja', 'lugbe-4-bedroom-duplex-abuja', '4-Bedroom Duplex, Lugbe 1 Layout', 'Under construction • Three detached duplexes in Lugbe, Abuja', 'Lugbe 1 Layout, Cadastral Zone E30', 'Abuja', 'RESIDENTIAL', 0, 'Price on Request', 'Contact us for current pricing', '4 Bedrooms · approx. 330 SQM plot', 'Title documentation to be published', 0, 'UNDER CONSTRUCTION', 'A proposed residential development of three detached 4-bedroom duplexes at Lugbe 1 Layout, Cadastral Zone E30, FCT Abuja. Each two-storey home sits on its own plot of approximately 330 SQM with a private driveway, and construction is underway with foundations in progress. The ground floor has a living room, dining area, kitchen with store, a guest bedroom and a guest toilet; the first floor has the master bedroom with built-in wardrobe, two further bedrooms, a walk-in closet and two balconies.', '["4 bedrooms, 4 bathrooms plus guest toilet","Construction underway — foundations in progress","Private driveway with parking for up to 5 cars","Two first-floor balconies"]', '["Living room, dining area and kitchen with store","Ground-floor guest bedroom","Master bedroom with built-in wardrobe","Walk-in closet","Bronze powder-coated aluminium windows with tinted glazing","Long-span aluminium roofing"]', '/images/abuja-lugbe/render.jpg', '["/images/abuja-lugbe/site-progress-1.jpg","/images/abuja-lugbe/site-progress-2.jpg"]', '2026-10-10T22:57:31.014Z', '2026-10-10T22:57:31.014Z', 'sale', NULL, 'agent-sales-desk', '[{"src":"/images/abuja-lugbe/ground-floor.jpg","label":"Ground floor"},{"src":"/images/abuja-lugbe/first-floor.jpg","label":"First floor"}]', 'Artist’s impression. Site photographs show construction in progress.') ON CONFLICT (id) DO NOTHING;

COMMIT;
