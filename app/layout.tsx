import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TahaDev - Full-Stack Developer Portfolio",
  description: "Professional portfolio of Taha, a full-stack developer specializing in modern web applications",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
          <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Navbar />
            {children}
            <Footer />
          </div>
      </body>
    </html>
  )
}
