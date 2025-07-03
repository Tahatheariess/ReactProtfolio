"use client"

import { useState, useEffect } from "react"
import { Download, Menu, X, Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Experience", id: "experience" },
  { name: "Services", id: "services" },
  { name: "Portfolio", id: "portfolio" },
  { name: "Contact", id: "contact" },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full max-w-full overflow-x-hidden box-border ${
        isScrolled ? "bg-gray-900/90 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="w-full max-w-full box-border container mx-auto px-1 sm:px-3 flex justify-between items-center overflow-x-hidden">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 min-w-0">
          <div className="text-xl sm:text-2xl font-bold truncate">
            <span className="bg-gradient-to-r from-purple-500 to-cyan-500 text-transparent bg-clip-text">Taha</span>
            <span className="text-white">Dev</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`#${link.id}`}
              className="relative font-medium text-gray-300 hover:text-purple-400 transition-colors whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Resume Button */}
        <Button className="hidden md:flex items-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white rounded-md ml-2 lg:ml-6 px-3 py-1 text-sm lg:text-base"
        onClick={() => {
          const link = document.createElement('a');
          link.href = 'path/to/your/cv.pdf'; // Replace with the correct path to your CV
          link.click();
        }}
        >
          Resume <Download size={16} />
        </Button>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-300 ml-1 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 shadow-lg absolute top-full left-0 right-0 py-6 border-t border-gray-700 w-full max-w-full overflow-x-hidden box-border">
          <nav className="container mx-auto px-4 flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.id}`}
                className="font-medium text-gray-300 hover:text-purple-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Button className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white rounded-md mt-2 px-3 py-1 text-sm">
              Resume <Download size={16} />
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
