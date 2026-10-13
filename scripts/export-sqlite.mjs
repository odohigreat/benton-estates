// Offline export only; the deployed app has no SQLite dependency.
import { DatabaseSync } from 'node:sqlite';
import { writeFileSync } from 'node:fs';

const [source, destination] = process.argv.slice(2);
if (!source || !destination) throw new Error('Usage: node scripts/export-sqlite.mjs SOURCE.db OUTPUT.sql');
const db = new DatabaseSync(source, { readOnly: true });
const quote = value => value == null ? 'NULL' : typeof value === 'number' ? String(value) : `'${String(value).replaceAll("'", "''")}'`;
const identifier = value => `"${value.replaceAll('"', '""')}"`;
const statements = ['BEGIN;'];
for (const table of ['agents', 'properties', 'contact_enquiries', 'realtor_applications', 'elevation_subscriptions']) {
  for (const row of db.prepare(`SELECT * FROM ${table}`).all()) {
    const keys = Object.keys(row);
    statements.push(`INSERT INTO public.${table} (${keys.map(identifier).join(', ')}) VALUES (${keys.map(key => quote(row[key])).join(', ')}) ON CONFLICT (id) DO UPDATE SET ${keys.filter(key => key !== 'id').map(key => `${identifier(key)} = EXCLUDED.${identifier(key)}`).join(', ')};`);
  }
}
statements.push('COMMIT;');
writeFileSync(destination, statements.join('\n'), { mode: 0o600, flag: 'wx' });
db.close();
console.log('Export written. Keep this file private: it contains personal data.');
