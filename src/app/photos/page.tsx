"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Camera,
  Grid3X3,
  Filter,
  Heart,
  Download,
  ExternalLink,
  Search,
  Image as ImageIcon,
  Eye,
  Calendar,
  Plus,
  Upload
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Types for real photo data
interface Photo {
  id: string
  title: string
  description?: string
  imageUrl: string
  thumbnail: string
  category: string
  tags: string[]
  featured: boolean
  createdAt: string
  likes: number
  views: number
  exifData?: {
    camera?: string
    lens?: string
    settings?: string
    location?: string
  }
}

interface Category {
  name: string
  slug: string
  count: number
}

export default function PhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([])
  const [categories, setCategories] = useState<Category[]>([{ name: 'All', slug: 'all', count: 0 }])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("masonry")

  // Fetch real photos data
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        // Try Prisma API first
        let response = await fetch('/api/photos')
        
        // If Prisma fails, try Supabase API
        if (!response.ok) {
          console.log('Prisma API failed, trying Supabase API...')
          response = await fetch('/api/photos-supabase')
        }
        
        if (response.ok) {
          const data = await response.json()
          const photosData = data.photos || data || []
          setPhotos(photosData)
          setFilteredPhotos(photosData)
          
          // Generate categories from photos
          if (photosData.length > 0) {
            const categoryMap = new Map()
            categoryMap.set('all', { name: 'All', slug: 'all', count: photosData.length })
            
            photosData.forEach((photo: Photo) => {
              const category = photo.category
              if (!categoryMap.has(category)) {
                categoryMap.set(category, {
                  name: category.charAt(0).toUpperCase() + category.slice(1),
                  slug: category,
                  count: 0
                })
              }
              categoryMap.get(category).count++
            })
            
            setCategories(Array.from(categoryMap.values()))
          } else {
            setPhotos([])
            setFilteredPhotos([])
            setCategories([{ name: 'All', slug: 'all', count: 0 }])
          }
        } else {
          console.error('Failed to fetch photos')
          setPhotos([])
          setFilteredPhotos([])
          setCategories([{ name: 'All', slug: 'all', count: 0 }])
        }
      } catch (error) {
        console.error('Error fetching photos:', error)
        // Fallback to empty state
        setPhotos([])
        setFilteredPhotos([])
        setCategories([{ name: 'All', slug: 'all', count: 0 }])
      } finally {
        setLoading(false)
      }
    }

    fetchPhotos()
  }, [])

  // Filter photos based on search and category
  useEffect(() => {
    let filtered = photos

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(photo => photo.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(photo =>
        photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    setFilteredPhotos(filtered)
  }, [photos, selectedCategory, searchTerm])

  const toggleFavorite = async (photoId: string) => {
    // TODO: Implement favorite toggle API call
    console.log('Toggle favorite for photo:', photoId)
  }

  const downloadPhoto = async (photoUrl: string, title: string) => {
    // TODO: Implement photo download
    console.log('Download photo:', photoUrl, title)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading photos...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-4">
            <Camera className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            Photography Portfolio
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Capturing moments through the lens - a collection of my favorite photographs
          </p>
        </motion.div>

        {/* Search and Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search photos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4 mr-2" />
                Grid
              </Button>
              <Button
                variant={viewMode === 'masonry' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('masonry')}
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Masonry
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.slug}
                variant={selectedCategory === category.slug ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.slug)}
                className="text-sm"
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Photos Grid */}
        {filteredPhotos.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'columns-1 md:columns-2 lg:columns-3'
            }`}
          >
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group cursor-pointer ${viewMode === 'masonry' ? 'break-inside-avoid mb-6' : ''}`}
                onClick={() => setSelectedPhoto(photo)}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative overflow-hidden">
                    <img
                      src={photo.thumbnail || photo.imageUrl}
                      alt={photo.title}
                      className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    
                    {/* Featured Badge */}
                    {photo.featured && (
                      <Badge className="absolute top-4 left-4 bg-yellow-500 text-white">
                        Featured
                      </Badge>
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFavorite(photo.id)
                          }}
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={(e) => {
                            e.stopPropagation()
                            downloadPhoto(photo.imageUrl, photo.title)
                          }}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          asChild
                        >
                          <a href={photo.imageUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{photo.title}</h3>
                    {photo.description && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                        {photo.description}
                      </p>
                    )}
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {photo.tags?.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {photo.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {photo.views}
                        </span>
                      </div>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(photo.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
              <ImageIcon className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No photos found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm || selectedCategory !== 'all'
                ? "Try adjusting your search or filter criteria."
                : "No photos available at the moment."}
            </p>
            {(searchTerm || selectedCategory !== 'all') && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                }}
              >
                Clear filters
              </Button>
            )}
          </motion.div>
        )}

        {/* Photo Modal */}
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl max-h-[90vh] overflow-auto bg-white dark:bg-gray-900 rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  className="w-full h-auto object-contain max-h-[70vh]"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70"
                  onClick={() => setSelectedPhoto(null)}
                >
                  ×
                </Button>
              </div>
              
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{selectedPhoto.title}</h2>
                {selectedPhoto.description && (
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {selectedPhoto.description}
                  </p>
                )}
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedPhoto.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* EXIF Data */}
                {selectedPhoto.exifData && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    {selectedPhoto.exifData.camera && (
                      <div>
                        <strong>Camera:</strong> {selectedPhoto.exifData.camera}
                      </div>
                    )}
                    {selectedPhoto.exifData.lens && (
                      <div>
                        <strong>Lens:</strong> {selectedPhoto.exifData.lens}
                      </div>
                    )}
                    {selectedPhoto.exifData.settings && (
                      <div>
                        <strong>Settings:</strong> {selectedPhoto.exifData.settings}
                      </div>
                    )}
                    {selectedPhoto.exifData.location && (
                      <div>
                        <strong>Location:</strong> {selectedPhoto.exifData.location}
                      </div>
                    )}
                  </div>
                )}

                {/* Stats and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {selectedPhoto.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {selectedPhoto.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(selectedPhoto.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleFavorite(selectedPhoto.id)}
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Favorite
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => downloadPhoto(selectedPhoto.imageUrl, selectedPhoto.title)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
