'use client'

import * as React from 'react'
import { Label } from '@/components/ui/Label'
import { Input } from '@/components/ui/Input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group'
import { cn } from '@/lib/utils'

export interface FormFieldProps extends React.ComponentProps<'input'> {
  /** Label text shown above the input. If omitted, no label is rendered. */
  label?: string
  /** Appends a red asterisk to the label when true. */
  required?: boolean
  /**
   * Inline error message displayed below the input.
   * Sets `aria-invalid` and error styling on the control / group.
   */
  errorMessage?: string
  /** Optional extra class applied to the outer wrapper div. */
  wrapperClassName?: string
  /** Optional leading addon (icon or text). Uses shadcn `InputGroup` composition. */
  startContent?: React.ReactNode
  /** Optional trailing addon (e.g. password visibility toggle). */
  endContent?: React.ReactNode
  startContentClassName?: string
  endContentClassName?: string
  /** Highlights the field in an error state (e.g. validation). */
  hasError?: boolean
}

/**
 * Label + shadcn `Input` or `InputGroup` + optional error line.
 */
export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      required,
      errorMessage,
      wrapperClassName,
      id,
      hasError,
      className,
      startContent,
      endContent,
      startContentClassName,
      endContentClassName,
      ...inputProps
    },
    ref
  ) => {
    const fieldId =
      id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)
    const isError = hasError || !!errorMessage
    const adorned = Boolean(startContent || endContent)

    const describedBy =
      errorMessage && fieldId ? `${fieldId}-error` : undefined

    const a11y = {
      id: fieldId,
      'aria-invalid': isError || undefined,
      'aria-describedby': describedBy,
    } as const

    return (
      <div className={cn('flex flex-col gap-1.5', wrapperClassName)}>
        {label && fieldId && (
          <Label htmlFor={fieldId} required={required}>
            {label}
          </Label>
        )}

        {adorned ? (
          <InputGroup
            className={cn(
              'hover:border-muted-foreground/30',
              isError &&
                'border-destructive has-[data-slot=input-group-control]:focus-within:border-destructive has-[data-slot=input-group-control]:focus-within:ring-destructive/25'
            )}
          >
            <InputGroupInput
              ref={ref}
              {...inputProps}
              {...a11y}
              className={cn(className)}
            />
            {startContent ? (
              <InputGroupAddon
                align="inline-start"
                className={startContentClassName}
              >
                {typeof startContent === 'string' ? (
                  <InputGroupText>{startContent}</InputGroupText>
                ) : (
                  startContent
                )}
              </InputGroupAddon>
            ) : null}
            {endContent ? (
              <InputGroupAddon
                align="inline-end"
                className={endContentClassName}
              >
                {endContent}
              </InputGroupAddon>
            ) : null}
          </InputGroup>
        ) : (
          <Input
            ref={ref}
            {...inputProps}
            {...a11y}
            className={cn('hover:border-muted-foreground/30', className)}
          />
        )}

        {errorMessage && fieldId ? (
          <p
            id={`${fieldId}-error`}
            role="alert"
            className="text-xs font-medium leading-tight text-destructive"
          >
            {errorMessage}
          </p>
        ) : null}
      </div>
    )
  }
)
FormField.displayName = 'FormField'
