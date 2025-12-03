import { NextResponse } from 'next/server'

// This would typically fetch from your database
const blogPosts = [
  {
    title: 'Getting Started with Next.js 15: App Router Deep Dive',
    description: 'Comprehensive guide to building modern web applications with Next.js 15 and the new App Router architecture.',
    slug: 'getting-started-with-nextjs-15',
    publishedAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    category: 'Web Development',
    tags: ['Next.js', 'React', 'TypeScript', 'App Router']
  },
  {
    title: 'Tailwind CSS v4: Revolutionary Features and Migration Guide',
    description: 'Explore the groundbreaking features in Tailwind CSS v4 and learn how to migrate your existing projects seamlessly.',
    slug: 'tailwind-css-v4-features',
    publishedAt: '2024-01-10T09:30:00Z',
    updatedAt: '2024-01-10T09:30:00Z',
    category: 'CSS',
    tags: ['Tailwind CSS', 'CSS', 'Design', 'Frontend']
  },
  {
    title: 'Advanced TypeScript Patterns for React Applications',
    description: 'Master advanced TypeScript patterns and techniques to build type-safe, maintainable React applications.',
    slug: 'advanced-typescript-patterns-react',
    publishedAt: '2024-01-05T14:20:00Z',
    updatedAt: '2024-01-05T14:20:00Z',
    category: 'TypeScript',
    tags: ['TypeScript', 'React', 'JavaScript', 'Type Safety']
  }
]

export async function GET() {
  const baseUrl = 'https://omthakur.tech'
  
  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Om Thakur Blog</title>
    <description>Full Stack Developer and Tech Content Creator sharing insights on web development, programming, and technology.</description>
    <link>${baseUrl}</link>
    <language>en-US</language>
    <managingEditor>om@omthakur.tech (Om Thakur)</managingEditor>
    <webMaster>om@omthakur.tech (Om Thakur)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/images/logo.png</url>
      <title>Om Thakur Blog</title>
      <link>${baseUrl}</link>
      <width>144</width>
      <height>144</height>
    </image>
    ${blogPosts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <category><![CDATA[${post.category}]]></category>
      <author>om@omthakur.tech (Om Thakur)</author>
      ${post.tags.map(tag => `<category><![CDATA[${tag}]]></category>`).join('')}
    </item>
    `).join('')}
  </channel>
</rss>`

  return new NextResponse(rss, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=1200, stale-while-revalidate=600'
    }
  })
}