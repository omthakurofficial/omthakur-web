-- ADD SAMPLE DATA TO ALL TABLES (SAFE VERSION - HANDLES DUPLICATES)
-- Run this to populate your database with test data

-- Insert sample data into ads table
INSERT INTO ads (name, content, placement, active) VALUES 
('Header Banner', '<div>Sample Header Ad</div>', 'HEADER', true),
('Sidebar Widget', '<div>Sample Sidebar Ad</div>', 'SIDEBAR', true)
ON CONFLICT DO NOTHING;

-- Insert sample data into categories (handle duplicates)
INSERT INTO categories (name, slug, description, color) VALUES 
('Technology Blog', 'technology-blog', 'Tech tutorials and guides', '#3B82F6'),
('DevOps Guide', 'devops-guide', 'DevOps best practices', '#10B981'),
('Cloud Solutions', 'cloud-solutions', 'AWS and cloud solutions', '#8B5CF6'),
('Web Dev', 'web-dev', 'Frontend and backend development', '#F59E0B')
ON CONFLICT (name) DO NOTHING;

-- Insert sample data into tags (handle duplicates)
INSERT INTO tags (name, slug, color) VALUES 
('AWS Cloud', 'aws-cloud', '#FF9900'),
('Docker Containers', 'docker-containers', '#2496ED'),
('React Framework', 'react-framework', '#61DAFB'),
('Next.js Framework', 'nextjs-framework', '#000000'),
('Kubernetes', 'kubernetes', '#326CE5')
ON CONFLICT (name) DO NOTHING;

-- Insert sample user (admin)
INSERT INTO users (email, username, password, name, role) VALUES 
('admin@example.com', 'testadmin', '$2b$10$example.hash.here', 'Test Admin', 'ADMIN')
ON CONFLICT (email) DO NOTHING;

-- Insert sample posts
INSERT INTO posts (title, slug, content, excerpt, published, featured, author_id, category_id) VALUES 
('Getting Started with DevOps 2024', 'getting-started-devops-2024', 
'This is a comprehensive guide to DevOps practices...', 
'Learn DevOps fundamentals', true, true,
(SELECT id FROM users WHERE username = 'testadmin' LIMIT 1),
(SELECT id FROM categories WHERE slug = 'devops-guide' LIMIT 1)),

('Docker Best Practices 2024', 'docker-best-practices-2024', 
'Docker containers are essential for development...', 
'Master Docker containers', true, false,
(SELECT id FROM users WHERE username = 'testadmin' LIMIT 1),
(SELECT id FROM categories WHERE slug = 'technology-blog' LIMIT 1))
ON CONFLICT (slug) DO NOTHING;

-- Insert sample photos
INSERT INTO photos (title, description, image_url, category, featured) VALUES 
('Mountain Landscape', 'Beautiful mountain view', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', 'NATURE', true),
('Urban Architecture', 'Modern building design', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5', 'ARCHITECTURE', false)
ON CONFLICT DO NOTHING;

-- Insert sample videos
INSERT INTO videos (title, description, youtube_id, category, featured) VALUES 
('DevOps Tutorial 2024', 'Complete DevOps guide', 'devops_tutorial_2024_v2', 'TUTORIAL', true),
('AWS Guide 2024', 'AWS best practices', 'aws_guide_2024_v2', 'TECH', false)
ON CONFLICT (youtube_id) DO NOTHING;

-- Insert sample portfolio items
INSERT INTO portfolio_items (title, description, content, technologies, category, featured) VALUES 
('Portfolio Website 2024', 'Portfolio website built with Next.js', 
'Modern responsive website...', 
ARRAY['Next.js', 'TypeScript', 'Supabase'], 'Web Development', true),

('DevOps Automation', 'CI/CD pipeline project', 
'Automated deployment pipeline...', 
ARRAY['Jenkins', 'Docker', 'Kubernetes'], 'DevOps', true)
ON CONFLICT DO NOTHING;

-- Insert sample settings
INSERT INTO settings (key, value, type) VALUES 
('site_title_v2', 'Om Thakur - Cloud Engineer', 'STRING'),
('posts_per_page_v2', '12', 'NUMBER'),
('enable_comments_v2', 'true', 'BOOLEAN')
ON CONFLICT (key) DO NOTHING;

-- Insert sample analytics
INSERT INTO analytics (event, data, ip) VALUES 
('page_view', '{"page": "/", "user_agent": "Mozilla/5.0"}', '192.168.1.100'),
('post_view', '{"post_id": "1", "title": "DevOps Guide"}', '192.168.1.101');