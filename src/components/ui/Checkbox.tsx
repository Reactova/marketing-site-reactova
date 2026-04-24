'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import type { CheckedState } from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const sizeMap = {
  sm: 'h-4 w-4 rounded-[4px]',
  md: 'h-5 w-5 rounded-[5px]',
  lg: 'h-6 w-6 rounded-[6px]',
} as const

const iconSizeMap = {
  sm: 'h-3 w-3',
  md: 'h-3.5 w-3.5',
  lg: 'h-4 w-4',
} as const

export interface CheckboxProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    'checked' | 'onCheckedChange'
  > {
  /** @deprecated use `checked` — kept for HeroUI-style call sites */
  isSelected?: boolean
  checked?: boolean
  onValueChange?: (selected: boolean) => void
  onCheckedChange?: (checked: CheckedState) => void
  isDisabled?: boolean
  size?: keyof typeof sizeMap
  /** Ignored — Radix styling uses design tokens */
  variant?: string
}

const CheckboxBase = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    {
      className,
      isSelected,
      checked,
      onValueChange,
      onCheckedChange,
      disabled,
      isDisabled,
      size = 'md',
      variant: _variant,
      ...props
    },
    ref
  ) => {
    const resolvedChecked = checked ?? isSelected

    const handleCheckedChange = (value: CheckedState) => {
      onCheckedChange?.(value)
      onValueChange?.(value === true)
    }

    return (
      <CheckboxPrimitive.Root
        ref={ref}
        disabled={disabled ?? isDisabled}
        checked={resolvedChecked}
        onCheckedChange={handleCheckedChange}
        className={cn(
          'peer shrink-0 border border-input bg-background text-primary shadow-sm ring-offset-background transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
          sizeMap[size],
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          className={cn('flex items-center justify-center text-current')}
        >
          <Check className={iconSizeMap[size]} strokeWidth={3} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    )
  }
)
CheckboxBase.displayName = 'Checkbox'

export const Checkbox = CheckboxBase
export default Checkbox
