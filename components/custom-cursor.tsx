"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface CustomCursorProps {
  mousePosition: { x: number; y: number }
}

export default function CustomCursor({ mousePosition }: CustomCursorProps) {
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    const handlePointerDetection = () => {
      const hoveredElement = document.elementFromPoint(mousePosition.x, mousePosition.y)
      const isClickable =
        hoveredElement?.tagName === "BUTTON" ||
        hoveredElement?.tagName === "A" ||
        hoveredElement?.closest("button") ||
        hoveredElement?.closest("a") ||
        window.getComputedStyle(hoveredElement || document.body).cursor === "pointer"

      setIsPointer(!!isClickable)
    }

    handlePointerDetection()
  }, [mousePosition])

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed w-8 h-8 rounded-full border-2 border-purple-500 pointer-events-none z-50 hidden md:block"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isPointer ? 0.5 : 1,
          opacity: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />

      {/* Cursor dot */}
      <motion.div
        className="fixed w-2 h-2 rounded-full bg-cyan-500 pointer-events-none z-50 hidden md:block"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isPointer ? 2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 1500,
          damping: 30,
        }}
      />
    </>
  )
}
