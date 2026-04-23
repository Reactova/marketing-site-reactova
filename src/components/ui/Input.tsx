import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean
    startContent?: React.ReactNode
    endContent?: React.ReactNode
    startContentClassName?: string
    endContentClassName?: string
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, hasError, startContent, endContent, startContentClassName, endContentClassName, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full group">
        {startContent && (
          <div className={`absolute left-3 flex items-center justify-center pointer-events-none text-muted-foreground select-none z-10 ${startContentClassName || ''}`}>
            {startContent}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-[10px] border border-[var(--border)] bg-[var(--bg)] px-4 py-2 text-sm transition-all duration-200 placeholder:text-[var(--faint)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--primary)]/10 focus-visible:border-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-50",
            startContent && "pl-11",
            endContent && "pr-11",
            hasError && "border-[var(--error)] focus-visible:ring-[var(--error)]/10 focus-visible:border-[var(--error)]",
            className
          )}
          ref={ref}
          {...props}
        />
        {endContent && (
          <div className={`absolute right-3 flex items-center justify-center pointer-events-none text-muted-foreground z-10 ${endContentClassName || ''}`}>
            {endContent}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input" 

export { Input }
