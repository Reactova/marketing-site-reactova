'use client'

import {
  Card as HeroCard,
  CardHeader as HeroCardHeader,
  CardContent as HeroCardContent,
  CardFooter as HeroCardFooter,
  type CardProps as HeroCardProps,
} from '@heroui/react'
import { forwardRef, ReactNode } from 'react'

export interface CardProps extends Omit<HeroCardProps, 'variant'> {
  variant?: 'default' | 'bordered' | 'glass'
}

const variantClasses = {
  default: 'bg-surface border border-border',
  bordered: 'bg-surface border border-primary/20 hover:border-primary/40',
  glass: `
    bg-gradient-to-br from-[#1A1A2E]/95 to-[#141424]/98
    border border-primary/15
    backdrop-blur-xl
    shadow-2xl
  `,
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', className = '', children, ...props }, ref) => {
    return (
      <HeroCard
        ref={ref}
        className={`
          rounded-2xl
          transition-all duration-300
          ${variantClasses[variant]}
          ${className}
        `}
        {...props}
      >
        {children}
      </HeroCard>
    )
  }
)

Card.displayName = 'Card'

export interface CardSubComponentProps {
  children?: ReactNode
  className?: string
}

export const CardHeader = forwardRef<HTMLDivElement, CardSubComponentProps>(
  ({ children, className = '' }, ref) => (
    <HeroCardHeader ref={ref} className={`px-6 pt-6 pb-0 ${className}`}>
      {children}
    </HeroCardHeader>
  )
)
CardHeader.displayName = 'CardHeader'

export const CardBody = forwardRef<HTMLDivElement, CardSubComponentProps>(
  ({ children, className = '' }, ref) => (
    <HeroCardContent ref={ref} className={`px-6 py-6 ${className}`}>
      {children}
    </HeroCardContent>
  )
)
CardBody.displayName = 'CardBody'

export const CardFooter = forwardRef<HTMLDivElement, CardSubComponentProps>(
  ({ children, className = '' }, ref) => (
    <HeroCardFooter ref={ref} className={`px-6 pt-0 pb-6 ${className}`}>
      {children}
    </HeroCardFooter>
  )
)
CardFooter.displayName = 'CardFooter'

export default Card
