"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Upload, 
  Video, 
  Save, 
  ArrowLeft,
  PlayCircle,
  Youtube,
  ExternalLink,
  Eye,
  EyeOff,
  Star
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const videoCategories = [
  { name: "Tutorial", value: "TUTORIAL" },
  { name: "Portfolio", value: "PORTFOLIO" },
  { name: "Travel", value: "TRAVEL" },
  { name: "Creative", value: "CREATIVE" },
  { name: "Tech", value: "TECH" },
  { name: "Personal", value: "PERSONAL" }
]

const videoTypes = [
  { name: "YouTube", value: "youtube" },
  { name: "Vimeo", value: "vimeo" },
  { name: "Direct URL", value: "direct" }
]

export default function NewVideoPage() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    video_url: "",
    thumbnail_url: "",
    category: "TUTORIAL",
    video_type: "youtube",
    tags: "",
    featured: false,
    visible: true,
    duration: "",
    platform: "YouTube"
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const extractYouTubeId = (url: string) => {
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
    const match = url.match(youtubeRegex)
    return match ? match[1] : null
  }

  const handleUrlChange = (url: string) => {
    handleInputChange('video_url', url)
    
    if (url) {
      const youtubeId = extractYouTubeId(url)
      if (youtubeId) {
        handleInputChange('thumbnail_url', `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`)
        handleInputChange('platform', 'YouTube')
      }
    }
  }

  const handleSave = async () => {
    setIsLoading(true)
    
    if (!formData.title.trim()) {
      alert('Please enter a title')
      setIsLoading(false)
      return
    }

    if (!formData.video_url.trim()) {
      alert('Please enter a video URL')
      setIsLoading(false)
      return
    }

    const youtubeId = extractYouTubeId(formData.video_url)
    if (!youtubeId) {
      alert('Please enter a valid YouTube URL')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          youtubeUrl: formData.video_url,
          category: formData.category,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
          featured: formData.featured,
          visible: formData.visible,
          duration: formData.duration
        })
      })

      const result = await response.json()
      
      if (response.ok) {
        alert('Video added successfully!')
        // Redirect to videos list
        window.location.href = '/admin/videos'
      } else {
        alert('Error: ' + (result.error || 'Failed to add video'))
      }
    } catch (error) {
      alert('Error adding video')
      console.error(error)
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Admin
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold">Add New Video</h1>
                <p className="text-sm text-muted-foreground">
                  Add a video to your portfolio
                </p>
              </div>
            </div>
            <Button 
              onClick={handleSave}
              disabled={isLoading || !formData.title || !formData.video_url}
            >
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? 'Saving...' : 'Save Video'}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Video Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Video Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Video Embed or Thumbnail */}
              {formData.video_url ? (
                <div className="relative">
                  {formData.thumbnail_url ? (
                    <div className="relative">
                      <img
                        src={formData.thumbnail_url}
                        alt="Video thumbnail"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg">
                        <PlayCircle className="h-16 w-16 text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 px-2 py-1 rounded text-white text-sm">
                        {formData.platform}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                      <Video className="h-16 w-16 text-muted-foreground" />
                    </div>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => window.open(formData.video_url, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
                  <Video className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Enter a video URL below to see preview
                  </p>
                </div>
              )}

              {/* Video Type Selector */}
              <div>
                <Label>Video Platform</Label>
                <Select value={formData.video_type} onValueChange={(value) => handleInputChange('video_type', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {videoTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          {type.value === 'youtube' && <Youtube className="h-4 w-4" />}
                          {type.value === 'vimeo' && <Video className="h-4 w-4" />}
                          {type.value === 'direct' && <ExternalLink className="h-4 w-4" />}
                          {type.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Video URL */}
              <div>
                <Label htmlFor="video_url">Video URL *</Label>
                <Input
                  id="video_url"
                  value={formData.video_url}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Supports YouTube, Vimeo, and direct video URLs
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Video Details */}
          <Card>
            <CardHeader>
              <CardTitle>Video Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Title */}
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter video title..."
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('description', e.target.value)}
                  placeholder="Describe what this video is about..."
                  rows={3}
                />
              </div>

              {/* Category */}
              <div>
                <Label>Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {videoCategories.map((category) => (
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
                  placeholder="tutorial, coding, react, nextjs"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Separate tags with commas
                </p>
              </div>

              {/* Custom Thumbnail */}
              <div>
                <Label htmlFor="thumbnail_url">Custom Thumbnail URL</Label>
                <Input
                  id="thumbnail_url"
                  value={formData.thumbnail_url}
                  onChange={(e) => handleInputChange('thumbnail_url', e.target.value)}
                  placeholder="https://example.com/thumbnail.jpg"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Auto-generated for YouTube. Override with custom URL if needed.
                </p>
              </div>

              {/* Settings */}
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Featured Video
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Show prominently on homepage
                    </p>
                  </div>
                  <Switch
                    checked={formData.featured}
                    onCheckedChange={(checked: boolean) => handleInputChange('featured', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="flex items-center gap-2">
                      {formData.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      Visible to Public
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Control video visibility
                    </p>
                  </div>
                  <Switch
                    checked={formData.visible}
                    onCheckedChange={(checked: boolean) => handleInputChange('visible', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Ready to add this video to your portfolio?
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => window.history.back()}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave}
                  disabled={isLoading || !formData.title || !formData.video_url}
                >
                  <Video className="mr-2 h-4 w-4" />
                  {isLoading ? 'Adding Video...' : 'Add Video'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}