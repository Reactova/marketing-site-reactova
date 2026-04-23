'use client'

import { forwardRef, LabelHTMLAttributes } from 'react'

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, required, className = '', ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={`
          block text-[13px] sm:text-[14px]
          text-secondary
          mb-2 sm:mb-2.5
          font-['Outfit',sans-serif] font-medium
          ${className}
        `}
        {...props}
      >
        {children}
        {required && <span className="text-primary ml-1">*</span>}
      </label>
    )
  }
)

Label.displayName = 'Label'

export default Label
