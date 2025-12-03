"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, X, Eye, EyeOff } from "lucide-react"

export interface AdConfig {
  id: string
  name: string
  type: 'banner' | 'sidebar' | 'inline' | 'popup' | 'native'
  size: 'small' | 'medium' | 'large' | 'responsive'
  placement: 'header' | 'sidebar' | 'content' | 'footer' | 'popup'
  content: {
    title?: string
    description?: string
    imageUrl?: string
    ctaText?: string
    ctaUrl?: string
    sponsorName?: string
    sponsorLogo?: string
  }
  targeting?: {
    pages?: string[]
    categories?: string[]
    devices?: ('mobile' | 'tablet' | 'desktop')[]
  }
  schedule?: {
    startDate?: string
    endDate?: string
    timezone?: string
  }
  enabled: boolean
  priority: number
}

interface AdComponentProps {
  config: AdConfig
  onClose?: () => void
  onInteraction?: (action: 'click' | 'view' | 'close') => void
  className?: string
  preview?: boolean
}

const AdSizes = {
  small: { width: '300px', height: '100px' },
  medium: { width: '728px', height: '90px' },
  large: { width: '970px', height: '250px' },
  responsive: { width: '100%', height: 'auto' }
}

export default function AdComponent({ 
  config, 
  onClose, 
  onInteraction, 
  className = "",
  preview = false 
}: AdComponentProps) {
  const [isVisible, setIsVisible] = React.useState(config.enabled)
  const [hasViewed, setHasViewed] = React.useState(false)
  const adRef = React.useRef<HTMLDivElement>(null)

  // Track ad view
  React.useEffect(() => {
    if (!hasViewed && isVisible && adRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !hasViewed) {
            setHasViewed(true)
            onInteraction?.('view')
          }
        },
        { threshold: 0.5 }
      )

      observer.observe(adRef.current)
      return () => observer.disconnect()
    }
  }, [isVisible, hasViewed, onInteraction])

  const handleClick = () => {
    onInteraction?.('click')
    if (config.content.ctaUrl) {
      window.open(config.content.ctaUrl, '_blank', 'noopener,noreferrer')
    }
  }

  const handleClose = () => {
    setIsVisible(false)
    onInteraction?.('close')
    onClose?.()
  }

  const getSizeStyles = () => {
    const size = AdSizes[config.size]
    return {
      width: size.width,
      height: size.height,
      maxWidth: config.size === 'responsive' ? '100%' : size.width
    }
  }

  if (!isVisible) return null

  return (
    <div
      ref={adRef}
      className={`relative ${className}`}
      style={getSizeStyles()}
      data-ad-id={config.id}
      data-ad-type={config.type}
    >
      {/* Ad Container */}
      <Card className={`
        h-full border-dashed border-2
        ${config.type === 'popup' ? 'fixed inset-4 z-50 bg-white dark:bg-gray-900 shadow-2xl' : ''}
        ${preview ? 'border-yellow-300 bg-yellow-50 dark:bg-yellow-950/20' : 'border-gray-200 bg-gray-50 dark:bg-gray-900/50'}
      `}>
        {/* Preview Badge */}
        {preview && (
          <Badge className="absolute -top-2 -left-2 z-10 bg-yellow-500">
            Preview
          </Badge>
        )}

        {/* Close Button */}
        {(config.type === 'popup' || onClose) && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 z-10 h-6 w-6 p-0"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>
        )}

        <CardContent className="h-full p-4 flex flex-col justify-center">
          {/* Native Ad Layout */}
          {config.type === 'native' && (
            <div className="flex gap-4 h-full">
              {config.content.imageUrl && (
                <img
                  src={config.content.imageUrl}
                  alt={config.content.title}
                  className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                />
              )}
              <div className="flex-1 flex flex-col justify-center">
                {config.content.sponsorName && (
                  <p className="text-xs text-muted-foreground mb-1">
                    Sponsored by {config.content.sponsorName}
                  </p>
                )}
                {config.content.title && (
                  <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                    {config.content.title}
                  </h3>
                )}
                {config.content.description && (
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                    {config.content.description}
                  </p>
                )}
                {config.content.ctaText && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={handleClick}
                    className="self-start"
                  >
                    {config.content.ctaText}
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Banner Ad Layout */}
          {config.type === 'banner' && (
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white cursor-pointer flex items-center justify-between"
              onClick={handleClick}
            >
              <div>
                {config.content.title && (
                  <h3 className="font-bold text-lg">{config.content.title}</h3>
                )}
                {config.content.description && (
                  <p className="text-sm opacity-90">{config.content.description}</p>
                )}
              </div>
              {config.content.ctaText && (
                <Button variant="secondary" size="sm">
                  {config.content.ctaText}
                </Button>
              )}
            </div>
          )}

          {/* Sidebar Ad Layout */}
          {config.type === 'sidebar' && (
            <div className="text-center h-full flex flex-col justify-center">
              {config.content.imageUrl && (
                <img
                  src={config.content.imageUrl}
                  alt={config.content.title}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
              )}
              {config.content.sponsorName && (
                <p className="text-xs text-muted-foreground mb-1">
                  Sponsored by {config.content.sponsorName}
                </p>
              )}
              {config.content.title && (
                <h3 className="font-semibold text-sm mb-2">{config.content.title}</h3>
              )}
              {config.content.description && (
                <p className="text-xs text-muted-foreground mb-3">
                  {config.content.description}
                </p>
              )}
              {config.content.ctaText && (
                <Button size="sm" onClick={handleClick} className="w-full">
                  {config.content.ctaText}
                </Button>
              )}
            </div>
          )}

          {/* Inline Ad Layout */}
          {config.type === 'inline' && (
            <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-blue-500">
              <div className="flex items-start gap-3">
                {config.content.sponsorLogo && (
                  <img
                    src={config.content.sponsorLogo}
                    alt={config.content.sponsorName}
                    className="w-8 h-8 object-contain"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      Sponsored
                    </Badge>
                    {config.content.sponsorName && (
                      <span className="text-xs text-muted-foreground">
                        by {config.content.sponsorName}
                      </span>
                    )}
                  </div>
                  {config.content.title && (
                    <h3 className="font-medium text-sm mb-1">{config.content.title}</h3>
                  )}
                  {config.content.description && (
                    <p className="text-xs text-muted-foreground">
                      {config.content.description}
                    </p>
                  )}
                </div>
                {config.content.ctaText && (
                  <Button size="sm" variant="outline" onClick={handleClick}>
                    {config.content.ctaText}
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Popup Ad Layout */}
          {config.type === 'popup' && (
            <div className="max-w-md mx-auto text-center">
              {config.content.imageUrl && (
                <img
                  src={config.content.imageUrl}
                  alt={config.content.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              {config.content.title && (
                <h2 className="text-xl font-bold mb-2">{config.content.title}</h2>
              )}
              {config.content.description && (
                <p className="text-muted-foreground mb-4">{config.content.description}</p>
              )}
              <div className="flex gap-2 justify-center">
                {config.content.ctaText && (
                  <Button onClick={handleClick}>
                    {config.content.ctaText}
                  </Button>
                )}
                <Button variant="outline" onClick={handleClose}>
                  Maybe Later
                </Button>
              </div>
              {config.content.sponsorName && (
                <p className="text-xs text-muted-foreground mt-4">
                  Sponsored by {config.content.sponsorName}
                </p>
              )}
            </div>
          )}

          {/* Fallback for empty ad */}
          {!config.content.title && !config.content.imageUrl && (
            <div className="text-center text-muted-foreground">
              <p className="text-sm">Advertisement Space</p>
              <p className="text-xs">ID: {config.id}</p>
              {preview && (
                <p className="text-xs mt-1">Configure content in admin panel</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Hook for managing ads
export function useAdManagement() {
  const [ads, setAds] = React.useState<AdConfig[]>([])
  const [analytics, setAnalytics] = React.useState<{
    views: { [adId: string]: number }
    clicks: { [adId: string]: number }
    revenue: { [adId: string]: number }
  }>({
    views: {},
    clicks: {},
    revenue: {}
  })

  const trackAdInteraction = (adId: string, action: 'click' | 'view' | 'close') => {
    setAnalytics(prev => ({
      ...prev,
      [action === 'view' ? 'views' : 'clicks']: {
        ...prev[action === 'view' ? 'views' : 'clicks'],
        [adId]: (prev[action === 'view' ? 'views' : 'clicks'][adId] || 0) + 1
      }
    }))

    // Track revenue (simplified - you'd integrate with actual ad networks)
    if (action === 'click') {
      setAnalytics(prev => ({
        ...prev,
        revenue: {
          ...prev.revenue,
          [adId]: (prev.revenue[adId] || 0) + 0.1 // $0.10 per click example
        }
      }))
    }
  }

  const getAdsForPlacement = (placement: string, category?: string) => {
    return ads.filter(ad => {
      if (!ad.enabled) return false
      if (ad.placement !== placement) return false
      if (ad.targeting?.categories && category) {
        return ad.targeting.categories.includes(category)
      }
      return true
    }).sort((a, b) => b.priority - a.priority)
  }

  return {
    ads,
    setAds,
    analytics,
    trackAdInteraction,
    getAdsForPlacement
  }
}