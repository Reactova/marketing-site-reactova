'use client'

import { forwardRef, InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
  isDisabled?: boolean
  startContent?: React.ReactNode
  endContent?: React.ReactNode
  startContentClassName?: string
  endContentClassName?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ hasError, isDisabled, startContent, endContent, startContentClassName, endContentClassName, className = '', disabled, ...props }, ref) => {
    const isInputDisabled = isDisabled || disabled

    return (
      <div
        className={`relative flex items-center w-full bg-[rgba(15,15,26,0.8)] rounded-xl border transition-all duration-200 min-h-12 sm:min-h-[52px] !p-3 ${hasError ? 'border-[rgba(239,68,68,0.5)] hover:border-[rgba(239,68,68,0.7)] focus-within:border-[rgba(239,68,68,0.8)] focus-within:shadow-[0_0_12px_rgba(239,68,68,0.15)]' : 'border-[rgba(60,60,80,0.5)] hover:border-[rgba(124,106,247,0.4)] focus-within:border-[rgba(124,106,247,0.6)] focus-within:shadow-[0_0_16px_rgba(124,106,247,0.12)]'} ${isInputDisabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
        tabIndex={-1}
        onClick={(e) => {
          // Don't focus if already disabled
          if (isInputDisabled) return
          // Find the input element within this div and focus it
          const inputElement = (e.currentTarget.querySelector('input') as HTMLInputElement | null)
          if (inputElement) inputElement.focus()
        }}
      >
        {startContent && (
          <span className={`pl-3.5 sm:pl-4 shrink-0 text-[#7C6AF7] text-[15px] font-semibold ${startContentClassName}`}>
            {startContent}
          </span>
        )}
        <input
          ref={ref}
          disabled={isInputDisabled}
          className={`w-full h-full bg-transparent border-none outline-none text-[#E8E8F0] placeholder:text-[#5a5a70] font-['DM_Sans',sans-serif] text-[15px] py-3 sm:py-3.5 disabled:cursor-not-allowed ${startContent ? '!pl-2' : '!pl-3.5 sm:pl-4'} ${endContent ? 'pr-1.5' : 'pr-3.5 sm:pr-4'}`}
          {...props}
        />
        {endContent && (
          <span className={`pr-3.5 sm:pr-4 shrink-0 ${endContentClassName}`}>
            {endContent}
          </span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
