'use client'

import { Spinner as HeroSpinner, type SpinnerProps as HeroSpinnerProps } from '@heroui/react'
import { forwardRef } from 'react'

export interface SpinnerProps extends Omit<HeroSpinnerProps, 'color' | 'size'> {
  variant?: 'primary' | 'accent' | 'white'
  size?: 'sm' | 'md' | 'lg'
}

const variantClasses = {
  primary: 'text-primary',
  accent: 'text-accent',
  white: 'text-white',
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ variant = 'primary', size = 'md', className = '', ...props }, ref) => {
    return (
      <HeroSpinner
        ref={ref}
        className={`
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${className}
        `}
        {...props}
      />
    )
  }
)

Spinner.displayName = 'Spinner'

export default Spinner
