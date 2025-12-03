"use client"

import * as React from "react"
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

// Mock data for dashboard
const dashboardStats = {
  totalPosts: 48,
  totalPhotos: 156,
  totalVideos: 24,
  totalViews: 125420,
  monthlyViews: 15670,
  totalLikes: 8950,
  totalComments: 2340,
  revenue: 2450.75
}

const recentPosts = [
  {
    id: "1",
    title: "Building Modern Web Applications with Next.js 15",
    status: "published",
    views: 2340,
    likes: 156,
    comments: 23,
    createdAt: "2024-11-20T10:00:00Z",
    category: "tech"
  },
  {
    id: "2",
    title: "Photography Tips for Beginners",
    status: "draft",
    views: 0,
    likes: 0,
    comments: 0,
    createdAt: "2024-11-19T14:30:00Z",
    category: "photography"
  },
  {
    id: "3",
    title: "My Journey Through Europe",
    status: "published",
    views: 1870,
    likes: 134,
    comments: 18,
    createdAt: "2024-11-18T09:15:00Z",
    category: "travel"
  }
]

const recentPhotos = [
  {
    id: "1",
    title: "Mountain Sunrise",
    views: 2341,
    likes: 124,
    category: "nature",
    createdAt: "2024-11-20T08:00:00Z",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200"
  },
  {
    id: "2",
    title: "City Architecture",
    views: 1532,
    likes: 87,
    category: "architecture",
    createdAt: "2024-11-18T16:20:00Z",
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200"
  }
]

const recentVideos = [
  {
    id: "1",
    title: "Next.js Tutorial Series",
    views: 15420,
    likes: 1240,
    duration: "24:15",
    category: "tech",
    createdAt: "2024-11-20T12:00:00Z",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200"
  }
]

const recentComments = [
  {
    id: "1",
    author: "Jane Doe",
    content: "Great tutorial! Really helped me understand Next.js better.",
    postTitle: "Building Modern Web Applications",
    createdAt: "2024-11-20T15:30:00Z",
    status: "approved"
  },
  {
    id: "2",
    author: "John Smith",
    content: "Amazing photos! What camera do you use?",
    postTitle: "Mountain Sunrise",
    createdAt: "2024-11-20T14:15:00Z",
    status: "pending"
  }
]

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = React.useState("overview")

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your content and monitor site performance
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                New Content
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Posts
                    </CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardStats.totalPosts}</div>
                    <p className="text-xs text-muted-foreground">
                      +12% from last month
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Monthly Views
                    </CardTitle>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatNumber(dashboardStats.monthlyViews)}</div>
                    <p className="text-xs text-muted-foreground">
                      +25% from last month
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Likes
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatNumber(dashboardStats.totalLikes)}</div>
                    <p className="text-xs text-muted-foreground">
                      +18% from last month
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Revenue
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${dashboardStats.revenue}</div>
                    <p className="text-xs text-muted-foreground">
                      +8% from last month
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Posts */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Recent Posts</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/admin/posts">
                      View All
                      <Eye className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentPosts.map((post) => (
                      <div key={post.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm line-clamp-2 mb-1">
                            {post.title}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <Badge 
                              variant={post.status === 'published' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {post.status}
                            </Badge>
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {formatNumber(post.views)}
                            </span>
                            <span>{formatDate(post.createdAt)}</span>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Comments */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Recent Comments</CardTitle>
                  <Button variant="ghost" size="sm">
                    View All
                    <Eye className="ml-2 h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentComments.map((comment) => (
                      <div key={comment.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-xs font-medium">
                          {comment.author[0].toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{comment.author}</span>
                            <Badge 
                              variant={comment.status === 'approved' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {comment.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1 line-clamp-2">
                            {comment.content}
                          </p>
                          <div className="text-xs text-muted-foreground">
                            on {comment.postTitle} • {formatDate(comment.createdAt)}
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>Approve</DropdownMenuItem>
                            <DropdownMenuItem>Reply</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Media Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Photos */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Image className="h-5 w-5" />
                    Photos ({dashboardStats.totalPhotos})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentPhotos.map((photo) => (
                      <div key={photo.id} className="flex items-center gap-3">
                        <img
                          src={photo.thumbnail}
                          alt={photo.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{photo.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatNumber(photo.views)} views • {formatNumber(photo.likes)} likes
                          </p>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href="/admin/photos">
                        Manage Photos
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Videos */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    Videos ({dashboardStats.totalVideos})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentVideos.map((video) => (
                      <div key={video.id} className="flex items-center gap-3">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{video.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatNumber(video.views)} views • {video.duration}
                          </p>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href="/admin/videos">
                        Manage Videos
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button className="w-full justify-start" asChild>
                      <Link href="/admin/posts/new">
                        <Plus className="mr-2 h-4 w-4" />
                        New Blog Post
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/admin/photos/new">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Photo
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/admin/videos/new">
                        <Video className="mr-2 h-4 w-4" />
                        Add Video
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/admin/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Site Settings
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Posts Management Tab */}
          <TabsContent value="posts" className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold">Posts Management</h2>
                <p className="text-muted-foreground">Create, edit, and manage your blog posts</p>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="Search posts..." className="pl-10" />
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Post
                </Button>
              </div>
            </div>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>
                        <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                          {post.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="capitalize">{post.category}</TableCell>
                      <TableCell>{formatNumber(post.views)}</TableCell>
                      <TableCell>{formatDate(post.createdAt)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Media Management Tab */}
          <TabsContent value="media" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Media Library</h2>
                <p className="text-muted-foreground">Manage your photos and videos</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Files
                </Button>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Album
                </Button>
              </div>
            </div>

            <Tabs defaultValue="photos">
              <TabsList>
                <TabsTrigger value="photos">Photos ({dashboardStats.totalPhotos})</TabsTrigger>
                <TabsTrigger value="videos">Videos ({dashboardStats.totalVideos})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="photos" className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {recentPhotos.map((photo) => (
                    <Card key={photo.id} className="overflow-hidden">
                      <div className="aspect-square relative group">
                        <img
                          src={photo.thumbnail}
                          alt={photo.title}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button size="sm" variant="secondary">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="secondary">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <p className="font-medium text-sm truncate">{photo.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatNumber(photo.views)} views
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="videos" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recentVideos.map((video) => (
                    <Card key={video.id} className="overflow-hidden">
                      <div className="aspect-video relative group">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button size="sm" variant="secondary">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="secondary">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <Badge className="absolute bottom-2 right-2 bg-black/70">
                          {video.duration}
                        </Badge>
                      </div>
                      <CardContent className="p-3">
                        <p className="font-medium text-sm truncate">{video.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatNumber(video.views)} views • {formatNumber(video.likes)} likes
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Analytics</h2>
              <p className="text-muted-foreground">Monitor your site performance and engagement</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatNumber(dashboardStats.totalViews)}</div>
                  <div className="text-xs text-green-600">+12.5% vs last month</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8.2K</div>
                  <div className="text-xs text-green-600">+8.2% vs last month</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">34.2%</div>
                  <div className="text-xs text-red-600">+2.1% vs last month</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3m 24s</div>
                  <div className="text-xs text-green-600">+15% vs last month</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Content</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Content</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Engagement</TableHead>
                      <TableHead>Growth</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Next.js Tutorial</TableCell>
                      <TableCell>Video</TableCell>
                      <TableCell>15.4K</TableCell>
                      <TableCell>8.2%</TableCell>
                      <TableCell className="text-green-600">+24%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Mountain Photography</TableCell>
                      <TableCell>Photo</TableCell>
                      <TableCell>2.3K</TableCell>
                      <TableCell>12.5%</TableCell>
                      <TableCell className="text-green-600">+18%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Site Settings</h2>
              <p className="text-muted-foreground">Configure your site preferences and options</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Site Title</label>
                    <Input defaultValue="Om Thakur - Portfolio" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Site Description</label>
                    <Input defaultValue="Full Stack Developer & Designer" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Contact Email</label>
                    <Input defaultValue="om@omthakur.tech" />
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SEO Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Meta Keywords</label>
                    <Input defaultValue="web development, design, portfolio" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Google Analytics ID</label>
                    <Input placeholder="GA-XXXXXXXXX-X" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Search Console</label>
                    <Input placeholder="Search Console verification code" />
                  </div>
                  <Button>Save SEO Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}