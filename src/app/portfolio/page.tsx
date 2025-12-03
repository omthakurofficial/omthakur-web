"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { 
  ExternalLink,
  Github,
  Calendar,
  Tag,
  Award,
  Zap,
  Users,
  TrendingUp,
  Code2,
  Palette,
  Globe,
  Smartphone,
  Database,
  Cloud,
  Filter,
  Search,
  ArrowRight,
  Eye,
  Star
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Portfolio data
const portfolioCategories = [
  { name: "All", slug: "all", count: 15, icon: Globe },
  { name: "Web Apps", slug: "web", count: 8, icon: Code2 },
  { name: "Mobile", slug: "mobile", count: 4, icon: Smartphone },
  { name: "Design", slug: "design", count: 3, icon: Palette }
]

const portfolioItems = [
  {
    id: "1",
    title: "EcoTrack - Sustainability Platform",
    description: "A comprehensive platform for tracking environmental impact and carbon footprint with real-time analytics and goal setting.",
    longDescription: "EcoTrack is a full-stack sustainability platform that helps individuals and businesses monitor their environmental impact. Features include carbon footprint calculators, sustainability goal tracking, community challenges, and detailed analytics dashboards.",
    category: "web",
    tags: ["React", "Node.js", "MongoDB", "Chart.js", "Stripe"],
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
    images: [
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"
    ],
    githubUrl: "https://github.com/omthakur/ecotrack",
    liveUrl: "https://ecotrack.omthakur.tech",
    featured: true,
    status: "Completed",
    duration: "6 months",
    team: "4 developers",
    role: "Lead Full-Stack Developer",
    technologies: {
      frontend: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
      backend: ["Node.js", "Express", "MongoDB", "JWT"],
      tools: ["Docker", "AWS", "GitHub Actions"]
    },
    challenges: [
      "Complex carbon footprint calculations",
      "Real-time data synchronization",
      "Scalable architecture for growing user base"
    ],
    outcomes: [
      "50,000+ active users",
      "40% reduction in average user carbon footprint",
      "Featured in TechCrunch sustainability roundup"
    ],
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    title: "MindfulMoments - Meditation App",
    description: "A mobile meditation app with guided sessions, progress tracking, and community features built with React Native.",
    longDescription: "MindfulMoments is a comprehensive meditation and mindfulness app designed to help users build a consistent practice. It includes guided meditations, breathing exercises, progress tracking, and a supportive community platform.",
    category: "mobile",
    tags: ["React Native", "Firebase", "Redux", "Expo"],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
    images: [
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800"
    ],
    githubUrl: "https://github.com/omthakur/mindful-moments",
    liveUrl: "https://apps.apple.com/mindful-moments",
    featured: true,
    status: "Live in App Store",
    duration: "8 months",
    team: "3 developers, 1 designer",
    role: "Mobile Developer & Product Manager",
    technologies: {
      frontend: ["React Native", "TypeScript", "Expo"],
      backend: ["Firebase", "Cloud Functions"],
      tools: ["Fastlane", "Crashlytics", "Analytics"]
    },
    challenges: [
      "Cross-platform audio streaming",
      "Offline content synchronization",
      "App Store optimization"
    ],
    outcomes: [
      "25,000+ downloads in first 3 months",
      "4.8★ average rating",
      "Featured in App Store wellness category"
    ],
    createdAt: "2023-08-20"
  },
  {
    id: "3",
    title: "DataViz Pro - Analytics Dashboard",
    description: "Interactive data visualization platform for business intelligence with custom chart builders and real-time updates.",
    longDescription: "DataViz Pro is an advanced analytics platform that transforms complex business data into actionable insights through interactive visualizations, custom dashboards, and real-time reporting capabilities.",
    category: "web",
    tags: ["Vue.js", "D3.js", "Python", "PostgreSQL"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800"
    ],
    githubUrl: "https://github.com/omthakur/dataviz-pro",
    liveUrl: "https://dataviz.omthakur.tech",
    featured: false,
    status: "Completed",
    duration: "4 months",
    team: "2 developers",
    role: "Frontend Lead",
    technologies: {
      frontend: ["Vue.js", "D3.js", "Vuetify"],
      backend: ["Python", "Django", "PostgreSQL"],
      tools: ["Docker", "Redis", "Celery"]
    },
    challenges: [
      "Real-time data processing",
      "Complex chart customization",
      "Performance optimization for large datasets"
    ],
    outcomes: [
      "Reduced report generation time by 70%",
      "Increased user engagement by 150%",
      "Adopted by 5 Fortune 500 companies"
    ],
    createdAt: "2023-11-10"
  },
  {
    id: "4",
    title: "Travel Buddy - Trip Planner",
    description: "Social travel planning platform with itinerary sharing, budget tracking, and collaborative trip organization.",
    longDescription: "Travel Buddy revolutionizes trip planning by combining social features with powerful planning tools. Users can create detailed itineraries, track expenses, share experiences, and collaborate with travel companions.",
    category: "web",
    tags: ["Next.js", "Prisma", "Tailwind", "Maps API"],
    imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800",
    images: [
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800"
    ],
    githubUrl: "https://github.com/omthakur/travel-buddy",
    liveUrl: "https://travel-buddy.omthakur.tech",
    featured: true,
    status: "In Development",
    duration: "5 months",
    team: "3 developers, 1 designer",
    role: "Full-Stack Developer",
    technologies: {
      frontend: ["Next.js", "React", "Tailwind CSS"],
      backend: ["Prisma", "PostgreSQL", "NextAuth"],
      tools: ["Vercel", "Google Maps API", "Cloudinary"]
    },
    challenges: [
      "Complex trip sharing logic",
      "Real-time collaboration features",
      "Mobile-responsive map interface"
    ],
    outcomes: [
      "Beta testing with 500 users",
      "90% user satisfaction rate",
      "Preparing for public launch"
    ],
    createdAt: "2024-06-01"
  },
  {
    id: "5",
    title: "Brand Identity - TechStartup",
    description: "Complete brand identity design including logo, website mockups, and marketing materials for a fintech startup.",
    longDescription: "Comprehensive brand identity project for a fintech startup, including logo design, color palette, typography, website mockups, and marketing collateral. The design emphasizes trust, innovation, and accessibility.",
    category: "design",
    tags: ["Figma", "Illustrator", "Photoshop", "Branding"],
    imageUrl: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800",
    images: [
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800",
      "https://images.unsplash.com/photo-1634987059172-f8dfb7398c1e?w=800"
    ],
    githubUrl: null,
    liveUrl: "https://behance.net/omthakur/brand-identity",
    featured: false,
    status: "Completed",
    duration: "2 months",
    team: "Solo project",
    role: "Brand Designer",
    technologies: {
      design: ["Figma", "Adobe Illustrator", "Adobe Photoshop"],
      tools: ["InVision", "Principle", "After Effects"]
    },
    challenges: [
      "Creating trust in fintech space",
      "Balancing modern and professional aesthetics",
      "Scalable design system"
    ],
    outcomes: [
      "Client secured $2M seed funding",
      "Brand guidelines adopted company-wide",
      "Featured in Design Awards 2024"
    ],
    createdAt: "2023-09-15"
  },
  {
    id: "6",
    title: "FoodieFind - Restaurant Discovery",
    description: "Mobile app for discovering restaurants with AR menu scanning, social reviews, and personalized recommendations.",
    longDescription: "FoodieFind combines cutting-edge AR technology with social dining experiences. Users can scan menus with AR, read authentic reviews, get AI-powered recommendations, and share their dining experiences with friends.",
    category: "mobile",
    tags: ["Flutter", "AR Core", "Firebase", "TensorFlow"],
    imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
    images: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800"
    ],
    githubUrl: "https://github.com/omthakur/foodie-find",
    liveUrl: "https://play.google.com/foodie-find",
    featured: true,
    status: "Live on Play Store",
    duration: "10 months",
    team: "5 developers, 2 designers",
    role: "Senior Mobile Developer",
    technologies: {
      frontend: ["Flutter", "Dart", "ARCore/ARKit"],
      backend: ["Firebase", "Cloud Functions", "ML Kit"],
      tools: ["TensorFlow", "Google Vision", "Fastlane"]
    },
    challenges: [
      "AR menu recognition accuracy",
      "Cross-platform AR implementation",
      "Real-time recommendation engine"
    ],
    outcomes: [
      "100,000+ downloads",
      "Partnership with 500+ restaurants",
      "Winner of Mobile Innovation Award 2024"
    ],
    createdAt: "2023-12-01"
  }
]

const skills = [
  { name: "React/Next.js", projects: 8 },
  { name: "TypeScript", projects: 10 },
  { name: "Node.js", projects: 6 },
  { name: "React Native", projects: 4 },
  { name: "Python", projects: 5 },
  { name: "UI/UX Design", projects: 7 },
  { name: "AWS/Cloud", projects: 6 },
  { name: "Database Design", projects: 8 }
]

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = React.useState("all")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filteredItems, setFilteredItems] = React.useState(portfolioItems)
  const [selectedProject, setSelectedProject] = React.useState<typeof portfolioItems[0] | null>(null)

  // Filter items based on search and category
  React.useEffect(() => {
    let filtered = portfolioItems

    if (selectedCategory !== "all") {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    setFilteredItems(filtered)
  }, [searchQuery, selectedCategory])

  const featuredItems = portfolioItems.filter(item => item.featured)

  const openProjectModal = (project: typeof portfolioItems[0]) => {
    setSelectedProject(project)
  }

  const closeProjectModal = () => {
    setSelectedProject(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Code2 className="h-8 w-8 text-purple-600" />
              <h1 className="text-4xl md:text-6xl font-bold">
                Portfolio
              </h1>
            </div>
            <p className="text-xl text-muted-foreground mb-8">
              A showcase of my creative work and technical expertise. 
              From web applications to mobile apps and design projects.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Portfolio Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-lg mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{portfolioItems.length}</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">5+</div>
                <div className="text-sm text-muted-foreground">Years</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">200K+</div>
                <div className="text-sm text-muted-foreground">Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">15+</div>
                <div className="text-sm text-muted-foreground">Awards</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      {selectedCategory === "all" && !searchQuery && (
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-center">Featured Projects</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {featuredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="group cursor-pointer"
                    onClick={() => openProjectModal(item)}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <Eye className="h-8 w-8 mx-auto mb-2" />
                            <p className="font-medium">View Details</p>
                          </div>
                        </div>
                        <Badge className="absolute top-4 left-4 bg-purple-600">
                          Featured
                        </Badge>
                        <Badge className={`absolute top-4 right-4 ${
                          item.status === 'Completed' ? 'bg-green-600' : 
                          item.status === 'In Development' ? 'bg-blue-600' : 'bg-orange-600'
                        }`}>
                          {item.status}
                        </Badge>
                      </div>
                      
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {item.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.tags.slice(0, 3).map((tag, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {item.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{item.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            {item.role}
                          </span>
                          <div className="flex gap-2">
                            {item.githubUrl && (
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={item.githubUrl} target="_blank" onClick={(e) => e.stopPropagation()}>
                                  <Github className="h-4 w-4" />
                                </Link>
                              </Button>
                            )}
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={item.liveUrl} target="_blank" onClick={(e) => e.stopPropagation()}>
                                <ExternalLink className="h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Skills & Technologies */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Skills & Technologies</h2>
            <p className="text-muted-foreground">Technologies I work with across my projects</p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-muted/50 p-4 rounded-lg text-center hover:bg-muted transition-colors"
              >
                <div className="font-semibold text-sm mb-1">{skill.name}</div>
                <div className="text-xs text-muted-foreground">
                  {skill.projects} project{skill.projects !== 1 ? 's' : ''}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Portfolio Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Filter Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {portfolioCategories.map((category) => {
                const IconComponent = category.icon
                return (
                  <Button
                    key={category.slug}
                    variant={selectedCategory === category.slug ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.slug)}
                    className="flex items-center gap-2"
                  >
                    <IconComponent className="h-4 w-4" />
                    {category.name}
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                )
              })}
            </div>

            <Button variant="outline" asChild>
              <Link href="/resume">
                View Resume
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => openProjectModal(item)}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button variant="secondary">
                        View Project
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                    
                    {item.featured && (
                      <Badge className="absolute top-4 left-4 bg-purple-600">
                        Featured
                      </Badge>
                    )}
                    
                    <Badge className={`absolute top-4 right-4 text-xs ${
                      item.status === 'Completed' ? 'bg-green-600' : 
                      item.status === 'In Development' ? 'bg-blue-600' : 'bg-orange-600'
                    }`}>
                      {item.status}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold">{item.title}</h3>
                      <Badge variant="outline" className="text-xs capitalize">
                        {item.category}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.tags.slice(0, 4).map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{item.duration}</span>
                      <div className="flex gap-2">
                        {item.githubUrl && (
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={item.githubUrl} target="_blank" onClick={(e) => e.stopPropagation()}>
                              <Github className="h-4 w-4" />
                            </Link>
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={item.liveUrl} target="_blank" onClick={(e) => e.stopPropagation()}>
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <Code2 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
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
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 overflow-y-auto"
          onClick={closeProjectModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-4xl w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Hero Image */}
            <div className="aspect-video relative">
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-6 left-6 text-white">
                <h2 className="text-3xl font-bold mb-2">{selectedProject.title}</h2>
                <p className="text-lg opacity-90">{selectedProject.description}</p>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="technical">Technical</TabsTrigger>
                  <TabsTrigger value="gallery">Gallery</TabsTrigger>
                  <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-6 space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Project Description</h3>
                    <p className="text-muted-foreground">{selectedProject.longDescription}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">Duration</h4>
                      <p className="font-semibold">{selectedProject.duration}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">Team Size</h4>
                      <p className="font-semibold">{selectedProject.team}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">My Role</h4>
                      <p className="font-semibold">{selectedProject.role}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">Status</h4>
                      <Badge className={
                        selectedProject.status === 'Completed' ? 'bg-green-600' : 
                        selectedProject.status === 'In Development' ? 'bg-blue-600' : 'bg-orange-600'
                      }>
                        {selectedProject.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    {selectedProject.githubUrl && (
                      <Button asChild>
                        <Link href={selectedProject.githubUrl} target="_blank">
                          <Github className="mr-2 h-4 w-4" />
                          View Code
                        </Link>
                      </Button>
                    )}
                    <Button variant="outline" asChild>
                      <Link href={selectedProject.liveUrl} target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </Link>
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="technical" className="mt-6 space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4">Technology Stack</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {Object.entries(selectedProject.technologies).map(([category, techs]) => (
                        <div key={category}>
                          <h4 className="font-medium mb-2 capitalize">{category}</h4>
                          <div className="flex flex-wrap gap-1">
                            {techs.map((tech: string, idx: number) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Challenges</h3>
                    <ul className="space-y-2">
                      {selectedProject.challenges.map((challenge, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                          <Zap className="h-4 w-4 mt-0.5 text-yellow-500 flex-shrink-0" />
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="gallery" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedProject.images.map((image, idx) => (
                      <div key={idx} className="aspect-video relative rounded-lg overflow-hidden">
                        <img
                          src={image}
                          alt={`${selectedProject.title} screenshot ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="outcomes" className="mt-6 space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Key Outcomes</h3>
                    <ul className="space-y-2">
                      {selectedProject.outcomes.map((outcome, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                          <TrendingUp className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 bg-white/20 border-white/30 text-white hover:bg-white/30"
              onClick={closeProjectModal}
            >
              ×
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  )
}