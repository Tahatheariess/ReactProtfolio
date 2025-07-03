"use client"

import { useState } from "react"

const categories = ["All", "Web Application", "Mobile App", "E-Commerce", "SaaS Platform", "Web Design"]

export default function PortfolioFilter() {
  const [activeCategory, setActiveCategory] = useState("All")

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeCategory === category
              ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
