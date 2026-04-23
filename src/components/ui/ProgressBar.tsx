import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'accent' | 'success' | 'error'
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ value, max = 100, size = 'md', color = 'primary', className, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    const sizeClasses = {
      sm: 'h-1.5',
      md: 'h-2.5',
      lg: 'h-4',
    }

    const colorClasses = {
      primary: 'bg-[var(--primary)]',
      accent: 'bg-[var(--accent)]',
      success: 'bg-[var(--success)]',
      error: 'bg-[var(--error)]',
    }

    return (
      <div
        ref={ref}
        className={cn(
          "w-full overflow-hidden rounded-full bg-[var(--border)] shadow-inner",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "h-full transition-all duration-500 ease-out",
            colorClasses[color]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    )
  }
)

ProgressBar.displayName = "ProgressBar"

export { ProgressBar }
