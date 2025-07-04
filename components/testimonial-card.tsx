"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Quote, Play } from "lucide-react"
import { useState } from "react"

interface TestimonialCardProps {
  image: string
  name: string
  position: string
  quote: string
  darkMode?: boolean
  animated?: boolean
  delay?: number
  rating?: number
  videoUrl?: string
}

export default function TestimonialCard({
  image,
  name,
  position,
  quote,
  darkMode = false,
  animated = false,
  delay = 0,
  rating = 5,
  videoUrl,
}: TestimonialCardProps) {
  const [showVideo, setShowVideo] = useState(false)

  const cardContent = (
    <div
      className={`${darkMode ? "bg-gray-800/90 backdrop-blur-sm border border-gray-700" : "bg-white"} p-8 rounded-2xl shadow-xl relative group hover:-translate-y-2 transition-transform duration-300 h-full`}
    >
      <div
        className={`absolute top-6 right-6 ${darkMode ? "text-purple-500" : "text-green-500"} opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
      >
        <Quote size={40} />
      </div>

      {videoUrl && !showVideo ? (
        <div
          className="relative w-full h-48 mb-6 rounded-lg overflow-hidden group cursor-pointer"
          onClick={() => setShowVideo(true)}
        >
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={300}
            height={200}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/70 transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
              <Play size={24} fill="currentColor" />
            </div>
          </div>
          <div className="absolute bottom-4 left-4 text-white">
            <p className="font-bold">Video Testimonial</p>
            <p className="text-sm opacity-80">Click to play</p>
          </div>
        </div>
      ) : videoUrl && showVideo ? (
        <div className="w-full h-48 mb-6 rounded-lg overflow-hidden">
          <iframe src={videoUrl} title={`${name} testimonial video`} className="w-full h-full" allowFullScreen></iframe>
        </div>
      ) : (
        <div className="flex items-center gap-4 mb-6">
          
          <div>
            <h4 className={`font-bold text-lg ${darkMode ? "text-white" : "text-gray-800"}`}>{name}</h4>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-sm`}>{position}</p>

            {/* Star Rating */}
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => {
                const starValue = i + 1
                return (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${starValue <= rating ? "text-yellow-500" : "text-gray-400"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    {starValue <= rating || starValue - 0.5 === rating ? (
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    ) : (
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    )}
                  </svg>
                )
              })}
            </div>
          </div>
        </div>
      )}

      <p className={`${darkMode ? "text-gray-300" : "text-gray-700"} italic relative z-10`}>{quote}</p>
    </div>
  )

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay / 1000 }}
        className="h-full"
      >
        {cardContent}
      </motion.div>
    )
  }

  return cardContent
}
