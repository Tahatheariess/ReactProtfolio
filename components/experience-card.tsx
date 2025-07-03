"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { TechLogos } from "./tech-logos"
import { Badge } from "@/components/ui/badge"

interface ExperienceCardProps {
  years: string
  logoType: "tech1" | "tech2" | "tech3" | "tech4"
  title: string
  company: string
  location: string
  remote?: boolean
  websiteUrl: string
  darkMode?: boolean
  animated?: boolean
  delay?: number
  description?: string
  technologies?: string[]
}

export default function ExperienceCard({
  years,
  logoType,
  title,
  company,
  location,
  remote,
  websiteUrl,
  darkMode = false,
  animated = false,
  delay = 0,
  description,
  technologies = [],
}: ExperienceCardProps) {
  const logoMap = {
    tech1: TechLogos.tech1,
    tech2: TechLogos.tech2,
    tech3: TechLogos.tech3,
    tech4: TechLogos.tech4,
  }

  const cardContent = (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
      <div className="w-full md:w-1/5 text-center md:text-left">
        <h3 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>{years}</h3>
      </div>

      <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
        {logoMap[logoType]}
      </div>

      <div className="flex-1 text-center md:text-left">
        <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-800"} mb-1`}>{title}</h3>
        <p className={darkMode ? "text-purple-400" : "text-red-500"}>
          {company}, {location}{" "}
          {remote && <span className={darkMode ? "text-gray-400" : "text-gray-500"}>(Remote)</span>}
        </p>

        {description && <p className="text-gray-400 mt-3 mb-3">{description}</p>}

        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {technologies.map((tech, index) => (
              <Badge key={index} variant="outline" className="bg-gray-700/50">
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center">
        <Link
          href={websiteUrl}
          className={`inline-flex items-center gap-2 ${darkMode ? "text-gray-300 hover:text-purple-400" : "text-gray-700 hover:text-green-500"} transition-colors`}
        >
          <span>Visit</span> <ExternalLink size={16} />
        </Link>
      </div>
    </div>
  )

  if (animated) {
    return (
      <motion.div
        className={`${darkMode ? "bg-gray-800/90 backdrop-blur-sm border border-gray-700" : "bg-white"} rounded-2xl shadow-xl p-6 mb-6 hover:-translate-y-1 transition-transform duration-300`}
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: delay / 1000 }}
      >
        {cardContent}
      </motion.div>
    )
  }

  return (
    <div
      className={`${darkMode ? "bg-gray-800/90 backdrop-blur-sm border border-gray-700" : "bg-white"} rounded-2xl shadow-xl p-6 mb-6 hover:-translate-y-1 transition-transform duration-300`}
    >
      {cardContent}
    </div>
  )
}
