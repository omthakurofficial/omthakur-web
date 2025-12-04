"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  ArrowRight, 
  Cloud, 
  Server, 
  Code, 
  BookOpen, 
  Camera, 
  Play,
  ChevronDown,
  Download,
  Mail,
  MapPin,
  Calendar,
  Loader2
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/layout/sidebar"

// Types
interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string
  cover_image?: string
  published: boolean
  featured: boolean
  views: number
  reading_time: number
  published_at?: string
  created_at: string
}

const quickStats = [
  { label: "Articles Written", value: "50+" },
  { label: "Students Taught", value: "1K+" },
  { label: "Projects Deployed", value: "100+" },
  { label: "Years Experience", value: "5+" }
]

export default function HomePage() {
  const [featuredPosts, setFeaturedPosts] = React.useState<Post[]>([])
  const [loading, setLoading] = React.useState(true)

  // Fetch featured posts from API
  React.useEffect(() => {
    async function fetchFeaturedPosts() {
      try {
        setLoading(true)
        
        // Fetch published posts only, limit to 3 for homepage
        const response = await fetch('/api/posts-crud?all=false')
        if (!response.ok) {
          throw new Error('Failed to fetch posts')
        }
        
        const data = await response.json()
        
        if (data.posts) {
          // Take first 3 posts for homepage display
          setFeaturedPosts(data.posts.slice(0, 3))
        }
      } catch (error) {
        console.error('Error fetching featured posts:', error)
        setFeaturedPosts([])
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedPosts()
  }, [])

  // Helper function to get default cover image
  const getDefaultCoverImage = (title: string) => {
    const hash = title.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)
    
    const images = [
      'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1605745341112-85968b19335a?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=300&fit=crop'
    ]
    
    return images[Math.abs(hash) % images.length]
  }

  // Helper function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Badge className="mb-4">Available for Consulting</Badge>
                <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  Om Thakur
                </h1>
                <h2 className="text-xl lg:text-2xl text-muted-foreground">
                  Cloud & DevOps Engineer
                </h2>
                <p className="text-lg text-muted-foreground max-w-lg">
                  AWS Certified Solutions Architect passionate about cloud infrastructure, 
                  automation, and sharing knowledge through writing and teaching.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/portfolio">
                  <Button size="lg" className="w-full sm:w-auto">
                    View My Work
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <Mail className="mr-2 h-4 w-4" />
                    Get In Touch
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">India</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Available for Projects</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                  alt="Om Thakur"
                  className="w-80 h-80 rounded-full mx-auto object-cover border-4 border-white shadow-2xl"
                />
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="px-4 py-2">AWS Certified</Badge>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="h-6 w-6 animate-bounce text-muted-foreground" />
        </motion.div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Quick Stats */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {quickStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card>
                      <CardContent className="p-6 text-center">
                        <h3 className="text-2xl font-bold text-primary">{stat.value}</h3>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Services/Expertise */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-8">What I Do</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <Cloud className="h-12 w-12 text-blue-600 mb-4" />
                    <CardTitle>Cloud Architecture</CardTitle>
                    <CardDescription>
                      Design and implement scalable cloud solutions on AWS with best practices for security, performance, and cost optimization.
                    </CardDescription>
                  </CardHeader>
                </Card>
                
                <Card>
                  <CardHeader>
                    <Server className="h-12 w-12 text-green-600 mb-4" />
                    <CardTitle>DevOps & Automation</CardTitle>
                    <CardDescription>
                      Build robust CI/CD pipelines, infrastructure as code, and automation solutions using modern DevOps practices.
                    </CardDescription>
                  </CardHeader>
                </Card>
                
                <Card>
                  <CardHeader>
                    <Code className="h-12 w-12 text-purple-600 mb-4" />
                    <CardTitle>Technical Consulting</CardTitle>
                    <CardDescription>
                      Help teams adopt cloud technologies, optimize existing infrastructure, and implement DevOps transformation.
                    </CardDescription>
                  </CardHeader>
                </Card>
                
                <Card>
                  <CardHeader>
                    <BookOpen className="h-12 w-12 text-orange-600 mb-4" />
                    <CardTitle>Training & Mentoring</CardTitle>
                    <CardDescription>
                      Conduct workshops, training sessions, and mentoring on AWS, Docker, Kubernetes, and DevOps practices.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </motion.section>

            {/* Featured Blog Posts */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Latest Articles</h2>
                <Link href="/blog">
                  <Button variant="outline">
                    View All Posts
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              
              {/* Loading State */}
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin mr-2" />
                  <span>Loading latest articles...</span>
                </div>
              ) : featuredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {featuredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Link href={`/blog/${post.slug}`}>
                        <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                          <div className="aspect-video relative overflow-hidden rounded-t-lg">
                            <img
                              src={post.cover_image || getDefaultCoverImage(post.title)}
                              alt={post.title}
                              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                            />
                            <Badge className="absolute top-4 left-4 bg-blue-600">DevOps</Badge>
                          </div>
                          <CardHeader>
                            <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                              {post.title}
                            </CardTitle>
                            <CardDescription className="line-clamp-3">
                              {post.excerpt || 'Read this amazing article...'}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <span>{formatDate(post.published_at || post.created_at)}</span>
                              <span>{post.reading_time || 5} min read</span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <CardContent>
                    <h3 className="text-xl font-semibold mb-2">No Articles Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      I haven't published any articles yet. Check back soon for amazing content!
                    </p>
                    <Link href="/admin/posts/new">
                      <Button>Create First Article</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </motion.section>

            {/* Quick Links Section */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-8">Explore More</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="/photos">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="text-center">
                      <Camera className="h-12 w-12 mx-auto text-pink-600 mb-4" />
                      <CardTitle>Photography</CardTitle>
                      <CardDescription>
                        Explore my photography portfolio featuring nature, architecture, and travel shots.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
                
                <Link href="/videos">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="text-center">
                      <Play className="h-12 w-12 mx-auto text-red-600 mb-4" />
                      <CardTitle>Video Tutorials</CardTitle>
                      <CardDescription>
                        Watch practical tutorials and tech talks on DevOps, AWS, and cloud technologies.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
                
                <Link href="/resume">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="text-center">
                      <Download className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                      <CardTitle>Resume</CardTitle>
                      <CardDescription>
                        View my professional experience, skills, and achievements in cloud engineering.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <Sidebar className="hidden lg:block" />
        </div>
      </div>
    </div>
  )
}
