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
    bg-[#4F46E5]
    text-white font-semibold
    shadow-[0_1px_3px_rgba(79,70,229,0.18),0_6px_20px_rgba(79,70,229,0.12)]
    hover:bg-[#3730A3]
    hover:shadow-[0_2px_6px_rgba(79,70,229,0.22),0_10px_28px_rgba(79,70,229,0.16)]
    hover:-translate-y-0.5
    active:translate-y-0
  `,
  secondary: `
    bg-[#7C3AED]
    text-white font-semibold
    shadow-[0_1px_3px_rgba(124,58,237,0.18),0_6px_20px_rgba(124,58,237,0.12)]
    hover:bg-[#6D28D9]
    hover:-translate-y-0.5
    active:translate-y-0
  `,
  outline: `
    bg-transparent
    border border-[#E2E2EE]
    text-[#0E0E18] font-medium
    hover:bg-[#F7F7FB] hover:border-[#CBCBDF]
  `,
  ghost: `
    bg-transparent
    text-[#6D6D8A] font-medium
    hover:bg-[#F7F7FB] hover:text-[#0E0E18]
  `,
  danger: `
    bg-[#DC2626]
    text-white font-semibold
    shadow-[0_1px_3px_rgba(220,38,38,0.18)]
    hover:bg-[#B91C1C]
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
          font-['Outfit',sans-serif]
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
