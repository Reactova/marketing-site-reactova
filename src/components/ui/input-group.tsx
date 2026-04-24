'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { type ButtonProps, buttonVariants } from '@/components/ui/Button'

/**
 * shadcn/ui Input Group — composed control with addons (icons, text, buttons).
 * Place `InputGroupInput` first in the DOM; use `align` on addons for layout.
 *
 * @see https://ui.shadcn.com/docs/components/input-group
 */
function InputGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        'flex h-11 w-full min-w-0 items-stretch overflow-hidden rounded-lg border border-[var(--border-d)] bg-background shadow-sm transition-[color,box-shadow,border-color]',
        'hover:border-muted-foreground/35',
        'has-[data-slot=input-group-control]:focus-within:border-ring has-[data-slot=input-group-control]:focus-within:ring-2 has-[data-slot=input-group-control]:focus-within:ring-ring/35 has-[data-slot=input-group-control]:focus-within:ring-offset-0',
        'has-[[data-slot=input-group-control][aria-invalid=true]]:border-destructive has-[[data-slot=input-group-control][aria-invalid=true]]:ring-destructive/25',
        className
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  'text-muted-foreground flex cursor-text select-none items-center justify-center gap-2 text-sm font-medium [&>svg:not([class*="size-"])]:size-4',
  {
    variants: {
      align: {
        'inline-start':
          'order-first border-r border-input bg-muted/40 px-3 has-[>button]:pl-2',
        'inline-end':
          'order-last border-l border-input px-2 pr-3 has-[>button]:pr-2',
        'block-start':
          'order-first w-full justify-start border-b border-input px-3 py-2',
        'block-end':
          'order-last w-full justify-start border-t border-input px-3 py-2',
      },
    },
    defaultVariants: {
      align: 'inline-start',
    },
  }
)

function InputGroupAddon({
  className,
  align = 'inline-start',
  onClick,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="presentation"
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('button, a, [role="button"]')) {
          return
        }
        e.currentTarget
          .closest('[data-slot="input-group"]')
          ?.querySelector<HTMLElement>('[data-slot="input-group-control"]')
          ?.focus()
        onClick?.(e)
      }}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva(
  'inline-flex items-center gap-1.5 text-sm shadow-none',
  {
    variants: {
      size: {
        xs: 'h-7 rounded-md px-2 text-xs [&>svg]:size-3.5',
        sm: 'h-8 rounded-md px-2.5 [&>svg]:size-4',
        'icon-xs': 'size-7 rounded-md p-0',
        'icon-sm': 'size-8 rounded-md p-0',
      },
    },
    defaultVariants: {
      size: 'xs',
    },
  }
)

function InputGroupButton({
  className,
  type = 'button',
  variant = 'ghost',
  size = 'xs',
  ...props
}: React.ComponentProps<'button'> &
  Pick<ButtonProps, 'variant'> &
  VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <button
      type={type}
      className={cn(
        buttonVariants({ variant, size: 'sm' }),
        inputGroupButtonVariants({ size }),
        className
      )}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'text-muted-foreground flex items-center text-sm [&_svg]:size-4',
        className
      )}
      {...props}
    />
  )
}

const InputGroupInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      data-slot="input-group-control"
      className={cn(
        'flex h-full min-h-0 min-w-0 flex-1 border-0 bg-transparent px-3! py-2! text-sm text-foreground shadow-none outline-none',  
        'placeholder:text-muted-foreground',
        'focus-visible:ring-0 focus-visible:ring-offset-0',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
})
InputGroupInput.displayName = 'InputGroupInput'

const InputGroupTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      data-slot="input-group-control"
      className={cn(
        'flex min-h-[100px] w-full flex-1 resize-y border-0 bg-transparent px-3! py-2! text-sm text-foreground shadow-none outline-none',
        'placeholder:text-muted-foreground',
        'focus-visible:ring-0 focus-visible:ring-offset-0',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
})
InputGroupTextarea.displayName = 'InputGroupTextarea'

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
