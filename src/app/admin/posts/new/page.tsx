"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
  FileText,
  Sparkles
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

const categories = [
  { name: "Technology", value: "tech" },
  { name: "Photography", value: "photography" },
  { name: "Travel", value: "travel" },
  { name: "Design", value: "design" },
  { name: "Lifestyle", value: "lifestyle" }
]

const postTemplates = [
  {
    name: "Tutorial",
    description: "Step-by-step guide format",
    content: `# How to [Your Topic]

## Introduction
Brief introduction to what readers will learn.

## Prerequisites
What readers need to know before starting:
- Item 1
- Item 2

## Step 1: [First Step]
Detailed explanation of the first step.

\`\`\`code
// Code example
\`\`\`

## Step 2: [Second Step]
Continue with the next step.

## Conclusion
Summary of what was accomplished.`
  },
  {
    name: "Review",
    description: "Product or service review",
    content: `# [Product/Service] Review

## Overview
Brief overview of what you're reviewing.

## Pros
- Advantage 1
- Advantage 2
- Advantage 3

## Cons
- Disadvantage 1
- Disadvantage 2

## My Experience
Personal experience and thoughts.

## Final Verdict
Would you recommend it? Why or why not?

**Rating: ★★★★☆ (4/5)**`
  },
  {
    name: "Travel Blog",
    description: "Travel experience post",
    content: `# My Trip to [Destination]

## Planning the Trip
How I planned and prepared for this adventure.

## Day 1: Arrival
First impressions and initial experiences.

## Day 2: [Activity/Location]
Detailed account of experiences.

## Local Food & Culture
What I discovered about local cuisine and customs.

## Travel Tips
Helpful tips for future travelers:
- Tip 1
- Tip 2
- Tip 3

## Photo Gallery
*[Add photos here]*

## Conclusion
Overall thoughts and recommendations.`
  }
]

export default function NewPostPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = React.useState("content")
  const [isLoading, setIsLoading] = React.useState(false)
  const [showTemplates, setShowTemplates] = React.useState(true)
  
  // Form state
  const [formData, setFormData] = React.useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    status: "draft",
    category: "",
    tags: "",
    featured: false,
    coverImage: "",
    metaDescription: "",
    metaKeywords: "",
    publishedAt: ""
  })

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

  const handleTemplateSelect = (template: typeof postTemplates[0]) => {
    handleInputChange('content', template.content)
    setShowTemplates(false)
    if (!formData.title) {
      // Focus on title input
      const titleInput = document.getElementById('title')
      titleInput?.focus()
    }
  }

  const handleSave = async (saveType: 'draft' | 'publish' | 'schedule') => {
    setIsLoading(true)
    
    // Basic validation
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
      // Create the post data - only include fields that exist in database
      const postData = {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt || formData.content.slice(0, 200) + '...',
        published: saveType === 'publish',
        featured: formData.featured || false
      }

      // Call your working API
      const response = await fetch('/api/posts-crud', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
      })

      if (!response.ok) {
        throw new Error('Failed to create post')
      }

      const result = await response.json()
      console.log('Post created successfully:', result)
      
      // Show success message and redirect
      alert(`Post ${saveType === 'draft' ? 'saved as draft' : saveType === 'publish' ? 'published' : 'scheduled'} successfully!`)
      router.push('/admin/posts')
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Failed to create post. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const wordCount = formData.content.split(/\s+/).filter(word => word.length > 0).length
  const readTime = Math.ceil(wordCount / 200) // Average reading speed: 200 words per minute

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
                <h1 className="text-xl font-bold">Create New Post</h1>
                <p className="text-sm text-muted-foreground">
                  Write and publish your next blog post
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled={!formData.slug}>
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleSave('draft')}
                disabled={isLoading || !formData.title.trim()}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
              <Button 
                size="sm"
                onClick={() => handleSave('publish')}
                disabled={isLoading || !formData.title.trim() || !formData.content.trim()}
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
            {/* Template Selector */}
            {showTemplates && !formData.content && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Choose a Template
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Start with a template or create from scratch
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {postTemplates.map((template, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card 
                            className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-transparent hover:border-primary/20"
                            onClick={() => handleTemplateSelect(template)}
                          >
                            <CardContent className="p-4">
                              <h3 className="font-semibold mb-2">{template.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {template.description}
                              </p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <Button 
                        variant="outline"
                        onClick={() => setShowTemplates(false)}
                      >
                        Start from Scratch
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

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
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="Enter an engaging post title..."
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
                          placeholder="auto-generated-from-title"
                        />
                      </div>
                      {formData.slug && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Full URL: omthakur.tech/blog/{formData.slug}
                        </p>
                      )}
                    </div>

                    {/* Excerpt */}
                    <div>
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Textarea
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('excerpt', e.target.value)}
                        placeholder="Write a compelling excerpt that will appear on the blog listing..."
                        rows={3}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        This will be displayed on your blog homepage and social media shares
                      </p>
                    </div>

                    {/* Cover Image */}
                    <div>
                      <Label>Cover Image</Label>
                      <div className="space-y-3">
                        {formData.coverImage && (
                          <div className="relative">
                            <img
                              src={formData.coverImage}
                              alt="Cover"
                              className="w-full h-48 object-cover rounded-lg"
                            />
                            <Button
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => handleInputChange('coverImage', '')}
                            >
                              Remove
                            </Button>
                          </div>
                        )}
                        <div className="flex flex-col sm:flex-row gap-2">
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
                        <Label>Content *</Label>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" title="Bold">
                            <Bold className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Italic">
                            <Italic className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="List">
                            <List className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Link">
                            <LinkIcon className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Code">
                            <Code className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Quote">
                            <Quote className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Textarea
                        value={formData.content}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('content', e.target.value)}
                        placeholder="Write your post content in Markdown...

# Heading 1
## Heading 2

**Bold text** and *italic text*

- List item 1
- List item 2

```code
Code block
```

> Blockquote"
                        rows={20}
                        className="font-mono"
                      />
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-xs text-muted-foreground">
                          Supports Markdown formatting. Use **bold**, *italic*, `code`, and more.
                        </p>
                        {showTemplates && !formData.content && (
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => setShowTemplates(true)}
                          >
                            <Sparkles className="mr-1 h-3 w-3" />
                            Use Template
                          </Button>
                        )}
                      </div>
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
                      <Label>Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
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
                        placeholder="react, javascript, tutorial, web development"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Separate tags with commas. Good tags help readers find your content.
                      </p>
                    </div>

                    {/* Status */}
                    <div>
                      <Label>Publication Status</Label>
                      <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft - Not visible to public</SelectItem>
                          <SelectItem value="published">Published - Visible to everyone</SelectItem>
                          <SelectItem value="scheduled">Scheduled - Publish later</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Publish Date */}
                    {formData.status === 'scheduled' && (
                      <div>
                        <Label htmlFor="publishDate">Publish Date & Time</Label>
                        <Input
                          id="publishDate"
                          type="datetime-local"
                          value={formData.publishedAt}
                          onChange={(e) => handleInputChange('publishedAt', e.target.value)}
                          min={new Date().toISOString().slice(0, 16)}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Post will be automatically published at this time
                        </p>
                      </div>
                    )}

                    {/* Featured */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
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
                    <p className="text-muted-foreground">
                      Optimize your post for search engines
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Meta Description */}
                    <div>
                      <Label htmlFor="metaDescription">Meta Description</Label>
                      <Textarea
                        id="metaDescription"
                        value={formData.metaDescription}
                        onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                        placeholder="Write a compelling description that will appear in search engine results..."
                        rows={3}
                        maxLength={160}
                      />
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-muted-foreground">
                          This appears below your title in Google search results
                        </p>
                        <span className={`text-xs ${
                          formData.metaDescription.length > 160 ? 'text-red-500' : 'text-muted-foreground'
                        }`}>
                          {formData.metaDescription.length}/160
                        </span>
                      </div>
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
                      <p className="text-xs text-muted-foreground mt-1">
                        Keywords that describe your post content (optional)
                      </p>
                    </div>

                    {/* Search Preview */}
                    <div>
                      <Label>Search Engine Preview</Label>
                      <div className="border rounded-lg p-4 bg-muted/50">
                        <div className="text-blue-600 text-lg hover:underline cursor-pointer">
                          {formData.title || "Your Post Title"}
                        </div>
                        <div className="text-green-600 text-sm">
                          omthakur.tech/blog/{formData.slug || "your-post-slug"}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {formData.metaDescription || formData.excerpt || "Your meta description will appear here..."}
                        </div>
                      </div>
                    </div>

                    {/* SEO Tips */}
                    <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">SEO Tips:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Include your target keyword in the title</li>
                        <li>• Write a compelling meta description under 160 characters</li>
                        <li>• Use descriptive headings (H1, H2, H3) in your content</li>
                        <li>• Add alt text to images</li>
                        <li>• Internal and external links boost SEO</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Publishing */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Publish</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start"
                  onClick={() => handleSave('publish')}
                  disabled={isLoading || !formData.title.trim() || !formData.content.trim() || !formData.category}
                >
                  <Globe className="mr-2 h-4 w-4" />
                  Publish Now
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    handleInputChange('status', 'scheduled')
                    setActiveTab('settings')
                  }}
                  disabled={isLoading}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleSave('draft')}
                  disabled={isLoading || !formData.title.trim()}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Save Draft
                </Button>
              </CardContent>
            </Card>

            {/* Post Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Writing Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Word Count</span>
                  <span className="text-sm font-medium">{wordCount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Read Time</span>
                  <span className="text-sm font-medium">{readTime} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Characters</span>
                  <span className="text-sm font-medium">{formData.content.length.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Post Completion</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className={`w-2 h-2 rounded-full ${formData.title ? 'bg-green-500' : 'bg-gray-300'}`} />
                    Title
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className={`w-2 h-2 rounded-full ${formData.content ? 'bg-green-500' : 'bg-gray-300'}`} />
                    Content
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className={`w-2 h-2 rounded-full ${formData.category ? 'bg-green-500' : 'bg-gray-300'}`} />
                    Category
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className={`w-2 h-2 rounded-full ${formData.coverImage ? 'bg-green-500' : 'bg-yellow-400'}`} />
                    Cover Image (optional)
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className={`w-2 h-2 rounded-full ${formData.metaDescription ? 'bg-green-500' : 'bg-yellow-400'}`} />
                    SEO (optional)
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}