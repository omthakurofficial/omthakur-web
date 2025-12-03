"use client"

import * as React from "react"
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

// Mock data - in a real app, this would come from your API
const categories = [
  { name: "Technology", count: 25, slug: "technology" },
  { name: "DevOps", count: 18, slug: "devops" },
  { name: "Cloud Computing", count: 15, slug: "cloud-computing" },
  { name: "Web Development", count: 12, slug: "web-development" },
  { name: "Tutorials", count: 8, slug: "tutorials" },
]

const popularTags = [
  "AWS", "Docker", "Kubernetes", "React", "Next.js", "TypeScript", 
  "Linux", "CI/CD", "Terraform", "Node.js", "Python", "DevOps"
]

const popularPosts = [
  {
    id: "1",
    title: "Complete Guide to AWS EKS",
    slug: "complete-guide-aws-eks",
    views: 1250,
    date: "2024-11-15"
  },
  {
    id: "2", 
    title: "Docker Best Practices for Production",
    slug: "docker-best-practices-production",
    views: 980,
    date: "2024-11-10"
  },
  {
    id: "3",
    title: "Building CI/CD with GitHub Actions",
    slug: "building-cicd-github-actions",
    views: 750,
    date: "2024-11-05"
  }
]

const socialLinks = [
  { name: "Facebook", icon: Facebook, url: "#", color: "text-blue-600" },
  { name: "Twitter", icon: Twitter, url: "#", color: "text-sky-500" },
  { name: "Instagram", icon: Instagram, url: "#", color: "text-pink-600" },
  { name: "LinkedIn", icon: Linkedin, url: "#", color: "text-blue-700" },
  { name: "YouTube", icon: Youtube, url: "#", color: "text-red-600" },
  { name: "GitHub", icon: Github, url: "#", color: "text-gray-800 dark:text-gray-200" }
]

export function Sidebar({ className }: SidebarProps) {
  const [email, setEmail] = React.useState("")

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
          {categories.map((category) => (
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
          ))}
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
          {popularPosts.map((post, index) => (
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
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{post.views} views</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
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