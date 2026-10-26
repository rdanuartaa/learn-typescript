-- Security migration for an existing portfolio Supabase project.
-- Run once in Supabase SQL Editor as the project owner.
-- This script does not delete portfolio data.

BEGIN;

-- Older installations may not have the admin allowlist table yet.
CREATE TABLE IF NOT EXISTS public.admins (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT DEFAULT 'Rizal Danuarta Akbar',
  role TEXT NOT NULL DEFAULT 'superadmin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.cv_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Ensure the existing portfolio owner is represented in the server-side allowlist.
INSERT INTO public.admins (id, email, full_name, role)
SELECT id, email, 'Rizal Danuarta Akbar', 'superadmin'
FROM auth.users
WHERE email = 'akbardanu631@gmail.com'
ON CONFLICT (id) DO UPDATE
SET email = EXCLUDED.email;


ALTER TABLE public.admins ALTER COLUMN role SET NOT NULL;
ALTER TABLE public.admins DROP CONSTRAINT IF EXISTS admins_role_check;
ALTER TABLE public.admins
  ADD CONSTRAINT admins_role_check CHECK (role IN ('admin', 'superadmin'));


DROP POLICY IF EXISTS "Allow modify cv_settings" ON public.cv_settings;
DROP POLICY IF EXISTS "Allow modify projects" ON public.projects;
DROP POLICY IF EXISTS "Allow modify experiences" ON public.experiences;
DROP POLICY IF EXISTS "Public can view admins" ON public.admins;
DROP POLICY IF EXISTS "Allow modify admins" ON public.admins;

REVOKE ALL ON public.cv_settings FROM anon, authenticated;
REVOKE ALL ON public.projects FROM anon, authenticated;
REVOKE ALL ON public.experiences FROM anon, authenticated;
REVOKE ALL ON public.admins FROM anon, authenticated;
GRANT SELECT ON public.cv_settings TO anon, authenticated;
GRANT SELECT ON public.projects TO anon, authenticated;
GRANT SELECT ON public.experiences TO anon, authenticated;

DROP POLICY IF EXISTS "Public can view cv_settings" ON public.cv_settings;
CREATE POLICY "Public can view cv_settings" ON public.cv_settings
FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public can view projects" ON public.projects;
CREATE POLICY "Public can view projects" ON public.projects
FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public can view experiences" ON public.experiences;
CREATE POLICY "Public can view experiences" ON public.experiences
FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public can read portfolio bucket" ON storage.objects;
CREATE POLICY "Public can read portfolio bucket" ON storage.objects
FOR SELECT TO anon, authenticated USING (bucket_id = 'portfolio');

DROP POLICY IF EXISTS "Allow upload to portfolio bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow update portfolio bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow delete from portfolio bucket" ON storage.objects;


-- Atomic reorder functions. Only the server service role may execute them.
CREATE OR REPLACE FUNCTION public.reorder_projects(p_items JSONB)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  requested_count INTEGER;
  existing_count INTEGER;
  updated_count INTEGER;
BEGIN
  IF jsonb_typeof(p_items) <> 'array' THEN
    RAISE EXCEPTION 'p_items must be an array';
  END IF;

  requested_count := jsonb_array_length(p_items);
  IF requested_count < 1 OR requested_count > 100 THEN
    RAISE EXCEPTION 'p_items must contain 1-100 entries';
  END IF;

  LOCK TABLE public.projects IN SHARE ROW EXCLUSIVE MODE;
  SELECT COUNT(*) INTO existing_count FROM public.projects;
  IF existing_count <> requested_count THEN
    RAISE EXCEPTION 'reorder must include every project';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM jsonb_to_recordset(p_items) AS item(id UUID, order_index INTEGER)
    GROUP BY item.id
    HAVING item.id IS NULL OR COUNT(*) > 1
  ) OR EXISTS (
    SELECT 1
    FROM jsonb_to_recordset(p_items) AS item(id UUID, order_index INTEGER)
    GROUP BY item.order_index
    HAVING item.order_index IS NULL
      OR item.order_index < 0
      OR item.order_index >= requested_count
      OR COUNT(*) > 1
  ) THEN
    RAISE EXCEPTION 'invalid or duplicate reorder entry';
  END IF;

  UPDATE public.projects AS target
  SET order_index = item.order_index
  FROM jsonb_to_recordset(p_items) AS item(id UUID, order_index INTEGER)
  WHERE target.id = item.id;

  GET DIAGNOSTICS updated_count = ROW_COUNT;
  IF updated_count <> requested_count THEN
    RAISE EXCEPTION 'one or more project ids do not exist';
  END IF;
END;
$$;

REVOKE ALL ON FUNCTION public.reorder_projects(JSONB) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.reorder_projects(JSONB) TO service_role;

CREATE OR REPLACE FUNCTION public.reorder_experiences(p_items JSONB)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  requested_count INTEGER;
  existing_count INTEGER;
  updated_count INTEGER;
BEGIN
  IF jsonb_typeof(p_items) <> 'array' THEN
    RAISE EXCEPTION 'p_items must be an array';
  END IF;

  requested_count := jsonb_array_length(p_items);
  IF requested_count < 1 OR requested_count > 100 THEN
    RAISE EXCEPTION 'p_items must contain 1-100 entries';
  END IF;

  LOCK TABLE public.experiences IN SHARE ROW EXCLUSIVE MODE;
  SELECT COUNT(*) INTO existing_count FROM public.experiences;
  IF existing_count <> requested_count THEN
    RAISE EXCEPTION 'reorder must include every experience';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM jsonb_to_recordset(p_items) AS item(id UUID, order_index INTEGER)
    GROUP BY item.id
    HAVING item.id IS NULL OR COUNT(*) > 1
  ) OR EXISTS (
    SELECT 1
    FROM jsonb_to_recordset(p_items) AS item(id UUID, order_index INTEGER)
    GROUP BY item.order_index
    HAVING item.order_index IS NULL
      OR item.order_index < 0
      OR item.order_index >= requested_count
      OR COUNT(*) > 1
  ) THEN
    RAISE EXCEPTION 'invalid or duplicate reorder entry';
  END IF;

  UPDATE public.experiences AS target
  SET order_index = item.order_index
  FROM jsonb_to_recordset(p_items) AS item(id UUID, order_index INTEGER)
  WHERE target.id = item.id;

  GET DIAGNOSTICS updated_count = ROW_COUNT;
  IF updated_count <> requested_count THEN
    RAISE EXCEPTION 'one or more experience ids do not exist';
  END IF;
END;
$$;

REVOKE ALL ON FUNCTION public.reorder_experiences(JSONB) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.reorder_experiences(JSONB) TO service_role;


COMMIT;

-- Read-only verification queries (expected write privileges: absent).
SELECT grantee, table_name, privilege_type
FROM information_schema.role_table_grants
WHERE table_schema = 'public'
  AND table_name IN ('cv_settings', 'projects', 'experiences', 'admins')
  AND grantee IN ('anon', 'authenticated')
ORDER BY table_name, grantee, privilege_type;

SELECT schemaname, tablename, policyname, roles, cmd, qual, with_check
FROM pg_policies
WHERE (schemaname = 'public' AND tablename IN ('cv_settings', 'projects', 'experiences', 'admins'))
   OR (schemaname = 'storage' AND tablename = 'objects')
ORDER BY schemaname, tablename, policyname;
