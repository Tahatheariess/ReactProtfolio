"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LiveCodeEditor() {
  const [code, setCode] = useState(`function greeting(name) {
  return \`Hello, \${name}!\`;
}

// Try changing the name
console.log(greeting("World"));`)

  const [output, setOutput] = useState("")
  const [activeTab, setActiveTab] = useState("editor")

  const runCode = () => {
    try {
      // Create a safe environment to run the code
      const originalConsoleLog = console.log
      const logs: string[] = []

      // Override console.log to capture output
      console.log = (...args) => {
        logs.push(args.map((arg) => String(arg)).join(" "))
      }

      // Execute the code
      // eslint-disable-next-line no-new-func
      new Function(code)()

      // Restore original console.log
      console.log = originalConsoleLog

      // Update output
      setOutput(logs.join("\n"))
      setActiveTab("output")
    } catch (error) {
      setOutput(`Error: ${error.message}`)
      setActiveTab("output")
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 shadow-xl">
      <div className="flex items-center justify-between bg-gray-900 px-4 py-2 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-sm text-gray-400">JavaScript Editor</div>
        <Button size="sm" onClick={runCode} className="bg-purple-600 hover:bg-purple-700">
          Run Code
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-gray-900 border-b border-gray-700 rounded-none">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="output">Output</TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="m-0">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 bg-gray-800 text-gray-100 p-4 font-mono text-sm focus:outline-none resize-none"
            spellCheck="false"
          />
        </TabsContent>

        <TabsContent value="output" className="m-0">
          <div className="w-full h-64 bg-gray-900 text-gray-100 p-4 font-mono text-sm overflow-auto">
            {output || "Run the code to see output here"}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
