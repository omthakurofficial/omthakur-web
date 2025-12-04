"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Video,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Heart,
  Eye,
  Calendar,
  Filter,
  Search,
  ExternalLink,
  Youtube,
  Clock,
  Plus,
  Upload
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Types for real video data
interface VideoData {
  id: string
  title: string
  description?: string
  videoUrl: string
  thumbnail: string
  youtubeId?: string
  duration: string
  category: string
  tags: string[]
  featured: boolean
  createdAt: string
  likes: number
  views: number
}

interface Category {
  name: string
  slug: string
  count: number
}

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoData[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [filteredVideos, setFilteredVideos] = useState<VideoData[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null)
  const [isPlaying, setIsPlaying] = useState<{[key: string]: boolean}>({})

  // Fetch real videos data
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Try Prisma API first
        let response = await fetch('/api/videos')
        
        // If Prisma fails, try Supabase API
        if (!response.ok) {
          console.log('Prisma API failed, trying Supabase API...')
          response = await fetch('/api/videos-supabase')
        }
        
        if (response.ok) {
          const data = await response.json()
          const videosData = data.videos || []
          setVideos(videosData)
          setFilteredVideos(videosData)
          
          // Generate categories from videos
          const categoryMap = new Map()
          categoryMap.set('all', { name: 'All', slug: 'all', count: videosData.length })
          
          videosData.forEach((video: VideoData) => {
            const cat = video.category
            if (categoryMap.has(cat)) {
              categoryMap.get(cat).count++
            } else {
              categoryMap.set(cat, {
                name: cat.charAt(0).toUpperCase() + cat.slice(1),
                slug: cat,
                count: 1
              })
            }
          })
          
          setCategories(Array.from(categoryMap.values()))
        } else {
          console.error('Failed to fetch videos')
          setVideos([])
          setFilteredVideos([])
          setCategories([{ name: 'All', slug: 'all', count: 0 }])
        }
      } catch (error) {
        console.error('Error fetching videos:', error)
        // Fallback to empty state
        setVideos([])
        setFilteredVideos([])
        setCategories([{ name: 'All', slug: 'all', count: 0 }])
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  // Filter videos based on search and category
  useEffect(() => {
    let filtered = videos

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(video => video.category === selectedCategory)
    }

    // Filter by search term
    if (searchQuery.trim()) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    setFilteredVideos(filtered)
  }, [videos, selectedCategory, searchQuery])

  const toggleVideo = (videoId: string) => {
    setIsPlaying(prev => ({
      ...prev,
      [videoId]: !prev[videoId]
    }))
  }

  const handleVideoClick = (video: VideoData) => {
    setSelectedVideo(video)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading videos...</p>
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
          <div className="inline-flex items-center justify-center p-2 bg-red-100 dark:bg-red-900/20 rounded-full mb-4">
            <Video className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 via-pink-600 to-red-800 bg-clip-text text-transparent">
            Video Portfolio
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Exploring creativity through motion - tutorials, vlogs, and visual stories
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
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
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

        {/* Videos Grid */}
        {filteredVideos.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => handleVideoClick(video)}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative aspect-video overflow-hidden">
                    {video.youtubeId ? (
                      // YouTube thumbnail
                      <img
                        src={video.thumbnail || `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      // Regular video thumbnail
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    )}
                    
                    {/* Featured Badge */}
                    {video.featured && (
                      <Badge className="absolute top-4 left-4 bg-yellow-500 text-white">
                        Featured
                      </Badge>
                    )}

                    {/* Duration Badge */}
                    <Badge 
                      variant="secondary" 
                      className="absolute bottom-4 right-4 bg-black/70 text-white"
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      {video.duration}
                    </Badge>

                    {/* Play Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button
                        size="lg"
                        className="rounded-full bg-red-600 hover:bg-red-700 text-white"
                        onClick={(e) => {
                          e.stopPropagation()
                          if (video.youtubeId) {
                            window.open(`https://www.youtube.com/watch?v=${video.youtubeId}`, '_blank')
                          } else {
                            toggleVideo(video.id)
                          }
                        }}
                      >
                        <Play className="h-6 w-6 ml-1" fill="currentColor" />
                      </Button>
                    </div>

                    {/* YouTube Icon */}
                    {video.youtubeId && (
                      <div className="absolute top-4 right-4">
                        <Youtube className="h-5 w-5 text-red-600 bg-white rounded-sm p-0.5" />
                      </div>
                    )}
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{video.title}</h3>
                    {video.description && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                        {video.description}
                      </p>
                    )}
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {video.tags?.slice(0, 3).map((tag) => (
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
                          {video.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {video.views}
                        </span>
                      </div>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(video.createdAt).toLocaleDateString()}
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
              <Video className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No videos found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchQuery || selectedCategory !== 'all'
                ? "Try adjusting your search or filter criteria."
                : "No videos available at the moment."}
            </p>
            {(searchQuery || selectedCategory !== 'all') && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
              >
                Clear filters
              </Button>
            )}
          </motion.div>
        )}

        {/* Video Modal */}
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl max-h-[90vh] overflow-auto bg-white dark:bg-gray-900 rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                {selectedVideo.youtubeId ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}`}
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video
                    width="100%"
                    height="100%"
                    controls
                    src={selectedVideo.videoUrl}
                    className="w-full h-full"
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70"
                  onClick={() => setSelectedVideo(null)}
                >
                  ×
                </Button>
              </div>
              
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{selectedVideo.title}</h2>
                {selectedVideo.description && (
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {selectedVideo.description}
                  </p>
                )}
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedVideo.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Stats and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {selectedVideo.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {selectedVideo.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {selectedVideo.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(selectedVideo.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        // TODO: Implement like functionality
                        console.log('Like video:', selectedVideo.id)
                      }}
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Like
                    </Button>
                    {selectedVideo.youtubeId && (
                      <Button
                        size="sm"
                        asChild
                      >
                        <a 
                          href={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Watch on YouTube
                        </a>
                      </Button>
                    )}
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
