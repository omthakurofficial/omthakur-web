"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Search,
  Filter,
  Calendar,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  ArrowRight,
  Tag,
  Loader2
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/layout/sidebar"

// Types for our data structures
interface Category {
  id: string
  name: string
  slug: string
  description?: string
  color: string
}

interface Tag {
  id: string
  name: string
  slug: string
  color: string
}

interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string
  content?: string
  cover_image?: string
  published: boolean
  featured: boolean
  views: number
  reading_time: number
  published_at?: string
  created_at: string
  updated_at: string
}

// Default fallback categories for display
const defaultCategories = [
  { name: "All", slug: "all", count: 0 },
  { name: "Technology", slug: "technology", count: 0 },
  { name: "DevOps", slug: "devops", count: 0 },
  { name: "Cloud Computing", slug: "cloud-computing", count: 0 },
  { name: "Tutorials", slug: "tutorials", count: 0 }
]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("all")
  const [posts, setPosts] = React.useState<Post[]>([])
  const [categories, setCategories] = React.useState(defaultCategories)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [filteredPosts, setFilteredPosts] = React.useState<Post[]>([])

  // Fetch posts from API
  React.useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch published posts only
        const response = await fetch('/api/posts-crud?all=false')
        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.status}`)
        }
        
        const data = await response.json()
        
        if (data.posts) {
          setPosts(data.posts)
          
          // Update category counts based on actual data
          const categoryCount = { all: data.posts.length }
          setCategories(prev => prev.map(cat => ({
            ...cat,
            count: cat.slug === 'all' ? data.posts.length : (categoryCount as any)[cat.slug] || 0
          })))
        } else {
          setPosts([])
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
        setError(error instanceof Error ? error.message : 'Failed to load posts')
        setPosts([])
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  // Filter posts based on search and category
  React.useEffect(() => {
    let filtered = posts

    if (searchQuery.trim()) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    setFilteredPosts(filtered)
  }, [searchQuery, selectedCategory, posts])

  // Get featured post
  const featuredPost = posts.find(post => post.featured)

  // Helper function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Helper function to get default cover image
  const getDefaultCoverImage = (title: string) => {
    const hash = title.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)
    
    const images = [
      'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1605745341112-85968b19335a?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop'
    ]
    
    return images[Math.abs(hash) % images.length]
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Tech Blog
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Insights, tutorials, and thoughts on DevOps, Cloud Computing, and modern technology
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                disabled={loading}
              />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin mr-2" />
                <span>Loading posts...</span>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-12">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-4">
                  <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                    Failed to load posts
                  </h3>
                  <p className="text-red-600 dark:text-red-300">
                    {error}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
              </div>
            )}

            {/* Content when loaded successfully */}
            {!loading && !error && (
              <>
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {categories.map((category) => (
                    <Button
                      key={category.slug}
                      variant={selectedCategory === category.slug ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.slug)}
                      className="flex items-center gap-1"
                    >
                      <Filter className="h-3 w-3" />
                      {category.name}
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </Button>
                  ))}
                </div>

                {/* Featured Post */}
                {featuredPost && selectedCategory === "all" && !searchQuery && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="destructive">Featured</Badge>
                    </div>
                    
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="md:grid md:grid-cols-2 gap-0">
                        <div className="aspect-video md:aspect-square relative overflow-hidden">
                          <img
                            src={featuredPost.cover_image || getDefaultCoverImage(featuredPost.title)}
                            alt={featuredPost.title}
                            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                          />
                          <Badge 
                            className="absolute top-4 left-4"
                            style={{ backgroundColor: '#10B981' }}
                          >
                            DevOps
                          </Badge>
                        </div>
                        
                        <div className="p-6 flex flex-col justify-between">
                          <div className="space-y-4">
                            <h2 className="text-2xl font-bold hover:text-primary transition-colors">
                              <Link href={`/blog/${featuredPost.slug}`}>
                                {featuredPost.title}
                              </Link>
                            </h2>
                            
                            <p className="text-muted-foreground">
                              {featuredPost.excerpt || 'No preview available'}
                            </p>
                          </div>

                          <div className="mt-6">
                            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                              <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {formatDate(featuredPost.published_at || featuredPost.created_at)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {featuredPost.reading_time || 5} min read
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Eye className="h-3 w-3" />
                                  {featuredPost.views}
                                </span>
                              </div>

                              <Link href={`/blog/${featuredPost.slug}`}>
                                <Button>
                                  Read More
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )}

                {/* Blog Posts Grid */}
                <div className="space-y-8">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                          <div className="md:grid md:grid-cols-3 gap-0">
                            <div className="aspect-video relative overflow-hidden">
                              <img
                                src={post.cover_image || getDefaultCoverImage(post.title)}
                                alt={post.title}
                                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                              />
                              <Badge 
                                className="absolute top-4 left-4"
                                style={{ backgroundColor: '#10B981' }}
                              >
                                DevOps
                              </Badge>
                            </div>
                            
                            <div className="md:col-span-2 p-6">
                              <div className="space-y-3">
                                <h3 className="text-xl font-semibold hover:text-primary transition-colors">
                                  <Link href={`/blog/${post.slug}`}>
                                    {post.title}
                                  </Link>
                                </h3>
                                
                                <p className="text-muted-foreground line-clamp-2">
                                  {post.excerpt || 'No preview available'}
                                </p>

                                <div className="flex items-center justify-between pt-2">
                                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                      <img
                                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                                        alt="Om Thakur"
                                        className="w-6 h-6 rounded-full"
                                      />
                                      <span>Om Thakur</span>
                                    </div>
                                    <span>•</span>
                                    <span>{formatDate(post.published_at || post.created_at)}</span>
                                    <span>•</span>
                                    <span>{post.reading_time || 5} min read</span>
                                  </div>

                                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <Eye className="h-3 w-3" />
                                      {post.views}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))
                  ) : (
                    !loading && (
                      <div className="text-center py-12">
                        {posts.length === 0 ? (
                          // No posts in database at all
                          <Card className="p-8">
                            <div className="space-y-4">
                              <h3 className="text-xl font-semibold">Welcome to Your Blog!</h3>
                              <p className="text-muted-foreground">
                                You haven't created any blog posts yet. Get started by creating your first post.
                              </p>
                              <div className="space-y-2">
                                <Link href="/admin/posts/new">
                                  <Button size="lg" className="mr-2">
                                    Create Your First Post
                                  </Button>
                                </Link>
                                <Link href="/admin">
                                  <Button variant="outline" size="lg">
                                    Go to Admin Dashboard
                                  </Button>
                                </Link>
                              </div>
                              
                              <div className="mt-6 p-4 bg-muted rounded-lg text-sm text-left">
                                <h4 className="font-semibold mb-2">Quick Start:</h4>
                                <ol className="list-decimal list-inside space-y-1">
                                  <li>Click "Create Your First Post" above</li>
                                  <li>Fill in the title, content, and excerpt</li>
                                  <li>Toggle "Published" to make it visible</li>
                                  <li>Click "Create Post" to save</li>
                                  <li>Return here to see your published posts</li>
                                </ol>
                              </div>
                            </div>
                          </Card>
                        ) : (
                          // Posts exist but none match current filter
                          <div>
                            <h3 className="text-xl font-semibold mb-2">No posts found</h3>
                            <p className="text-muted-foreground mb-4">
                              No posts match your current search criteria
                            </p>
                            <Button
                              variant="outline"
                              onClick={() => setSearchQuery("")}
                            >
                              Clear search
                            </Button>
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>

                {/* Load More - placeholder for future pagination */}
                {filteredPosts.length > 0 && filteredPosts.length >= 10 && (
                  <div className="text-center mt-12">
                    <Button variant="outline" size="lg" disabled>
                      Load More Articles (Coming Soon)
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </div>
    </div>
  )
}