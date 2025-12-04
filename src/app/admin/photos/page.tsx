"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Upload,
  ArrowLeft,
  Download,
  Grid3X3,
  List,
  MoreVertical,
  Image as ImageIcon,
  Heart,
  Share2
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Photo {
  id: string
  title: string
  description?: string
  imageUrl: string
  thumbnail?: string
  category: string
  tags: string[]
  featured: boolean
  visible: boolean
  createdAt: string
  views?: number
  likes?: number
}

const categories = [
  { name: "All Categories", value: "all" },
  { name: "Creative", value: "CREATIVE" },
  { name: "Nature", value: "NATURE" },
  { name: "Portrait", value: "PORTRAIT" },
  { name: "Travel", value: "TRAVEL" },
  { name: "Street", value: "STREET" }
]

export default function AdminPhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([])

  useEffect(() => {
    fetchPhotos()
  }, [])

  const fetchPhotos = async () => {
    setIsLoading(true)
    try {
      let response = await fetch('/api/photos')
      
      // If Prisma fails, try Supabase API
      if (!response.ok) {
        console.log('Prisma API failed, trying Supabase API...')
        response = await fetch('/api/photos-supabase')
      }
      
      if (response.ok) {
        const data = await response.json()
        const photosData = data.photos || []
        setPhotos(photosData)
        console.log(`Loaded ${photosData.length} photos`)
      } else {
        console.error('Failed to fetch photos')
        setPhotos([])
      }
    } catch (error) {
      console.error('Error fetching photos:', error)
      setPhotos([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeletePhoto = async (photoId: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) {
      return
    }

    try {
      // Try Supabase API first
      let response = await fetch(`/api/photos-supabase/${photoId}`, {
        method: 'DELETE'
      })
      
      // If Supabase fails, try Prisma API
      if (!response.ok) {
        response = await fetch(`/api/photos/${photoId}`, {
          method: 'DELETE'
        })
      }

      if (response.ok) {
        setPhotos(prev => prev.filter(p => p.id !== photoId))
        alert('Photo deleted successfully!')
      } else {
        alert('Failed to delete photo')
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('Failed to delete photo')
    }
  }

  const filteredPhotos = photos.filter(photo => {
    const matchesSearch = photo.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || photo.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const stats = {
    total: photos.length,
    featured: photos.filter(p => p.featured).length,
    published: photos.filter(p => p.visible).length,
    drafts: photos.filter(p => !p.visible).length
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Photos Management</h1>
                <p className="text-muted-foreground">
                  Upload and manage your photo gallery
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button asChild>
                <Link href="/admin/photos/new">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Photos
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total Photos</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{stats.published}</div>
              <div className="text-sm text-muted-foreground">Published</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-600">{stats.featured}</div>
              <div className="text-sm text-muted-foreground">Featured</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-600">{stats.drafts}</div>
              <div className="text-sm text-muted-foreground">Drafts</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col md:flex-row gap-4 flex-1">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search photos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Category" />
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
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Photos Display */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p>Loading photos...</p>
          </div>
        ) : (
          <>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredPhotos.map((photo, index) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden group">
                      <div className="aspect-square relative">
                        <img
                          src={photo.thumbnail || photo.imageUrl}
                          alt={photo.title}
                          className="object-cover w-full h-full transition-transform group-hover:scale-105"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = '/images/placeholder-image.jpg'
                          }}
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button size="sm" variant="secondary" asChild>
                            <Link href={`/admin/photos/edit/${photo.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button size="sm" variant="secondary" asChild>
                            <Link href={photo.imageUrl} target="_blank">
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDeletePhoto(photo.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        {photo.featured && (
                          <Badge className="absolute top-2 left-2">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-3">
                        <h3 className="font-medium text-sm truncate">{photo.title}</h3>
                        <p className="text-xs text-muted-foreground capitalize">
                          {photo.category.toLowerCase()}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {photo.views || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {photo.likes || 0}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card>
                <div className="p-6">
                  <div className="space-y-4">
                    {filteredPhotos.map((photo) => (
                      <div key={photo.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50">
                        <img
                          src={photo.thumbnail || photo.imageUrl}
                          alt={photo.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{photo.title}</h3>
                            {photo.featured && (
                              <Badge variant="secondary">Featured</Badge>
                            )}
                            <Badge variant="outline">{photo.category}</Badge>
                          </div>
                          {photo.description && (
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {photo.description}
                            </p>
                          )}
                          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                            <span>Uploaded {new Date(photo.createdAt).toLocaleDateString()}</span>
                            <span>{photo.views || 0} views</span>
                            <span>{photo.likes || 0} likes</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/admin/photos/edit/${photo.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={photo.imageUrl} target="_blank">
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                <Share2 className="mr-2 h-4 w-4" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                {photo.featured ? 'Remove from Featured' : 'Add to Featured'}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => handleDeletePhoto(photo.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}

            {filteredPhotos.length === 0 && (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <ImageIcon className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No photos found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery ? 'Try adjusting your search criteria' : 'Start by uploading some photos'}
                </p>
                <Button asChild>
                  <Link href="/admin/photos/new">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photos
                  </Link>
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}