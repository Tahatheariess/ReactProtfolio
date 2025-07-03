"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Loader2 } from "lucide-react"

interface ContactFormProps {
  darkMode?: boolean
  animated?: boolean
}

export default function ContactForm({ darkMode = false, animated = false }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const errors: { [key: string]: string } = {}

    if (!formData.name.trim()) {
      errors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid"
    }

    if (!formData.subject.trim()) {
      errors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Reset form and show success message
    setFormData({ name: "", email: "", subject: "", message: "" })
    setIsSubmitting(false)
    setSubmitSuccess(true)

    // Hide success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000)
  }

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-purple-500 focus:border-transparent"
                  : "border border-gray-300 focus:ring-green-500 focus:border-transparent"
              } ${formErrors.name ? (darkMode ? "border-red-500" : "border-red-500") : ""}`}
            />
            {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
          </div>
        </div>
        <div>
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-purple-500 focus:border-transparent"
                  : "border border-gray-300 focus:ring-green-500 focus:border-transparent"
              } ${formErrors.email ? (darkMode ? "border-red-500" : "border-red-500") : ""}`}
            />
            {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
          </div>
        </div>
      </div>

      <div>
        <div className="relative">
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white focus:ring-purple-500 focus:border-transparent"
                : "border border-gray-300 focus:ring-green-500 focus:border-transparent"
            } ${formErrors.subject ? (darkMode ? "border-red-500" : "border-red-500") : ""}`}
          />
          {formErrors.subject && <p className="text-red-500 text-xs mt-1">{formErrors.subject}</p>}
        </div>
      </div>

      <div>
        <div className="relative">
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 resize-none ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white focus:ring-purple-500 focus:border-transparent"
                : "border border-gray-300 focus:ring-green-500 focus:border-transparent"
            } ${formErrors.message ? (darkMode ? "border-red-500" : "border-red-500") : ""}`}
          ></textarea>
          {formErrors.message && <p className="text-red-500 text-xs mt-1">{formErrors.message}</p>}
        </div>
      </div>

      <div>
        <Button
          type="submit"
          className={`group relative inline-flex items-center gap-2 font-medium py-3 px-8 rounded-md transition-all duration-300 overflow-hidden ${
            darkMode
              ? "bg-gradient-to-r from-purple-600 to-cyan-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
          disabled={isSubmitting}
        >
          <span className="relative z-10">
            {isSubmitting ? "Sending..." : submitSuccess ? "Message Sent" : "Send Message"}
          </span>
          {isSubmitting ? (
            <Loader2 size={18} className="relative z-10 animate-spin" />
          ) : submitSuccess ? (
            <Check size={18} className="relative z-10" />
          ) : (
            <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
          )}
          <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-cyan-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
        </Button>

        {submitSuccess && (
          <div className="flex items-center gap-2 mt-4 text-purple-400 bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
            <Check size={18} />
            <p>Your message has been sent successfully! I'll get back to you soon.</p>
          </div>
        )}
      </div>
    </form>
  )

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {formContent}
      </motion.div>
    )
  }

  return formContent
}
