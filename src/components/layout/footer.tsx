"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Github,
  Mail,
  Heart
} from "lucide-react"

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
]

const categories = [
  { name: "Technology", href: "/blog?category=technology" },
  { name: "DevOps", href: "/blog?category=devops" },
  { name: "Cloud Computing", href: "/blog?category=cloud-computing" },
  { name: "Tutorials", href: "/blog?category=tutorials" },
]

const socialLinks = [
  { 
    name: "Facebook", 
    icon: Facebook, 
    href: "https://facebook.com/omthakurofficial",
    color: "hover:text-blue-600"
  },
  { 
    name: "Twitter", 
    icon: Twitter, 
    href: "https://twitter.com/omthakurofficial",
    color: "hover:text-sky-500"
  },
  { 
    name: "Instagram", 
    icon: Instagram, 
    href: "https://instagram.com/omthakur_official",
    color: "hover:text-pink-600"
  },
  { 
    name: "LinkedIn", 
    icon: Linkedin, 
    href: "https://linkedin.com/in/omthakurofficial",
    color: "hover:text-blue-700"
  },
  { 
    name: "YouTube", 
    icon: Youtube, 
    href: "https://youtube.com/@omthakurofficial",
    color: "hover:text-red-600"
  },
  { 
    name: "GitHub", 
    icon: Github, 
    href: "https://github.com/omprakashthakur4",
    color: "hover:text-gray-800 dark:hover:text-gray-200"
  }
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">OT</span>
              </div>
              <span className="font-bold text-lg">Om Thakur</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Cloud & DevOps Engineer passionate about technology, automation, and sharing knowledge through writing and teaching.
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-muted-foreground transition-colors ${social.color}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Get In Touch</h3>
            <div className="space-y-2">
              <a 
                href="mailto:omthakurofficial@gmail.com"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>omthakurofficial@gmail.com</span>
              </a>
              <p className="text-sm text-muted-foreground">
                Available for consulting, training, and collaboration opportunities.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        {/* <div className="border-t pt-8 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>© {currentYear} Om Thakur. Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>using Next.js</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link 
                href="/privacy" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                href="/sitemap" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div> */}
      </div>

      {/* Newsletter Section */}
      {/* <div className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h3 className="font-semibold text-lg">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to my newsletter for the latest articles on DevOps, Cloud Computing, and Technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 text-sm rounded-md border border-input bg-background"
              />
              <button className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </footer>
  )
}