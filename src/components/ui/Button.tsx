'use client'

import { Button as HeroButton, type ButtonProps as HeroButtonProps } from '@heroui/react'
import { forwardRef, ReactNode } from 'react'

export interface ButtonProps extends Omit<HeroButtonProps, 'variant' | 'color' | 'size' | 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children?: ReactNode
}

const variantClasses = {
  primary: `
    bg-gradient-to-r from-accent to-[#e86a10]
    text-white font-bold
    shadow-lg shadow-accent/30
    hover:shadow-xl hover:shadow-accent/40
    hover:-translate-y-0.5
    active:translate-y-0
  `,
  secondary: `
    bg-gradient-to-r from-primary to-[#6558d4]
    text-white font-bold
    shadow-lg shadow-primary/30
    hover:shadow-xl hover:shadow-primary/40
    hover:-translate-y-0.5
    active:translate-y-0
  `,
  outline: `
    bg-transparent
    border-2 border-primary/50
    text-primary font-semibold
    hover:bg-primary/10 hover:border-primary
  `,
  ghost: `
    bg-transparent
    text-[#a0a0b8] font-medium
    hover:bg-primary/10 hover:text-primary
  `,
  danger: `
    bg-gradient-to-r from-error to-[#dc2626]
    text-white font-bold
    shadow-lg shadow-error/30
    hover:shadow-xl hover:shadow-error/40
    hover:-translate-y-0.5
    active:translate-y-0
  `,
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm rounded-lg min-h-8',
  md: 'px-6 py-3 text-base rounded-xl min-h-10',
  lg: 'px-8 py-4 text-lg rounded-xl min-h-12',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, className = '', children, isDisabled, ...props }, ref) => {
    return (
      <HeroButton
        ref={ref}
        isDisabled={isDisabled || isLoading}
        className={`
          inline-flex items-center justify-center gap-2
          font-['Syne',sans-serif]
          transition-all duration-300
          disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            {children}
          </>
        ) : (
          children
        )}
      </HeroButton>
    )
  }
)

Button.displayName = 'Button'

export default Button
