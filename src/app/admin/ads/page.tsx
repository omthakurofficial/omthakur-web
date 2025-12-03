"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Settings,
  BarChart3,
  DollarSign,
  Users,
  ArrowLeft,
  Calendar,
  Target,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  Copy,
  ExternalLink
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import AdComponent, { AdConfig } from "@/components/ads/AdComponent"

// Mock ad data
const mockAds: AdConfig[] = [
  {
    id: "ad-1",
    name: "Header Banner - Tech Courses",
    type: "banner",
    size: "large",
    placement: "header",
    content: {
      title: "Learn Next.js 15 - Complete Course",
      description: "Master modern web development with our comprehensive Next.js course",
      ctaText: "Enroll Now",
      ctaUrl: "https://courses.example.com/nextjs",
      sponsorName: "TechEdu"
    },
    targeting: {
      categories: ["tech", "programming"],
      devices: ["desktop", "tablet"]
    },
    enabled: true,
    priority: 1
  },
  {
    id: "ad-2",
    name: "Sidebar - Photography Gear",
    type: "sidebar",
    size: "medium",
    placement: "sidebar",
    content: {
      title: "Professional Camera Gear",
      description: "Upgrade your photography with professional equipment",
      imageUrl: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300",
      ctaText: "Shop Now",
      ctaUrl: "https://gear.example.com",
      sponsorName: "PhotoGear Pro"
    },
    targeting: {
      categories: ["photography"],
      devices: ["desktop", "tablet", "mobile"]
    },
    enabled: true,
    priority: 2
  },
  {
    id: "ad-3",
    name: "Inline - Web Hosting",
    type: "inline",
    size: "responsive",
    placement: "content",
    content: {
      title: "Reliable Web Hosting",
      description: "Host your websites with 99.9% uptime guarantee",
      ctaText: "Get Started",
      ctaUrl: "https://hosting.example.com",
      sponsorName: "CloudHost",
      sponsorLogo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=50"
    },
    targeting: {
      categories: ["tech", "web development"],
      devices: ["desktop", "tablet", "mobile"]
    },
    enabled: false,
    priority: 3
  }
]

// Mock analytics data
const mockAnalytics = {
  totalRevenue: 1234.56,
  totalViews: 45678,
  totalClicks: 892,
  ctr: 1.95, // Click-through rate
  rpm: 2.7, // Revenue per mille
  adsByPerformance: [
    { id: "ad-1", name: "Header Banner - Tech Courses", views: 15432, clicks: 324, revenue: 648.0, ctr: 2.1 },
    { id: "ad-2", name: "Sidebar - Photography Gear", views: 12876, clicks: 198, revenue: 396.0, ctr: 1.54 },
    { id: "ad-3", name: "Inline - Web Hosting", views: 8943, clicks: 167, revenue: 334.0, ctr: 1.87 }
  ]
}

export default function AdManagementPage() {
  const [ads, setAds] = React.useState<AdConfig[]>(mockAds)
  const [selectedTab, setSelectedTab] = React.useState("ads")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [previewAd, setPreviewAd] = React.useState<AdConfig | null>(null)

  const filteredAds = ads.filter(ad =>
    ad.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ad.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ad.placement.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleAdStatus = (adId: string) => {
    setAds(prev => prev.map(ad =>
      ad.id === adId ? { ...ad, enabled: !ad.enabled } : ad
    ))
  }

  const duplicateAd = (adId: string) => {
    const adToDuplicate = ads.find(ad => ad.id === adId)
    if (adToDuplicate) {
      const newAd: AdConfig = {
        ...adToDuplicate,
        id: `${adId}-copy-${Date.now()}`,
        name: `${adToDuplicate.name} (Copy)`,
        enabled: false
      }
      setAds(prev => [...prev, newAd])
    }
  }

  const deleteAd = (adId: string) => {
    if (confirm("Are you sure you want to delete this ad?")) {
      setAds(prev => prev.filter(ad => ad.id !== adId))
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num)
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
                <h1 className="text-2xl font-bold">Ad Management</h1>
                <p className="text-muted-foreground">
                  Manage advertisements and monetization
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Ad
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="ads">Advertisements</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Advertisements Tab */}
          <TabsContent value="ads" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(mockAnalytics.totalRevenue)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Revenue</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">
                    {formatNumber(mockAnalytics.totalViews)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Views</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">
                    {formatNumber(mockAnalytics.totalClicks)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Clicks</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">{mockAnalytics.ctr}%</div>
                  <div className="text-sm text-muted-foreground">Average CTR</div>
                </CardContent>
              </Card>
            </div>

            {/* Ad Management */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Manage Ads</CardTitle>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Search ads..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-64"
                    />
                    <Button variant="outline">
                      <Plus className="mr-2 h-4 w-4" />
                      New Ad
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ad Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Placement</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAds.map((ad) => {
                      const performance = mockAnalytics.adsByPerformance.find(p => p.id === ad.id)
                      return (
                        <TableRow key={ad.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{ad.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {ad.content.title || "No title set"}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {ad.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="capitalize">{ad.placement}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={ad.enabled}
                                onCheckedChange={() => toggleAdStatus(ad.id)}
                              />
                              <span className="text-sm">
                                {ad.enabled ? "Active" : "Inactive"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {performance && (
                              <div className="text-sm">
                                <div>{formatNumber(performance.views)} views</div>
                                <div>{formatNumber(performance.clicks)} clicks</div>
                                <div className="text-green-600">{formatCurrency(performance.revenue)}</div>
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setPreviewAd(ad)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => duplicateAd(ad.id)}
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600"
                                onClick={() => deleteAd(ad.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {/* Revenue Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(mockAnalytics.totalRevenue)}</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatNumber(mockAnalytics.totalViews)}</div>
                  <p className="text-xs text-muted-foreground">
                    +15.3% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockAnalytics.ctr}%</div>
                  <p className="text-xs text-muted-foreground">
                    +0.4% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">RPM</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${mockAnalytics.rpm}</div>
                  <p className="text-xs text-muted-foreground">
                    Revenue per 1000 impressions
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Performance Table */}
            <Card>
              <CardHeader>
                <CardTitle>Ad Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ad Name</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Clicks</TableHead>
                      <TableHead>CTR</TableHead>
                      <TableHead>Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAnalytics.adsByPerformance.map((ad) => (
                      <TableRow key={ad.id}>
                        <TableCell className="font-medium">{ad.name}</TableCell>
                        <TableCell>{formatNumber(ad.views)}</TableCell>
                        <TableCell>{formatNumber(ad.clicks)}</TableCell>
                        <TableCell>{ad.ctr}%</TableCell>
                        <TableCell className="text-green-600">{formatCurrency(ad.revenue)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* General Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Enable Advertisements</label>
                      <p className="text-sm text-muted-foreground">
                        Show ads across the website
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Ad Blocker Detection</label>
                      <p className="text-sm text-muted-foreground">
                        Detect and show messages to ad blocker users
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Respect DNT</label>
                      <p className="text-sm text-muted-foreground">
                        Respect Do Not Track browser settings
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              {/* Ad Network Integration */}
              <Card>
                <CardHeader>
                  <CardTitle>Ad Networks</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Google AdSense</label>
                    <Input placeholder="ca-pub-xxxxxxxxxxxxxxxx" className="mt-1" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Google Ad Manager</label>
                    <Input placeholder="Network ID" className="mt-1" />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Custom Ad Network</label>
                    <Input placeholder="API Endpoint" className="mt-1" />
                  </div>

                  <Button>Save Ad Network Settings</Button>
                </CardContent>
              </Card>

              {/* Targeting Options */}
              <Card>
                <CardHeader>
                  <CardTitle>Default Targeting</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Geographic Targeting</label>
                    <Input placeholder="US, CA, UK, AU" className="mt-1" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Device Targeting</label>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline" className="cursor-pointer">
                        <Monitor className="mr-1 h-3 w-3" />
                        Desktop
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer">
                        <Tablet className="mr-1 h-3 w-3" />
                        Tablet
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer">
                        <Smartphone className="mr-1 h-3 w-3" />
                        Mobile
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Content Categories</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <Badge variant="outline" className="cursor-pointer">Technology</Badge>
                      <Badge variant="outline" className="cursor-pointer">Photography</Badge>
                      <Badge variant="outline" className="cursor-pointer">Travel</Badge>
                      <Badge variant="outline" className="cursor-pointer">Design</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Sharing */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue & Reporting</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Minimum Payout</label>
                    <Input defaultValue="100" type="number" className="mt-1" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Payment Method</label>
                    <select className="w-full mt-1 px-3 py-2 border rounded-md">
                      <option>PayPal</option>
                      <option>Bank Transfer</option>
                      <option>Stripe</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Auto Reports</label>
                      <p className="text-sm text-muted-foreground">
                        Send monthly revenue reports via email
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Preview Modal */}
      {previewAd && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setPreviewAd(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Ad Preview: {previewAd.name}</h3>
              <Button variant="outline" onClick={() => setPreviewAd(null)}>
                Close
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <AdComponent 
                  config={previewAd}
                  preview={true}
                  className="mx-auto"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Type:</strong> {previewAd.type}
                </div>
                <div>
                  <strong>Size:</strong> {previewAd.size}
                </div>
                <div>
                  <strong>Placement:</strong> {previewAd.placement}
                </div>
                <div>
                  <strong>Status:</strong> {previewAd.enabled ? "Active" : "Inactive"}
                </div>
              </div>

              {previewAd.targeting && (
                <div>
                  <strong>Targeting:</strong>
                  <div className="mt-1 space-y-1">
                    {previewAd.targeting.categories && (
                      <div className="text-sm">
                        Categories: {previewAd.targeting.categories.join(", ")}
                      </div>
                    )}
                    {previewAd.targeting.devices && (
                      <div className="text-sm">
                        Devices: {previewAd.targeting.devices.join(", ")}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}