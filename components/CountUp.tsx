'use client'

import { useEffect, useRef, useState } from 'react'

function parseValue(value: string): { prefix: string; num: number; suffix: string } | null {
  // Match an optional prefix, a number (int or float), and an optional suffix
  const match = value.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/)
  if (!match) return null
  return { prefix: match[1], num: parseFloat(match[2]), suffix: match[3] }
}

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export function CountUp({ value }: { value: string }) {
  const parsed = parseValue(value)
  const [display, setDisplay] = useState(parsed ? `${parsed.prefix}0${parsed.suffix}` : value)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible || hasAnimated.current) return
    hasAnimated.current = true

    if (!parsed) {
      // Non-numeric: just show the value (fade handled by CSS opacity transition)
      setDisplay(value)
      return
    }

    const duration = 1500
    const start = performance.now()
    const { prefix, num, suffix } = parsed
    const isFloat = num % 1 !== 0
    const decimals = isFloat ? (value.split('.')[1]?.replace(/[^0-9]/g, '').length ?? 1) : 0

    function frame(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const current = num * easeOut(progress)
      setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`)
      if (progress < 1) requestAnimationFrame(frame)
    }

    requestAnimationFrame(frame)
  }, [visible, parsed, value])

  return (
    <span
      ref={ref}
      style={{
        display: 'inline-block',
        transition: 'opacity 0.4s ease',
        opacity: visible ? 1 : 0,
      }}
    >
      {display}
    </span>
  )
}
