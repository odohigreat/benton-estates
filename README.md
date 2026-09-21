# Benton Estates Real Estate Web Platform

A complete, modern, premium, responsive real estate company website developed for **Benton Estates** (operating corporate entity: **Benton Homes & Development Limited**).

Inspired structurally and visually by premier luxury real estate platforms like GText Homes, this platform delivers an original, high-trust experience tailored to the client's verified branding, authentic document translations, and business operations in Delta State, Nigeria.

---

## Brand Identity & Color Palette

- **Primary Royal Blue**: `#0304CE` (Buttons, key headings, navigation accents, active states)
- **Corporate Navy**: `#143F9D` & `#0A142F` (Deep utility bars, footers, card headers)
- **Brand Red**: `#E40C05` (Accent badges, signatures, underlines, CTA highlights)
- **Surface White**: `#FFFFFF` (Spacious, clean content backgrounds)
- **Muted Neutrals**: `#F8FAFC`, `#F1F5F9`, `#E2E8F0`, `#64748B`, `#1E293B`

### Brand Tagline
> **"BUILDING PARTNERSHIPS • CREATING WEALTH • DEVELOPING COMMUNITIES"**

### Vision & Mission
- **Vision**: *"To be Africa's leading real estate company renowned for transparency, trust, and timely delivery of quality homes."*
- **Mission**: *"To provide affordable, litigation-free properties and deliver homes by upholding integrity, transparency, and professionalism at every stage of the client journey."*

### H.O.M.E Core Values
- **H — Honesty**: Radical truth, verified survey titles, and unvarnished disclosures.
- **O — Ownership**: Total responsibility for estate schemes and delivery.
- **M — Mindset of Service**: Empathetic client guidance from inspection to handover.
- **E — Execution**: Disciplined delivery, swift documentation, and physical allocation.

---

## Key Features & Page Structure

1. **Homepage (`/`)**:
   - High-impact architectural hero section with cinematic overlay and direct CTAs.
   - About Benton Estates two-column split with corporate credentials.
   - Featured Properties & Schemes grid with dynamic status badges.
   - Comprehensive Services portfolio (Development, Consulting, Land Sales, Mentoring, Tech).
   - Core H.O.M.E Values showcase.
   - Elevation Estate, Ekrerahwe spotlight banner.
   - Consultation & Inspection request form with instant feedback.
2. **About Us (`/about`)**:
   - Full corporate story, vision, mission, and deep-dive into H.O.M.E values.
   - Operational headquarters profile in Effurun, Delta State.
3. **Properties Catalogue (`/properties`)**:
   - Filterable catalogue (All, Land Developments, Residential Schemes, Commercial Plots).
   - Interactive property cards with plot sizes, title documentation, and pricing.
4. **Property Details (`/properties/[slug]`)**:
   - Dynamic detail page for each scheme (e.g. `/properties/elevation-estate`).
   - Image gallery, full specifications table, and prefilled enquiry form.
5. **Elevation Estate Subscription (`/properties/elevation-estate/subscribe`)**:
   - **Exact 1-to-1 digital translation** of the client's 2-page subscription PDF.
   - Section 1: Subscriber Details (PEP check, ID type, employment, spouse).
   - Section 2: Next of Kin.
   - Section 3: Subscriber Declaration & Plot Selection (Residential / Commercial +10%, Corner Piece +10%, 3/6/12 Month Plans) with **live investment calculator**.
   - Referral details section.
   - **All 15 Terms & Conditions / FAQs transcribed verbatim** from Page 2 with interactive accordion reader.
   - Final subscriber acknowledgement, typed electronic signature, and Zenith Bank account reference (1312097443).
6. **Become a Realtor (`/become-a-realtor`)**:
   - **Exact 1-to-1 digital translation** of the client's 7-section paper *Realtor Registration Form*.
   - Section 1: Personal Information.
   - Section 2: Realtor Profile (experience, current company, role, operational territory).
   - Section 3: Sales & Marketing (deals closed, strongest skill, lead source, inspection availability).
   - Section 4: Digital Presence (social handles).
   - Section 5: Benton Homes Partnership (motivation, goals, referral source).
   - Section 6: Identification & Next of Kin.
   - Section 7: Ethical Declaration & digital typed signature.
   - Section 8: Internal Office Processing fields (`Pending` initial status, assigned manager, realtor ID).
7. **Our Services (`/services`)**:
   - Deep-dive into all 7 business activities with booking actions.
8. **Contact Us (`/contact`)**:
   - Verified address: Summer Plazza, 102 Effurun Sapele Road, Airport Junction, Effurun.
   - Direct telephone line: `+2348038357773`.
   - WhatsApp direct click with pre-filled enquiry parameters.
   - Live backend-persisted enquiry form.
9. **Staff Administrative Portal (`/admin`)**:
   - Secure, protected dashboard accessed via security passcode (`benton2026!admin`).
   - Real-time review of Contact Enquiries, Realtor Applications, and Elevation Subscriptions.
   - In-app status management (Pending -> Approved / Declined), manager assignment, and administrative notes.
10. **Legal & Compliance (`/privacy` & `/terms`)**:
    - Data privacy policy and property purchase contractual guidelines.

---

## Technical Architecture

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 with custom brand tokens
- **Icons**: Lucide React
- **Validation**: Zod schema validation
- **Persistence**: High-performance SQLite via Node 24 native `node:sqlite` DatabaseSync with WAL journal mode (zero external database daemons required for local dev, fully schema-ready for PostgreSQL / Supabase via `DATABASE_URL`)
- **Assets**: Transparent official Benton logo, high-res architectural and surveyed land photography

---

## Getting Started Locally

### Prerequisites
- Node.js v20+ (Node.js v22/v24 recommended)
- npm v10+

### Installation & Run

1. Clone and navigate to the project directory:
   ```bash
   git clone <repository-url>
   cd benton-estates
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```

4. Run development server:
   ```bash
   npm run dev
   ```
   Or build and run the optimized production server:
   ```bash
   npm run build
   npm run start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Administrative Access

- **URL**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Default Passcode**: `benton2026!admin` (configurable in `.env` via `ADMIN_SECRET_KEY`)
