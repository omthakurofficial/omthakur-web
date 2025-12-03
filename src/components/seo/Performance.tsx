"use client"

import * as React from "react"
import { useEffect, useState } from "react"

interface ViewportOptimizationProps {
  children: React.ReactNode
}

// Performance optimization component
export function ViewportOptimization({ children }: ViewportOptimizationProps) {
  const [isInView, setIsInView] = useState(false)
  const [hasBeenInView, setHasBeenInView] = useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBeenInView) {
          setIsInView(true)
          setHasBeenInView(true)
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.1,
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasBeenInView])

  return (
    <div ref={ref}>
      {(isInView || hasBeenInView) ? children : <div className="min-h-[200px]" />}
    </div>
  )
}

// Lazy load component for heavy content
export function LazyLoad({ children, fallback }: {
  children: React.ReactNode
  fallback?: React.ReactNode
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      {
        rootMargin: '50px',
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isInView && !isLoaded) {
      const timer = setTimeout(() => setIsLoaded(true), 100)
      return () => clearTimeout(timer)
    }
  }, [isInView, isLoaded])

  return (
    <div ref={ref}>
      {isLoaded ? children : (fallback || <div className="animate-pulse bg-muted h-48 rounded-lg" />)}
    </div>
  )
}

// Image optimization with lazy loading and blur placeholder
interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = "",
  priority = false 
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const ref = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (priority) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      {
        rootMargin: '100px',
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [priority])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {isInView && (
        <>
          {!isLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
          )}
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } w-full h-full object-cover`}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            onError={() => setIsLoaded(true)}
          />
        </>
      )}
    </div>
  )
}

// Critical CSS inliner for above-the-fold content
export function CriticalCSS() {
  return (
    <style jsx>{`
      /* Critical CSS for above-the-fold content */
      .hero-section {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .hero-content {
        text-align: center;
        color: white;
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
      }
      
      .hero-title {
        font-size: clamp(2.5rem, 5vw, 4rem);
        font-weight: bold;
        margin-bottom: 1rem;
        line-height: 1.2;
      }
      
      .hero-description {
        font-size: clamp(1rem, 2vw, 1.25rem);
        margin-bottom: 2rem;
        opacity: 0.9;
      }
      
      .hero-cta {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        border: 2px solid rgba(255, 255, 255, 0.3);
        color: white;
        padding: 0.75rem 2rem;
        border-radius: 50px;
        text-decoration: none;
        transition: all 0.3s ease;
        font-weight: 600;
      }
      
      .hero-cta:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: translateY(-2px);
      }
    `}</style>
  )
}

// Preload critical resources
export function ResourcePreloader() {
  useEffect(() => {
    // Preload critical fonts
    const fontLinks = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
    ]
    
    fontLinks.forEach(href => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'style'
      link.href = href
      link.onload = function() {
        // @ts-ignore
        this.rel = 'stylesheet'
      }
      document.head.appendChild(link)
    })

    // Preload critical images
    const criticalImages = [
      '/images/hero-bg.jpg',
      '/images/om-thakur.jpg'
    ]
    
    criticalImages.forEach(src => {
      const img = new Image()
      img.src = src
    })

    // Prefetch important pages
    const importantPages = [
      '/blog',
      '/portfolio',
      '/photos'
    ]
    
    importantPages.forEach(href => {
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = href
      document.head.appendChild(link)
    })
  }, [])

  return null
}

// Performance monitoring
export function PerformanceMonitor() {
  useEffect(() => {
    // Core Web Vitals monitoring
    function sendToAnalytics(metric: any) {
      // Send to your analytics service
      console.log('Performance metric:', metric)
    }

    // Monitor FCP (First Contentful Paint)
    if ('PerformanceObserver' in window) {
      const fcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            sendToAnalytics({
              name: 'FCP',
              value: entry.startTime,
              rating: entry.startTime < 1800 ? 'good' : entry.startTime < 3000 ? 'needs-improvement' : 'poor'
            })
          }
        }
      })
      fcpObserver.observe({ entryTypes: ['paint'] })

      // Monitor LCP (Largest Contentful Paint)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        sendToAnalytics({
          name: 'LCP',
          value: lastEntry.startTime,
          rating: lastEntry.startTime < 2500 ? 'good' : lastEntry.startTime < 4000 ? 'needs-improvement' : 'poor'
        })
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // Monitor CLS (Cumulative Layout Shift)
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // @ts-ignore
          if (!entry.hadRecentInput) {
            // @ts-ignore
            clsValue += entry.value
          }
        }
        sendToAnalytics({
          name: 'CLS',
          value: clsValue,
          rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor'
        })
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })
    }
  }, [])

  return null
}