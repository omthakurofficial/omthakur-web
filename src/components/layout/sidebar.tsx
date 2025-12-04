"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Heart, 
  Share2, 
  Tag, 
  Calendar,
  TrendingUp,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Github
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SidebarProps {
  className?: string
}

// Types for real data
interface Category {
  name: string
  count: number
  slug: string
}

interface PopularPost {
  id: string
  title: string
  slug: string
  views: number
  created_at: string
}

const socialLinks = [
  { name: "Facebook", icon: Facebook, url: "#", color: "text-blue-600" },
  { name: "Twitter", icon: Twitter, url: "#", color: "text-sky-500" },
  { name: "Instagram", icon: Instagram, url: "#", color: "text-pink-600" },
  { name: "LinkedIn", icon: Linkedin, url: "#", color: "text-blue-700" },
  { name: "YouTube", icon: Youtube, url: "#", color: "text-red-600" },
  { name: "GitHub", icon: Github, url: "#", color: "text-gray-800 dark:text-gray-200" }
]

export function Sidebar({ className }: SidebarProps) {
  const [email, setEmail] = useState("")
  const [categories, setCategories] = useState<Category[]>([])
  const [popularPosts, setPopularPosts] = useState<PopularPost[]>([])
  const [popularTags, setPopularTags] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch real data
  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        // Fetch posts for generating categories and popular posts
        const postsResponse = await fetch('/api/posts-crud?all=true')
        if (postsResponse.ok) {
          const postsData = await postsResponse.json()
          const posts = postsData.posts || []
          
          // Generate categories from posts (you could also have a dedicated categories API)
          const categoryMap = new Map()
          const allTags = new Set<string>()
          
          posts.forEach((post: any) => {
            // Assuming posts have a category field
            const category = post.category || 'General'
            categoryMap.set(category, (categoryMap.get(category) || 0) + 1)
            
            // Collect tags if they exist
            if (post.tags && Array.isArray(post.tags)) {
              post.tags.forEach((tag: string) => allTags.add(tag))
            }
          })
          
          // Convert category map to array
          const categoriesArray = Array.from(categoryMap.entries()).map(([name, count]) => ({
            name,
            count,
            slug: name.toLowerCase().replace(/\s+/g, '-')
          }))
          
          // Sort by count and take top categories
          setCategories(categoriesArray.sort((a, b) => b.count - a.count).slice(0, 8))
          
          // Set popular tags (first 12)
          setPopularTags(Array.from(allTags).slice(0, 12))
          
          // Set popular posts (sorted by views or recent)
          const sortedPosts = posts
            .sort((a: any, b: any) => (b.views || 0) - (a.views || 0))
            .slice(0, 5)
            .map((post: any) => ({
              id: post.id,
              title: post.title,
              slug: post.slug,
              views: post.views || 0,
              created_at: post.created_at
            }))
          
          setPopularPosts(sortedPosts)
        }
      } catch (error) {
        console.error('Error fetching sidebar data:', error)
        // Set fallbacks
        setCategories([])
        setPopularPosts([])
        setPopularTags([])
      } finally {
        setLoading(false)
      }
    }

    fetchSidebarData()
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Subscribe:", email)
    setEmail("")
  }

  return (
    <motion.aside 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={`space-y-6 ${className}`}
    >
      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {loading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-2">
                  <div className="h-4 bg-muted animate-pulse rounded w-2/3"></div>
                  <div className="h-5 bg-muted animate-pulse rounded w-8"></div>
                </div>
              ))}
            </div>
          ) : categories.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No categories found
            </p>
          ) : (
            categories.map((category) => (
              <Link
                key={category.slug}
                href={`/blog?category=${category.slug}`}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors"
              >
                <span className="text-sm">{category.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </Link>
            ))
          )}
        </CardContent>
      </Card>

      {/* Popular Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Popular Tags
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex flex-wrap gap-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-6 bg-muted animate-pulse rounded w-16"></div>
              ))}
            </div>
          ) : popularTags.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No tags found
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <Link key={tag} href={`/blog?tag=${tag.toLowerCase()}`}>
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer hover:bg-accent transition-colors"
                  >
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Popular Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Popular Posts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-start gap-2 p-2">
                  <div className="h-6 w-6 bg-muted animate-pulse rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted animate-pulse rounded w-full"></div>
                    <div className="h-3 bg-muted animate-pulse rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : popularPosts.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No popular posts yet
            </p>
          ) : (
            popularPosts.map((post, index) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block p-2 rounded-lg hover:bg-accent transition-colors"
              >
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary text-lg">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium line-clamp-2 mb-1">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{post.views} views</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </CardContent>
      </Card>

      {/* Newsletter Subscription */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Subscribe
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Get notified about new posts and updates!
          </p>
          <form onSubmit={handleSubscribe} className="space-y-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" size="sm">
              Subscribe
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader>
          <CardTitle>Connect With Me</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.url}
                className="flex items-center justify-center p-2 rounded-lg hover:bg-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <social.icon className={`h-5 w-5 ${social.color}`} />
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ad Space */}
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
        <CardContent className="p-6 text-center">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Advertisement</h3>
            <p className="text-sm text-muted-foreground">
              Your ad could be here
            </p>
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-sm">300x250</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Engagement Actions */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-around">
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span className="text-sm">Like</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <Share2 className="h-4 w-4" />
              <span className="text-sm">Share</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.aside>
  )
}