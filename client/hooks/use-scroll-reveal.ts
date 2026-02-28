"use client"

import { useEffect, useRef, useCallback } from "react"

type AnimationType = "fade-up" | "fade-left" | "fade-right" | "fade-scale"

interface UseScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
  animation?: AnimationType
  delay?: number
  duration?: number
  staggerChildren?: boolean
  staggerDelay?: number
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -40px 0px",
    once = true,
    animation = "fade-up",
    delay = 0,
    duration = 700,
    staggerChildren = false,
    staggerDelay = 80,
  } = options

  const ref = useRef<T>(null)

  const getInitialStyles = useCallback((): Record<string, string> => {
    const base: Record<string, string> = {
      opacity: "0",
      transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    }
    switch (animation) {
      case "fade-up":
        return { ...base, transform: "translateY(40px)" }
      case "fade-left":
        return { ...base, transform: "translateX(-40px)" }
      case "fade-right":
        return { ...base, transform: "translateX(40px)" }
      case "fade-scale":
        return { ...base, transform: "scale(0.95)" }
      default:
        return { ...base, transform: "translateY(40px)" }
    }
  }, [animation, delay, duration])

  const getVisibleStyles = useCallback((): Record<string, string> => {
    return {
      opacity: "1",
      transform: "translateY(0) translateX(0) scale(1)",
    }
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Set initial hidden styles
    const initialStyles = getInitialStyles()
    Object.entries(initialStyles).forEach(([key, value]) => {
      el.style.setProperty(key, value)
    })

    // Also style stagger children if needed
    if (staggerChildren) {
      const children = el.children
      for (let i = 0; i < children.length; i++) {
        const child = children[i] as HTMLElement
        const childDelay = delay + i * staggerDelay
        child.style.opacity = "0"
        child.style.transform = "translateY(24px)"
        child.style.transition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${childDelay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${childDelay}ms`
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate in
          const visibleStyles = getVisibleStyles()
          Object.entries(visibleStyles).forEach(([key, value]) => {
            el.style.setProperty(key, value)
          })

          // Animate stagger children
          if (staggerChildren) {
            const children = el.children
            for (let i = 0; i < children.length; i++) {
              const child = children[i] as HTMLElement
              child.style.opacity = "1"
              child.style.transform = "translateY(0)"
            }
          }

          if (once) observer.unobserve(el)
        } else if (!once) {
          // Reset
          const resetStyles = getInitialStyles()
          Object.entries(resetStyles).forEach(([key, value]) => {
            el.style.setProperty(key, value)
          })

          if (staggerChildren) {
            const children = el.children
            for (let i = 0; i < children.length; i++) {
              const child = children[i] as HTMLElement
              child.style.opacity = "0"
              child.style.transform = "translateY(24px)"
            }
          }
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once, getInitialStyles, getVisibleStyles, staggerChildren, staggerDelay, delay, duration])

  return ref
}
