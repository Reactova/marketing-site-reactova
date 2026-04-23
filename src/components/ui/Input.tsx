'use client'

import { forwardRef } from 'react'
import { Input as HeroInput } from '@heroui/react'
import type { ComponentPropsWithRef } from 'react'

// HeroUI's Input extends react-aria-components/Input which extends all standard
// HTML <input> attributes. We add our own hasError / startContent props on top.
export interface InputProps extends Omit<ComponentPropsWithRef<'input'>, 'size'> {
  /** Marks the field as invalid — red border + focus ring */
  hasError?: boolean
  /** Content rendered to the left of the input (e.g. "@" prefix) */
  startContent?: React.ReactNode
  startContentClassName?: string
  /** Content rendered to the right of the input */
  endContent?: React.ReactNode
  endContentClassName?: string
  /** HeroUI variant — "primary" (with shadow) or "secondary" (no shadow) */
  variant?: 'primary' | 'secondary'
  /** Stretch to fill its container */
  fullWidth?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      hasError,
      startContent,
      endContent,
      startContentClassName,
      endContentClassName,
      className = '',
      variant = 'secondary',
      fullWidth = true,
      disabled,
      ...rest
    },
    ref,
  ) => {
    // Build the className string we'll pass to HeroUI:
    // HeroUI applies it to the native <input> element via the `.input` slot.
    const inputClass = [
      // Base styling — fonts, sizing, padding
      "text-[14px] text-[#0E0E18] !p-2 border !border-black/20",
      'placeholder:text-[#A0A0BC]',
      'py-3',
      startContent ? '!pl-2' : '!pl-3.5',
      endContent ? '!pr-2' : '!pr-3.5',

      // Background / border — override HeroUI's defaults
      'bg-white',
      'rounded-[9px]',
      'border',
      hasError
        ? 'border-red-300'
        : 'border-[#E2E2EE]',

      // Hover state (react-aria sets data-hovered)
      hasError
        ? '[&[data-hovered]]:border-red-400'
        : '[&[data-hovered]]:border-[#CBCBDF]',

      // Focus visible state (react-aria sets data-focus-visible)
      hasError
        ? '[&[data-focus-visible]]:border-red-400 [&[data-focus-visible]]:ring-[3px] [&[data-focus-visible]]:ring-red-100'
        : '[&[data-focus-visible]]:border-[#4F46E5] [&[data-focus-visible]]:ring-[3px] [&[data-focus-visible]]:ring-[rgba(79,70,229,0.1)] [&[data-focus-visible]]:outline-none',

      // Disabled state
      disabled ? 'opacity-50 cursor-not-allowed bg-[#F7F7FB]' : '',

      // Transition
      'transition-all duration-150',

      // Invalid ARIA state
      '[&[aria-invalid]]:border-red-300',

      className,
    ]
      .filter(Boolean)
      .join(' ')

    // If there's a startContent or endContent, we need to wrap in a relative div
    if (startContent || endContent) {
      return (
        <div className="relative flex items-center w-full">
          {startContent && (
            <span
              className={[
                'absolute left-0 flex items-center h-full pl-3.5',
                'text-[13px] font-medium text-[#6D6D8A]',
                'border-r border-[#e2e2ee]! pr-2.5 mr-0 select-none',
                startContentClassName ?? '',
              ].join(' ')}
            >
              {startContent}
            </span>
          )}
          <HeroInput
            ref={ref}
            variant={variant}
            fullWidth={fullWidth}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            className={[inputClass, startContent ? '!pl-12' : '', endContent ? '!pr-10' : ''].join(' ')}
            {...rest}
          />
          {endContent && (
            <span
              className={[
                'absolute right-0 flex items-center h-full pr-3.5',
                'text-[13px] text-[#6D6D8A]',
                endContentClassName ?? '',
              ].join(' ')}
            >
              {endContent}
            </span>
          )}
        </div>
      )
    }

    return (
      <HeroInput
        ref={ref}
        variant={variant}
        fullWidth={fullWidth}
        disabled={disabled}
        aria-invalid={hasError || undefined}
        className={inputClass}
        {...rest}
      />
    )
  },
)

Input.displayName = 'Input'

export default Input
