"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Save, 
  ArrowLeft, 
  Camera,
  Star,
  Eye,
  EyeOff,
  ExternalLink,
  Loader2
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

const photoCategories = [
  { name: "Nature", value: "NATURE" },
  { name: "Portrait", value: "PORTRAIT" },
  { name: "Street", value: "STREET" },
  { name: "Creative", value: "CREATIVE" },
  { name: "Architecture", value: "ARCHITECTURE" },
  { name: "Travel", value: "TRAVEL" }
]

export default function EditPhotoPage() {
  const params = useParams()
  const router = useRouter()
  const photoId = params.id as string
  
  const [isLoading, setIsLoading] = React.useState(true)
  const [isSaving, setIsSaving] = React.useState(false)
  const [photo, setPhoto] = React.useState<any>(null)
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    image_url: "",
    category: "NATURE",
    tags: "",
    featured: false,
    visible: true
  })
  
  const [urlError, setUrlError] = React.useState("")
  const [isValidatingUrl, setIsValidatingUrl] = React.useState(false)

  // Fetch photo data
  React.useEffect(() => {
    if (photoId) {
      fetchPhoto()
    }
  }, [photoId])

  const fetchPhoto = async () => {
    setIsLoading(true)
    try {
      let response = await fetch(`/api/photos-supabase/${photoId}`)
      
      // If Supabase fails, try Prisma API
      if (!response.ok) {
        response = await fetch(`/api/photos/${photoId}`)
      }
      
      if (response.ok) {
        const photoData = await response.json()
        setPhoto(photoData)
        
        // Populate form with existing data
        setFormData({
          title: photoData.title || "",
          description: photoData.description || "",
          image_url: (photoData.imageUrl || photoData.image_url) || "",
          category: photoData.category?.toUpperCase() || "NATURE",
          tags: Array.isArray(photoData.tags) ? photoData.tags.join(", ") : "",
          featured: photoData.featured || false,
          visible: photoData.visible !== false
        })
      } else {
        console.error('Failed to fetch photo')
        alert('Photo not found')
        router.push('/admin/photos')
      }
    } catch (error) {
      console.error('Error fetching photo:', error)
      alert('Error loading photo')
      router.push('/admin/photos')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear URL error when user types
    if (field === 'image_url' && urlError) {
      setUrlError("")
    }
  }

  const validateImageUrl = async (url: string) => {
    if (!url) return false
    
    setIsValidatingUrl(true)
    try {
      const urlObj = new URL(url)
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        throw new Error('URL must start with http:// or https://')
      }

      return new Promise((resolve) => {
        const img = new window.Image()
        img.onload = () => {
          setUrlError("")
          resolve(true)
        }
        img.onerror = () => {
          setUrlError('Unable to load image from this URL')
          resolve(false)
        }
        img.src = url
      })
    } catch (error) {
      setUrlError(error instanceof Error ? error.message : 'Invalid URL format')
      return false
    } finally {
      setIsValidatingUrl(false)
    }
  }

  const handleUrlChange = async (url: string) => {
    handleInputChange('image_url', url)
    if (url && url !== (photo?.imageUrl || photo?.image_url)) {
      await validateImageUrl(url)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    
    if (!formData.title.trim()) {
      alert('Please enter a title')
      setIsSaving(false)
      return
    }

    if (!formData.image_url.trim()) {
      alert('Please enter an image URL')
      setIsSaving(false)
      return
    }

    try {
      // Validate URL if it changed
      if (formData.image_url !== (photo?.imageUrl || photo?.image_url)) {
        const isValidUrl = await validateImageUrl(formData.image_url)
        if (!isValidUrl) {
          setIsSaving(false)
          return
        }
      }

      // Try Supabase API first
      let response = await fetch(`/api/photos-supabase/${photoId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          image_url: formData.image_url,
          thumbnail: formData.image_url,
          category: formData.category,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
          featured: formData.featured,
          visible: formData.visible
        })
      })
      
      // If Supabase fails, try Prisma API
      if (!response.ok) {
        response = await fetch(`/api/photos/${photoId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            imageUrl: formData.image_url,
            thumbnail: formData.image_url,
            category: formData.category,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
            featured: formData.featured,
            visible: formData.visible
          })
        })
      }

      const result = await response.json()
      
      if (response.ok) {
        alert('Photo updated successfully!')
        router.push('/admin/photos')
      } else {
        alert('Error: ' + (result.error || 'Failed to update photo'))
      }
    } catch (error) {
      alert('Error updating photo: ' + (error instanceof Error ? error.message : 'Unknown error'))
      console.error(error)
    }
    
    setIsSaving(false)
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this photo? This action cannot be undone.')) {
      return
    }

    try {
      let response = await fetch(`/api/photos-supabase/${photoId}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        response = await fetch(`/api/photos/${photoId}`, {
          method: 'DELETE'
        })
      }

      if (response.ok) {
        alert('Photo deleted successfully!')
        router.push('/admin/photos')
      } else {
        alert('Failed to delete photo')
      }
    } catch (error) {
      console.error('Error deleting photo:', error)
      alert('Error deleting photo')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Loading photo...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!photo) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Photo Not Found</h1>
            <Button asChild>
              <Link href="/admin/photos">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Photos
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
                <Link href="/admin/photos">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Photos
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold">Edit Photo</h1>
                <p className="text-sm text-muted-foreground">
                  Update your photo details
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="destructive"
                onClick={handleDelete}
                disabled={isSaving}
              >
                Delete
              </Button>
              <Button 
                onClick={handleSave}
                disabled={isSaving || !formData.title || !formData.image_url}
              >
                {isSaving ? (
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
          {/* Image Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Photo Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.image_url && (
                <div className="relative">
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => window.open(formData.image_url, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <div className="space-y-2">
                <Label>Image URL *</Label>
                <Input
                  value={formData.image_url}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className={urlError ? 'border-red-500' : ''}
                />
                {urlError && (
                  <p className="text-xs text-red-500">{urlError}</p>
                )}
                {isValidatingUrl && (
                  <p className="text-xs text-blue-500">Validating image URL...</p>
                )}
                
                <div className="flex gap-2 mt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open('https://unsplash.com', '_blank')}
                    type="button"
                  >
                    <ExternalLink className="mr-2 h-3 w-3" />
                    Browse Unsplash
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open('https://pexels.com', '_blank')}
                    type="button"
                  >
                    <ExternalLink className="mr-2 h-3 w-3" />
                    Browse Pexels
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photo Details */}
          <Card>
            <CardHeader>
              <CardTitle>Photo Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Title */}
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter photo title..."
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('description', e.target.value)}
                  placeholder="Tell the story behind this photo..."
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
                    {photoCategories.map((category) => (
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
                  placeholder="nature, landscape, sunset, mountains"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Separate tags with commas
                </p>
              </div>

              {/* Settings */}
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Featured Photo
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
                      Control photo visibility
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
                Photo ID: {photoId}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link href="/admin/photos">
                    Cancel
                  </Link>
                </Button>
                <Button 
                  onClick={handleSave}
                  disabled={isSaving || !formData.title || !formData.image_url}
                >
                  {isSaving ? (
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