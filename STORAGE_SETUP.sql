-- Storage Setup for AndikaCV Templates
-- Run this in Supabase SQL Editor

-- Step 1: Create templates bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('templates', 'templates', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Step 2: Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Step 3: Create policies for templates bucket
-- Allow everyone to view/download templates (public bucket)
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'templates');

-- Allow authenticated users to upload templates
CREATE POLICY "Authenticated Upload" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'templates' AND auth.role() = 'authenticated');

-- Allow authenticated users to update their uploads
CREATE POLICY "Authenticated Update" ON storage.objects
FOR UPDATE USING (bucket_id = 'templates' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete their uploads
CREATE POLICY "Authenticated Delete" ON storage.objects
FOR DELETE USING (bucket_id = 'templates' AND auth.role() = 'authenticated'); 