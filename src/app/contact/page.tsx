import { Metadata } from 'next'
import { ContactForm } from '@/components/contact/contact-form'
import { ContactInfo } from '@/components/contact/contact-info'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  Calendar,
  Github,
  Linkedin,
  Twitter
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Om Thakur - Get In Touch',
  description: 'Get in touch with Om Thakur for cloud consulting, DevOps projects, or collaboration opportunities. Available for freelance and full-time positions.',
  keywords: 'Contact Om Thakur, Cloud Consultant, DevOps Engineer, Hire, Freelance, Collaboration',
  openGraph: {
    title: 'Contact Om Thakur - Get In Touch',
    description: 'Get in touch with Om Thakur for cloud consulting, DevOps projects, or collaboration opportunities.',
    type: 'website',
  }
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            Let's Connect
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, interesting projects, or just having a conversation about technology. 
            Feel free to reach out through any of the channels below.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Send className="w-6 h-6 text-blue-600" />
                Send Me a Message
              </h2>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-green-600" />
                Contact Information
              </h2>
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">What services do you offer?</h3>
                <p className="text-muted-foreground">
                  I specialize in cloud architecture, DevOps implementation, infrastructure automation, 
                  CI/CD pipeline setup, containerization with Docker & Kubernetes, and AWS consulting. 
                  I also offer technical mentoring and training services.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">What's your typical response time?</h3>
                <p className="text-muted-foreground">
                  I typically respond to messages within 24 hours during weekdays. For urgent matters, 
                  please mention it in your message and I'll prioritize accordingly.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Do you work with startups or only enterprises?</h3>
                <p className="text-muted-foreground">
                  I work with organizations of all sizes, from early-stage startups to large enterprises. 
                  Each project is unique, and I tailor my approach to fit your specific needs and budget.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Are you available for full-time positions?</h3>
                <p className="text-muted-foreground">
                  Yes, I'm open to full-time opportunities that align with my expertise and interests. 
                  I'm particularly interested in roles that involve cloud architecture, platform engineering, 
                  and DevOps leadership.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Do you provide training or mentoring?</h3>
                <p className="text-muted-foreground">
                  Absolutely! I offer one-on-one mentoring for developers transitioning to DevOps, 
                  team training on cloud technologies, and workshops on best practices. 
                  I believe in sharing knowledge and helping others grow in their careers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}