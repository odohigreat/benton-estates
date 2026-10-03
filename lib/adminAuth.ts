import { createHmac, timingSafeEqual } from 'crypto';

const TOKEN_PREFIX = 'bnt_adm_';
const TOKEN_TTL_MS = 12 * 60 * 60 * 1000;

// Production must set ADMIN_SECRET_KEY; the fallback only exists for local development.
function getSecret(): string | null {
  const secret = process.env.ADMIN_SECRET_KEY;
  if (secret) return secret;
  return process.env.NODE_ENV === 'production' ? null : 'benton-dev-admin';
}

function sign(payload: string, secret: string) {
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

export function isAdminConfigured() {
  return getSecret() !== null;
}

export function checkPasscode(passcode: unknown): boolean {
  const secret = getSecret();
  return !!secret && typeof passcode === 'string' && safeEqual(passcode, secret);
}

export function issueAdminToken(): string {
  const secret = getSecret();
  if (!secret) throw new Error('ADMIN_SECRET_KEY is not configured');
  const expires = (Date.now() + TOKEN_TTL_MS).toString();
  return `${TOKEN_PREFIX}${expires}.${sign(expires, secret)}`;
}

export function verifyAdminRequest(req: Request): boolean {
  const secret = getSecret();
  const header = req.headers.get('authorization');
  if (!secret || !header?.startsWith(`Bearer ${TOKEN_PREFIX}`)) return false;

  const [expires, signature] = header.slice(`Bearer ${TOKEN_PREFIX}`.length).split('.');
  if (!expires || !signature || !safeEqual(signature, sign(expires, secret))) return false;
  return Number(expires) > Date.now();
}
