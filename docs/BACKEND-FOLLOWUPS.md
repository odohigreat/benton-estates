# Existing issues intentionally outside the frontend refresh

These findings remain unresolved. The refreshed UI must not be interpreted as a security approval for production.

## Security

- **Critical:** `app/api/admin/data/route.ts` trusts a bearer-token prefix rather than validating an issued session. This allows admin data reads and updates without a valid login.
- The admin auth route falls back to a public default passcode; the existing login screen and README disclose it. No authentication architecture, credential policy, or public credential wording was changed in this phase.
- Tokens have no enforced expiry/revocation. Browser-local removal on logout is not server-side revocation.
- Administrative writes lack validated status transitions, per-user permissions and an audit trail. Public form routes lack application-level rate limiting and strong bounds/enum checks.
- Personal and identification data are stored in SQLite without application-layer encryption. Infrastructure security and legal/privacy claims require separate review.

## Business/data functionality

- Realtor approval does not populate the stored realtor ID or registration-date fields. Manager/notes values are currently hardcoded by approval actions, and backend COALESCE behavior prevents clearing them.
- Plot allocation only updates a status; there is no physical-plot inventory, payment reconciliation or real allocation engine.
- Properties catalogue data is duplicated in frontend code while homepage/details use SQLite. This was preserved as requested rather than changing the data source.
- Short random reference codes can collide; there is no collision retry/idempotency protection.
- Displayed pricing is not persisted as a versioned server-side quotation. The existing calculator was retained.
- Database migrations, durable hosting configuration and tested backups are absent from the repository. `DATABASE_URL` is not implemented.
- Notification delivery, starter packs, receipts and contractual documents require manual handling; the UI refactor does not add those backend services.
- Existing privacy/terms wording, including consent defaults and business assertions, was preserved. Accuracy and compliance require owner review.

## Existing lint debt

Baseline before frontend edits: 16 errors and 50 warnings.

After frontend refactor: all changed frontend files pass ESLint. The repository-wide command still reports:

- `app/api/contact/route.ts:35`: explicit `any` in catch.
- `app/api/realtor/route.ts:94`: explicit `any` in catch.
- `app/api/subscription/route.ts:112`: explicit `any` in catch.
- `types/node-sqlite.d.ts:10–12`: five explicit-`any` errors in custom database declarations.
- `app/api/admin/auth/route.ts:19`: one unused catch-variable warning.

These API and declaration files were left unchanged. The frontend does not introduce any additional lint errors or broad `any` types.

## Dependency advisory follow-up

Adding the requested Motion/GSAP packages completed successfully, but npm's install summary reported one critical vulnerability. A separate `npm audit --json` attempt was inconclusive: npm's fallback quick-audit endpoint returned HTTP 400 with a retirement notice and an invalid-package-tree message. The affected package/advisory was not verified, so no specific vulnerability or attribution to the new packages is asserted here. Investigate with a working advisory client before release; no forced dependency upgrades were applied during this UI-only phase.
