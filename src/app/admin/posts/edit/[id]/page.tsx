"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Save,
  Eye,
  ArrowLeft,
  Upload,
  Image,
  Bold,
  Italic,
  List,
  Link as LinkIcon,
  Code,
  Quote,
  Calendar,
  Tag,
  Settings,
  Globe,
  Clock,
  FileText
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock post data for editing
const mockPost = {
  id: "1",
  title: "Building Modern Web Applications with Next.js 15",
  slug: "building-modern-web-apps-nextjs-15",
  excerpt: "Learn how to build performant, modern web applications using Next.js 15 with all the latest features.",
  content: `# Building Modern Web Applications with Next.js 15

Next.js 15 introduces several groundbreaking features that make building modern web applications easier and more efficient than ever before.

## What's New in Next.js 15

### App Router Enhancements
The App Router has been significantly improved with better performance and new capabilities:

- **Parallel Routes**: Handle multiple pages simultaneously
- **Intercepting Routes**: Intercept routes and show modals
- **Route Groups**: Organize routes without affecting the URL structure

### Server Components by Default
Server Components are now the default, providing:

\`\`\`jsx
// This is a Server Component by default
export default function Page() {
  return (
    <div>
      <h1>Hello, Server Components!</h1>
    </div>
  )
}
\`\`\`

### Turbopack Integration
Turbopack, the Rust-based bundler, is now stable and provides:
- 700x faster updates than Webpack
- Improved cold start times
- Better error messages

## Building Your First App

Let's create a simple blog application using these new features:

### 1. Setup
\`\`\`bash
npx create-next-app@latest my-blog --typescript --tailwind --app
cd my-blog
npm run dev
\`\`\`

### 2. Create the Layout
\`\`\`jsx
// app/layout.tsx
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav>Blog Navigation</nav>
        <main>{children}</main>
        <footer>Blog Footer</footer>
      </body>
    </html>
  )
}
\`\`\`

## Conclusion

Next.js 15 represents a significant step forward in web development, making it easier to build fast, scalable applications with modern features.`,
  status: "published",
  category: "tech",
  tags: ["nextjs", "react", "typescript", "web development"],
  featured: true,
  coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
  author: "Om Thakur",
  publishedAt: "2024-11-20T10:00:00Z",
  createdAt: "2024-11-20T08:00:00Z",
  metaDescription: "Learn how to build modern web applications with Next.js 15, including new features like App Router, Server Components, and Turbopack.",
  metaKeywords: "Next.js, React, TypeScript, Web Development, App Router"
}

const categories = [
  { name: "Technology", value: "tech" },
  { name: "Photography", value: "photography" },
  { name: "Travel", value: "travel" },
  { name: "Design", value: "design" },
  { name: "Lifestyle", value: "lifestyle" }
]

const statuses = [
  { name: "Draft", value: "draft" },
  { name: "Published", value: "published" },
  { name: "Scheduled", value: "scheduled" }
]

export default function PostEditorPage() {
  const params = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("content")
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [post, setPost] = useState<any>(null)
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    published: false,
    featured: false
  })

  useEffect(() => {
    fetchPost()
  }, [params.id])

  const fetchPost = async () => {
    setIsFetching(true)
    try {
      // Since we don't have individual post API endpoint, we'll fetch all and find the one
      const response = await fetch('/api/posts-crud?all=true')
      if (response.ok) {
        const data = await response.json()
        const foundPost = data.posts?.find((p: any) => p.id === params.id)
        
        if (foundPost) {
          setPost(foundPost)
          setFormData({
            title: foundPost.title || "",
            slug: foundPost.slug || "",
            excerpt: foundPost.excerpt || "",
            content: foundPost.content || "",
            published: foundPost.published || false,
            featured: foundPost.featured || false
          })
        } else {
          alert('Post not found')
          router.push('/admin/posts')
        }
      }
    } catch (error) {
      console.error('Error fetching post:', error)
      alert('Error loading post')
    } finally {
      setIsFetching(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleTitleChange = (title: string) => {
    handleInputChange('title', title)
    if (!formData.slug || formData.slug === generateSlug(formData.title)) {
      handleInputChange('slug', generateSlug(title))
    }
  }

  const handleSave = async () => {
    setIsLoading(true)
    
    if (!formData.title.trim()) {
      alert('Please enter a title')
      setIsLoading(false)
      return
    }

    if (!formData.content.trim()) {
      alert('Please enter some content')
      setIsLoading(false)
      return
    }
    
    try {
      const response = await fetch('/api/posts-crud', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: params.id,
          title: formData.title,
          content: formData.content,
          excerpt: formData.excerpt || formData.content.slice(0, 200) + '...',
          published: formData.published,
          featured: formData.featured
        })
      })

      if (response.ok) {
        alert('Post updated successfully!')
        router.push('/admin/posts')
      } else {
        throw new Error('Failed to update post')
      }
    } catch (error) {
      console.error('Error updating post:', error)
      alert('Failed to update post. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/posts-crud?id=${params.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        alert('Post deleted successfully!')
        router.push('/admin/posts')
      } else {
        alert('Failed to delete post')
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('Failed to delete post')
    }
  }

  if (isFetching) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading post...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Post Not Found</h1>
          <Button asChild>
            <Link href="/admin/posts">Back to Posts</Link>
          </Button>
        </div>
      </div>
    )
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/posts">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Posts
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold">Edit Post</h1>
                <p className="text-sm text-muted-foreground">
                  Last saved: {formatDate(mockPost.createdAt)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/blog/${formData.slug}`} target="_blank">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleSave('draft')}
                disabled={isLoading}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
              <Button 
                size="sm"
                onClick={() => handleSave('publish')}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Globe className="mr-2 h-4 w-4" />
                    Publish
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
              </TabsList>

              {/* Content Tab */}
              <TabsContent value="content" className="space-y-6">
                <Card>
                  <CardContent className="p-6 space-y-6">
                    {/* Title */}
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="Enter post title..."
                        className="text-lg font-medium"
                      />
                    </div>

                    {/* Slug */}
                    <div>
                      <Label htmlFor="slug">Slug</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">omthakur.tech/blog/</span>
                        <Input
                          id="slug"
                          value={formData.slug}
                          onChange={(e) => handleInputChange('slug', e.target.value)}
                          placeholder="post-slug"
                        />
                      </div>
                    </div>

                    {/* Excerpt */}
                    <div>
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Textarea
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('excerpt', e.target.value)}
                        placeholder="Brief description of the post..."
                        rows={3}
                      />
                    </div>

                    {/* Cover Image */}
                    <div>
                      <Label>Cover Image</Label>
                      <div className="space-y-3">
                        {formData.coverImage && (
                          <img
                            src={formData.coverImage}
                            alt="Cover"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        )}
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Image
                          </Button>
                          <Button variant="outline" size="sm">
                            <Image className="mr-2 h-4 w-4" />
                            Choose from Gallery
                          </Button>
                        </div>
                        <Input
                          placeholder="Or enter image URL..."
                          value={formData.coverImage}
                          onChange={(e) => handleInputChange('coverImage', e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Content Editor */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label>Content</Label>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Bold className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Italic className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <List className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <LinkIcon className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Code className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Quote className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Textarea
                        value={formData.content}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('content', e.target.value)}
                        placeholder="Write your post content in Markdown..."
                        rows={20}
                        className="font-mono"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Supports Markdown formatting. Use **bold**, *italic*, `code`, and more.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Post Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Category */}
                    <div>
                      <Label>Category</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Tags */}
                    <div>
                      <Label htmlFor="tags">Tags</Label>
                      <Input
                        id="tags"
                        value={formData.tags}
                        onChange={(e) => handleInputChange('tags', e.target.value)}
                        placeholder="tag1, tag2, tag3"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Separate tags with commas
                      </p>
                    </div>

                    {/* Status */}
                    <div>
                      <Label>Status</Label>
                      <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statuses.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Publish Date */}
                    {formData.status === 'scheduled' && (
                      <div>
                        <Label htmlFor="publishDate">Publish Date</Label>
                        <Input
                          id="publishDate"
                          type="date"
                          value={formData.publishedAt}
                          onChange={(e) => handleInputChange('publishedAt', e.target.value)}
                        />
                      </div>
                    )}

                    {/* Featured */}
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Featured Post</Label>
                        <p className="text-sm text-muted-foreground">
                          Featured posts appear prominently on the homepage
                        </p>
                      </div>
                      <Switch
                        checked={formData.featured}
                        onCheckedChange={(checked: boolean) => handleInputChange('featured', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* SEO Tab */}
              <TabsContent value="seo" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>SEO Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Meta Description */}
                    <div>
                      <Label htmlFor="metaDescription">Meta Description</Label>
                      <Textarea
                        id="metaDescription"
                        value={formData.metaDescription}
                        onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                        placeholder="Brief description for search engines..."
                        rows={3}
                        maxLength={160}
                      />
                      <p className="text-xs text-muted-foreground">
                        {formData.metaDescription.length}/160 characters
                      </p>
                    </div>

                    {/* Meta Keywords */}
                    <div>
                      <Label htmlFor="metaKeywords">Meta Keywords</Label>
                      <Input
                        id="metaKeywords"
                        value={formData.metaKeywords}
                        onChange={(e) => handleInputChange('metaKeywords', e.target.value)}
                        placeholder="keyword1, keyword2, keyword3"
                      />
                    </div>

                    {/* Preview */}
                    <div>
                      <Label>Search Engine Preview</Label>
                      <div className="border rounded-lg p-4 bg-muted/50">
                        <div className="text-blue-600 text-lg hover:underline cursor-pointer">
                          {formData.title}
                        </div>
                        <div className="text-green-600 text-sm">
                          omthakur.tech/blog/{formData.slug}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {formData.metaDescription}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start"
                  onClick={() => handleSave('publish')}
                  disabled={isLoading}
                >
                  <Globe className="mr-2 h-4 w-4" />
                  Publish Now
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleSave('schedule')}
                  disabled={isLoading}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleSave('draft')}
                  disabled={isLoading}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Save Draft
                </Button>
              </CardContent>
            </Card>

            {/* Post Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Post Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Word Count</span>
                  <span className="text-sm font-medium">1,245</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Read Time</span>
                  <span className="text-sm font-medium">5 min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Characters</span>
                  <span className="text-sm font-medium">8,432</span>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.split(',').map((tag, index) => (
                    tag.trim() && (
                      <Badge key={index} variant="outline">
                        {tag.trim()}
                      </Badge>
                    )
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}