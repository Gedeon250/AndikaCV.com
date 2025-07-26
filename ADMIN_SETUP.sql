-- Admin Dashboard Setup for AndikaCV.com
-- Run this in your Supabase SQL Editor

-- Step 1: Create templates table
CREATE TABLE IF NOT EXISTS templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('cv', 'cover-letter')),
  description TEXT,
  is_premium BOOLEAN DEFAULT false,
  file_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Step 2: Enable RLS on templates table
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

-- Step 3: Create policies for templates
-- Allow all authenticated users to view templates
CREATE POLICY "Users can view templates" ON templates
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow service role (admin) to manage templates
CREATE POLICY "Service role can manage templates" ON templates
  FOR ALL USING (auth.role() = 'service_role');

-- Step 4: Create storage bucket for templates
-- Note: You'll need to create this bucket manually in the Supabase dashboard
-- Go to Storage > Create a new bucket called 'templates'

-- Step 5: Create storage policies
-- Allow authenticated users to download templates
CREATE POLICY "Users can download templates" ON storage.objects
  FOR SELECT USING (bucket_id = 'templates' AND auth.role() = 'authenticated');

-- Allow service role to upload templates
CREATE POLICY "Service role can upload templates" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'templates' AND auth.role() = 'service_role');

-- Allow service role to update templates
CREATE POLICY "Service role can update templates" ON storage.objects
  FOR UPDATE USING (bucket_id = 'templates' AND auth.role() = 'service_role');

-- Allow service role to delete templates
CREATE POLICY "Service role can delete templates" ON storage.objects
  FOR DELETE USING (bucket_id = 'templates' AND auth.role() = 'service_role');

-- Step 6: Insert some sample templates
INSERT INTO templates (name, category, description, is_premium) VALUES
('Modern Professional CV', 'cv', 'Clean and modern CV template for professionals', false),
('Creative Designer CV', 'cv', 'Creative template for designers and artists', true),
('Executive CV', 'cv', 'Premium template for senior executives', true),
('Standard Cover Letter', 'cover-letter', 'Professional cover letter template', false),
('Creative Cover Letter', 'cover-letter', 'Creative cover letter for creative roles', true);

-- Step 7: Create admin users table (optional - for admin authentication)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) UNIQUE,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Step 8: Enable RLS on admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Step 9: Create admin policies
CREATE POLICY "Admins can manage admin_users" ON admin_users
  FOR ALL USING (auth.role() = 'service_role');

-- Step 10: Insert yourself as admin (replace with your user ID)
-- You'll need to get your user ID from the auth.users table first
-- INSERT INTO admin_users (user_id, role) VALUES ('your-user-id-here', 'admin');

SELECT 'Admin setup completed successfully!' as status; 