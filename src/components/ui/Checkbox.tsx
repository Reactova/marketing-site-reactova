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
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
        {...props}
      >
        <HeroCheckbox.Control
          className={`
            inline-flex shrink-0 items-center justify-center
            rounded-[6px] border border-[var(--border)] bg-white
            text-[var(--muted)] transition-all duration-200
            hover:border-[var(--border-d)]
            group-data-[selected=true]:border-[var(--primary)] group-data-[selected=true]:bg-[var(--primary)]
            group-data-[selected=true]:text-white
            group-data-[selected=true]:shadow-[0_0_0_4px_rgba(79,70,229,0.1)]
            ${controlSize}
          `}
        >
          <HeroCheckbox.Indicator />
        </HeroCheckbox.Control>
        {showContent ? (
          <HeroCheckbox.Content
            className="text-[13px] text-[#3D3D5C] sm:text-[14px]"
          >
            {children}
          </HeroCheckbox.Content>
        ) : null}
      </HeroCheckbox>
    )
  },
)

CheckboxBase.displayName = 'Checkbox'

export const Checkbox = Object.assign(CheckboxBase, {
  Control: HeroCheckbox.Control,
  Indicator: HeroCheckbox.Indicator,
  Content: HeroCheckbox.Content,
})

export default Checkbox
