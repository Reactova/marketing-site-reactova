'use client'

import { forwardRef, TextareaHTMLAttributes } from 'react'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean
  minRows?: number
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ hasError, minRows = 4, className = '', disabled, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        disabled={disabled}
        rows={minRows}
        aria-invalid={hasError || undefined}
        className={[
          // Layout & sizing
          'w-full resize-y min-h-[120px]',
          'py-3! px-3.5! mt-2!',

          // Typography
          "text-[14px]",
          'text-[#0E0E18] placeholder:text-[#A0A0BC]',

          // Background & shape
          'bg-white rounded-[9px]',

          // Border
          'border',
          hasError ? 'border-red-300' : 'border-[#E2E2EE]',

          // Hover
          hasError ? 'hover:border-red-400' : 'hover:border-[#CBCBDF]',

          // Focus
          'outline-none',
          hasError
            ? 'focus:border-red-400 focus:ring-[3px] focus:ring-red-100'
            : 'focus:border-[#4F46E5] focus:ring-[3px] focus:ring-[rgba(79,70,229,0.1)]',

          // Disabled
          disabled ? 'opacity-50 cursor-not-allowed bg-[#F7F7FB]' : '',

          'transition-all duration-150',

          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />
    )
  },
)

Textarea.displayName = 'Textarea'

export default Textarea
