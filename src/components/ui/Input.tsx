import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Input — updated for Tailwind v4, aligned with the light design system.
 * Uses CSS variables from globals.css: --bg, --border, --primary, --text,
 * --faint, --error. No dark-mode / glass overrides.
 */
const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Layout
        'flex h-11 w-full',
        // Shape
        'rounded-[9px]!',
        // Spacing
        'px-4! py-[13px]!',
        // Typography — matches .input-field in globals.css
        'font-inter text-sm text-[var(--text)]',
        // Surface
        'bg-[var(--bg)] border border-[var(--border)]',
        // Placeholder
        'placeholder:text-[var(--faint)]',
        // Transitions
        'transition-[border-color,box-shadow] duration-[180ms] ease-out',
        // Hover
        'hover:border-[var(--border-d)]',
        // Focus
        'outline-none',
        'focus-visible:border-[rgba(79,70,229,0.5)]',
        'focus-visible:shadow-[0_0_0_3px_rgba(79,70,229,0.08)]',
        // File input
        'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[var(--text)]',
        // Disabled
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[var(--border)]',
        // Invalid
        'aria-invalid:border-[rgba(220,38,38,0.5)]',
        'aria-invalid:focus-visible:border-[var(--error)]',
        'aria-invalid:focus-visible:shadow-[0_0_0_3px_rgba(220,38,38,0.08)]',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = 'Input'

type InputProps = React.ComponentProps<'input'>

export { Input, type InputProps }