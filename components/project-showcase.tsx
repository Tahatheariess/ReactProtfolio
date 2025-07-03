"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const projects = [
  {
    id: 1,
    title: "Finance Dashboard",
    description:
      "A comprehensive financial dashboard with real-time data visualization, portfolio management, and transaction tracking. Built with React, TypeScript, and D3.js.",
    image: "/placeholder.svg?height=500&width=800",
    technologies: ["React", "TypeScript", "D3.js", "Node.js", "MongoDB"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    features: [
      "Real-time data visualization",
      "Portfolio management",
      "Transaction tracking",
      "Expense categorization",
      "Budget planning",
    ],
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with product management, cart functionality, payment processing, and order tracking. Built with Next.js and Stripe.",
    image: "/placeholder.svg?height=500&width=800",
    technologies: ["Next.js", "TypeScript", "Stripe", "MongoDB", "Tailwind CSS"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    features: [
      "Product management",
      "Shopping cart",
      "Secure payment processing",
      "Order tracking",
      "User authentication",
    ],
  },
  {
    id: 3,
    title: "AI Content Generator",
    description:
      "An AI-powered content generation tool that creates blog posts, social media content, and marketing copy. Integrates with OpenAI's GPT models.",
    image: "/placeholder.svg?height=500&width=800",
    technologies: ["React", "Node.js", "OpenAI API", "Express", "PostgreSQL"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    features: [
      "AI-powered content generation",
      "Multiple content formats",
      "Content editing and refinement",
      "Export to various platforms",
      "Usage analytics",
    ],
  },
]

export default function ProjectShowcase() {
  const [currentProject, setCurrentProject] = useState(0)

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const project = projects[currentProject]

  return (
    <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-700 shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image Section */}
        <div className="relative h-[300px] lg:h-[500px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-transparent"></div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button
              onClick={prevProject}
              className="w-10 h-10 rounded-full bg-gray-800/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-purple-600 transition-colors"
              aria-label="Previous project"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextProject}
              className="w-10 h-10 rounded-full bg-gray-800/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-purple-600 transition-colors"
              aria-label="Next project"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Project Counter */}
          <div className="absolute top-4 right-4 bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
            {currentProject + 1} / {projects.length}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                {project.title}
              </h3>

              <p className="text-gray-300 mb-6">{project.description}</p>

              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Key Features</h4>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="bg-gray-700">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Button asChild className="bg-purple-600 hover:bg-purple-700">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Github size={16} />
                    View Code
                  </a>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
