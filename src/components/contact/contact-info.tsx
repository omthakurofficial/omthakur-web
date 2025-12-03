import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Calendar,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  Coffee
} from 'lucide-react'

export function ContactInfo() {
  const contactMethods = [
    {
      icon: <Mail className="w-5 h-5 text-blue-600" />,
      label: 'Email',
      value: 'om@thakur.com',
      href: 'mailto:om@thakur.com',
      description: 'Best for detailed discussions'
    },
    {
      icon: <Phone className="w-5 h-5 text-green-600" />,
      label: 'Phone',
      value: '+91-XXXXXXXXXX',
      href: 'tel:+91XXXXXXXXXX',
      description: 'Available during business hours'
    },
    {
      icon: <MapPin className="w-5 h-5 text-red-600" />,
      label: 'Location',
      value: 'India',
      description: 'Open to remote work worldwide'
    },
    {
      icon: <Clock className="w-5 h-5 text-purple-600" />,
      label: 'Timezone',
      value: 'IST (UTC+5:30)',
      description: 'Generally available 9 AM - 7 PM'
    }
  ]

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      label: 'GitHub',
      href: 'https://github.com/omthakur',
      color: 'text-gray-800 dark:text-gray-200'
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/omthakur',
      color: 'text-blue-600'
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      label: 'Twitter',
      href: 'https://twitter.com/omthakur',
      color: 'text-sky-500'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Contact Methods */}
      <div className="space-y-4">
        {contactMethods.map((method, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {method.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{method.label}</h3>
                    {method.href && (
                      <ExternalLink className="w-3 h-3 text-muted-foreground" />
                    )}
                  </div>
                  {method.href ? (
                    <a 
                      href={method.href}
                      className="text-sm font-mono text-primary hover:underline"
                    >
                      {method.value}
                    </a>
                  ) : (
                    <p className="text-sm font-mono text-muted-foreground">
                      {method.value}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {method.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Social Links */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Coffee className="w-5 h-5 text-orange-600" />
            Let's Connect
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Follow me on social media for updates on my latest projects, 
            tech insights, and industry thoughts.
          </p>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((social, index) => (
              <Button 
                key={index} 
                variant="outline" 
                size="sm" 
                asChild
                className="flex items-center gap-2"
              >
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  <span className={social.color}>{social.icon}</span>
                  {social.label}
                </a>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Availability Status */}
      <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Available for Projects
            </Badge>
          </div>
          <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
            Currently Accepting New Projects
          </h3>
          <p className="text-sm text-green-700 dark:text-green-300">
            I'm currently available for freelance projects and consulting work. 
            Whether you need help with cloud architecture, DevOps implementation, 
            or technical mentoring, I'd love to discuss how I can help.
          </p>
        </CardContent>
      </Card>

      {/* Quick Response Promise */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Response Time
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Email inquiries:</span>
              <span className="font-medium">Within 24 hours</span>
            </div>
            <div className="flex justify-between">
              <span>Project discussions:</span>
              <span className="font-medium">Same day</span>
            </div>
            <div className="flex justify-between">
              <span>Urgent matters:</span>
              <span className="font-medium">Within 4 hours</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            * Response times may vary on weekends and holidays
          </p>
        </CardContent>
      </Card>
    </div>
  )
}