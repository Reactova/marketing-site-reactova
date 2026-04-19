'use client'

import {
  Checkbox as HeroCheckbox,
  type CheckboxProps as HeroCheckboxProps,
} from '@heroui/react'
import { Children, forwardRef, isValidElement, type ReactNode } from 'react'

export interface CheckboxProps extends Omit<HeroCheckboxProps, 'size' | 'children'> {
  size?: 'sm' | 'md' | 'lg'
  onValueChange?: (isSelected: boolean) => void
  disabled?: boolean
  children?: ReactNode
}

function hasRenderableChildren(children: ReactNode | undefined) {
  return Children.toArray(children).some((child) => {
    if (child == null || typeof child === 'boolean') return false
    if (typeof child === 'string') return child.trim() !== ''
    if (typeof child === 'number') return true
    return isValidElement(child)
  })
}

const CheckboxBase = forwardRef<HTMLLabelElement, CheckboxProps>(
  (
    {
      size = 'md',
      className = '',
      children,
      onValueChange,
      onChange,
      disabled,
      isDisabled,
      ...props
    },
    ref
  ) => {
    const controlSize = {
      sm: 'w-4 h-4 min-w-4 min-h-4',
      md: 'w-5 h-5 min-w-5 min-h-5',
      lg: 'w-6 h-6 min-w-6 min-h-6',
    }[size]

    const handleChange = (selected: boolean) => {
      onValueChange?.(selected)
      onChange?.(selected)
    }

    const showContent = hasRenderableChildren(children)

    return (
      <HeroCheckbox
        ref={ref}
        onChange={handleChange}
        isDisabled={disabled || isDisabled}
        className={`
          group inline-flex items-center gap-2.5 cursor-pointer
          disabled:opacity-60 disabled:cursor-not-allowed
          ${className}
        `}
        {...props}
      >
        <HeroCheckbox.Control
          className={`
            inline-flex shrink-0 items-center justify-center
            rounded-md border border-[rgba(60,60,80,0.5)] bg-[rgba(15,15,26,0.8)]
            text-[#c8c8d8] transition-all duration-200
            hover:border-primary/40
            group-data-[selected=true]:border-primary group-data-[selected=true]:bg-primary
            group-data-[selected=true]:text-white
            group-data-[selected=true]:shadow-[0_0_10px_rgba(124,106,247,0.4)]
            ${controlSize}
          `}
        >
          <HeroCheckbox.Indicator />
        </HeroCheckbox.Control>
        {showContent ? (
          <HeroCheckbox.Content
            className={`
              font-['DM_Sans',sans-serif] text-[13px] text-[#c8c8d8] sm:text-[14px]
            `}
          >
            {children}
          </HeroCheckbox.Content>
        ) : null}
      </HeroCheckbox>
    )
  }
)

CheckboxBase.displayName = 'Checkbox'

export const Checkbox = Object.assign(CheckboxBase, {
  Control: HeroCheckbox.Control,
  Indicator: HeroCheckbox.Indicator,
  Content: HeroCheckbox.Content,
})

export default Checkbox
