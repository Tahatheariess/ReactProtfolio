"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, User, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface BlogCardProps {
  image: string
  date: string
  author: string
  title: string
  excerpt: string
  darkMode?: boolean
  animated?: boolean
  delay?: number
  readTime?: string
  categories?: string[]
}

export default function BlogCard({
  image,
  date,
  author,
  title,
  excerpt,
  darkMode = false,
  animated = false,
  delay = 0,
  readTime = "",
  categories = [],
}: BlogCardProps) {
  const slug = title.toLowerCase().replace(/\s+/g, "-")

  const cardContent = (
    <div
      className={`${darkMode ? "bg-gray-800/90 backdrop-blur-sm border border-gray-700" : "bg-white"} rounded-2xl shadow-xl overflow-hidden group hover:-translate-y-2 transition-transform duration-300 h-full flex flex-col`}
    >
      <div className="relative overflow-hidden h-[200px]">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={400}
          height={200}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>

        {categories.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <Badge key={index} className="bg-purple-600 hover:bg-purple-700">
                {category}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar size={14} className={darkMode ? "text-purple-400" : "text-green-500"} />
            <span className={darkMode ? "text-gray-400" : "text-gray-600"}>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <User size={14} className={darkMode ? "text-purple-400" : "text-green-500"} />
            <span className={darkMode ? "text-gray-400" : "text-gray-600"}>{author}</span>
          </div>
          {readTime && (
            <div className="flex items-center gap-1">
              <Clock size={14} className={darkMode ? "text-purple-400" : "text-green-500"} />
              <span className={darkMode ? "text-gray-400" : "text-gray-600"}>{readTime}</span>
            </div>
          )}
        </div>

        <h3
          className={`font-bold text-xl mb-2 ${darkMode ? "text-white group-hover:text-purple-400" : "text-gray-800 group-hover:text-green-500"} transition-colors`}
        >
          <Link href={`/blog/${slug}`}>{title}</Link>
        </h3>

        <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-4 flex-1`}>{excerpt}</p>

        <Link
          href={`/blog/${slug}`}
          className={`inline-flex items-center gap-1 ${darkMode ? "text-purple-400 hover:text-purple-300" : "text-green-500 hover:text-green-600"} font-medium transition-colors mt-auto`}
        >
          Read More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
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
        className="h-full"
      >
        {cardContent}
      </motion.div>
    )
  }

  return cardContent
}
