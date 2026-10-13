import 'server-only';
import { randomUUID } from 'node:crypto';
import type { Agent } from '@/components/listings/AgentCard';
import type { PropertyItem } from '@/components/ui/PropertyCard';

export interface PropertySearch {
  type?: 'sale' | 'rent';
  location?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

type Row = Record<string, unknown>;

// Public listing data is edited directly in Supabase, so pages may serve it up to 5 minutes stale.
const PUBLIC_TABLES = new Set(['properties', 'agents']);
const PUBLIC_REVALIDATE_SECONDS = 300;

// All database access stays on the server; browser clients have no table grants.
async function request<T>(table: string, params: Record<string, string> = {}, method = 'GET', body?: Row): Promise<T> {
  const base = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!base || !key) throw new Error('Set SUPABASE_URL and SUPABASE_SECRET_KEY in the server environment.');
  const url = new URL(`/rest/v1/${table}`, base);
  url.search = new URLSearchParams(params).toString();
  const headers: Record<string, string> = { apikey: key, 'Content-Type': 'application/json', Prefer: 'return=representation' };
  if (!key.startsWith('sb_secret_')) headers.Authorization = `Bearer ${key}`;
  const response = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : undefined, ...(method === 'GET' && PUBLIC_TABLES.has(table) ? { next: { revalidate: PUBLIC_REVALIDATE_SECONDS } } : { cache: 'no-store' as const }), signal: AbortSignal.timeout(15000) });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`Supabase ${table} request failed (${response.status}): ${error.code || 'unknown'}`);
  }
  return await response.json() as T;
}

function columns(data: object): Row {
  return Object.fromEntries(Object.entries(data).map(([key, value]) => [
    key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`),
    typeof value === 'boolean' ? Number(value) : value ?? null
  ]));
}

async function insert(table: string, data: object, prefix: string, refColumn: string, refPrefix: string) {
  const id = `${prefix}_${randomUUID()}`;
  const reference = `${refPrefix}${randomUUID()}`;
  const now = new Date().toISOString();
  await request(table, {}, 'POST', { ...columns(data), id, [refColumn]: reference, created_at: now, updated_at: now });
  return { id, reference };
}

async function update(table: string, id: string, values: Row) {
  const rows = await request<Row[]>(table, { id: `eq.${id}` }, 'PATCH', { ...values, updated_at: new Date().toISOString() });
  if (!rows.length) throw new Error('Record not found');
}

const propertySelect = '*,agents(name,position,photo)';
type PropertyRow = PropertyItem & { created_at: string; updated_at: string; agents: { name: string; position: string; photo: string | null } | null };
async function list<T>(table: string, params: Record<string, string> = {}): Promise<T[]> {
  const rows: T[] = [];
  for (let offset = 0; ; offset += 500) {
    const page = await request<T[]>(table, { ...params, limit: '500', offset: String(offset) });
    rows.push(...page);
    if (page.length < 500) return rows;
  }
}

async function properties(filters: Record<string, string> = {}) {
  const params = { select: propertySelect, order: 'is_featured.desc,created_at.desc,id.asc', ...filters };
  const rows = filters.limit ? await request<PropertyRow[]>('properties', params) : await list<PropertyRow>('properties', params);
  return rows.map(({ agents, ...property }) => ({ ...property, agent_name: agents?.name ?? null, agent_position: agents?.position ?? null, agent_photo: agents?.photo ?? null }));
}

export const dbRepo = {
  async createEnquiry(data: {
    fullName: string;
    email: string;
    phone: string;
    enquiryType: string;
    propertyOfInterest?: string;
    message: string;
    consent: boolean;
  }) {
    const result = await insert('contact_enquiries', data, 'enq', 'reference_id', 'BNT-ENQ-');
    return { id: result.id, referenceId: result.reference };
  },
  async createRealtorApplication(data: {
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
    const result = await insert('realtor_applications', data, 'realtor', 'application_ref', 'BNT-R-');
    return { id: result.id, applicationRef: result.reference };
  },
  async createElevationSubscription(data: {
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
    const result = await insert('elevation_subscriptions', data, 'sub', 'subscription_ref', 'BNT-SUB-');
    return { id: result.id, subscriptionRef: result.reference };
  },

  listEnquiries: () => list<Row>('contact_enquiries', { order: 'created_at.desc,id.asc' }),
  listRealtors: () => list<Row>('realtor_applications', { order: 'created_at.desc,id.asc' }),
  listElevationSubscriptions: () => list<Row>('elevation_subscriptions', { order: 'created_at.desc,id.asc' }),
  updateEnquiryStatus: (id: string, status: string) => update('contact_enquiries', id, { status }),
  updateRealtorStatus: (id: string, status: string, assignedManager?: string, adminNotes?: string) => update('realtor_applications', id, { status, ...(assignedManager ? { assigned_manager: assignedManager } : {}), ...(adminNotes ? { admin_notes: adminNotes } : {}) }),
  updateSubscriptionStatus: (id: string, status: string, adminNotes?: string) => update('elevation_subscriptions', id, { status, ...(adminNotes ? { admin_notes: adminNotes } : {}) }),
  listProperties: () => properties(),
  async searchProperties(search: PropertySearch) {
    const filters: Record<string, string> = {};
    if (search.type) filters.listing_type = `eq.${search.type}`;
    if (search.location) filters.state = `eq.${search.location}`;
    if (search.category) filters.category = `eq.${search.category}`;
    const prices: string[] = [];
    if (search.minPrice !== undefined || search.maxPrice !== undefined) prices.push('price.gt.0');
    if (search.minPrice !== undefined) prices.push(`price.gte.${search.minPrice}`);
    if (search.maxPrice !== undefined) prices.push(`price.lte.${search.maxPrice}`);
    if (prices.length) filters.and = `(${prices.join(',')})`;
    return properties(filters);
  },
  async listLocations() {
    const rows = await properties();
    const groups = new Map<string, { state: string; count: number; image: string; locations: Set<string> }>();
    for (const row of rows) {
      const group = groups.get(row.state) ?? { state: row.state, count: 0, image: row.image, locations: new Set<string>() };
      group.count++;
      if (row.image < group.image) group.image = row.image;
      group.locations.add(row.location);
      groups.set(row.state, group);
    }
    return [...groups.values()].map(({ locations, ...group }) => ({ ...group, areas: [...locations].join(',') })).sort((a, b) => b.count - a.count || a.state.localeCompare(b.state));
  },
  async getPropertyBySlug(slug: string) { return (await properties({ slug: `eq.${slug}`, limit: '1' }))[0]; },
  async listAgents() {
    const rows = await list<Row & { properties: { id: string }[] }>('agents', { select: '*,properties(id)', order: 'name.asc' });
    return rows.map(({ properties, ...agent }) => ({ ...agent, listing_count: properties.length }));
  },
  async getAgent(id: string) { return (await request<Agent[]>('agents', { id: `eq.${id}`, limit: '1' }))[0]; }
};
