"use client"

import * as React from "react"
import { useState, useEffect } from "react"
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

// Post interface for type safety
interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  published: boolean
  featured?: boolean
  category?: string
  tags?: string[]
  cover_image?: string
  created_at: string
  updated_at?: string
  published_at?: string
  views?: number
  likes?: number
  comments?: number
}

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
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("all")
  const [selectedStatus, setSelectedStatus] = React.useState("all")
  const [filteredPosts, setFilteredPosts] = React.useState<Post[]>([])
  const [selectedPosts, setSelectedPosts] = React.useState<string[]>([])

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/posts-crud?all=true')
        if (response.ok) {
          const data = await response.json()
          setPosts(data.posts || [])
        } else {
          console.error('Failed to fetch posts:', response.statusText)
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchPosts()
  }, [])

  // Filter posts
  React.useEffect(() => {
    let filtered = posts

    if (searchQuery.trim()) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (post.category && post.category.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    if (selectedStatus !== "all") {
      if (selectedStatus === "published") {
        filtered = filtered.filter(post => post.published === true)
      } else if (selectedStatus === "draft") {
        filtered = filtered.filter(post => post.published === false)
      }
    }

    setFilteredPosts(filtered)
  }, [searchQuery, selectedCategory, selectedStatus, posts])

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

  // Delete single post
  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/posts-crud?id=${postId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        // Remove post from state
        setPosts(prev => prev.filter(p => p.id !== postId))
        alert('Post deleted successfully!')
      } else {
        const error = await response.json()
        alert(`Failed to delete post: ${error.error}`)
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('Failed to delete post. Please try again.')
    }
  }

  // Delete multiple posts
  const handleBulkDelete = async () => {
    if (selectedPosts.length === 0) return
    
    if (!confirm(`Are you sure you want to delete ${selectedPosts.length} posts? This action cannot be undone.`)) {
      return
    }

    try {
      const deletePromises = selectedPosts.map(postId => 
        fetch(`/api/posts-crud?id=${postId}`, { method: 'DELETE' })
      )
      
      const results = await Promise.all(deletePromises)
      const successCount = results.filter(r => r.ok).length
      
      if (successCount === selectedPosts.length) {
        setPosts(prev => prev.filter(p => !selectedPosts.includes(p.id)))
        setSelectedPosts([])
        alert(`${successCount} posts deleted successfully!`)
      } else {
        alert(`${successCount} of ${selectedPosts.length} posts deleted. Some deletions failed.`)
        // Refresh the list
        window.location.reload()
      }
    } catch (error) {
      console.error('Bulk delete error:', error)
      alert('Failed to delete posts. Please try again.')
    }
  }

  const stats = {
    total: posts.length,
    published: posts.filter(p => p.published === true).length,
    drafts: posts.filter(p => p.published === false).length,
    scheduled: 0 // Will implement scheduled posts later
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
                  <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
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
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                      <span>Loading posts...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredPosts.map((post) => (
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
                        {post.cover_image && (
                          <img
                            src={post.cover_image}
                            alt={post.title}
                            className="w-16 h-12 object-cover rounded"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.style.display = 'none'
                            }}
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-sm line-clamp-1">{post.title}</h3>
                            {post.featured && (
                              <Bookmark className="h-3 w-3 text-yellow-500" />
                            )}
                          </div>
                          {post.excerpt && (
                            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                              {post.excerpt}
                            </p>
                          )}
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {(Array.isArray(post.tags) ? post.tags : JSON.parse(post.tags || '[]')).slice(0, 3).map((tag: string, index: number) => (
                                <Badge key={index} variant="outline" className="text-xs h-5">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={post.published ? 'default' : 'secondary'}>
                        {post.published ? 'published' : 'draft'}
                      </Badge>
                    </TableCell>
                    <TableCell className="capitalize">{post.category || 'Uncategorized'}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {formatNumber(post.views || 0)}
                          </span>
                          <span>{formatNumber(post.likes || 0)} likes</span>
                          <span>{formatNumber(post.comments || 0)} comments</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>Created: {formatDate(post.created_at)}</div>
                        {post.published_at && (
                          <div className="text-xs text-muted-foreground">
                            Published: {formatDate(post.published_at)}
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
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDeletePost(post.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
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