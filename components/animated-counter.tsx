"use client"

import { useState, useEffect, useRef } from "react"

interface AnimatedCounterProps {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
}

export default function AnimatedCounter({ value, duration = 2000, prefix = "", suffix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    startTimeRef.current = null
    countRef.current = 0
    setCount(0)

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp
      }

      const progress = timestamp - startTimeRef.current
      const percentage = Math.min(progress / duration, 1)

      // Easing function for smoother animation
      const easeOutQuad = (t: number) => t * (2 - t)
      const easedProgress = easeOutQuad(percentage)

      const nextCount = Math.floor(easedProgress * value)

      if (nextCount !== countRef.current) {
        countRef.current = nextCount
        setCount(nextCount)
      }

      if (percentage < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(value)
      }
    }

    requestAnimationFrame(animate)

    return () => {
      startTimeRef.current = null
    }
  }, [value, duration])

  return (
    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
      {prefix}
      {count}
      {suffix}
    </div>
  )
}
