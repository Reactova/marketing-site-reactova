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
        className={`block text-[13px] sm:text-[14px] text-[#a0a0b8] !mb-2 !sm:mb-2.5 font-['DM_Sans',sans-serif] font-medium ${className}`}
        {...props}
      >
        {children}
        {required && <span className="text-[#7C6AF7] ml-1">*</span>}
      </label>
    )
  }
)

Label.displayName = 'Label'

export default Label
