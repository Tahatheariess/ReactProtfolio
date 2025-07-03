"use client"

import { motion } from "framer-motion"
import {
  Layout,
  Code,
  Smartphone,
  TrendingUp,
  PenTool,
  Users,
  Database,
  GitBranch,
  Shield,
  Check,
  type LucideIcon,
} from "lucide-react"

interface ServiceCardProps {
  icon: string
  title: string
  description: string
  darkMode?: boolean
  animated?: boolean
  delay?: number
  features?: string[]
}

export default function ServiceCard({
  icon,
  title,
  description,
  darkMode = false,
  animated = false,
  delay = 0,
  features = [],
}: ServiceCardProps) {
  // Map string icon names to actual Lucide components
  const getIcon = (iconName: string): LucideIcon => {
    switch (iconName.toLowerCase()) {
      case "layout":
        return Layout
      case "code":
        return Code
      case "smartphone":
        return Smartphone
      case "trending-up":
        return TrendingUp
      case "pen-tool":
        return PenTool
      case "users":
        return Users
      case "database":
        return Database
      case "git-branch":
        return GitBranch
      case "shield":
        return Shield
      default:
        return Code // Fallback icon
    }
  }

  const Icon = getIcon(icon)

  const cardContent = (
    <>
      <div
        className={`w-16 h-16 ${darkMode ? "bg-gray-700" : "bg-green-100"} rounded-xl flex items-center justify-center ${darkMode ? "text-purple-400 group-hover:bg-purple-600 group-hover:text-white" : "text-green-500 group-hover:bg-green-500 group-hover:text-white"} mb-6 transition-colors duration-300`}
      >
        <Icon size={32} />
      </div>
      <h3 className={`text-xl font-bold mb-3 ${darkMode ? "text-white" : "text-gray-800"}`}>{title}</h3>
      <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-6`}>{description}</p>

      {features.length > 0 && (
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">
                <Check size={16} />
              </span>
              <span className="text-gray-300 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  )

  if (animated) {
    return (
      <motion.div
        className={`${darkMode ? "bg-gray-800/90 backdrop-blur-sm border border-gray-700" : "bg-white"} p-8 rounded-2xl shadow-xl transition-transform hover:-translate-y-2 group`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay / 1000 }}
      >
        {cardContent}
      </motion.div>
    )
  }

  return (
    <div
      className={`${darkMode ? "bg-gray-800/90 backdrop-blur-sm border border-gray-700" : "bg-white"} p-8 rounded-2xl shadow-xl transition-transform hover:-translate-y-2 group`}
    >
      {cardContent}
    </div>
  )
}
