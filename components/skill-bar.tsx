interface SkillBarProps {
  name: string
  percentage: number
  darkMode?: boolean
  animated?: boolean
  delay?: number
}

export default function SkillBar({ name, percentage, darkMode = false, animated = false, delay = 0 }: SkillBarProps) {
  const animationClass = animated ? `animate-fadeInUp animation-delay-${delay}` : ""

  const progressClass = animated ? "animate-progressBar" : ""

  return (
    <div className={animationClass}>
      <div className="flex justify-between mb-2">
        <span className={`font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>{name}</span>
        <span className={`font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>{percentage}%</span>
      </div>
      <div className={`w-full ${darkMode ? "bg-gray-700" : "bg-gray-200"} rounded-full h-2.5 overflow-hidden`}>
        <div
          className={`${darkMode ? "bg-gradient-to-r from-purple-500 to-cyan-500" : "bg-green-500"} h-2.5 rounded-full ${progressClass}`}
          style={{
            width: animated ? "0%" : `${percentage}%`,
            animationFillMode: "forwards",
            animationDelay: `${delay + 300}ms`,
            animationDuration: "1.5s",
          }}
        ></div>
      </div>
    </div>
  )
}
