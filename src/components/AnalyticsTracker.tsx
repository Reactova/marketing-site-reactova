'use client'

import { useEffect, useRef, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface EngagementData {
  scrollDepthMax: number
  clickCount: number
  mouseMovements: number
  touchEvents: number
  formInteractions: number
  timeOnPage: number
}

interface AnalyticsEvent {
  type: string
  timestamp: Date
  data?: Record<string, unknown>
}

const VISITOR_ID_KEY = 'reactova_visitor_id'
const SESSION_ID_KEY = 'reactova_session_id'
const UPDATE_INTERVAL = 10000

function getOrCreateId(key: string): string {
  if (typeof window === 'undefined') return ''
  
  let id = localStorage.getItem(key)
  if (!id) {
    id = uuidv4()
    localStorage.setItem(key, id)
  }
  return id
}

function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  
  let sessionId = sessionStorage.getItem(SESSION_ID_KEY)
  if (!sessionId) {
    sessionId = uuidv4()
    sessionStorage.setItem(SESSION_ID_KEY, sessionId)
  }
  return sessionId
}

function getUTMParams() {
  if (typeof window === 'undefined') return {}
  
  const params = new URLSearchParams(window.location.search)
  return {
    utmSource: params.get('utm_source'),
    utmMedium: params.get('utm_medium'),
    utmCampaign: params.get('utm_campaign'),
  }
}

function getDeviceInfo() {
  if (typeof window === 'undefined') return {}
  
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
  
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    isMobile,
    touchSupport: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }
}

export default function AnalyticsTracker() {
  const startTime = useRef(Date.now())
  const engagement = useRef<EngagementData>({
    scrollDepthMax: 0,
    clickCount: 0,
    mouseMovements: 0,
    touchEvents: 0,
    formInteractions: 0,
    timeOnPage: 0,
  })
  const events = useRef<AnalyticsEvent[]>([])
  const lastMouseMove = useRef(0)
  const initialized = useRef(false)
  const visitorId = useRef('')
  const sessionId = useRef('')

  const sendAnalytics = useCallback(async (type: 'session_start' | 'session_update' | 'session_end') => {
    if (!visitorId.current || !sessionId.current) return

    engagement.current.timeOnPage = Math.floor((Date.now() - startTime.current) / 1000)

    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitorId: visitorId.current,
          sessionId: sessionId.current,
          type,
          device: getDeviceInfo(),
          source: {
            referrer: document.referrer || null,
            ...getUTMParams(),
            landingPage: window.location.pathname,
          },
          engagement: engagement.current,
          events: events.current,
        }),
      })

      if (type !== 'session_end') {
        events.current = []
      }
    } catch (error) {
      console.error('Failed to send analytics:', error)
    }
  }, [])

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    visitorId.current = getOrCreateId(VISITOR_ID_KEY)
    sessionId.current = getSessionId()

    sendAnalytics('session_start')

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = scrollHeight > 0 ? Math.round((window.scrollY / scrollHeight) * 100) : 0
      
      if (scrollPercent > engagement.current.scrollDepthMax) {
        engagement.current.scrollDepthMax = scrollPercent
        events.current.push({
          type: 'scroll',
          timestamp: new Date(),
          data: { depth: scrollPercent },
        })
      }
    }

    const handleClick = (e: MouseEvent) => {
      engagement.current.clickCount++
      const target = e.target as HTMLElement
      events.current.push({
        type: 'click',
        timestamp: new Date(),
        data: {
          x: e.clientX,
          y: e.clientY,
          target: target.tagName,
          className: target.className?.slice?.(0, 50),
        },
      })
    }

    const handleMouseMove = () => {
      const now = Date.now()
      if (now - lastMouseMove.current > 100) {
        engagement.current.mouseMovements++
        lastMouseMove.current = now
      }
    }

    const handleTouch = () => {
      engagement.current.touchEvents++
      events.current.push({
        type: 'touch',
        timestamp: new Date(),
      })
    }

    const handleFormFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        engagement.current.formInteractions++
        events.current.push({
          type: 'form_focus',
          timestamp: new Date(),
          data: { field: (target as HTMLInputElement).placeholder || target.id },
        })
      }
    }

    const handleVisibilityChange = () => {
      events.current.push({
        type: 'visibility_change',
        timestamp: new Date(),
        data: { hidden: document.hidden },
      })

      if (document.hidden) {
        sendAnalytics('session_update')
      }
    }

    const handleBeforeUnload = () => {
      engagement.current.timeOnPage = Math.floor((Date.now() - startTime.current) / 1000)
      
      const payload = JSON.stringify({
        visitorId: visitorId.current,
        sessionId: sessionId.current,
        type: 'session_end',
        device: getDeviceInfo(),
        source: {
          referrer: document.referrer || null,
          ...getUTMParams(),
          landingPage: window.location.pathname,
        },
        engagement: engagement.current,
        events: events.current,
      })

      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/analytics', payload)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('click', handleClick)
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchstart', handleTouch, { passive: true })
    document.addEventListener('focusin', handleFormFocus)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('beforeunload', handleBeforeUnload)

    const intervalId = setInterval(() => {
      sendAnalytics('session_update')
    }, UPDATE_INTERVAL)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('click', handleClick)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchstart', handleTouch)
      document.removeEventListener('focusin', handleFormFocus)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      clearInterval(intervalId)
    }
  }, [sendAnalytics])

  return null
}

export function useAnalytics() {
  const markConversion = useCallback(async () => {
    const visitorId = localStorage.getItem(VISITOR_ID_KEY)
    const sessionId = sessionStorage.getItem(SESSION_ID_KEY)

    if (!visitorId || !sessionId) return

    try {
      await fetch('/api/analytics', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitorId, sessionId }),
      })
    } catch (error) {
      console.error('Failed to mark conversion:', error)
    }
  }, [])

  const getSessionInfo = useCallback(() => {
    return {
      visitorId: typeof window !== 'undefined' ? localStorage.getItem(VISITOR_ID_KEY) : null,
      sessionId: typeof window !== 'undefined' ? sessionStorage.getItem(SESSION_ID_KEY) : null,
    }
  }, [])

  return { markConversion, getSessionInfo }
}
