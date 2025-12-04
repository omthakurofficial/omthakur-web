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
  Video as VideoIcon,
  Play,
  Clock,
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

interface Video {
  id: string
  title: string
  description?: string
  youtubeId: string
  thumbnail: string
  category: string
  tags: string[]
  featured: boolean
  visible: boolean
  duration?: string
  createdAt: string
  views?: number
  likes?: number
}

const categories = [
  { name: "All Categories", value: "all" },
  { name: "Tech", value: "TECH" },
  { name: "Tutorial", value: "TUTORIAL" },
  { name: "Photography", value: "PHOTOGRAPHY" },
  { name: "Travel", value: "TRAVEL" },
  { name: "Personal", value: "PERSONAL" }
]

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    setIsLoading(true)
    try {
      let response = await fetch('/api/videos')
      
      // If Prisma fails, try Supabase API with admin flag
      if (!response.ok) {
        console.log('Prisma API failed, trying Supabase API...')
        response = await fetch('/api/videos-supabase?admin=true')
      }
      
      if (response.ok) {
        const data = await response.json()
        const videosData = data.videos || []
        setVideos(videosData)
        console.log(`Loaded ${videosData.length} videos`)
      } else {
        console.error('Failed to fetch videos')
        setVideos([])
      }
    } catch (error) {
      console.error('Error fetching videos:', error)
      setVideos([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteVideo = async (videoId: string) => {
    if (!confirm('Are you sure you want to delete this video?')) {
      return
    }

    try {
      // Try Supabase API first
      let response = await fetch(`/api/videos-supabase/${videoId}`, {
        method: 'DELETE'
      })

      // If Supabase fails, try Prisma API
      if (!response.ok) {
        response = await fetch(`/api/videos/${videoId}`, {
          method: 'DELETE'
        })
      }

      if (response.ok) {
        setVideos(prev => prev.filter(v => v.id !== videoId))
        alert('Video deleted successfully!')
        // Refresh the videos list
        fetchVideos()
      } else {
        alert('Failed to delete video')
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('Failed to delete video')
    }
  }

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || video.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const stats = {
    total: videos.length,
    featured: videos.filter(v => v.featured).length,
    published: videos.filter(v => v.visible).length,
    drafts: videos.filter(v => !v.visible).length
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
                <h1 className="text-2xl font-bold">Videos Management</h1>
                <p className="text-muted-foreground">
                  Manage your video content and YouTube uploads
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button asChild>
                <Link href="/admin/videos/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Video
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
              <div className="text-sm text-muted-foreground">Total Videos</div>
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
                    placeholder="Search videos..."
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

        {/* Videos Display */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p>Loading videos...</p>
          </div>
        ) : (
          <>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredVideos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden group">
                      <div className="aspect-video relative">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = '/images/placeholder-video.jpg'
                          }}
                        />
                        {/* Play button background overlay */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-12 h-12 bg-black/70 rounded-full flex items-center justify-center">
                            <Play className="h-6 w-6 text-white ml-1" />
                          </div>
                        </div>
                        {/* Action buttons overlay */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-10">
                          <Button size="sm" variant="secondary" asChild>
                            <Link href={`/admin/videos/edit/${video.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button size="sm" variant="secondary" asChild>
                            <Link href={`https://youtube.com/watch?v=${video.youtubeId}`} target="_blank">
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDeleteVideo(video.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="absolute bottom-2 right-2">
                          <Badge className="bg-black/70 text-white">
                            {video.duration || '0:00'}
                          </Badge>
                        </div>
                        <div className="absolute top-2 left-2 flex gap-2">
                          {video.featured && (
                            <Badge className="bg-yellow-500">
                              Featured
                            </Badge>
                          )}
                          {!video.visible && (
                            <Badge variant="secondary">
                              Draft
                            </Badge>
                          )}
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium text-sm line-clamp-2 mb-2">
                          {video.title}
                        </h3>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="capitalize">{video.category.toLowerCase()}</span>
                          <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {video.views || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {video.likes || 0}
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
                    {filteredVideos.map((video) => (
                      <div key={video.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50">
                        <div className="relative">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-24 h-16 object-cover rounded"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-6 h-6 bg-black/70 rounded-full flex items-center justify-center">
                              <Play className="h-3 w-3 text-white ml-0.5" />
                            </div>
                          </div>
                          <Badge className="absolute bottom-1 right-1 text-xs bg-black/70 text-white">
                            {video.duration || '0:00'}
                          </Badge>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{video.title}</h3>
                            {video.featured && (
                              <Badge variant="secondary">Featured</Badge>
                            )}
                            <Badge variant="outline">{video.category}</Badge>
                            {!video.visible && (
                              <Badge variant="secondary">Draft</Badge>
                            )}
                          </div>
                          {video.description && (
                            <p className="text-sm text-muted-foreground line-clamp-1 mb-1">
                              {video.description}
                            </p>
                          )}
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Uploaded {new Date(video.createdAt).toLocaleDateString()}</span>
                            <span>{video.views || 0} views</span>
                            <span>{video.likes || 0} likes</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/admin/videos/edit/${video.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`https://youtube.com/watch?v=${video.youtubeId}`} target="_blank">
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
                                {video.featured ? 'Remove from Featured' : 'Add to Featured'}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => handleDeleteVideo(video.id)}
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

            {filteredVideos.length === 0 && (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <VideoIcon className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No videos found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery ? 'Try adjusting your search criteria' : 'Start by adding some videos'}
                </p>
                <Button asChild>
                  <Link href="/admin/videos/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Video
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