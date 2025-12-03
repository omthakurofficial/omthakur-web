"use client"

import * as React from "react"
import { useEffect, Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"

interface AnalyticsEvent {
  name: string
  parameters?: Record<string, any>
}

// Google Analytics 4 integration
declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void
    dataLayer: any[]
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'

function GoogleAnalyticsInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return

    // Load Google Analytics script
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script1)

    const script2 = document.createElement('script')
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        page_title: document.title,
        page_location: window.location.href,
      });
    `
    document.head.appendChild(script2)

    return () => {
      document.head.removeChild(script1)
      document.head.removeChild(script2)
    }
  }, [])

  useEffect(() => {
    if (!window.gtag) return

    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '')
    
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      page_title: document.title,
    })
  }, [pathname, searchParams])

  return null
}

export function GoogleAnalytics() {
  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsInner />
    </Suspense>
  )
}

// Custom analytics events
export function trackEvent(event: AnalyticsEvent) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event.name, event.parameters)
  }
  
  // Also send to custom analytics if needed
  if (typeof window !== 'undefined') {
    console.log('Analytics Event:', event)
  }
}

// Hook for tracking user interactions
export function useAnalytics() {
  const trackPageView = (page: string, title?: string) => {
    trackEvent({
      name: 'page_view',
      parameters: {
        page_path: page,
        page_title: title || document.title,
      }
    })
  }

  const trackClick = (elementId: string, elementType?: string) => {
    trackEvent({
      name: 'click',
      parameters: {
        element_id: elementId,
        element_type: elementType,
      }
    })
  }

  const trackDownload = (fileName: string, fileType?: string) => {
    trackEvent({
      name: 'file_download',
      parameters: {
        file_name: fileName,
        file_type: fileType,
      }
    })
  }

  const trackContact = (method: string) => {
    trackEvent({
      name: 'contact',
      parameters: {
        method: method,
      }
    })
  }

  const trackSearch = (searchTerm: string, resultsCount?: number) => {
    trackEvent({
      name: 'search',
      parameters: {
        search_term: searchTerm,
        results_count: resultsCount,
      }
    })
  }

  const trackScroll = (percentage: number) => {
    trackEvent({
      name: 'scroll',
      parameters: {
        percentage: percentage,
      }
    })
  }

  const trackEngagement = (action: string, category?: string) => {
    trackEvent({
      name: 'engagement',
      parameters: {
        action: action,
        category: category,
      }
    })
  }

  return {
    trackPageView,
    trackClick,
    trackDownload,
    trackContact,
    trackSearch,
    trackScroll,
    trackEngagement,
  }
}

// Scroll tracking component
export function ScrollTracker() {
  const { trackScroll } = useAnalytics()
  const [trackedPercentages, setTrackedPercentages] = React.useState<Set<number>>(new Set())

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop
          const docHeight = document.documentElement.scrollHeight - window.innerHeight
          const scrollPercent = Math.round((scrollTop / docHeight) * 100)

          // Track at 25%, 50%, 75%, and 100%
          const milestones = [25, 50, 75, 100]
          const milestone = milestones.find(m => 
            scrollPercent >= m && !trackedPercentages.has(m)
          )

          if (milestone) {
            trackScroll(milestone)
            setTrackedPercentages(prev => new Set(prev).add(milestone))
          }

          ticking = false
        })
      }
      ticking = true
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [trackScroll, trackedPercentages])

  return null
}

// Click tracking wrapper
interface ClickTrackerProps {
  elementId: string
  elementType?: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function ClickTracker({ 
  elementId, 
  elementType, 
  children, 
  className,
  onClick 
}: ClickTrackerProps) {
  const { trackClick } = useAnalytics()

  const handleClick = () => {
    trackClick(elementId, elementType)
    onClick?.()
  }

  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  )
}

// Performance metrics tracking
export function PerformanceTracker() {
  useEffect(() => {
    // Track Core Web Vitals
    if ('web-vitals' in window) {
      // @ts-ignore
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS((metric: any) => {
          trackEvent({
            name: 'web_vitals',
            parameters: {
              metric_name: 'CLS',
              metric_value: metric.value,
              metric_rating: metric.rating,
            }
          })
        })

        getFID((metric: any) => {
          trackEvent({
            name: 'web_vitals',
            parameters: {
              metric_name: 'FID',
              metric_value: metric.value,
              metric_rating: metric.rating,
            }
          })
        })

        getFCP((metric: any) => {
          trackEvent({
            name: 'web_vitals',
            parameters: {
              metric_name: 'FCP',
              metric_value: metric.value,
              metric_rating: metric.rating,
            }
          })
        })

        getLCP((metric: any) => {
          trackEvent({
            name: 'web_vitals',
            parameters: {
              metric_name: 'LCP',
              metric_value: metric.value,
              metric_rating: metric.rating,
            }
          })
        })

        getTTFB((metric: any) => {
          trackEvent({
            name: 'web_vitals',
            parameters: {
              metric_name: 'TTFB',
              metric_value: metric.value,
              metric_rating: metric.rating,
            }
          })
        })
      })
    }

    // Track page load time
    window.addEventListener('load', () => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart
      trackEvent({
        name: 'page_load_time',
        parameters: {
          load_time: loadTime,
        }
      })
    })

    // Track time on page
    const startTime = Date.now()
    const handleBeforeUnload = () => {
      const timeOnPage = Date.now() - startTime
      trackEvent({
        name: 'time_on_page',
        parameters: {
          time_seconds: Math.round(timeOnPage / 1000),
        }
      })
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  return null
}

// Error tracking
export function ErrorTracker() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      trackEvent({
        name: 'javascript_error',
        parameters: {
          error_message: event.message,
          error_filename: event.filename,
          error_line: event.lineno,
          error_column: event.colno,
        }
      })
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      trackEvent({
        name: 'unhandled_promise_rejection',
        parameters: {
          error_reason: String(event.reason),
        }
      })
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  return null
}

// Main Analytics component that combines all trackers
export function Analytics() {
  return (
    <>
      <GoogleAnalytics />
      <ScrollTracker />
      <PerformanceTracker />
      <ErrorTracker />
    </>
  )
}