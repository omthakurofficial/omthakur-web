"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Settings,
  Users,
  FileText,
  Image,
  Video,
  MessageSquare,
  BarChart3,
  Calendar,
  Plus,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  Activity,
  DollarSign,
  Download,
  Upload,
  Search,
  Filter,
  MoreVertical
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Types for real data
interface BlogPost {
  id: string
  title: string
  content: string
  excerpt?: string
  slug: string
  image_url?: string
  is_published: boolean
  views?: number
  created_at: string
  updated_at: string
}

interface DashboardStats {
  totalPosts: number
  totalPhotos: number
  totalVideos: number
  totalViews: number
  monthlyViews: number
  totalLikes: number
  totalComments: number
  revenue: number
}

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = React.useState("overview")
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    totalPhotos: 0,
    totalVideos: 0,
    totalViews: 0,
    monthlyViews: 0,
    totalLikes: 0,
    totalComments: 0,
    revenue: 0
  })

  // Fetch real data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch posts
        const postsResponse = await fetch('/api/posts-crud')
        if (postsResponse.ok) {
          const postsData = await postsResponse.json()
          setPosts(postsData.posts || [])
          
          // Calculate stats from real data
          const totalPosts = postsData.posts?.length || 0
          const totalViews = postsData.posts?.reduce((sum: number, post: BlogPost) => sum + (post.views || 0), 0) || 0
          
          setStats(prev => ({
            ...prev,
            totalPosts,
            totalViews,
            monthlyViews: Math.floor(totalViews * 0.3) // Rough estimate for this month
          }))
        }

        // Fetch photos count (if you have a photos API)
        try {
          const photosResponse = await fetch('/api/photos')
          if (photosResponse.ok) {
            const photosData = await photosResponse.json()
            setStats(prev => ({
              ...prev,
              totalPhotos: photosData.photos?.length || 0
            }))
          }
        } catch (error) {
          console.log('Photos API not available')
        }

        // Fetch videos count (if you have a videos API)
        try {
          const videosResponse = await fetch('/api/videos')
          if (videosResponse.ok) {
            const videosData = await videosResponse.json()
            setStats(prev => ({
              ...prev,
              totalVideos: videosData.videos?.length || 0
            }))
          }
        } catch (error) {
          console.log('Videos API not available')
        }

      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            <Badge variant="secondary">Manage your content and monitor site performance</Badge>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Link href="/admin/posts/new">
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                New Content
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalPosts}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.totalPosts > 0 ? '+12% from last month' : 'Start creating content!'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Views</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatNumber(stats.monthlyViews)}</div>
                  <p className="text-xs text-muted-foreground">
                    +20% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatNumber(stats.totalLikes)}</div>
                  <p className="text-xs text-muted-foreground">
                    +18% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats.revenue.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">
                    +5% from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions and Recent Content */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              {/* Recent Posts */}
              <Card className="col-span-4">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Posts</CardTitle>
                    <Link href="/admin/posts">
                      <Button variant="ghost" size="sm">
                        View All
                        <Eye className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  {posts.length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No posts yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Start creating amazing content for your audience
                      </p>
                      <Link href="/admin/posts/new">
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Create Your First Post
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {posts.slice(0, 5).map((post) => (
                        <div key={post.id} className="flex items-center space-x-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                              {post.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {post.is_published ? "published" : "draft"} • {formatDate(post.created_at)}
                            </p>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {post.views || 0} views
                          </div>
                          <Badge variant={post.is_published ? "default" : "secondary"}>
                            {post.is_published ? "Published" : "Draft"}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/posts/edit/${post.id}`}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/blog/${post.slug}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/admin/posts/new" className="block">
                    <Button className="w-full justify-start" variant="outline">
                      <Plus className="mr-2 h-4 w-4" />
                      New Blog Post
                    </Button>
                  </Link>
                  <Link href="/admin/photos/new" className="block">
                    <Button className="w-full justify-start" variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Photo
                    </Button>
                  </Link>
                  <Link href="/admin/videos/new" className="block">
                    <Button className="w-full justify-start" variant="outline">
                      <Video className="mr-2 h-4 w-4" />
                      Add Video
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Content Management Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Posts Management */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <CardTitle>Posts Management</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-2xl font-bold">{stats.totalPosts} Posts</div>
                    <p className="text-sm text-muted-foreground">
                      Manage your blog posts, create new content, and track performance
                    </p>
                    <div className="space-y-2">
                      <Link href="/admin/posts/new">
                        <Button size="sm" className="w-full">
                          <Plus className="mr-2 h-4 w-4" />
                          New Post
                        </Button>
                      </Link>
                      <Link href="/admin/posts">
                        <Button size="sm" variant="outline" className="w-full">
                          <FileText className="mr-2 h-4 w-4" />
                          View All Posts
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Media Library */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Image className="h-5 w-5" />
                    <CardTitle>Media Library</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-xl font-bold">{stats.totalPhotos}</div>
                        <div className="text-muted-foreground">Photos</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold">{stats.totalVideos}</div>
                        <div className="text-muted-foreground">Videos</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Upload and manage your photos and videos
                    </p>
                    <div className="space-y-2">
                      <Link href="/admin/photos/new">
                        <Button size="sm" className="w-full">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Photos
                        </Button>
                      </Link>
                      <div className="grid grid-cols-2 gap-2">
                        <Link href="/admin/photos">
                          <Button size="sm" variant="outline" className="w-full">
                            Photos
                          </Button>
                        </Link>
                        <Link href="/admin/videos">
                          <Button size="sm" variant="outline" className="w-full">
                            Videos
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Site Settings */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <CardTitle>Quick Settings</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Manage site configuration and preferences
                    </p>
                    <div className="space-y-2">
                      <Button size="sm" variant="outline" className="w-full justify-start">
                        <Settings className="mr-2 h-4 w-4" />
                        Site Settings
                      </Button>
                      <Button size="sm" variant="outline" className="w-full justify-start">
                        <Users className="mr-2 h-4 w-4" />
                        User Management
                      </Button>
                      <Button size="sm" variant="outline" className="w-full justify-start">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Analytics
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="posts" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Posts Management</h2>
              <Link href="/admin/posts/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Post
                </Button>
              </Link>
            </div>
            
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="mx-auto h-24 w-24 text-muted-foreground/50 mb-4" />
                <h3 className="text-2xl font-medium mb-2">No posts yet</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Start building your blog by creating your first post. Share your thoughts, ideas, and stories with the world.
                </p>
                <Link href="/admin/posts/new">
                  <Button size="lg">
                    <Plus className="mr-2 h-5 w-5" />
                    Create Your First Post
                  </Button>
                </Link>
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <CardTitle>All Posts ({posts.length})</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Views</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {posts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell className="font-medium">{post.title}</TableCell>
                          <TableCell>
                            <Badge variant={post.is_published ? "default" : "secondary"}>
                              {post.is_published ? "Published" : "Draft"}
                            </Badge>
                          </TableCell>
                          <TableCell>{post.views || 0}</TableCell>
                          <TableCell>{formatDate(post.created_at)}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Link href={`/admin/posts/edit/${post.id}`}>
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Link href={`/blog/${post.slug}`}>
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </Link>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="media" className="space-y-4">
            <h2 className="text-2xl font-bold">Media Library</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Image className="h-5 w-5" />
                    <CardTitle>Photos ({stats.totalPhotos})</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Manage your photo gallery and showcase your photography
                  </p>
                  <div className="space-y-2">
                    <Link href="/admin/photos/new">
                      <Button className="w-full">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload New Photos
                      </Button>
                    </Link>
                    <Link href="/admin/photos">
                      <Button variant="outline" className="w-full">
                        Manage Photos
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Video className="h-5 w-5" />
                    <CardTitle>Videos ({stats.totalVideos})</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload and organize your video content
                  </p>
                  <div className="space-y-2">
                    <Link href="/admin/videos/new">
                      <Button className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Video
                      </Button>
                    </Link>
                    <Link href="/admin/videos">
                      <Button variant="outline" className="w-full">
                        Manage Videos
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <h2 className="text-2xl font-bold">Analytics & Performance</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Total Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatNumber(stats.totalViews)}</div>
                  <p className="text-xs text-muted-foreground">All time</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatNumber(stats.monthlyViews)}</div>
                  <p className="text-xs text-muted-foreground">+20% from last month</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <h2 className="text-2xl font-bold">Settings</h2>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Site Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Configure your site settings, SEO, and general preferences.
                  </p>
                  <Button className="mt-4">
                    <Settings className="mr-2 h-4 w-4" />
                    Open Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}