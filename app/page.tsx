"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  ArrowUp,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Download,
  Code,
  Globe,
  Sparkles,
  Smartphone,
  GitBranch,
} from "lucide-react"
import { PresentationControls, Environment, ContactShadows, Float } from "@react-three/drei"
import ServiceCard from "@/components/service-card"
import SkillBar from "@/components/skill-bar"
import PortfolioItem from "@/components/portfolio-item"
import TestimonialCard from "@/components/testimonial-card"
import ContactForm from "@/components/contact-form"
import ExperienceCard from "@/components/experience-card"
import PortfolioFilter from "@/components/portfolio-filter"
import ScrollToTop from "@/components/scroll-to-top"
import AnimatedCounter from "@/components/animated-counter"
import ParticleBackground from "@/components/particle-background"
import LiveCodeEditor from "@/components/live-code-editor"
import SkillCloud from "@/components/skill-cloud"
import ProjectShowcase from "@/components/project-showcase"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

// 3D Model component
function Model(props) {
  return (
    <group {...props}>
      {/* Laptop base */}
      <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.2, 2]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Laptop screen */}
      <group position={[0, 0.7, -0.9]} rotation={[Math.PI / 6, 0, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3, 2, 0.1]} />
          <meshStandardMaterial color="#222" />
        </mesh>

        {/* Screen display */}
        <mesh position={[0, 0, 0.06]} castShadow>
          <boxGeometry args={[2.8, 1.8, 0.01]} />
          <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* Keyboard */}
      <mesh position={[0, 0, 0.2]} rotation={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 0.1, 1.7]} />
        <meshStandardMaterial color="#444" />
      </mesh>

      {/* Touchpad */}
      <mesh position={[0, 0.06, 0.7]} rotation={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 0.01, 0.8]} />
        <meshStandardMaterial color="#555" />
      </mesh>
    </group>
  )
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "experience",
        "services",
        "skills",
        "portfolio",
        "testimonials",
        "contact",
      ]

      for (const section of sections) {
        const element = document.getElementById(section)
        if (!element) continue

        const rect = element.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100 relative">
      <ParticleBackground />

      {/* Navigation dots */}
      <div className="fixed top-1/2 right-6 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col items-center gap-4">
          {["home", "about", "experience", "services", "skills", "portfolio", "testimonials", "contact"].map(
            (section) => (
              <TooltipProvider key={section}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={`#${section}`}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        activeSection === section
                          ? "bg-gradient-to-r from-purple-500 to-cyan-500 scale-150"
                          : "bg-gray-600 hover:bg-gray-400"
                      }`}
                      aria-label={`Navigate to ${section} section`}
                    />
                  </TooltipTrigger>
                  <TooltipContent side="left" className="capitalize">
                    {section}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ),
          )}
        </div>
      </div>

      {/* Floating elements */}
      <ScrollToTop />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden" ref={heroRef}>
        <motion.div className="absolute inset-0 w-full h-full" style={{ opacity, y }}>
          {/* Animated gradient blobs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-pink-600/20 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
        </motion.div>

        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left Content */}
            <motion.div
              className="w-full md:w-1/2 mb-16 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="max-w-xl">
                <motion.div
                  className="inline-flex items-center px-3 py-1 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-sm font-mono mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                  <span className="bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
                    Available for freelance work
                  </span>
                </motion.div>

                <motion.h1
                  className="text-5xl md:text-7xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  I'm{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 animate-gradient">
                    Taha
                  </span>
                  <span className="animate-blink text-purple-400">|</span>
                </motion.h1>

                <motion.h3
                  className="text-xl md:text-2xl font-medium text-purple-400 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Frontend Developer
                </motion.h3>

                <motion.p
                  className="text-gray-400 mb-8 text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  I create outstanding digital experiences by blending advanced technology with beautiful, user-friendly interfaces. Let's bring your vision to life
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Link
                    href="#contact"
                    className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-medium py-3 px-8 rounded-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] overflow-hidden"
                  >
                    <span className="relative z-10" onClick={() => window.location.hash = 'contact'}>Let's Talk</span>
                    <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-cyan-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  </Link>

                  <Link
                    href="#portfolio"
                    className="group relative inline-flex items-center gap-2 bg-gray-800 text-white font-medium py-3 px-8 rounded-md border border-gray-700 transition-all duration-300 hover:border-purple-500 overflow-hidden"
                  >
                    <span className="relative z-10" onClick={() => window.location.hash = 'portfolio'}>View Work</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  </Link>

                  <a
                    href="/resume.pdf"
                    className="group relative inline-flex items-center gap-2 bg-transparent text-white font-medium py-3 px-8 rounded-md border border-gray-700 transition-all duration-300 hover:border-purple-500"
                    download
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Download size={18} />
                      Resume
                    </span>
                  </a>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  className="flex gap-4 mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  {[
                    { icon: <Github size={20} />, href: "https://github.com/tahatheariess/", label: "GitHub" },
                    { icon: <Linkedin size={20} />, href: "https://linkedin.com/in/taha-ahmed-4734ba296/", label: "LinkedIn" },
                  ].map((social, index) => (
                    <TooltipProvider key={index}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-600 hover:border-purple-600 transition-all duration-300"
                            aria-label={social.label}
                          >
                            {social.icon}
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>{social.label}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </motion.div>

                {/* Stats */}
                <motion.div
                  className="grid grid-cols-3 gap-4 mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <div className="text-center p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                    <AnimatedCounter value={30} duration={2000} />
                    <p className="text-sm text-gray-400 mt-1">Projects</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                    <AnimatedCounter value={1} duration={1500} />
                    <p className="text-sm text-gray-400 mt-1">Years Exp.</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            {/* Right Content - 3D Model */}
            <motion.div
              className="w-full md:w-1/2 flex justify-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative w-full h-[500px] flex items-center justify-center">
  {/* Background rotating panels */}
  <div className="absolute w-[360px] h-[360px] bg-gradient-to-tr from-purple-600 to-blue-500 rounded-2xl rotate-12 z-0"></div>
  <div className="absolute w-[360px] h-[360px] bg-gradient-to-tr from-blue-500 to-cyan-500 rounded-2xl rotate-3 z-0"></div>

  {/* Main image card */}
  <div className="relative w-[340px] h-[340px] rounded-2xl overflow-hidden shadow-2xl z-10">
    <img
      src="/download.jpg"
      alt="Taha"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Floating Icons - Overlapping, Dynamic Positions */}
  {/* React */}
  <div className="absolute top-[12%] left-[18%] bg-gray-800 p-2.5 rounded-full shadow-xl animate-float-slow z-20">
  <img src="/1.png" alt="JavaScript" className="w-12 h-12" />
  </div>

  {/* JavaScript */}
  <div className="absolute top-[25%] right-[10%] bg-gray-800 p-2.5 rounded-full shadow-xl animate-float-fast animation-delay-200 z-20">
  <img src="/2.png" alt="JavaScript" className="w-12 h-12" />
  </div>

  {/* Node.js */}
  <div className="absolute bottom-[20%] left-[12%] bg-gray-800 p-2.5 rounded-full shadow-xl animate-float animation-delay-400 z-20">
  <img src="/3.png" alt="JavaScript" className="w-12 h-12" />
  </div>

  {/* HTML5 */}
  <div className="absolute bottom-[15%] right-[14%] bg-gray-800 p-2.5 rounded-full shadow-xl animate-float animation-delay-600 z-20">
  <img src="/4.png" alt="JavaScript" className="w-12 h-12" />
  </div>
</div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          >
            <span className="text-sm text-gray-400 mb-2">Scroll Down</span>
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-2 bg-purple-400 rounded-full mt-2 animate-scrollDown"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-800/50 backdrop-blur-md relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="flex flex-col md:flex-row items-center gap-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Left Image */}
            <motion.div
              className="w-full md:w-1/2 relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative w-full h-[450px] rounded-2xl overflow-hidden border border-gray-700 shadow-[0_10px_30px_rgba(0,0,0,0.3)] group">
                <Image
                  src="/placeholder.svg?height=450&width=400"
                  alt="About Me"
                  width={400}
                  height={450}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>

                {/* Animated overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/40 to-cyan-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Floating badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <Badge className="bg-purple-600 hover:bg-purple-700">React</Badge>
                  <Badge className="bg-cyan-600 hover:bg-cyan-700">TypeScript</Badge>
                  <Badge className="bg-pink-600 hover:bg-pink-700">Next.js</Badge>
                </div>
              </div>

              <motion.div
                className="absolute bottom-2 right-2 sm:-bottom-6 sm:-right-6 bg-gray-800/90 backdrop-blur-sm p-3 sm:p-5 rounded-2xl shadow-xl border border-gray-700"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center text-white text-lg sm:text-2xl font-bold">
                    1+
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold">Years of</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">Experience</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="inline-block font-mono text-sm bg-gradient-to-r from-purple-500 to-cyan-500 text-transparent bg-clip-text mb-2">
                ABOUT ME
              </div>

              <h2 className="text-4xl font-bold mb-6">Crafting Digital Experiences</h2>

              <p className="text-gray-400 mb-8 text-lg">
              I'm Taha, a Frontend developer with over 1 years of experience in crafting websites. With expertise in React, Javascript, and Node.js, I focus on building scalable solutions that address real-world business challenges
              </p>

              <Tabs defaultValue="skills" className="mb-8">
                <TabsList className="grid w-full grid-cols-3 bg-gray-800 border border-gray-700">
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="interests">Interests</TabsTrigger>
                </TabsList>

                <TabsContent value="skills" className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { icon: <Code size={18} />, label: "Frontend Development" },
                      { icon: <Globe size={18} />, label: "Backend Architecture" },
                      { icon: <GitBranch size={18} />, label: "UX/UI" },
                    ].map((skill, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-2 bg-gray-700/30 p-3 rounded-lg hover:bg-gray-700/50 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                      >
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                          {skill.icon}
                        </div>
                        <span>{skill.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="education" className="mt-4 space-y-4">
                  <motion.div
                    className="bg-gray-700/30 p-4 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    <h4 className="font-bold text-lg">Bachelor of Science in Computer Science</h4>
                    <p className="text-purple-400">Virtual University</p>
                    <p className="text-gray-400 text-sm">2025 - present</p>
                  </motion.div>
                </TabsContent>

                <TabsContent value="interests" className="mt-4">
                  <motion.div
                    className="bg-gray-700/30 p-4 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-gray-300">
                    When I'm not coding, I enjoy playing football and diving into the wonders of astronomy. I'm also passionate about exploring new technologies and contributing to tech-related projects in my free time.
                    </p>
                  </motion.div>
                </TabsContent>
              </Tabs>

              <Link
                href="#contact"
                className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-medium py-3 px-8 rounded-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] overflow-hidden"
              >
                <button className="relative z-10">Contact</button>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-cyan-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="experience" className="py-24 bg-gray-900 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block font-mono text-sm bg-gradient-to-r from-purple-500 to-cyan-500 text-transparent bg-clip-text mb-2">
              CAREER PATH
            </div>

            <h2 className="text-4xl font-bold mb-4">My Work Experience</h2>

            <p className="text-gray-400 text-lg">
              A journey through my professional career building innovative digital solutions for industry-leading
              companies
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[7.5%] top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 via-cyan-600 to-purple-600 hidden md:block"></div>

              <ExperienceCard
                years="2024 - Present"
                logoType="tech4"
                title="Forntend Developer"
                company="Digitechio"
                location="Karachi"
                websiteUrl="https://www.digitechio.com/"
                darkMode={true}
                animated={true}
                description="Designed and developed responsive, user-friendly web interfaces using HTML, CSS, JavaScript, and React, with backend integration using Node.js, Express js and MongoDB"
                technologies={["HTML", "CSS", "React", "Node js"]}
              />

              <ExperienceCard
                years="2023 - 2024"
                logoType="tech3"
                title="Frontend Teacher"
                company="Korean Conputer Academy"
                location="Karachi"
                websiteUrl="https://kca.com.pk/"
                darkMode={true}
                animated={true}
                delay={300}
                description="Instructed and mentored students in modern frontend development, covering HTML, CSS, JavaScript, and frameworks like React. Focused on building responsive, high-performance UIs and real-world project experience."
                technologies={["HTML", "CSS", "Javascript", "React"]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gray-800/50 backdrop-blur-md relative">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block font-mono text-sm bg-gradient-to-r from-purple-500 to-cyan-500 text-transparent bg-clip-text mb-2">
              WHAT I DO
            </div>

            <h2 className="text-4xl font-bold mb-4">My Services</h2>

            <p className="text-gray-400 text-lg">
              Specialized services tailored to help businesses thrive in the digital landscape
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon="code"
              title="Web Development"
              description="Building responsive, fast, and modern websites using React, Node.js, and Javascript."
              darkMode={true}
              animated={true}
              features={["Custom Web Applications", "E-commerce Solutions", "Progressive Web Apps"]}
            />
            <ServiceCard
              icon="layout"
              title="UI/UX Design"
              description="Creating intuitive interfaces and seamless user experiences that drive engagement."
              darkMode={true}
              animated={true}
              delay={200}
              features={["User Research", "Wireframing & Prototyping", "Usability Testing"]}
            />
            <ServiceCard
              icon="database"
              title="Backend Development"
              description="Building robust APIs and server-side applications with Node.js, Express, and MongoDB."
              darkMode={true}
              animated={true}
              delay={600}
              features={["RESTful APIs", "Database Design", "Authentication Systems"]}
            />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-gray-900 relative">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block font-mono text-sm bg-gradient-to-r from-purple-500 to-cyan-500 text-transparent bg-clip-text mb-2">
              MY EXPERTISE
            </div>

            <h2 className="text-4xl font-bold mb-4">Technical Skills</h2>

            <p className="text-gray-400 text-lg">
              I've mastered a diverse set of technologies to deliver comprehensive solutions for any digital challenge
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left Content - Skill Bars */}
            <motion.div
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-6">
                <SkillBar name="HTML, CSS" percentage={90} darkMode={true} animated={true} />
                <SkillBar
                  name="Javascript"
                  percentage={70}
                  darkMode={true}
                  animated={true}
                  delay={200}
                />
                <SkillBar
                  name="React"
                  percentage={80}
                  darkMode={true}
                  animated={true}
                  delay={400}
                />
                <SkillBar
                  name="NodeJS"
                  percentage={70}
                  darkMode={true}
                  animated={true}
                  delay={600}
                />
                <SkillBar name="Express JS" percentage={70} darkMode={true} animated={true} delay={800} />
                <SkillBar name="MongoDB" percentage={80} darkMode={true} animated={true} delay={1000} />
              </div>
            </motion.div>

            {/* Right Content - Skill Cloud */}
            <motion.div
              className="w-full lg:w-1/2 mt-16 lg:mt-0"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="h-[400px] relative">
                <SkillCloud />
              </div>
            </motion.div>
          </div>

          {/* Live Code Editor */}
          <motion.div
            className="mt-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-center">Live Code Example</h3>
            <LiveCodeEditor />
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 bg-gray-800/50 backdrop-blur-md relative">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-cyan-600/10 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block font-mono text-sm bg-gradient-to-r from-purple-500 to-cyan-500 text-transparent bg-clip-text mb-2">
              MY WORK
            </div>

            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>

            <p className="text-gray-400 text-lg mb-8">
              A showcase of my best work across various industries and technologies
            </p>

            <PortfolioFilter />
          </motion.div>

          {/* Featured Project Showcase */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ProjectShowcase />
          </motion.div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PortfolioItem
              image="/placeholder.svg?height=300&width=400"
              category="Web Application"
              title="Finance Dashboard"
              darkMode={true}
              animated={true}
              technologies={["React", "TypeScript", "Tailwind"]}
              demoUrl="https://example.com/demo"
              githubUrl="https://github.com/example"
              featured={true}
            />
            <PortfolioItem
              image="/placeholder.svg?height=300&width=400"
              category="Mobile App"
              title="Fitness Tracker"
              darkMode={true}
              animated={true}
              delay={200}
              technologies={["React Native", "Firebase", "Redux"]}
              demoUrl="https://example.com/demo"
              githubUrl="https://github.com/example"
            />
            <PortfolioItem
              image="/placeholder.svg?height=300&width=400"
              category="E-Commerce"
              title="Online Marketplace"
              darkMode={true}
              animated={true}
              delay={400}
              technologies={["Next.js", "MongoDB", "Stripe"]}
              demoUrl="https://example.com/demo"
              githubUrl="https://github.com/example"
            />
            <PortfolioItem
              image="/placeholder.svg?height=300&width=400"
              category="SaaS Platform"
              title="Project Management Tool"
              darkMode={true}
              animated={true}
              delay={600}
              technologies={["Vue.js", "Node.js", "PostgreSQL"]}
              demoUrl="https://example.com/demo"
              githubUrl="https://github.com/example"
            />
            <PortfolioItem
              image="/placeholder.svg?height=300&width=400"
              category="Web Design"
              title="Corporate Website"
              darkMode={true}
              animated={true}
              delay={800}
              technologies={["HTML/CSS", "JavaScript", "GSAP"]}
              demoUrl="https://example.com/demo"
              githubUrl="https://github.com/example"
            />
            <PortfolioItem
              image="/placeholder.svg?height=300&width=400"
              category="Mobile App"
              title="Social Network"
              darkMode={true}
              animated={true}
              delay={1000}
              technologies={["Flutter", "Firebase", "GetX"]}
              demoUrl="https://example.com/demo"
              githubUrl="https://github.com/example"
            />
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/portfolio"
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-medium py-3 px-8 rounded-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] overflow-hidden"
            >
              <span className="relative z-10">View All Projects</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-cyan-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gray-900 relative">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block font-mono text-sm bg-gradient-to-r from-purple-500 to-cyan-500 text-transparent bg-clip-text mb-2">
              WHAT CLIENTS SAY
            </div>

            <h2 className="text-4xl font-bold mb-4">Client Testimonials</h2>

            <p className="text-gray-400 text-lg">Feedback from clients who have experienced working with me</p>
          </motion.div>

          <Carousel className="max-w-5xl mx-auto overflow-x-hidden">
            <CarouselContent>
              <CarouselItem>
                <TestimonialCard
                  image="/placeholder.svg?height=100&width=100"
                  name="Michael Rodriguez"
                  position="Founder, DataFlow"
                  quote="Working with Taha transformed our product. He not only built what we asked for but improved upon our ideas with his technical insights."
                  darkMode={true}
                  animated={true}
                  rating={5}
                />
              </CarouselItem>
              <CarouselItem>
                <TestimonialCard
                  image="/placeholder.svg?height=100&width=100"
                  name="Sarah Johnson"
                  position="Product Manager, EnterpriseAI"
                  quote="Taha's ability to translate complex requirements into elegant code is remarkable. He's become an invaluable extension of our development team."
                  darkMode={true}
                  animated={true}
                  rating={4.5}
                />
              </CarouselItem>
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-2 sm:gap-4 w-full px-2">
              <CarouselPrevious className="!w-9 !h-9 sm:!w-12 sm:!h-12 mx-1 sm:mx-2" />
              <CarouselNext className="!w-9 !h-9 sm:!w-12 sm:!h-12 mx-1 sm:mx-2" />
            </div>
          </Carousel>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-900 relative">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block font-mono text-sm bg-gradient-to-r from-purple-500 to-cyan-500 text-transparent bg-clip-text mb-2">
              GET IN TOUCH
            </div>

            <h2 className="text-4xl font-bold mb-4">Let's Work Together</h2>

            <p className="text-gray-400 text-lg">
              Have a project in mind? Let's discuss how I can help bring your vision to life
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Contact Info */}
            <motion.div
              className="w-full lg:w-1/3"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gray-800/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-700 h-full">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                  <Sparkles className="text-purple-400" size={20} />
                  Contact Info
                </h3>

                <div className="space-y-8">
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                      <MapPin />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Location</h4>
                      <p className="text-gray-400">Karachi, Pakistan</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                      <Mail />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Email</h4>
                      <p className="text-gray-400">
                        <a href="mailto:" className="hover:text-purple-400 transition-colors">
                        tahatheariess@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                      <Phone />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Phone</h4>
                      <p className="text-gray-400">
                        <a href="tel:+15551234567" className="hover:text-purple-400 transition-colors">
                        +92 334 2266991
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social media links */}
                <div className="mt-12 pt-8 border-t border-gray-700">
                  <h4 className="font-bold mb-4">Connect With Me</h4>
                  <div className="flex gap-4">
                    <a
                      href="https://github.com/tahatheariess/"
                      className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors duration-300"
                      aria-label="GitHub"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href="https://linkedin.com/in/taha-ahmed-4734ba296/"
                      className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors duration-300"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="w-full lg:w-2/3"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gray-800/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-700">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                  <Sparkles className="text-purple-400" size={20} />
                  Send a Message
                </h3>
                <ContactForm darkMode={true} animated={true} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
