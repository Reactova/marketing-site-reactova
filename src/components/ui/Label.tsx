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
          block text-sm
          text-[var(--text-2)]
          mb-2
          font-['Outfit',sans-serif] font-semibold
          tracking-tight
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
