'use client'

import { Checkbox as HeroCheckbox, type CheckboxProps as HeroCheckboxProps } from '@heroui/react'
import { forwardRef } from 'react'

export interface CheckboxProps extends Omit<HeroCheckboxProps, 'size'> {
  size?: 'sm' | 'md' | 'lg'
  onValueChange?: (isSelected: boolean) => void
  disabled?: boolean
}

export const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(
  ({ size = 'md', className = '', children, onValueChange, disabled, isDisabled, ...props }, ref) => {
    const sizeClasses = {
      sm: '[&_span[data-slot="control"]]:w-4 [&_span[data-slot="control"]]:h-4',
      md: '[&_span[data-slot="control"]]:w-5 [&_span[data-slot="control"]]:h-5',
      lg: '[&_span[data-slot="control"]]:w-6 [&_span[data-slot="control"]]:h-6',
    }

    return (
      <HeroCheckbox
        ref={ref}
        onChange={onValueChange}
        isDisabled={disabled || isDisabled}
        className={`
          inline-flex items-center gap-2.5 cursor-pointer
          disabled:opacity-60 disabled:cursor-not-allowed
          [&_span[data-slot="control"]]:rounded-md
          [&_span[data-slot="control"]]:border
          [&_span[data-slot="control"]]:bg-[rgba(15,15,26,0.8)]
          [&_span[data-slot="control"]]:border-[rgba(60,60,80,0.5)]
          [&_span[data-slot="control"]]:transition-all
          [&_span[data-slot="control"]]:duration-200
          hover:[&_span[data-slot="control"]]:border-primary/40
          [&[data-selected=true]_span[data-slot="control"]]:bg-primary
          [&[data-selected=true]_span[data-slot="control"]]:border-primary
          [&[data-selected=true]_span[data-slot="control"]]:shadow-[0_0_10px_rgba(124,106,247,0.4)]
          [&_span[data-slot="label"]]:text-[13px]
          [&_span[data-slot="label"]]:sm:text-[14px]
          [&_span[data-slot="label"]]:text-[#c8c8d8]
          [&_span[data-slot="label"]]:font-['DM_Sans',sans-serif]
          ${sizeClasses[size]}
          ${className}
        `}
        {...props}
      >
        {children}
      </HeroCheckbox>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
