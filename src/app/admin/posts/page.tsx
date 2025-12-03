"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { 
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Calendar,
  User,
  Tag,
  MoreVertical,
  ArrowLeft,
  Download,
  Upload,
  Bookmark
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock data for posts
const posts = [
  {
    id: "1",
    title: "Building Modern Web Applications with Next.js 15",
    slug: "building-modern-web-apps-nextjs-15",
    excerpt: "Learn how to build performant, modern web applications using Next.js 15 with all the latest features.",
    content: "Full content here...",
    status: "published",
    category: "tech",
    tags: ["nextjs", "react", "typescript", "web development"],
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    author: "Om Thakur",
    views: 2340,
    likes: 156,
    comments: 23,
    createdAt: "2024-11-20T10:00:00Z",
    updatedAt: "2024-11-20T10:00:00Z",
    publishedAt: "2024-11-20T10:00:00Z"
  },
  {
    id: "2",
    title: "Photography Tips for Beginners: Getting Started",
    slug: "photography-tips-beginners-getting-started",
    excerpt: "Essential photography tips and techniques for beginners who want to improve their skills.",
    content: "Draft content...",
    status: "draft",
    category: "photography",
    tags: ["photography", "tips", "beginners", "camera"],
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1495121553079-4c61bcce1894?w=800",
    author: "Om Thakur",
    views: 0,
    likes: 0,
    comments: 0,
    createdAt: "2024-11-19T14:30:00Z",
    updatedAt: "2024-11-19T14:30:00Z",
    publishedAt: null
  },
  {
    id: "3",
    title: "My Journey Through Europe: A Photo Story",
    slug: "journey-through-europe-photo-story",
    excerpt: "Follow my travels through Europe captured through photography and stories from each destination.",
    content: "Travel content...",
    status: "published",
    category: "travel",
    tags: ["travel", "europe", "photography", "adventure"],
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800",
    author: "Om Thakur",
    views: 1870,
    likes: 134,
    comments: 18,
    createdAt: "2024-11-18T09:15:00Z",
    updatedAt: "2024-11-18T09:15:00Z",
    publishedAt: "2024-11-18T09:15:00Z"
  },
  {
    id: "4",
    title: "Understanding React Hooks: A Complete Guide",
    slug: "understanding-react-hooks-complete-guide",
    excerpt: "Deep dive into React Hooks with practical examples and best practices for modern React development.",
    content: "React content...",
    status: "published",
    category: "tech",
    tags: ["react", "hooks", "javascript", "frontend"],
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    author: "Om Thakur",
    views: 3240,
    likes: 287,
    comments: 45,
    createdAt: "2024-11-15T16:20:00Z",
    updatedAt: "2024-11-15T16:20:00Z",
    publishedAt: "2024-11-15T16:20:00Z"
  },
  {
    id: "5",
    title: "Design Systems: Building Scalable UI Components",
    slug: "design-systems-scalable-ui-components",
    excerpt: "Learn how to create and maintain design systems that scale with your product and team.",
    content: "Design content...",
    status: "scheduled",
    category: "design",
    tags: ["design", "ui", "components", "system"],
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800",
    author: "Om Thakur",
    views: 0,
    likes: 0,
    comments: 0,
    createdAt: "2024-11-16T11:30:00Z",
    updatedAt: "2024-11-16T11:30:00Z",
    publishedAt: "2024-11-25T10:00:00Z"
  }
]

const categories = [
  { name: "All Categories", value: "all" },
  { name: "Technology", value: "tech" },
  { name: "Photography", value: "photography" },
  { name: "Travel", value: "travel" },
  { name: "Design", value: "design" }
]

const statuses = [
  { name: "All Statuses", value: "all" },
  { name: "Published", value: "published" },
  { name: "Draft", value: "draft" },
  { name: "Scheduled", value: "scheduled" }
]

export default function AdminPostsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("all")
  const [selectedStatus, setSelectedStatus] = React.useState("all")
  const [filteredPosts, setFilteredPosts] = React.useState(posts)
  const [selectedPosts, setSelectedPosts] = React.useState<string[]>([])

  // Filter posts
  React.useEffect(() => {
    let filtered = posts

    if (searchQuery.trim()) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter(post => post.status === selectedStatus)
    }

    setFilteredPosts(filtered)
  }, [searchQuery, selectedCategory, selectedStatus])

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Not published"
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'default'
      case 'draft': return 'secondary'
      case 'scheduled': return 'outline'
      default: return 'secondary'
    }
  }

  const handleSelectPost = (postId: string) => {
    setSelectedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    )
  }

  const handleSelectAll = () => {
    setSelectedPosts(
      selectedPosts.length === filteredPosts.length 
        ? []
        : filteredPosts.map(post => post.id)
    )
  }

  const stats = {
    total: posts.length,
    published: posts.filter(p => p.status === 'published').length,
    drafts: posts.filter(p => p.status === 'draft').length,
    scheduled: posts.filter(p => p.status === 'scheduled').length
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
                <h1 className="text-2xl font-bold">Posts Management</h1>
                <p className="text-muted-foreground">
                  Create, edit, and manage your blog posts
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Import
              </Button>
              <Button asChild>
                <Link href="/admin/posts/new">
                  <Plus className="mr-2 h-4 w-4" />
                  New Post
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
              <div className="text-sm text-muted-foreground">Total Posts</div>
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
              <div className="text-2xl font-bold text-yellow-600">{stats.drafts}</div>
              <div className="text-sm text-muted-foreground">Drafts</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{stats.scheduled}</div>
              <div className="text-sm text-muted-foreground">Scheduled</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search posts..."
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
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedPosts.length > 0 && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Bulk Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    Delete ({selectedPosts.length})
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Posts Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0}
                    onChange={handleSelectAll}
                    className="rounded"
                  />
                </TableHead>
                <TableHead>Post</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedPosts.includes(post.id)}
                      onChange={() => handleSelectPost(post.id)}
                      className="rounded"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-start gap-3">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-sm line-clamp-1">{post.title}</h3>
                          {post.featured && (
                            <Bookmark className="h-3 w-3 text-yellow-500" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                          {post.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs h-5">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(post.status)}>
                      {post.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="capitalize">{post.category}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {formatNumber(post.views)}
                        </span>
                        <span>{formatNumber(post.likes)} likes</span>
                        <span>{formatNumber(post.comments)} comments</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>Created: {formatDate(post.createdAt)}</div>
                      {post.publishedAt && (
                        <div className="text-xs text-muted-foreground">
                          Published: {formatDate(post.publishedAt)}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/posts/edit/${post.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/blog/${post.slug}`} target="_blank">
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
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Post
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Bookmark className="mr-2 h-4 w-4" />
                            {post.featured ? 'Remove from Featured' : 'Add to Featured'}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No posts found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or create a new post.
              </p>
              <Button asChild>
                <Link href="/admin/posts/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Post
                </Link>
              </Button>
            </div>
          )}
        </Card>

        {/* Pagination */}
        {filteredPosts.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredPosts.length} of {posts.length} posts
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}