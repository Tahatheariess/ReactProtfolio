"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Eye, Github, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface PortfolioItemProps {
  image: string
  category: string
  title: string
  darkMode?: boolean
  animated?: boolean
  delay?: number
  technologies?: string[]
  demoUrl?: string
  githubUrl?: string
  featured?: boolean
}

export default function PortfolioItem({
  image,
  category,
  title,
  darkMode = false,
  animated = false,
  delay = 0,
  technologies = [],
  demoUrl,
  githubUrl,
  featured = false,
}: PortfolioItemProps) {
  const itemContent = (
    <div className="group relative overflow-hidden rounded-2xl shadow-xl">
      {featured && (
        <div className="absolute top-4 left-4 z-20">
          <Badge className="bg-purple-600">Featured</Badge>
        </div>
      )}

      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        width={400}
        height={300}
        className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-60"></div>

      <div className="absolute inset-0 bg-gray-900 bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
        <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 ${darkMode ? "bg-purple-600 text-white" : "bg-white text-green-500"} rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300`}
              aria-label="View demo"
            >
              <ExternalLink size={18} />
            </a>
          )}

          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 ${darkMode ? "bg-gray-800 text-white" : "bg-gray-800 text-white"} rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300`}
              aria-label="View code on GitHub"
            >
              <Github size={18} />
            </a>
          )}

          <a
            href={`/portfolio/${title.toLowerCase().replace(/\s+/g, "-")}`}
            className={`w-10 h-10 ${darkMode ? "bg-cyan-600 text-white" : "bg-white text-cyan-500"} rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300`}
            aria-label="View project details"
          >
            <Eye size={18} />
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
        <span className={`text-sm ${darkMode ? "text-purple-400" : "text-green-400"}`}>{category}</span>
        <h3 className="font-bold text-xl">{title}</h3>

        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="text-xs bg-gray-800/80 backdrop-blur-sm text-gray-300 px-2 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay / 1000 }}
      >
        {itemContent}
      </motion.div>
    )
  }

  return itemContent
}
