import React from "react"
import { cn } from "@/lib/utils"

interface GradientHeadingProps {
  children: React.ReactNode
  className?: string
  size?: "sm" | "md" | "lg" | "xl" | "xxl"
}

export const GradientHeading: React.FC<GradientHeadingProps> = ({
  children,
  className = "",
  size = "md"
}) => {
  const sizeClasses = {
    sm: "text-xl sm:text-2xl lg:text-3xl",
    md: "text-2xl sm:text-3xl lg:text-4xl",
    lg: "text-3xl sm:text-4xl lg:text-5xl",
    xl: "text-4xl sm:text-5xl lg:text-6xl",
    xxl: "text-5xl sm:text-6xl lg:text-7xl"
  }

  return (
    <h2
      className={cn(
        "tracking-tight font-display font-bold pb-3 bg-clip-text text-transparent",
        "bg-gradient-to-t from-gray-700 to-gray-900 dark:from-gray-200 dark:to-white",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </h2>
  )
}

export default GradientHeading
