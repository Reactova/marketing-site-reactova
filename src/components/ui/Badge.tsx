'use client'

import { Badge as HeroBadge, type BadgeProps as HeroBadgeProps } from '@heroui/react'
import { forwardRef, ReactNode } from 'react'

export interface BadgeProps extends Omit<HeroBadgeProps, 'variant' | 'color'> {
  variant?: 'primary' | 'accent' | 'success' | 'error' | 'default'
  dot?: boolean
  children?: ReactNode
}

const variantClasses = {
  primary: {
    base: 'bg-primary/10 border-primary/30 text-primary',
    dot: 'bg-primary',
  },
  accent: {
    base: 'bg-accent/10 border-accent/30 text-accent',
    dot: 'bg-accent',
  },
  success: {
    base: 'bg-success/10 border-success/30 text-success',
    dot: 'bg-success',
  },
  error: {
    base: 'bg-error/10 border-error/30 text-error',
    dot: 'bg-error',
  },
  default: {
    base: 'bg-[#6B6B80]/10 border-[#6B6B80]/30 text-[#6B6B80]',
    dot: 'bg-[#6B6B80]',
  },
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'primary', dot = false, children, className = '', ...props }, ref) => {
    const styles = variantClasses[variant]

    return (
      <span
        ref={ref}
        className={`
          inline-flex items-center gap-2
          px-4 py-1.5
          rounded-full border
          text-xs font-medium tracking-wide
          ${styles.base}
          ${className}
        `}
        {...props}
      >
        {dot && <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />}
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export default Badge
