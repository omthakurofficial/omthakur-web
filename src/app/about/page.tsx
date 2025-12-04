import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  MapPin, 
  Mail, 
  Phone, 
  Calendar, 
  Award, 
  BookOpen, 
  Code, 
  Server, 
  Cloud,
  Users,
  Heart,
  Download,
  ExternalLink
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Om Thakur - Cloud & DevOps Engineer',
  description: 'Learn about Om Thakur, an experienced Cloud & DevOps Engineer passionate about AWS, containerization, and infrastructure automation.',
  keywords: 'Om Thakur, Cloud Engineer, DevOps Engineer, AWS, Docker, Kubernetes, About',
  openGraph: {
    title: 'About Om Thakur - Cloud & DevOps Engineer',
    description: 'Learn about Om Thakur, an experienced Cloud & DevOps Engineer passionate about AWS, containerization, and infrastructure automation.',
    type: 'profile',
    images: [
      {
        url: 'https://images.pexels.com/photos/33059766/pexels-photo-33059766.png',
        width: 800,
        height: 600,
        alt: 'Om Thakur - Cloud & DevOps Engineer'
      }
    ]
  }
}

export default function AboutPage() {
  const skills = [
    { category: 'Cloud Platforms', items: ['AWS', 'Azure', 'Google Cloud', 'DigitalOcean'] },
    { category: 'DevOps Tools', items: ['Docker', 'Kubernetes', 'Jenkins', 'GitLab CI', 'GitHub Actions'] },
    { category: 'Infrastructure as Code', items: ['Terraform', 'CloudFormation', 'Ansible', 'Pulumi'] },
    { category: 'Monitoring & Logging', items: ['Prometheus', 'Grafana', 'ELK Stack', 'DataDog', 'New Relic'] },
    { category: 'Programming Languages', items: ['Python', 'Go', 'JavaScript', 'TypeScript', 'Bash'] },
    { category: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'DynamoDB'] }
  ]

  const achievements = [
    {
      icon: <Award className="w-6 h-6 text-blue-600" />,
      title: 'AWS Certified Solutions Architect - Professional',
      description: 'Advanced certification demonstrating expertise in designing distributed applications on AWS'
    },
    {
      icon: <BookOpen className="w-6 h-6 text-green-600" />,
      title: 'Certified Kubernetes Administrator (CKA)',
      description: 'Validates skills in Kubernetes administration and cluster management'
    },
    {
      icon: <Code className="w-6 h-6 text-purple-600" />,
      title: 'HashiCorp Certified: Terraform Associate',
      description: 'Expertise in infrastructure automation using Terraform'
    },
    {
      icon: <Users className="w-6 h-6 text-orange-600" />,
      title: 'Led 50+ Cloud Migration Projects',
      description: 'Successfully migrated enterprise applications to cloud platforms'
    }
  ]

  const values = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: 'Passion for Technology',
      description: 'I love exploring new technologies and finding innovative solutions to complex problems. Technology is not just my profession, it\'s my passion.'
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: 'Community Focus',
      description: 'I believe in sharing knowledge and giving back to the community through open-source contributions, mentoring, and educational content.'
    },
    {
      icon: <BookOpen className="w-8 h-8 text-green-500" />,
      title: 'Continuous Learning',
      description: 'The tech industry evolves rapidly, and I\'m committed to continuous learning and staying up-to-date with the latest trends and best practices.'
    },
    {
      icon: <Award className="w-8 h-8 text-purple-500" />,
      title: 'Excellence & Quality',
      description: 'I strive for excellence in everything I do, focusing on clean code, scalable architecture, and robust solutions.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                Cloud & DevOps Engineer
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Hello, I'm Om Thakur
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                I'm a passionate Cloud & DevOps Engineer with over 5 years of experience in building 
                scalable, secure, and efficient cloud infrastructure. I specialize in AWS, containerization, 
                and infrastructure automation.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>India</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>5+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Award className="w-4 h-4" />
                  <span>AWS Certified</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button asChild>
                  <Link href="/contact">
                    <Mail className="w-4 h-4 mr-2" />
                    Get In Touch
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/resume">
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-2xl opacity-20"></div>
                <Image
                  src="https://images.pexels.com/photos/33059766/pexels-photo-33059766.png"
                  alt="Om Thakur"
                  width={400}
                  height={400}
                  className="relative rounded-full shadow-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">My Story</h2>
          <div className="prose prose-lg dark:prose-invert mx-auto">
            <p>
              My journey in technology began during my college years when I discovered the power of 
              cloud computing and automation. What started as curiosity about how large-scale applications 
              work evolved into a deep passion for building robust, scalable infrastructure.
            </p>
            <p>
              Over the past 5 years, I've had the privilege of working with diverse teams and projects, 
              from startup MVPs to enterprise-scale applications serving millions of users. I've learned 
              that great technology isn't just about the latest tools—it's about understanding business 
              needs and creating solutions that are reliable, efficient, and maintainable.
            </p>
            <p>
              Today, I focus on helping organizations modernize their infrastructure, adopt cloud-native 
              technologies, and implement DevOps practices that accelerate development while maintaining 
              high standards of security and reliability.
            </p>
            <p>
              When I'm not working on infrastructure, you'll find me contributing to open-source projects, 
              writing technical blog posts, or mentoring aspiring developers in the DevOps community.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Technical Expertise</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skillGroup) => (
              <Card key={skillGroup.category} className="h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 text-lg">{skillGroup.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Achievements & Certifications</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {achievement.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{achievement.title}</h3>
                      <p className="text-muted-foreground text-sm">{achievement.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Drives Me</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="font-semibold mb-3 text-lg">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Let's Work Together</h2>
          <p className="text-xl text-muted-foreground mb-8">
            I'm always interested in new opportunities and interesting projects. 
            Whether you need help with cloud architecture, DevOps implementation, 
            or just want to discuss technology, I'd love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">
                <Mail className="w-4 h-4 mr-2" />
                Contact Me
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/portfolio">
                <ExternalLink className="w-4 h-4 mr-2" />
                View My Work
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/blog">
                <BookOpen className="w-4 h-4 mr-2" />
                Read My Blog
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}