-- Featured videos shown on the home page and managed from /admin. Safe to rerun.
BEGIN;

CREATE TABLE IF NOT EXISTS public.videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Mission',
  published_at DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS videos_published_at_idx ON public.videos(published_at DESC);

ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read" ON public.videos;
CREATE POLICY "Public Read" ON public.videos FOR SELECT USING (true);

-- Writes follow the other tables: no write policy, and only the server's privileged key
-- (used by the ADMIN_SECRET_KEY-protected /api/admin routes) can insert, update or delete.
REVOKE ALL ON public.videos FROM anon, authenticated;
GRANT SELECT ON public.videos TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.videos TO service_role;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$
LANGUAGE plpgsql SET search_path = public;

DROP TRIGGER IF EXISTS trg_videos_updated ON public.videos;
CREATE TRIGGER trg_videos_updated BEFORE UPDATE ON public.videos
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

COMMIT;
