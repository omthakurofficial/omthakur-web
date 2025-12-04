"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Calendar,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  ArrowLeft,
  ArrowRight,
  Tag,
  User,
  ChevronUp,
  Twitter,
  Facebook,
  Linkedin
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/layout/sidebar"

interface Props {
  params: {
    slug: string
  }
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  published: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

const relatedPosts = [
  {
    id: "2",
    title: "Docker Multi-Stage Builds: Optimize Your Container Images",
    slug: "docker-multi-stage-builds",
    coverImage: "https://images.unsplash.com/photo-1605745341112-85968b19335a?w=400",
    publishedAt: "2024-11-18",
    readingTime: 6
  },
  {
    id: "3",
    title: "CI/CD Best Practices with GitHub Actions",
    slug: "cicd-github-actions",
    coverImage: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400",
    publishedAt: "2024-11-15",
    readingTime: 10
  }
]

export default function BlogPostPage({ params }: Props) {
  const [showScrollToTop, setShowScrollToTop] = React.useState(false)
  const [liked, setLiked] = React.useState(false)
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/${params.slug}`)
        if (!response.ok) {
          throw new Error('Post not found')
        }
        const data = await response.json()
        setBlogPost(data)
      } catch (err) {
        setError('Failed to load blog post')
        console.error('Error fetching blog post:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [params.slug])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading blog post...</p>
        </div>
      </div>
    )
  }

  if (error || !blogPost) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-4">{error || 'Blog post not found'}</p>
          <Link href="/blog">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const shareOnTwitter = () => {
    const text = `${blogPost.title} by @omthakur`
    const url = window.location.href
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
  }

  const shareOnLinkedIn = () => {
    const url = window.location.href
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
  }

  const shareOnFacebook = () => {
    const url = window.location.href
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
  }

  const handleLike = () => {
    setLiked(!liked)
    // Here you would typically make an API call to update the like status
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative">
          {/* Cover Image */}
          <div className="aspect-[21/9] relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200"
              alt={blogPost.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2">
                  <Link href="/blog">
                    <Button variant="outline" size="sm" className="bg-white/90 text-black hover:bg-white">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Blog
                    </Button>
                  </Link>
                  <Badge 
                    className="text-white bg-blue-600"
                  >
                    Blog
                  </Badge>
                  {blogPost.featured && (
                    <Badge variant="destructive" className="text-white">
                      Featured
                    </Badge>
                  )}
                </div>

                <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                  {blogPost.title}
                </h1>

                <p className="text-xl text-white/90 max-w-3xl">
                  {blogPost.excerpt || "Read this amazing blog post..."}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-white/80">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                      alt="Om Thakur"
                      className="w-8 h-8 rounded-full border-2 border-white/50"
                    />
                    <span className="font-medium">Om Thakur</span>
                  </div>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(blogPost.created_at).toLocaleDateString()}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    5 min read
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    variant="outline"
                    className="text-white border-white/50 hover:bg-white/20"
                  >
                    <Tag className="mr-1 h-3 w-3" />
                    Technology
                  </Badge>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-3">
            <div className="max-w-none">
              {/* Social Share Bar - Sticky */}
              <div className="hidden lg:block fixed left-8 top-1/2 transform -translate-y-1/2 z-50">
                <Card className="p-3 shadow-lg">
                  <div className="flex flex-col gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleLike}
                      className={liked ? "bg-red-50 border-red-200 text-red-600" : ""}
                    >
                      <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
                      <span className="sr-only">Like</span>
                    </Button>
                    
                    <Button size="sm" variant="outline" onClick={shareOnTwitter}>
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">Share on Twitter</span>
                    </Button>
                    
                    <Button size="sm" variant="outline" onClick={shareOnLinkedIn}>
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">Share on LinkedIn</span>
                    </Button>
                    
                    <Button size="sm" variant="outline" onClick={shareOnFacebook}>
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">Share on Facebook</span>
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Article Body */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="prose prose-lg max-w-none dark:prose-invert"
              >
                <div className="whitespace-pre-wrap">
                  {blogPost.content}
                </div>
              </motion.div>

              {/* Mobile Social Share */}
              <div className="lg:hidden mt-8 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-3">Share this article</h3>
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleLike} variant={liked ? "default" : "outline"}>
                    <Heart className={`mr-2 h-4 w-4 ${liked ? "fill-current" : ""}`} />
                    {liked ? "Liked" : "Like"}
                  </Button>
                  <Button size="sm" variant="outline" onClick={shareOnTwitter}>
                    <Twitter className="mr-2 h-4 w-4" />
                    Twitter
                  </Button>
                  <Button size="sm" variant="outline" onClick={shareOnLinkedIn}>
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </Button>
                </div>
              </div>

              {/* Author Info */}
              <Card className="mt-8">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                      alt="Om Thakur"
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        Om Thakur
                        <Badge variant="secondary">Author</Badge>
                      </CardTitle>
                      <CardDescription className="mt-2">
                        Cloud & DevOps Engineer passionate about technology and sharing knowledge.
                      </CardDescription>
                      <div className="flex items-center gap-4 mt-3">
                        <Link href="/about">
                          <Button variant="outline" size="sm">
                            <User className="mr-2 h-4 w-4" />
                            View Profile
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          Follow
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Related Posts */}
              <section className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedPosts.map((post) => (
                    <Card key={post.id} className="hover:shadow-lg transition-shadow">
                      <div className="aspect-video relative overflow-hidden rounded-t-lg">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </CardTitle>
                        <CardDescription>
                          <div className="flex items-center gap-2 text-sm">
                            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>{post.readingTime} min read</span>
                          </div>
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-12 pt-8 border-t">
                <Link href="/blog">
                  <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    All Articles
                  </Button>
                </Link>
                
                <Link href="/blog/docker-multi-stage-builds">
                  <Button>
                    Next Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Button
            size="icon"
            onClick={scrollToTop}
            className="rounded-full shadow-lg"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </div>
  )
}