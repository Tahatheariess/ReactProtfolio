import Link from "next/link"
import { Github, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-20 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* About Column */}
          <div>
            <h3 className="text-2xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-500 to-cyan-500 text-transparent bg-clip-text">Taha</span>
              <span className="text-white">Dev</span>
            </h3>
            <p className="text-gray-400 mb-6">
              Frontend developer specializing in building exceptional digital experiences that are fast, accessible,
              and visually appealing.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://github.com/tahatheariess/"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors"
              >
                <Github size={18} />
              </Link>
              <Link
                href="https://linkedin.com/in/taha-ahmed-4734ba296/"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors"
              >
                <Linkedin size={18} />
              </Link>
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#home" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-400 hover:text-purple-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#experience" className="text-gray-400 hover:text-purple-400 transition-colors">
                Experience
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#portfolio" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-xl font-bold mb-6">Services</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#services" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-400 hover:text-purple-400 transition-colors">
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Backend Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-purple-400 mt-1" size={18} />
                <span className="text-gray-400">Karachi, Pakistan</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-purple-400" size={18} />
                <a href="mailto:hello@Tahadev.tech" className="text-gray-400 hover:text-purple-400 transition-colors">
                  tahatheariess@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-purple-400" size={18} />
                <a href="tel:+15551234567" className="text-gray-400 hover:text-purple-400 transition-colors">
                +92 334 2266991
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} TahaDev. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
