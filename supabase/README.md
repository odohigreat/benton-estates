# Supabase setup

1. In your Supabase project, open **SQL Editor**, paste all of `setup.sql`, and run it. This creates five tables, indexes, permissions, and the starter properties and sales desk. Rerunning preserves existing rows. Keep the Data API enabled and the `public` schema exposed.
2. In **Project Settings → Data API**, copy the Project URL. In **API Keys**, create/copy a server secret key (`sb_secret_...`). A legacy `service_role` key is also supported.
3. Create `.env.local` using `.env.example` as the template:

   ```dotenv
   SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
   SUPABASE_SECRET_KEY=YOUR_SERVER_SECRET_KEY
   ADMIN_SECRET_KEY=YOUR_LONG_RANDOM_ADMIN_PASSCODE
   ```

   These variables stay on the server. No public Supabase key is needed. The existing admin login continues to use `ADMIN_SECRET_KEY`, rather than Supabase Auth.
4. Restart `npm run dev`. Check the homepage, filtered listings, property details, locations, and agents. Submit each form and check that its record appears in `/admin`. Change a status and refresh to confirm persistence.
5. Add the same three variables to Vercel → Project Settings → Environment Variables for Production (and Preview if needed). Deploy the updated code. Environment changes require a new deployment.

All tables enable RLS and revoke access from `anon` and `authenticated`. Only the server's privileged key can access them. Public pages and forms go through Next.js, and administrative routes retain their existing authentication checks. Never commit or paste the secret key into client code.

## Migrations

Run each file in `migrations/` in the SQL Editor after `setup.sql`, in filename order. `20261015000000_create_videos.sql` adds the `videos` table behind the home-page Featured Videos carousel and the **Videos** tab in `/admin`. Visitors can read it; only the server key can write.

## Existing local data

`setup.sql` contains starter catalogue data, not existing enquiries, applications, subscriptions, or local edits. Preserve `data/benton.db` and its WAL files. To migrate that database, run:

```sh
node scripts/export-sqlite.mjs data/benton.db /private/tmp/benton-data.sql
```

Requires Node 22.13+ for the native SQLite exporter. Run the generated SQL in the Supabase SQL Editor **after** `setup.sql`. It imports all five tables and updates matching IDs with the local values. Review the source database first; imports overwrite matching remote records. The export contains personal data, so keep it private and delete it after migration.

## Validation limits

The repository checks can validate types, lint, build, and HTTP request behavior without credentials. Live database permissions, SQL execution, and end-to-end persistence must be verified against your configured project using the checks above.
