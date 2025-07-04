"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 w-30 h-30 flex items-center justify-center rounded-full bg-transparent transition-all duration-300 group select-none
        ${isVisible ? "translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
      aria-label="Scroll to top"
      style={{ outline: "none", border: "none" }}
    >
      <span className="absolute w-30 h-30 flex items-center justify-center">
        <svg
          className="animate-spin-slow"
          width="90"
          height="90"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <path
              id="circlePath"
              d="M40,10
                a30,30 0 1,1 0,60
                a30,30 0 1,1 0,-60"
            />
          </defs>
          <text fill="#bcb4d5" fontSize="9" fontFamily="sans-serif" letterSpacing="1">
            <textPath xlinkHref="#circlePath">
               TAHA • TAHA • TAHA • TAHA • TAHA • 
            </textPath>
          </text>
        </svg>
      </span>
      <span className="relative flex items-center justify-center w-12 h-12">
        <ArrowUp size={28} color="#bcb4d5" />
      </span>
      <style jsx global>{`
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
        @keyframes spin {
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </button>
  )
}
