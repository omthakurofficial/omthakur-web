"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
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
  Star,
  Loader2,
  AlertCircle
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

interface Video {
  id: string
  title: string
  description?: string
  youtube_url?: string
  youtubeId: string
  thumbnail: string
  category: string
  tags: string[]
  featured: boolean
  visible: boolean
  createdAt: string
}

export default function EditVideoPage() {
  const params = useParams()
  const videoId = params.id as string
  
  const [isLoading, setIsLoading] = useState(false)
  const [videoLoading, setVideoLoading] = useState(true)
  const [video, setVideo] = useState<Video | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    youtube_url: "",
    youtubeId: "",
    thumbnail_url: "",
    category: "TECH",
    tags: "",
    featured: false,
    visible: true
  })
  
  const [urlError, setUrlError] = useState("")
  const [isValidatingUrl, setIsValidatingUrl] = useState(false)

  // Fetch video data
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        let response = await fetch(`/api/videos/${videoId}`)
        
        // If Prisma fails, try Supabase API
        if (!response.ok) {
          response = await fetch(`/api/videos-supabase/${videoId}`)
        }
        
        if (response.ok) {
          const videoData = await response.json()
          setVideo(videoData)
          setFormData({
            title: videoData.title || "",
            description: videoData.description || "",
            youtube_url: videoData.youtube_url || `https://youtube.com/watch?v=${videoData.youtubeId}`,
            youtubeId: videoData.youtubeId || "",
            thumbnail_url: videoData.thumbnail || "",
            category: videoData.category?.toUpperCase() || "TECH",
            tags: Array.isArray(videoData.tags) ? videoData.tags.join(", ") : "",
            featured: videoData.featured || false,
            visible: videoData.visible !== false
          })
        } else {
          alert('Video not found')
          window.location.href = '/admin/videos'
        }
      } catch (error) {
        console.error('Error fetching video:', error)
        alert('Error loading video')
        window.location.href = '/admin/videos'
      } finally {
        setVideoLoading(false)
      }
    }

    if (videoId) {
      fetchVideo()
    }
  }, [videoId])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    if (field === 'youtube_url' && urlError) {
      setUrlError("")
    }
  }

  // Extract YouTube ID from URL
  const extractYouTubeId = (url: string) => {
    if (!url) return null
    
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ]
    
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) {
        return match[1]
      }
    }
    return null
  }

  const validateYouTubeUrl = async (url: string) => {
    if (!url) return false
    
    setIsValidatingUrl(true)
    setUrlError("")
    
    try {
      const id = extractYouTubeId(url)
      if (!id) {
        setUrlError('Please enter a valid YouTube URL')
        return false
      }
      
      // Update form with extracted ID and thumbnail
      const thumbnailUrl = `https://img.youtube.com/vi/${id}/hqdefault.jpg`
      setFormData(prev => ({ 
        ...prev, 
        youtubeId: id,
        thumbnail_url: thumbnailUrl
      }))
      
      return true
    } catch (error) {
      setUrlError('Invalid YouTube URL')
      return false
    } finally {
      setIsValidatingUrl(false)
    }
  }

  const handleUrlChange = async (url: string) => {
    handleInputChange('youtube_url', url)
    if (url && url !== video?.youtube_url) {
      await validateYouTubeUrl(url)
    }
  }

  const handleSave = async () => {
    setIsLoading(true)
    
    if (!formData.title.trim()) {
      alert('Please enter a title')
      setIsLoading(false)
      return
    }

    if (!formData.youtube_url.trim()) {
      alert('Please enter a YouTube URL')
      setIsLoading(false)
      return
    }

    if (!formData.youtubeId) {
      const id = extractYouTubeId(formData.youtube_url)
      if (!id) {
        alert('Please enter a valid YouTube URL')
        setIsLoading(false)
        return
      }
      setFormData(prev => ({ ...prev, youtubeId: id }))
    }

    try {
      // Try Supabase API first
      let response = await fetch(`/api/videos-supabase/${videoId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          youtube_url: formData.youtube_url,
          youtubeId: formData.youtubeId,
          thumbnail: formData.thumbnail_url,
          category: formData.category,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
          featured: formData.featured,
          visible: formData.visible
        })
      })
      
      // If Supabase fails, try Prisma API
      if (!response.ok) {
        response = await fetch(`/api/videos/${videoId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            youtubeId: formData.youtubeId,
            thumbnail: formData.thumbnail_url,
            category: formData.category,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
            featured: formData.featured,
            visible: formData.visible
          })
        })
      }

      const result = await response.json()
      
      if (response.ok) {
        alert('Video updated successfully!')
        window.location.href = '/admin/videos'
      } else {
        alert('Error: ' + (result.error || 'Failed to update video'))
      }
    } catch (error) {
      alert('Error updating video: ' + (error instanceof Error ? error.message : 'Unknown error'))
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this video? This action cannot be undone.')) {
      return
    }

    try {
      let response = await fetch(`/api/videos-supabase/${videoId}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        response = await fetch(`/api/videos/${videoId}`, {
          method: 'DELETE'
        })
      }

      if (response.ok) {
        alert('Video deleted successfully!')
        window.location.href = '/admin/videos'
      } else {
        alert('Failed to delete video')
      }
    } catch (error) {
      console.error('Error deleting video:', error)
      alert('Error deleting video')
    }
  }

  if (videoLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading video...</p>
        </div>
      </div>
    )
  }

  if (!video) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Video Not Found</h1>
            <Button asChild>
              <Link href="/admin/videos">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Videos
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/videos">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Videos
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold">Edit Video</h1>
                <p className="text-sm text-muted-foreground">
                  Update video details
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="destructive"
                onClick={handleDelete}
                disabled={isLoading}
              >
                Delete
              </Button>
              <Button 
                onClick={handleSave}
                disabled={isLoading || !formData.title || !formData.youtube_url}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
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
              {formData.youtube_url ? (
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
                        YouTube
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
                    onClick={() => window.open(formData.youtube_url, '_blank')}
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

              {/* Video URL */}
              <div>
                <Label htmlFor="youtube_url">YouTube URL *</Label>
                <Input
                  id="youtube_url"
                  value={formData.youtube_url}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className={urlError ? 'border-red-500' : ''}
                />
                {urlError && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3" />
                    {urlError}
                  </p>
                )}
                {isValidatingUrl && (
                  <p className="text-xs text-blue-500 mt-1">Validating YouTube URL...</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Supports various YouTube URL formats
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

        {/* Action Buttons */}
        <Card className="mt-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Video ID: {videoId}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link href="/admin/videos">
                    Cancel
                  </Link>
                </Button>
                <Button 
                  onClick={handleSave}
                  disabled={isLoading || !formData.title || !formData.youtube_url}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}