import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    minRows?: number
  }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, minRows = 3, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[100px] w-full rounded-[10px] border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm transition-all duration-200 placeholder:text-[var(--faint)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/20 focus-visible:border-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        rows={minRows}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
