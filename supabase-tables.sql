-- COMPLETE DATABASE SCHEMA FOR OM THAKUR WEBSITE
-- Copy and paste this ENTIRE script in Supabase SQL Editor

-- Create custom types/enums
CREATE TYPE user_role AS ENUM ('USER', 'ADMIN');
CREATE TYPE photo_category AS ENUM ('NATURE', 'PORTRAIT', 'STREET', 'CREATIVE', 'ARCHITECTURE', 'TRAVEL');
CREATE TYPE video_category AS ENUM ('TECH', 'TUTORIAL', 'VLOG', 'TRAVEL', 'REVIEW');
CREATE TYPE ad_placement AS ENUM ('HEADER', 'SIDEBAR', 'FOOTER', 'POST_TOP', 'POST_MIDDLE', 'POST_BOTTOM');
CREATE TYPE setting_type AS ENUM ('STRING', 'NUMBER', 'BOOLEAN', 'JSON');

-- 1. Users table
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    avatar TEXT,
    role user_role DEFAULT 'USER',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Categories table
CREATE TABLE categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    color TEXT DEFAULT '#6B7280',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Tags table
CREATE TABLE tags (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    color TEXT DEFAULT '#6B7280',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Posts table (main blog content)
CREATE TABLE posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT,
    excerpt TEXT,
    cover_image TEXT,
    published BOOLEAN DEFAULT false,
    featured BOOLEAN DEFAULT false,
    views INTEGER DEFAULT 0,
    reading_time INTEGER DEFAULT 0,
    published_at TIMESTAMP WITH TIME ZONE,
    meta_title TEXT,
    meta_description TEXT,
    meta_keywords TEXT,
    og_image TEXT,
    author_id UUID REFERENCES users(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Post-Tag junction table (many-to-many)
CREATE TABLE post_tags (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    UNIQUE(post_id, tag_id)
);

-- 6. Comments table
CREATE TABLE comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content TEXT NOT NULL,
    approved BOOLEAN DEFAULT false,
    author_id UUID REFERENCES users(id),
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES comments(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Likes table
CREATE TABLE likes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, post_id)
);

-- 8. Photos table (photography portfolio)
CREATE TABLE photos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    thumbnail TEXT,
    category photo_category DEFAULT 'CREATIVE',
    tags TEXT[],
    featured BOOLEAN DEFAULT false,
    visible BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. Videos table (YouTube integration)
CREATE TABLE videos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    youtube_id TEXT UNIQUE NOT NULL,
    thumbnail TEXT,
    category video_category DEFAULT 'TECH',
    tags TEXT[],
    featured BOOLEAN DEFAULT false,
    visible BOOLEAN DEFAULT true,
    duration INTEGER, -- in seconds
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. Resume table
CREATE TABLE resumes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content JSONB, -- Flexible JSON content for resume data
    pdf_url TEXT,
    visible BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 11. Portfolio table (projects showcase)
CREATE TABLE portfolio_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    content TEXT, -- Rich content/markdown
    images TEXT[], -- Array of image URLs
    demo_url TEXT,
    github_url TEXT,
    technologies TEXT[], -- Array of tech stack
    category TEXT DEFAULT 'DevOps',
    featured BOOLEAN DEFAULT false,
    visible BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 12. Ads table (monetization)
CREATE TABLE ads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    content TEXT, -- HTML/JS content
    placement ad_placement DEFAULT 'SIDEBAR',
    active BOOLEAN DEFAULT false,
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 13. Settings table (site configuration)
CREATE TABLE settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    type setting_type DEFAULT 'STRING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 14. Analytics table (visitor tracking)
CREATE TABLE analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event TEXT NOT NULL, -- page_view, post_view, etc.
    data JSONB, -- Additional event data
    ip TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX idx_posts_published ON posts(published, published_at DESC);
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_author ON posts(author_id);
CREATE INDEX idx_posts_category ON posts(category_id);
CREATE INDEX idx_comments_post ON comments(post_id);
CREATE INDEX idx_photos_category ON photos(category);
CREATE INDEX idx_videos_category ON videos(category);
CREATE INDEX idx_analytics_event ON analytics(event, created_at);

-- Insert sample admin user
INSERT INTO users (email, username, password, name, role) VALUES 
('om@thakur.com', 'omthakur', '$2b$10$example.hash.here', 'Om Thakur', 'ADMIN');

-- Insert sample categories
INSERT INTO categories (name, slug, description, color) VALUES 
('Technology', 'technology', 'Tech tutorials and guides', '#3B82F6'),
('DevOps', 'devops', 'DevOps best practices', '#10B981'),
('Cloud Computing', 'cloud-computing', 'AWS and cloud solutions', '#8B5CF6'),
('Web Development', 'web-development', 'Frontend and backend development', '#F59E0B'),
('Tutorials', 'tutorials', 'Step-by-step tutorials', '#EF4444');

-- Insert sample tags
INSERT INTO tags (name, slug, color) VALUES 
('AWS', 'aws', '#FF9900'),
('Docker', 'docker', '#2496ED'),
('Kubernetes', 'kubernetes', '#326CE5'),
('React', 'react', '#61DAFB'),
('Next.js', 'nextjs', '#000000'),
('TypeScript', 'typescript', '#3178C6'),
('Linux', 'linux', '#FCC624'),
('CI/CD', 'cicd', '#FF6B6B'),
('Terraform', 'terraform', '#7B42BC'),
('Node.js', 'nodejs', '#339933'),
('Python', 'python', '#3776AB'),
('DevOps', 'devops', '#326CE5');

-- Insert sample posts
INSERT INTO posts (title, slug, content, excerpt, published, featured, author_id) VALUES 
('Getting Started with DevOps', 'getting-started-devops', 
'This is a comprehensive guide to DevOps practices and tools...', 
'Learn DevOps fundamentals and best practices', true, true,
(SELECT id FROM users WHERE username = 'omthakur' LIMIT 1)),

('Docker Best Practices', 'docker-best-practices', 
'Docker containers are essential for modern development...', 
'Master Docker containers and containerization', true, false,
(SELECT id FROM users WHERE username = 'omthakur' LIMIT 1)),

('AWS EKS Complete Guide', 'aws-eks-complete-guide', 
'Learn how to deploy and manage Kubernetes on AWS EKS...', 
'Complete guide to AWS EKS deployment', true, true,
(SELECT id FROM users WHERE username = 'omthakur' LIMIT 1));

-- Insert sample photos
INSERT INTO photos (title, description, image_url, category, featured) VALUES 
('Mountain Sunset', 'Beautiful mountain view at sunset', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', 'NATURE', true),
('Modern Architecture', 'City building design', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5', 'ARCHITECTURE', false),
('Street Photography', 'Urban life captured', 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000', 'STREET', false);

-- Insert sample videos
INSERT INTO videos (title, description, youtube_id, category, featured) VALUES 
('DevOps Tutorial Series', 'Complete DevOps tutorial for beginners', 'devops_tutorial_2024', 'TUTORIAL', true),
('AWS Best Practices', 'AWS cloud architecture best practices', 'aws_best_practices_2024', 'TECH', false),
('Docker Fundamentals', 'Learn Docker from scratch', 'docker_fundamentals_2024', 'TUTORIAL', false);

-- Insert sample portfolio items
INSERT INTO portfolio_items (title, description, content, technologies, category, featured, demo_url, github_url) VALUES 
('Personal Website', 'My personal portfolio website built with Next.js', 
'A modern, responsive website showcasing my work...', 
ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'], 'Web Development', true,
'https://omthakur.com', 'https://github.com/omthakur/website'),

('DevOps Pipeline', 'Complete CI/CD pipeline for microservices', 
'Automated deployment pipeline using Jenkins...', 
ARRAY['Jenkins', 'Docker', 'Kubernetes', 'AWS'], 'DevOps', true,
NULL, 'https://github.com/omthakur/devops-pipeline');

-- Insert sample settings
INSERT INTO settings (key, value, type) VALUES 
('site_title', 'Om Thakur - Cloud & DevOps Engineer', 'STRING'),
('site_description', 'Personal website and blog about DevOps, Cloud Computing, and Technology', 'STRING'),
('posts_per_page', '12', 'NUMBER'),
('enable_comments', 'true', 'BOOLEAN'),
('social_links', '{"github": "omthakurofficial", "linkedin": "omthakur", "twitter": "omthakur"}', 'JSON');

-- Enable Row Level Security (RLS) for public access
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to published posts" ON posts FOR SELECT USING (published = true);
CREATE POLICY "Allow public read access to visible photos" ON photos FOR SELECT USING (visible = true);
CREATE POLICY "Allow public read access to visible videos" ON videos FOR SELECT USING (visible = true);
CREATE POLICY "Allow public read access to visible portfolio" ON portfolio_items FOR SELECT USING (visible = true);
CREATE POLICY "Allow public read access to categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access to tags" ON tags FOR SELECT USING (true);

-- Create policies for authenticated users (for editing)
CREATE POLICY "Allow authenticated users to manage posts" ON posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage photos" ON photos FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage videos" ON videos FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage portfolio" ON portfolio_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage categories" ON categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage tags" ON tags FOR ALL USING (auth.role() = 'authenticated');

-- Allow service role to manage all data (for admin access)
CREATE POLICY "Allow service role full access to posts" ON posts FOR ALL TO service_role USING (true);
CREATE POLICY "Allow service role full access to photos" ON photos FOR ALL TO service_role USING (true);
CREATE POLICY "Allow service role full access to videos" ON videos FOR ALL TO service_role USING (true);
CREATE POLICY "Allow service role full access to portfolio" ON portfolio_items FOR ALL TO service_role USING (true);
CREATE POLICY "Allow service role full access to categories" ON categories FOR ALL TO service_role USING (true);
CREATE POLICY "Allow service role full access to tags" ON tags FOR ALL TO service_role USING (true);