'use client'

import { Separator, type SeparatorProps } from '@heroui/react'
import { forwardRef } from 'react'

export interface DividerProps extends Omit<SeparatorProps, 'orientation'> {
  orientation?: 'horizontal' | 'vertical'
}

export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  ({ orientation = 'horizontal', className = '', ...props }, ref) => {
    return (
      <Separator
        ref={ref}
        orientation={orientation}
        className={`
          border-none
          ${orientation === 'horizontal' 
            ? 'w-full h-px bg-border' 
            : 'h-full w-px bg-border'
          }
          ${className}
        `}
        {...props}
      />
    )
  }
)

Divider.displayName = 'Divider'

export default Divider
