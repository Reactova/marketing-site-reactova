'use client'

import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '@/config/site.config'

interface TimeLeft {
  days: string
  hours: string
  mins: string
  secs: string
}

const INITIAL_TIME: TimeLeft = { days: '00', hours: '00', mins: '00', secs: '00' }

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

function getTimeLeft(launchDate: Date): TimeLeft {
  const diff = launchDate.getTime() - Date.now()
  if (diff <= 0) return INITIAL_TIME

  return {
    days:  pad(Math.floor(diff / 86_400_000)),
    hours: pad(Math.floor((diff % 86_400_000) / 3_600_000)),
    mins:  pad(Math.floor((diff % 3_600_000) / 60_000)),
    secs:  pad(Math.floor((diff % 60_000) / 1_000)),
  }
}

export default function Countdown() {
  const launchDate = siteConfig.launch.date
  const [mounted, setMounted] = useState(false)
  const [time, setTime] = useState<TimeLeft>(INITIAL_TIME)
  const [tick, setTick] = useState(false)
  const prevSecs = useRef(time.secs)

  useEffect(() => {
    setMounted(true)
    setTime(getTimeLeft(launchDate))

    const id = setInterval(() => {
      const next = getTimeLeft(launchDate)
      if (next.secs !== prevSecs.current) {
        prevSecs.current = next.secs
        setTick(true)
        setTimeout(() => setTick(false), 300)
      }
      setTime(next)
    }, 1_000)
    return () => clearInterval(id)
  }, [launchDate])

  if (!mounted) {
    return (
      <div className="countdown-wrap">
        <div className="countdown-label">Launching in</div>
        <div className="countdown">
          <div className="cd-unit">
            <div className="cd-box">00</div>
            <div className="cd-name">Days</div>
          </div>
          <div className="cd-sep">:</div>
          <div className="cd-unit">
            <div className="cd-box">00</div>
            <div className="cd-name">Hours</div>
          </div>
          <div className="cd-sep">:</div>
          <div className="cd-unit">
            <div className="cd-box">00</div>
            <div className="cd-name">Mins</div>
          </div>
          <div className="cd-sep">:</div>
          <div className="cd-unit">
            <div className="cd-box">00</div>
            <div className="cd-name">Secs</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="countdown-wrap">
      <div className="countdown-label">Launching in</div>
      <div className="countdown">
        <div className="cd-unit">
          <div className="cd-box">{time.days}</div>
          <div className="cd-name">Days</div>
        </div>
        <div className="cd-sep">:</div>
        <div className="cd-unit">
          <div className="cd-box">{time.hours}</div>
          <div className="cd-name">Hours</div>
        </div>
        <div className="cd-sep">:</div>
        <div className="cd-unit">
          <div className="cd-box">{time.mins}</div>
          <div className="cd-name">Mins</div>
        </div>
        <div className="cd-sep">:</div>
        <div className="cd-unit">
          <div className={`cd-box${tick ? ' tick' : ''}`}>{time.secs}</div>
          <div className="cd-name">Secs</div>
        </div>
      </div>
    </div>
  )
}
