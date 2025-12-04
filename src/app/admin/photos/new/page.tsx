"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Upload, 
  Image, 
  Save, 
  ArrowLeft, 
  Camera,
  MapPin,
  Calendar,
  Tag,
  Star,
  Eye,
  EyeOff
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

export default function NewPhotoPage() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    image_url: "",
    category: "NATURE",
    tags: "",
    featured: false,
    visible: true,
    location: "",
    camera_info: ""
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // In a real app, you'd upload to cloud storage
      const imageUrl = URL.createObjectURL(file)
      handleInputChange('image_url', imageUrl)
      
      // Auto-fill title from filename if empty
      if (!formData.title) {
        const filename = file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, ' ')
        handleInputChange('title', filename)
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

    if (!formData.image_url.trim()) {
      alert('Please upload or enter an image URL')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          imageUrl: formData.image_url,
          thumbnail: formData.image_url, // Use same URL as thumbnail
          category: formData.category,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
          featured: formData.featured,
          visible: formData.visible
        })
      })

      const result = await response.json()
      
      if (response.ok) {
        alert('Photo added successfully!')
        // Redirect to photos list
        window.location.href = '/admin/photos'
      } else {
        alert('Error: ' + (result.error || 'Failed to add photo'))
      }
    } catch (error) {
      alert('Error adding photo')
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
                <h1 className="text-xl font-bold">Add New Photo</h1>
                <p className="text-sm text-muted-foreground">
                  Upload a photo to your gallery
                </p>
              </div>
            </div>
            <Button 
              onClick={handleSave}
              disabled={isLoading || !formData.title || !formData.image_url}
            >
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? 'Saving...' : 'Save Photo'}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Photo Upload</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Image Preview */}
              {formData.image_url && (
                <div className="relative">
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => handleInputChange('image_url', '')}
                  >
                    Remove
                  </Button>
                </div>
              )}

              {/* Upload Options */}
              <div className="space-y-3">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Camera className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <div className="space-y-2">
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      <Button variant="outline" asChild>
                        <span>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Photo
                        </span>
                      </Button>
                    </Label>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <p className="text-sm text-muted-foreground">
                      Drag & drop or click to upload
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, WEBP up to 10MB
                    </p>
                  </div>
                </div>

                <div className="text-center text-sm text-muted-foreground">or</div>

                <div>
                  <Label>Image URL</Label>
                  <Input
                    value={formData.image_url}
                    onChange={(e) => handleInputChange('image_url', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
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

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Ready to add this photo to your gallery?
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => window.history.back()}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave}
                  disabled={isLoading || !formData.title || !formData.image_url}
                >
                  <Image className="mr-2 h-4 w-4" />
                  {isLoading ? 'Adding Photo...' : 'Add Photo'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}