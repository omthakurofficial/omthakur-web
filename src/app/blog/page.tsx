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
  Tag
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/layout/sidebar"

// Mock data - replace with actual API calls
const categories = [
  { name: "All", slug: "all", count: 25 },
  { name: "DevOps", slug: "devops", count: 12 },
  { name: "Cloud Computing", slug: "cloud-computing", count: 8 },
  { name: "Tutorials", slug: "tutorials", count: 5 }
]

const blogPosts = [
  {
    id: "1",
    title: "Complete Guide to AWS EKS: From Setup to Production",
    slug: "complete-guide-aws-eks",
    excerpt: "Learn how to set up and manage a production-ready Kubernetes cluster on AWS EKS with best practices and security considerations.",
    content: "Full content here...",
    coverImage: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800",
    author: {
      name: "Om Thakur",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      username: "omthakur"
    },
    category: {
      name: "DevOps",
      slug: "devops",
      color: "#10B981"
    },
    tags: [
      { name: "AWS", slug: "aws", color: "#FF9900" },
      { name: "Kubernetes", slug: "kubernetes", color: "#326CE5" }
    ],
    publishedAt: "2024-11-20",
    readingTime: 8,
    views: 1250,
    likes: 89,
    comments: 12,
    featured: true
  },
  {
    id: "2",
    title: "Docker Multi-Stage Builds: Optimize Your Container Images",
    slug: "docker-multi-stage-builds",
    excerpt: "Discover how to create smaller, more secure Docker images using multi-stage builds and advanced optimization techniques.",
    content: "Full content here...",
    coverImage: "https://images.unsplash.com/photo-1605745341112-85968b19335a?w=800",
    author: {
      name: "Om Thakur",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      username: "omthakur"
    },
    category: {
      name: "DevOps",
      slug: "devops",
      color: "#10B981"
    },
    tags: [
      { name: "Docker", slug: "docker", color: "#2496ED" }
    ],
    publishedAt: "2024-11-18",
    readingTime: 6,
    views: 980,
    likes: 67,
    comments: 8,
    featured: true
  },
  {
    id: "3",
    title: "CI/CD Best Practices with GitHub Actions",
    slug: "cicd-github-actions",
    excerpt: "Build robust CI/CD pipelines using GitHub Actions with advanced workflows, security scanning, and deployment strategies.",
    content: "Full content here...",
    coverImage: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800",
    author: {
      name: "Om Thakur",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      username: "omthakur"
    },
    category: {
      name: "DevOps",
      slug: "devops",
      color: "#10B981"
    },
    tags: [
      { name: "CI/CD", slug: "cicd", color: "#22C55E" },
      { name: "GitHub", slug: "github", color: "#333" }
    ],
    publishedAt: "2024-11-15",
    readingTime: 10,
    views: 750,
    likes: 45,
    comments: 15,
    featured: true
  }
]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("all")
  const [filteredPosts, setFilteredPosts] = React.useState(blogPosts)

  // Filter posts based on search and category
  React.useEffect(() => {
    let filtered = blogPosts

    if (selectedCategory !== "all") {
      filtered = filtered.filter(post => post.category.slug === selectedCategory)
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    setFilteredPosts(filtered)
  }, [searchQuery, selectedCategory])

  const featuredPost = blogPosts.find(post => post.featured)

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
              />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
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
                        src={featuredPost.coverImage}
                        alt={featuredPost.title}
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                      />
                      <Badge 
                        className="absolute top-4 left-4"
                        style={{ backgroundColor: featuredPost.category.color }}
                      >
                        {featuredPost.category.name}
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
                          {featuredPost.excerpt}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {featuredPost.tags.map((tag) => (
                            <Badge 
                              key={tag.slug}
                              variant="outline"
                              className="cursor-pointer hover:bg-accent"
                              style={{ borderColor: tag.color }}
                            >
                              {tag.name}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6">
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(featuredPost.publishedAt).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {featuredPost.readingTime} min read
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {featuredPost.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              {featuredPost.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" />
                              {featuredPost.comments}
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
              {filteredPosts.map((post, index) => (
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
                          src={post.coverImage}
                          alt={post.title}
                          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                        />
                        <Badge 
                          className="absolute top-4 left-4"
                          style={{ backgroundColor: post.category.color }}
                        >
                          {post.category.name}
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
                            {post.excerpt}
                          </p>

                          <div className="flex flex-wrap gap-1">
                            {post.tags.map((tag) => (
                              <Badge 
                                key={tag.slug}
                                variant="outline"
                                className="text-xs cursor-pointer hover:bg-accent"
                              >
                                {tag.name}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <img
                                  src={post.author.avatar}
                                  alt={post.author.name}
                                  className="w-6 h-6 rounded-full"
                                />
                                <span>{post.author.name}</span>
                              </div>
                              <span>•</span>
                              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                              <span>•</span>
                              <span>{post.readingTime} min read</span>
                            </div>

                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {post.views}
                              </span>
                              <span className="flex items-center gap-1">
                                <Heart className="h-3 w-3" />
                                {post.likes}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* No Results */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}

            {/* Load More */}
            {filteredPosts.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Articles
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </div>
    </div>
  )
}