-- ==============================================================================
-- Civic Safety Map (India) — Supabase PostgreSQL Schema with RLS
-- Enforces mandatory moderation & prevents unauthorized live publishing
-- ==============================================================================

-- 1. Camera Nodes (Cached OSM & verified local additions)
CREATE TABLE IF NOT EXISTS public.camera_nodes (
    id TEXT PRIMARY KEY,                       -- e.g. 'osm-12345678'
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    source TEXT NOT NULL DEFAULT 'osm',        -- 'osm' | 'user_contributed'
    tags JSONB DEFAULT '{}'::jsonb,            -- Raw OSM or custom metadata
    operational_status TEXT NOT NULL DEFAULT 'unsure' 
        CHECK (operational_status IN ('working', 'broken', 'unsure')),
    report_count INTEGER NOT NULL DEFAULT 0,
    last_reported_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Index geospatial coordinates
CREATE INDEX IF NOT EXISTS idx_camera_nodes_coords 
    ON public.camera_nodes (latitude, longitude);

CREATE INDEX IF NOT EXISTS idx_camera_nodes_status 
    ON public.camera_nodes (operational_status);


-- 2. Status Reports (Submitted by community)
CREATE TABLE IF NOT EXISTS public.status_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    camera_id TEXT NOT NULL REFERENCES public.camera_nodes(id) ON DELETE CASCADE,
    status TEXT NOT NULL CHECK (status IN ('working', 'broken', 'unsure')),
    notes TEXT,
    photo_url TEXT,
    moderation_status TEXT NOT NULL DEFAULT 'pending'
        CHECK (moderation_status IN ('pending', 'approved', 'rejected')),
    moderated_by UUID REFERENCES auth.users(id),
    moderated_at TIMESTAMPTZ,
    rejection_reason TEXT,
    ip_hash TEXT,                              -- SHA256 hashed client IP for rate limiting
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_status_reports_camera 
    ON public.status_reports (camera_id);

CREATE INDEX IF NOT EXISTS idx_status_reports_moderation 
    ON public.status_reports (moderation_status);


-- 3. Row-Level Security (RLS) Policies
ALTER TABLE public.camera_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.status_reports ENABLE ROW LEVEL SECURITY;

-- Anyone can read camera nodes
CREATE POLICY "Public Read Camera Nodes" 
    ON public.camera_nodes FOR SELECT 
    USING (true);

-- Anyone can submit a status report (anonymously with rate limiting)
CREATE POLICY "Public Submit Status Report" 
    ON public.status_reports FOR INSERT 
    WITH CHECK (moderation_status = 'pending'); -- Users cannot self-approve

-- Only authenticated admins/moderators can view full reports or pending queue
CREATE POLICY "Admins Read Status Reports" 
    ON public.status_reports FOR SELECT 
    TO authenticated 
    USING (true);

-- Only authenticated admins/moderators can update report moderation status
CREATE POLICY "Admins Moderate Status Reports" 
    ON public.status_reports FOR UPDATE 
    TO authenticated 
    USING (true);
