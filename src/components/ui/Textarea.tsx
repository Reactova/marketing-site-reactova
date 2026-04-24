import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  minRows?: number
  hasError?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, minRows = 3, hasError, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background',
          'placeholder:text-muted-foreground',
          'transition-[color,box-shadow,border-color] duration-200',
          'focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          hasError &&
            'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/25',
          className
        )}
        ref={ref}
        rows={minRows}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
