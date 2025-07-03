"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry"
import { FontLoader } from "three/examples/jsm/loaders/FontLoader"

export default function SkillCloud() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 500

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    containerRef.current.appendChild(renderer.domElement)

    // Skills to display
    const skills = [
      "React",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Next.js",
      "HTML",
      "CSS",
      "Tailwind",
      "GraphQL",
      "REST API",
      "MongoDB",
      "PostgreSQL",
      "AWS",
      "Docker",
      "Git",
      "Redux",
      "Vue.js",
      "Express",
      "Firebase",
      "Figma",
    ]

    // Create a group to hold all text meshes
    const group = new THREE.Group()
    scene.add(group)

    // Load font
    const fontLoader = new FontLoader()
    fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
      skills.forEach((skill, index) => {
        // Create text geometry
        const textGeometry = new TextGeometry(skill, {
          font: font,
          size: 20,
          height: 2,
          curveSegments: 4,
          bevelEnabled: false,
        })

        // Create material with random color
        const color = new THREE.Color()
        color.setHSL(Math.random(), 0.7, 0.7)
        const material = new THREE.MeshBasicMaterial({ color })

        // Create mesh
        const textMesh = new THREE.Mesh(textGeometry, material)

        // Position randomly in a sphere
        const phi = Math.acos(-1 + (2 * index) / skills.length)
        const theta = Math.sqrt(skills.length * Math.PI) * phi
        const radius = 200

        textMesh.position.x = radius * Math.cos(theta) * Math.sin(phi)
        textMesh.position.y = radius * Math.sin(theta) * Math.sin(phi)
        textMesh.position.z = radius * Math.cos(phi)

        // Look at center
        textMesh.lookAt(scene.position)

        // Add to group
        group.add(textMesh)
      })
    })

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate the group
      group.rotation.y += 0.003

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return

      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full" />
}
