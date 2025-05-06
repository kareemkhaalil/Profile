import * as React from "react"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value: number
    max?: number
    className?: string
    indicatorClassName?: string
  }
>(({ className, value, max = 100, indicatorClassName, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("progress-bar", className)}
    {...props}
  >
    <div
      className={cn("progress-value", indicatorClassName)}
      style={{ width: `${(value / max) * 100}%` }}
    />
  </div>
))
Progress.displayName = "Progress"

export { Progress }
