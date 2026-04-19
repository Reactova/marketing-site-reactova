'use client'

import { Switch as HeroSwitch, type SwitchProps as HeroSwitchProps } from '@heroui/react'
import { forwardRef } from 'react'

export interface SwitchProps extends Omit<HeroSwitchProps, 'size'> {
  size?: 'sm' | 'md' | 'lg'
  onValueChange?: (isSelected: boolean) => void
}

export const Switch = forwardRef<HTMLLabelElement, SwitchProps>(
  ({ size = 'md', className = '', onValueChange, onChange, ...props }, ref) => {
    const sizeClasses = {
      sm: '[&]:w-9 [&]:h-5 [&_span[data-slot="thumb"]]:w-4 [&_span[data-slot="thumb"]]:h-4',
      md: '[&]:w-11 [&]:h-6 [&_span[data-slot="thumb"]]:w-5 [&_span[data-slot="thumb"]]:h-5',
      lg: '[&]:w-14 [&]:h-7 [&_span[data-slot="thumb"]]:w-6 [&_span[data-slot="thumb"]]:h-6',
    }

    const handleChange = (isSelected: boolean) => {
      if (onValueChange) {
        onValueChange(isSelected)
      }
    }

    return (
      <HeroSwitch
        ref={ref}
        onChange={handleChange}
        className={`
          bg-[var(--border)]
          data-[selected=true]:bg-primary
          transition-all duration-200
          rounded-full
          ${sizeClasses[size]}
          ${className}
        `}
        {...props}
      />
    )
  }
)

Switch.displayName = 'Switch'

export default Switch
