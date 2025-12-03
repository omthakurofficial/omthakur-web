import { Metadata } from 'next'

interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  author?: string
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
  category?: string
}

const baseUrl = 'https://omthakur.tech'
const defaultImage = `${baseUrl}/api/og`

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  image = defaultImage,
  url = baseUrl,
  type = 'website',
  author = 'Om Thakur',
  publishedTime,
  modifiedTime,
  tags = [],
  category
}: SEOConfig): Metadata {
  const fullTitle = title.includes('Om Thakur') ? title : `${title} | Om Thakur`
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`

  return {
    metadataBase: new URL(baseUrl),
    title: fullTitle,
    description,
    keywords: [
      'Om Thakur',
      'Full Stack Developer',
      'Web Developer',
      'Software Engineer',
      'Tech Content Creator',
      'Photography',
      'Blog',
      'Portfolio',
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Node.js',
      'Frontend Developer',
      'Backend Developer',
      ...keywords
    ].join(', '),
    authors: [{ name: author, url: baseUrl }],
    creator: author,
    publisher: author,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type,
      locale: 'en_US',
      url: fullUrl,
      title: fullTitle,
      description,
      siteName: 'Om Thakur',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors: [author],
        tags,
        section: category,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: '@omthakur',
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: fullUrl,
      types: {
        'application/rss+xml': `${baseUrl}/feed.xml`,
      },
    },
  }
}

export function generateStructuredData(data: any) {
  return {
    '@context': 'https://schema.org',
    ...data,
  }
}

// Common structured data templates
export const personStructuredData = generateStructuredData({
  '@type': 'Person',
  name: 'Om Thakur',
  jobTitle: 'Full Stack Developer',
  description: 'Full Stack Developer and Tech Content Creator specializing in modern web development, photography, and technical writing.',
  url: baseUrl,
  image: `${baseUrl}/images/om-thakur.jpg`,
  sameAs: [
    'https://github.com/omthakur',
    'https://linkedin.com/in/omthakur',
    'https://twitter.com/omthakur',
    'https://instagram.com/omthakur.tech',
  ],
  knowsAbout: [
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'Web Development',
    'Software Engineering',
    'Photography',
    'Content Creation',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Freelance',
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
  },
})

export const websiteStructuredData = generateStructuredData({
  '@type': 'WebSite',
  name: 'Om Thakur',
  description: 'Full Stack Developer and Tech Content Creator specializing in modern web development, photography, and technical writing.',
  url: baseUrl,
  author: {
    '@type': 'Person',
    name: 'Om Thakur',
  },
  inLanguage: 'en-US',
  copyrightYear: new Date().getFullYear(),
  copyrightHolder: {
    '@type': 'Person',
    name: 'Om Thakur',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${baseUrl}/blog?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
})

export const blogStructuredData = generateStructuredData({
  '@type': 'Blog',
  name: 'Om Thakur Blog',
  description: 'Technical blog covering web development, programming tutorials, and industry insights.',
  url: `${baseUrl}/blog`,
  author: {
    '@type': 'Person',
    name: 'Om Thakur',
  },
  inLanguage: 'en-US',
  publisher: {
    '@type': 'Person',
    name: 'Om Thakur',
  },
})

export function generateBlogPostStructuredData(post: {
  title: string
  description: string
  content: string
  publishedAt: string
  updatedAt?: string
  slug: string
  tags?: string[]
  category?: string
  image?: string
  readTime?: number
}) {
  return generateStructuredData({
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    articleBody: post.content,
    url: `${baseUrl}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: 'Om Thakur',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Person',
      name: 'Om Thakur',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug}`,
    },
    image: post.image ? {
      '@type': 'ImageObject',
      url: post.image,
      width: 1200,
      height: 630,
    } : undefined,
    keywords: post.tags?.join(', '),
    articleSection: post.category,
    wordCount: post.content.split(' ').length,
    timeRequired: post.readTime ? `PT${post.readTime}M` : undefined,
    inLanguage: 'en-US',
  })
}

export const portfolioStructuredData = generateStructuredData({
  '@type': 'CreativeWork',
  name: 'Om Thakur Portfolio',
  description: 'Portfolio showcasing web development projects, technical expertise, and creative work.',
  url: `${baseUrl}/portfolio`,
  author: {
    '@type': 'Person',
    name: 'Om Thakur',
  },
  creator: {
    '@type': 'Person',
    name: 'Om Thakur',
  },
  genre: ['Web Development', 'Software Engineering', 'Photography'],
  inLanguage: 'en-US',
})

export const photographyStructuredData = generateStructuredData({
  '@type': 'ImageGallery',
  name: 'Om Thakur Photography',
  description: 'Photography portfolio featuring landscapes, portraits, and creative compositions.',
  url: `${baseUrl}/photos`,
  author: {
    '@type': 'Person',
    name: 'Om Thakur',
  },
  creator: {
    '@type': 'Person',
    name: 'Om Thakur',
  },
  genre: ['Photography', 'Art', 'Visual Arts'],
  inLanguage: 'en-US',
})

// SEO constants
export const defaultSEO = {
  title: 'Om Thakur - Full Stack Developer & Tech Content Creator',
  description: 'Full Stack Developer and Tech Content Creator specializing in modern web development, photography, and technical writing. Explore my portfolio, blog, and creative work.',
  keywords: [
    'Full Stack Developer',
    'Web Developer',
    'Software Engineer',
    'Tech Content Creator',
    'Photography',
    'Blog',
    'Portfolio',
    'React',
    'Next.js',
    'TypeScript'
  ]
}

export const pageTitles = {
  home: 'Om Thakur - Full Stack Developer & Tech Content Creator',
  blog: 'Blog - Om Thakur',
  portfolio: 'Portfolio - Om Thakur',
  photos: 'Photography - Om Thakur',
  videos: 'Videos - Om Thakur',
  resume: 'Resume - Om Thakur',
  sponsorship: 'Sponsorship - Om Thakur',
  contact: 'Contact - Om Thakur',
}