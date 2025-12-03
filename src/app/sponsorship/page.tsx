"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  TrendingUp,
  Users,
  Globe,
  Target,
  DollarSign,
  Star,
  Eye,
  Clock,
  Mail,
  Download,
  BarChart3,
  Camera,
  Video,
  FileText,
  Award,
  Heart,
  MessageSquare,
  Share2,
  CheckCircle,
  ArrowRight
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Analytics data for sponsors
const audienceStats = {
  monthlyVisitors: 125000,
  pageViews: 450000,
  avgSessionDuration: "4m 32s",
  bounceRate: 28,
  topCountries: ["United States", "Canada", "United Kingdom", "Australia", "Germany"],
  demographics: {
    ageGroups: [
      { range: "18-24", percentage: 15 },
      { range: "25-34", percentage: 45 },
      { range: "35-44", percentage: 28 },
      { range: "45-54", percentage: 10 },
      { range: "55+", percentage: 2 }
    ],
    interests: [
      { name: "Web Development", percentage: 78 },
      { name: "Photography", percentage: 65 },
      { name: "Travel", percentage: 52 },
      { name: "Technology", percentage: 84 },
      { name: "Design", percentage: 71 }
    ],
    devices: [
      { type: "Desktop", percentage: 60 },
      { type: "Mobile", percentage: 35 },
      { type: "Tablet", percentage: 5 }
    ]
  }
}

const contentStats = {
  totalPosts: 156,
  totalPhotos: 890,
  totalVideos: 45,
  avgEngagement: 8.5,
  socialFollowers: {
    instagram: 45000,
    youtube: 12500,
    twitter: 8900,
    linkedin: 15600
  }
}

const sponsorshipPackages = [
  {
    name: "Starter",
    price: "$299",
    duration: "1 month",
    description: "Perfect for small businesses and startups",
    features: [
      "Sidebar banner ad (300x250)",
      "Featured in newsletter (1x)",
      "Social media mention",
      "Basic analytics report",
      "Up to 50K impressions"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Professional",
    price: "$799",
    duration: "1 month",
    description: "Ideal for established businesses",
    features: [
      "Header banner ad (728x90)",
      "Sponsored blog post",
      "Newsletter featured spot (2x)",
      "Social media campaign",
      "Detailed analytics & reporting",
      "Up to 150K impressions",
      "Priority support"
    ],
    cta: "Most Popular",
    popular: true
  },
  {
    name: "Enterprise",
    price: "$1,999",
    duration: "1 month",
    description: "Maximum exposure and custom solutions",
    features: [
      "Premium homepage placement",
      "Dedicated sponsored content series",
      "Video collaboration",
      "Newsletter partnership",
      "Social media takeover",
      "Custom landing page",
      "Real-time analytics dashboard",
      "Unlimited impressions",
      "Dedicated account manager"
    ],
    cta: "Contact Sales",
    popular: false
  }
]

const testimonials = [
  {
    name: "Sarah Chen",
    company: "TechFlow Solutions",
    role: "Marketing Director",
    content: "Working with Om's platform generated exceptional ROI. We saw a 300% increase in qualified leads and significant brand awareness growth.",
    rating: 5,
    logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100"
  },
  {
    name: "David Rodriguez",
    company: "PhotoGear Pro",
    role: "Brand Manager", 
    content: "The engagement quality is outstanding. Our sponsored content consistently outperforms other channels with higher conversion rates.",
    rating: 5,
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100"
  },
  {
    name: "Emily Foster",
    company: "CloudHost Inc",
    role: "Head of Growth",
    content: "The audience alignment is perfect for our B2B SaaS. Professional execution and transparent reporting made this our go-to marketing channel.",
    rating: 5,
    logo: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=100"
  }
]

export default function SponsorshipPage() {
  const [activeTab, setActiveTab] = React.useState("overview")
  const [formData, setFormData] = React.useState({
    company: "",
    name: "",
    email: "",
    website: "",
    budget: "",
    message: "",
    packageType: "professional"
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Sponsorship inquiry:", formData)
    // Handle form submission
    alert("Thank you for your interest! We'll get back to you within 24 hours.")
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Partner with <span className="text-blue-600">Om Thakur</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Reach a highly engaged audience of developers, designers, and tech enthusiasts 
              through strategic partnerships and sponsored content.
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {formatNumber(audienceStats.monthlyVisitors)}+
                </div>
                <div className="text-sm text-muted-foreground">Monthly Visitors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {formatNumber(audienceStats.pageViews)}+
                </div>
                <div className="text-sm text-muted-foreground">Page Views</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {audienceStats.avgSessionDuration}
                </div>
                <div className="text-sm text-muted-foreground">Session Duration</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {contentStats.avgEngagement}%
                </div>
                <div className="text-sm text-muted-foreground">Engagement Rate</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Mail className="mr-2 h-5 w-5" />
                Start Partnership
              </Button>
              <Button variant="outline" size="lg">
                <Download className="mr-2 h-5 w-5" />
                Media Kit
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="testimonials">Success Stories</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Why Partner With Us */}
            <section>
              <h2 className="text-3xl font-bold text-center mb-8">Why Partner With Us?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="font-bold text-lg mb-2">Targeted Audience</h3>
                      <p className="text-muted-foreground">
                        Reach developers, designers, and tech professionals actively seeking solutions
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
                    <CardContent className="p-6 text-center">
                      <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
                      <h3 className="font-bold text-lg mb-2">High Engagement</h3>
                      <p className="text-muted-foreground">
                        Above-industry average engagement rates with authentic, quality content
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
                    <CardContent className="p-6 text-center">
                      <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                      <h3 className="font-bold text-lg mb-2">Proven Results</h3>
                      <p className="text-muted-foreground">
                        Track record of successful campaigns with measurable ROI for partners
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
                    <CardContent className="p-6 text-center">
                      <Globe className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                      <h3 className="font-bold text-lg mb-2">Global Reach</h3>
                      <p className="text-muted-foreground">
                        International audience across North America, Europe, and Asia-Pacific
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Card>
                    <CardContent className="p-6 text-center">
                      <BarChart3 className="h-12 w-12 text-red-600 mx-auto mb-4" />
                      <h3 className="font-bold text-lg mb-2">Transparent Analytics</h3>
                      <p className="text-muted-foreground">
                        Detailed reporting and real-time analytics for campaign performance
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Star className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                      <h3 className="font-bold text-lg mb-2">Premium Quality</h3>
                      <p className="text-muted-foreground">
                        High-quality content creation with professional standards and brand alignment
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </section>

            {/* Content Reach */}
            <section>
              <h2 className="text-3xl font-bold text-center mb-8">Content & Reach</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <FileText className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold mb-1">{contentStats.totalPosts}</div>
                    <div className="text-sm text-muted-foreground">Blog Posts</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <Camera className="h-8 w-8 text-green-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold mb-1">{formatNumber(contentStats.totalPhotos)}</div>
                    <div className="text-sm text-muted-foreground">Photos</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <Video className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold mb-1">{contentStats.totalVideos}</div>
                    <div className="text-sm text-muted-foreground">Videos</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <Users className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold mb-1">
                      {formatNumber(Object.values(contentStats.socialFollowers).reduce((a, b) => a + b, 0))}
                    </div>
                    <div className="text-sm text-muted-foreground">Social Followers</div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </TabsContent>

          {/* Audience Tab */}
          <TabsContent value="audience" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Know Your Audience</h2>
              <p className="text-muted-foreground text-lg">
                Detailed insights into our engaged community of tech professionals
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Demographics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Age Demographics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {audienceStats.demographics.ageGroups.map((group, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{group.range}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-muted rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${group.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">{group.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Interests */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Top Interests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {audienceStats.demographics.interests.map((interest, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{interest.name}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-muted rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${interest.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">{interest.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Device Usage */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Device Usage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {audienceStats.demographics.devices.map((device, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{device.type}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-muted rounded-full h-2">
                            <div 
                              className="bg-purple-600 h-2 rounded-full"
                              style={{ width: `${device.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">{device.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Geographic Reach */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Top Countries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {audienceStats.topCountries.map((country, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="text-sm font-medium">#{index + 1}</div>
                        <div className="text-sm">{country}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Social Media Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-5 w-5" />
                  Social Media Reach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-600">
                      {formatNumber(contentStats.socialFollowers.instagram)}
                    </div>
                    <div className="text-sm text-muted-foreground">Instagram</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {formatNumber(contentStats.socialFollowers.youtube)}
                    </div>
                    <div className="text-sm text-muted-foreground">YouTube</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatNumber(contentStats.socialFollowers.twitter)}
                    </div>
                    <div className="text-sm text-muted-foreground">Twitter</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-800">
                      {formatNumber(contentStats.socialFollowers.linkedin)}
                    </div>
                    <div className="text-sm text-muted-foreground">LinkedIn</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Packages Tab */}
          <TabsContent value="packages" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Sponsorship Packages</h2>
              <p className="text-muted-foreground text-lg">
                Choose the perfect package to reach your target audience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {sponsorshipPackages.map((pkg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`relative h-full ${pkg.popular ? 'ring-2 ring-blue-500' : ''}`}>
                    {pkg.popular && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                        Most Popular
                      </Badge>
                    )}
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                      <div className="text-3xl font-bold text-blue-600">
                        {pkg.price}
                        <span className="text-base font-normal text-muted-foreground">
                          /{pkg.duration}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{pkg.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-3">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className="w-full"
                        variant={pkg.popular ? "default" : "outline"}
                      >
                        {pkg.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Custom Package */}
            <Card>
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Need Something Custom?</h3>
                <p className="text-muted-foreground mb-6">
                  We can create a tailored sponsorship package that meets your specific goals and budget.
                </p>
                <Button size="lg">
                  <Mail className="mr-2 h-5 w-5" />
                  Discuss Custom Package
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Partner Success Stories</h2>
              <p className="text-muted-foreground text-lg">
                See how brands have achieved their marketing goals through our platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <img
                          src={testimonial.logo}
                          alt={testimonial.company}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-semibold">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {testimonial.role} at {testimonial.company}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-1 mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      
                      <p className="text-muted-foreground italic">
                        "{testimonial.content}"
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">300%</div>
                  <div className="text-sm text-muted-foreground">Avg ROI Increase</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                  <div className="text-sm text-muted-foreground">Partner Satisfaction</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Successful Campaigns</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">85%</div>
                  <div className="text-sm text-muted-foreground">Renewal Rate</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Let's Start a Partnership</h2>
              <p className="text-muted-foreground text-lg">
                Ready to reach our engaged audience? Get in touch to discuss your marketing goals.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Partnership Inquiry</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Company Name *</label>
                        <Input
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          placeholder="Your company"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Your Name *</label>
                        <Input
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Your name"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Email *</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Website</label>
                        <Input
                          value={formData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          placeholder="https://yourcompany.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Budget Range</label>
                      <select 
                        className="w-full mt-1 px-3 py-2 border rounded-md"
                        value={formData.budget}
                        onChange={(e) => handleInputChange('budget', e.target.value)}
                      >
                        <option value="">Select budget range</option>
                        <option value="under-500">Under $500</option>
                        <option value="500-1000">$500 - $1,000</option>
                        <option value="1000-2500">$1,000 - $2,500</option>
                        <option value="2500-5000">$2,500 - $5,000</option>
                        <option value="above-5000">$5,000+</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Tell us about your goals</label>
                      <Textarea
                        value={formData.message}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('message', e.target.value)}
                        placeholder="What are your marketing objectives? What type of partnership interests you?"
                        rows={5}
                      />
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      <Mail className="mr-2 h-5 w-5" />
                      Send Partnership Inquiry
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info & FAQ */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Get in Touch</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-medium">Email</div>
                        <div className="text-sm text-muted-foreground">
                          partnerships@omthakur.tech
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-medium">Response Time</div>
                        <div className="text-sm text-muted-foreground">
                          Within 24 hours
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-purple-600" />
                      <div>
                        <div className="font-medium">Time Zone</div>
                        <div className="text-sm text-muted-foreground">
                          Pacific Time (PST/PDT)
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Questions?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer">
                        <span className="font-medium">What's included in sponsored content?</span>
                        <ArrowRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
                      </summary>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Sponsored content includes blog posts, social media promotion, newsletter features, and detailed analytics reporting.
                      </p>
                    </details>
                    
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer">
                        <span className="font-medium">How long does campaign setup take?</span>
                        <ArrowRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
                      </summary>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Most campaigns can be set up within 3-5 business days after content approval and payment confirmation.
                      </p>
                    </details>
                    
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer">
                        <span className="font-medium">Can I track campaign performance?</span>
                        <ArrowRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
                      </summary>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Yes! You'll receive detailed analytics including impressions, clicks, engagement rates, and conversions.
                      </p>
                    </details>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}