'use client'

import { forwardRef, TextareaHTMLAttributes } from 'react'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean
  minRows?: number
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ hasError, minRows = 4, className = '', disabled, ...props }, ref) => {
    return (
      <div
        className={`
          relative w-full
          bg-[rgba(15,15,26,0.8)] rounded-xl !p-2.5
          border transition-all duration-200
          ${hasError 
            ? 'border-error/50 hover:border-error/70 focus-within:border-error/80 focus-within:shadow-[0_0_12px_rgba(239,68,68,0.15)]' 
            : 'border-[rgba(60,60,80,0.5)] hover:border-primary/40 focus-within:border-primary/60 focus-within:shadow-[0_0_16px_rgba(124,106,247,0.12)]'
          }
          ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
          ${className}
        `}
        tabIndex={-1}
        onClick={(e) => {
          if (disabled) return
          const textareaElement = e.currentTarget.querySelector('textarea') as HTMLTextAreaElement | null
          if (textareaElement) textareaElement.focus()
        }}
      >
        <textarea
          ref={ref}
          disabled={disabled}
          rows={minRows}
          className="
            w-full bg-transparent border-none outline-none
            text-[#E8E8F0] placeholder:text-[#5a5a70]
            font-['DM_Sans',sans-serif] text-[15px]
            py-3 sm:py-3.5 px-3.5 sm:px-4
            resize-y min-h-[120px]
            disabled:cursor-not-allowed
          "
          {...props}
        />
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export default Textarea
