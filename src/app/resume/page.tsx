"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Download,
  ExternalLink,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Globe,
  Github,
  Linkedin,
  Award,
  GraduationCap,
  Briefcase,
  Code,
  Star,
  User,
  FileText,
  Eye,
  Printer
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Resume data
const personalInfo = {
  name: "Om Thakur",
  title: "Full Stack Developer & UI/UX Designer",
  email: "om@omthakur.tech",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  website: "omthakur.tech",
  github: "github.com/omthakur",
  linkedin: "linkedin.com/in/omthakur",
  summary: "Passionate full-stack developer with 5+ years of experience building scalable web applications and user-centered designs. Expertise in React, Node.js, TypeScript, and modern development practices. Proven track record of delivering high-quality solutions for startups and enterprises."
}

const experience = [
  {
    title: "Senior Full Stack Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    startDate: "2022-03",
    endDate: "Present",
    description: [
      "Led development of microservices architecture serving 100K+ daily users",
      "Mentored 5 junior developers and established coding best practices",
      "Reduced application load time by 40% through performance optimization",
      "Implemented CI/CD pipelines reducing deployment time from hours to minutes"
    ],
    technologies: ["React", "Node.js", "TypeScript", "AWS", "Docker", "PostgreSQL"]
  },
  {
    title: "Full Stack Developer",
    company: "StartupXYZ",
    location: "San Francisco, CA",
    startDate: "2020-06",
    endDate: "2022-02",
    description: [
      "Built responsive web applications using React and Next.js",
      "Designed and implemented RESTful APIs and GraphQL endpoints",
      "Collaborated with UI/UX team to create pixel-perfect interfaces",
      "Managed database optimization improving query performance by 60%"
    ],
    technologies: ["React", "Next.js", "GraphQL", "MongoDB", "Tailwind CSS"]
  },
  {
    title: "Frontend Developer",
    company: "DigitalAgency",
    location: "Remote",
    startDate: "2019-01",
    endDate: "2020-05",
    description: [
      "Developed custom WordPress themes and plugins for 20+ clients",
      "Created interactive web experiences with JavaScript and CSS animations",
      "Optimized websites for SEO achieving 90+ PageSpeed scores",
      "Worked directly with clients to gather requirements and provide solutions"
    ],
    technologies: ["JavaScript", "WordPress", "PHP", "SASS", "jQuery"]
  }
]

const education = [
  {
    degree: "Master of Science in Computer Science",
    school: "Stanford University",
    location: "Stanford, CA",
    startDate: "2017-09",
    endDate: "2019-05",
    gpa: "3.8/4.0",
    achievements: [
      "Graduated Magna Cum Laude",
      "Teaching Assistant for CS106A Programming Fundamentals",
      "Member of Phi Beta Kappa Honor Society"
    ]
  },
  {
    degree: "Bachelor of Technology in Computer Engineering",
    school: "University of California, Berkeley",
    location: "Berkeley, CA",
    startDate: "2013-08",
    endDate: "2017-05",
    gpa: "3.7/4.0",
    achievements: [
      "Dean's List for 6 semesters",
      "President of Computer Science Student Association",
      "Winner of Annual Hackathon 2016"
    ]
  }
]

const skills = {
  technical: [
    { name: "JavaScript/TypeScript", level: 95 },
    { name: "React/Next.js", level: 90 },
    { name: "Node.js/Express", level: 88 },
    { name: "Python/Django", level: 85 },
    { name: "SQL/PostgreSQL", level: 82 },
    { name: "AWS/Cloud Services", level: 80 },
    { name: "Docker/Kubernetes", level: 78 },
    { name: "GraphQL", level: 75 }
  ],
  soft: [
    "Leadership & Team Management",
    "Project Planning & Execution",
    "Client Communication",
    "Problem Solving",
    "Agile/Scrum Methodologies",
    "Code Review & Mentoring"
  ]
}

const certifications = [
  {
    name: "AWS Solutions Architect Associate",
    issuer: "Amazon Web Services",
    date: "2023-08",
    credentialId: "AWS-SAA-123456",
    verifyUrl: "https://aws.amazon.com/verification"
  },
  {
    name: "Google Cloud Professional Developer",
    issuer: "Google Cloud",
    date: "2023-03",
    credentialId: "GCP-PD-789012",
    verifyUrl: "https://cloud.google.com/certification"
  },
  {
    name: "Certified Kubernetes Administrator",
    issuer: "Cloud Native Computing Foundation",
    date: "2022-11",
    credentialId: "CKA-345678",
    verifyUrl: "https://www.cncf.io/certification"
  }
]

const projects = [
  {
    name: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with admin dashboard, payment integration, and inventory management.",
    technologies: ["Next.js", "Stripe", "PostgreSQL", "Tailwind CSS"],
    githubUrl: "https://github.com/omthakur/ecommerce",
    liveUrl: "https://ecommerce-demo.omthakur.tech",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400"
  },
  {
    name: "Task Management App",
    description: "Collaborative project management tool with real-time updates and team collaboration features.",
    technologies: ["React", "Socket.io", "MongoDB", "Express"],
    githubUrl: "https://github.com/omthakur/taskman",
    liveUrl: "https://taskman.omthakur.tech",
    imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400"
  },
  {
    name: "Weather Dashboard",
    description: "Real-time weather application with geolocation, forecasts, and beautiful data visualizations.",
    technologies: ["Vue.js", "D3.js", "Weather API", "Chart.js"],
    githubUrl: "https://github.com/omthakur/weather-app",
    liveUrl: "https://weather.omthakur.tech",
    imageUrl: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400"
  }
]

const languages = [
  { name: "English", level: "Native" },
  { name: "Hindi", level: "Native" },
  { name: "Spanish", level: "Conversational" },
  { name: "French", level: "Basic" }
]

export default function ResumePage() {
  const [activeSection, setActiveSection] = React.useState("overview")
  
  const formatDate = (dateStr: string) => {
    if (dateStr === "Present") return dateStr
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  }

  const calculateDuration = (start: string, end: string) => {
    const startDate = new Date(start)
    const endDate = end === "Present" ? new Date() : new Date(end)
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth())
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12
    
    if (years === 0) return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`
    if (remainingMonths === 0) return `${years} year${years !== 1 ? 's' : ''}`
    return `${years} year${years !== 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <User className="h-8 w-8 text-slate-600" />
              <h1 className="text-4xl md:text-6xl font-bold">
                Resume
              </h1>
            </div>
            <p className="text-xl text-muted-foreground mb-8">
              Experienced full-stack developer passionate about creating 
              innovative solutions and leading high-performing teams.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-slate-600 hover:bg-slate-700">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button variant="outline" size="lg">
                <Eye className="mr-2 h-4 w-4" />
                Print Version
              </Button>
              <Button variant="outline" size="lg">
                <Mail className="mr-2 h-4 w-4" />
                Contact Me
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Resume Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <Tabs value={activeSection} onValueChange={setActiveSection}>
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Personal Info */}
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center mb-6">
                        <div className="w-32 h-32 bg-gradient-to-r from-slate-400 to-gray-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                          OT
                        </div>
                        <h3 className="text-xl font-bold">{personalInfo.name}</h3>
                        <p className="text-muted-foreground">{personalInfo.title}</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{personalInfo.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{personalInfo.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{personalInfo.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <Link href={`https://${personalInfo.website}`} className="text-sm text-blue-600 hover:underline">
                            {personalInfo.website}
                          </Link>
                        </div>
                        <div className="flex items-center gap-2">
                          <Github className="h-4 w-4 text-muted-foreground" />
                          <Link href={`https://${personalInfo.github}`} className="text-sm text-blue-600 hover:underline">
                            {personalInfo.github}
                          </Link>
                        </div>
                        <div className="flex items-center gap-2">
                          <Linkedin className="h-4 w-4 text-muted-foreground" />
                          <Link href={`https://${personalInfo.linkedin}`} className="text-sm text-blue-600 hover:underline">
                            {personalInfo.linkedin}
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Languages */}
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Languages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {languages.map((lang, index) => (
                          <div key={index} className="flex justify-between">
                            <span className="text-sm font-medium">{lang.name}</span>
                            <span className="text-sm text-muted-foreground">{lang.level}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Professional Summary */}
                <div className="lg:col-span-2">
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Professional Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {personalInfo.summary}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Key Achievements */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Key Achievements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">5+</div>
                          <div className="text-sm text-muted-foreground">Years Experience</div>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">50+</div>
                          <div className="text-sm text-muted-foreground">Projects Completed</div>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">10+</div>
                          <div className="text-sm text-muted-foreground">Team Members Led</div>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">100K+</div>
                          <div className="text-sm text-muted-foreground">Users Impacted</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent value="experience">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                  <Briefcase className="h-6 w-6" />
                  Professional Experience
                </h2>
                
                {experience.map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold">{job.title}</h3>
                            <p className="text-lg text-blue-600 font-semibold">{job.company}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {job.location}
                            </p>
                          </div>
                          <div className="text-right mt-2 lg:mt-0">
                            <p className="text-sm font-medium">
                              {formatDate(job.startDate)} - {formatDate(job.endDate)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {calculateDuration(job.startDate, job.endDate)}
                            </p>
                          </div>
                        </div>
                        
                        <ul className="space-y-2 mb-4">
                          {job.description.map((item, idx) => (
                            <li key={idx} className="text-muted-foreground flex items-start gap-2">
                              <span className="text-blue-600 mt-1.5">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                        
                        <div className="flex flex-wrap gap-2">
                          {job.technologies.map((tech, idx) => (
                            <Badge key={idx} variant="outline">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                  <GraduationCap className="h-6 w-6" />
                  Education & Certifications
                </h2>
                
                {/* Education */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {education.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="text-lg font-bold mb-1">{edu.degree}</h3>
                          <p className="text-blue-600 font-semibold mb-1">{edu.school}</p>
                          <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {edu.location}
                          </p>
                          <p className="text-sm text-muted-foreground mb-3">
                            {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                          </p>
                          <p className="text-sm font-medium mb-3">GPA: {edu.gpa}</p>
                          
                          <div>
                            <h4 className="font-medium mb-2">Achievements:</h4>
                            <ul className="space-y-1">
                              {edu.achievements.map((achievement, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <Star className="h-3 w-3 mt-0.5 text-yellow-500 flex-shrink-0" />
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Certifications */}
                <div>
                  <h3 className="text-xl font-bold mb-4">Professional Certifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {certifications.map((cert, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <Award className="h-5 w-5 text-yellow-500 mt-1" />
                              <div className="flex-1">
                                <h4 className="font-semibold text-sm">{cert.name}</h4>
                                <p className="text-xs text-muted-foreground mb-1">{cert.issuer}</p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  Issued: {formatDate(cert.date)}
                                </p>
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={cert.verifyUrl} target="_blank">
                                    <ExternalLink className="mr-1 h-3 w-3" />
                                    Verify
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills">
              <div className="space-y-8">
                <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                  <Code className="h-6 w-6" />
                  Skills & Expertise
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Technical Skills */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">Technical Skills</h3>
                    <div className="space-y-4">
                      {skills.technical.map((skill, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{skill.name}</span>
                            <span className="text-sm text-muted-foreground">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Soft Skills */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">Soft Skills</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {skills.soft.map((skill, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg"
                        >
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium">{skill}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                  <Code className="h-6 w-6" />
                  Featured Projects
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="aspect-video relative">
                          <img
                            src={project.imageUrl}
                            alt={project.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-lg font-bold mb-2">{project.name}</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            {project.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-1 mb-4">
                            {project.technologies.map((tech, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={project.githubUrl} target="_blank">
                                <Github className="mr-1 h-3 w-3" />
                                Code
                              </Link>
                            </Button>
                            <Button size="sm" asChild>
                              <Link href={project.liveUrl} target="_blank">
                                <ExternalLink className="mr-1 h-3 w-3" />
                                Live Demo
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/portfolio">
                      <FileText className="mr-2 h-4 w-4" />
                      View Complete Portfolio
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}