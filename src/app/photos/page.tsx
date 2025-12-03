"use client"

import * as React from "react"
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
  Calendar
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock photo data - replace with actual API calls
const categories = [
  { name: "All", slug: "all", count: 48 },
  { name: "Nature", slug: "nature", count: 18 },
  { name: "Architecture", slug: "architecture", count: 12 },
  { name: "Street", slug: "street", count: 10 },
  { name: "Portrait", slug: "portrait", count: 8 }
]

const photos = [
  {
    id: "1",
    title: "Mountain Sunrise",
    description: "Beautiful mountain landscape at sunrise with fog rolling through the valleys",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    category: "nature",
    tags: ["landscape", "mountains", "sunrise", "fog"],
    featured: true,
    createdAt: "2024-11-20",
    likes: 124,
    views: 2341,
    exifData: {
      camera: "Canon EOS R5",
      lens: "RF 24-70mm f/2.8L",
      settings: "f/8, 1/250s, ISO 100",
      location: "Swiss Alps"
    }
  },
  {
    id: "2",
    title: "Modern Architecture",
    description: "Contemporary building with clean geometric lines and glass facade",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400",
    category: "architecture",
    tags: ["modern", "building", "glass", "geometry"],
    featured: false,
    createdAt: "2024-11-18",
    likes: 87,
    views: 1532,
    exifData: {
      camera: "Sony A7R IV",
      lens: "FE 16-35mm f/2.8 GM",
      settings: "f/11, 1/125s, ISO 200",
      location: "Downtown NYC"
    }
  },
  {
    id: "3",
    title: "City Street Life",
    description: "Candid street photography capturing urban life and movement",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800",
    thumbnail: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400",
    category: "street",
    tags: ["street", "urban", "people", "candid"],
    featured: true,
    createdAt: "2024-11-15",
    likes: 156,
    views: 2890,
    exifData: {
      camera: "Fujifilm X-T4",
      lens: "XF 35mm f/1.4 R",
      settings: "f/2.8, 1/500s, ISO 800",
      location: "Tokyo, Japan"
    }
  },
  {
    id: "4",
    title: "Portrait Study",
    description: "Natural light portrait with soft shadows and warm tones",
    imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b123?w=800",
    thumbnail: "https://images.unsplash.com/photo-1494790108755-2616b612b123?w=400",
    category: "portrait",
    tags: ["portrait", "natural light", "woman", "studio"],
    featured: false,
    createdAt: "2024-11-12",
    likes: 203,
    views: 3412,
    exifData: {
      camera: "Nikon Z9",
      lens: "NIKKOR Z 85mm f/1.8 S",
      settings: "f/2.8, 1/200s, ISO 400",
      location: "Studio"
    }
  },
  {
    id: "5",
    title: "Ocean Waves",
    description: "Long exposure of waves crashing against rocky coastline",
    imageUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800",
    thumbnail: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400",
    category: "nature",
    tags: ["ocean", "waves", "long exposure", "rocks"],
    featured: true,
    createdAt: "2024-11-10",
    likes: 178,
    views: 2567,
    exifData: {
      camera: "Canon EOS R6",
      lens: "RF 14-35mm f/4L",
      settings: "f/16, 30s, ISO 50",
      location: "Big Sur, California"
    }
  },
  {
    id: "6",
    title: "Urban Geometry",
    description: "Abstract architectural details with dramatic shadows",
    imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
    thumbnail: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400",
    category: "architecture",
    tags: ["abstract", "shadows", "geometry", "minimal"],
    featured: false,
    createdAt: "2024-11-08",
    likes: 92,
    views: 1876,
    exifData: {
      camera: "Leica Q2",
      lens: "Summilux 28mm f/1.7",
      settings: "f/8, 1/250s, ISO 100",
      location: "Berlin, Germany"
    }
  }
]

export default function PhotosPage() {
  const [selectedCategory, setSelectedCategory] = React.useState("all")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filteredPhotos, setFilteredPhotos] = React.useState(photos)
  const [selectedPhoto, setSelectedPhoto] = React.useState<typeof photos[0] | null>(null)
  const [viewMode, setViewMode] = React.useState<"grid" | "masonry">("masonry")

  // Filter photos based on search and category
  React.useEffect(() => {
    let filtered = photos

    if (selectedCategory !== "all") {
      filtered = filtered.filter(photo => photo.category === selectedCategory)
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(photo => 
        photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    setFilteredPhotos(filtered)
  }, [searchQuery, selectedCategory])

  const openLightbox = (photo: typeof photos[0]) => {
    setSelectedPhoto(photo)
  }

  const closeLightbox = () => {
    setSelectedPhoto(null)
  }

  const featuredPhotos = photos.filter(photo => photo.featured).slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Camera className="h-8 w-8 text-pink-600" />
              <h1 className="text-4xl md:text-6xl font-bold">
                Photography
              </h1>
            </div>
            <p className="text-xl text-muted-foreground mb-8">
              Capturing moments, telling stories through the lens. 
              A collection of my favorite shots from travels and daily life.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search photos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">{photos.length}</div>
                <div className="text-sm text-muted-foreground">Photos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">12K+</div>
                <div className="text-sm text-muted-foreground">Total Views</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">850+</div>
                <div className="text-sm text-muted-foreground">Likes</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Photos */}
      {selectedCategory === "all" && !searchQuery && (
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-center">Featured Photos</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {featuredPhotos.map((photo, index) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="group cursor-pointer"
                    onClick={() => openLightbox(photo)}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="aspect-square relative overflow-hidden">
                        <img
                          src={photo.imageUrl}
                          alt={photo.title}
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <h3 className="font-semibold text-lg mb-1">{photo.title}</h3>
                          <div className="flex items-center gap-3 text-sm">
                            <span className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              {photo.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {photo.views}
                            </span>
                          </div>
                        </div>
                        <Badge className="absolute top-4 left-4 bg-pink-600">
                          Featured
                        </Badge>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Main Gallery */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.slug}
                  variant={selectedCategory === category.slug ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.slug)}
                  className="flex items-center gap-1"
                >
                  <Filter className="h-3 w-3" />
                  {category.name}
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === "masonry" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("masonry")}
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Photo Grid */}
          <div className={`grid gap-4 ${
            viewMode === "grid" 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "columns-1 md:columns-2 lg:columns-3 xl:columns-4"
          }`}>
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`group cursor-pointer ${viewMode === "masonry" ? "break-inside-avoid mb-4" : ""}`}
                onClick={() => openLightbox(photo)}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className={`relative overflow-hidden ${viewMode === "grid" ? "aspect-square" : ""}`}>
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <ExternalLink className="h-8 w-8 mx-auto mb-2" />
                        <p className="font-medium">View Full Size</p>
                      </div>
                    </div>
                    {photo.featured && (
                      <Badge className="absolute top-2 left-2 bg-pink-600">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1">{photo.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {photo.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(photo.createdAt).toLocaleDateString()}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {photo.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {photo.views}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredPhotos.length === 0 && (
            <div className="text-center py-12">
              <Camera className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No photos found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                }}
              >
                Clear filters
              </Button>
            </div>
          )}

          {/* Load More */}
          {filteredPhotos.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Photos
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-6xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.imageUrl}
              alt={selectedPhoto.title}
              className="w-full h-auto max-h-[70vh] object-contain mx-auto"
            />
            
            <div className="bg-white dark:bg-gray-800 p-6 mt-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedPhoto.title}</h2>
                  <p className="text-muted-foreground mb-4">{selectedPhoto.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedPhoto.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {selectedPhoto.likes} likes
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {selectedPhoto.views} views
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(selectedPhoto.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Camera Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Camera:</span>
                      <span>{selectedPhoto.exifData.camera}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lens:</span>
                      <span>{selectedPhoto.exifData.lens}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Settings:</span>
                      <span>{selectedPhoto.exifData.settings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span>{selectedPhoto.exifData.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-6">
                    <Button size="sm">
                      <Heart className="mr-2 h-4 w-4" />
                      Like
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 bg-white/20 border-white/30 text-white hover:bg-white/30"
              onClick={closeLightbox}
            >
              ×
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  )
}