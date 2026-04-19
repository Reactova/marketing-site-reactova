'use client'

import { forwardRef, InputHTMLAttributes } from 'react'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  isSelected?: boolean
  isDisabled?: boolean
  onValueChange?: (checked: boolean) => void
  children?: React.ReactNode
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ isSelected, isDisabled, onValueChange, children, className = '', checked, disabled, onChange, ...props }, ref) => {
    const isChecked = isSelected ?? checked
    const isCheckboxDisabled = isDisabled ?? disabled

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onValueChange) {
        onValueChange(e.target.checked)
      }
      if (onChange) {
        onChange(e)
      }
    }

    return (
      <label 
        className={`inline-flex items-center gap-2.5 sm:gap-3 cursor-pointer ${isCheckboxDisabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
      >
        <div className="relative shrink-0">
          <input
            ref={ref}
            type="checkbox"
            checked={isChecked}
            disabled={isCheckboxDisabled}
            onChange={handleChange}
            className="sr-only peer"
            {...props}
          />
          <div
            className={`w-[18px] h-[18px] sm:w-5 sm:h-5 rounded-md border flex items-center justify-center transition-all duration-200 ${isChecked ? 'bg-[#7C6AF7] border-[#7C6AF7] shadow-[0_0_10px_rgba(124,106,247,0.4)]' : 'bg-[rgba(15,15,26,0.8)] border-[rgba(60,60,80,0.5)] peer-hover:border-[rgba(124,106,247,0.4)]'}`}
          >
            {isChecked && (
              <svg
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </div>
        {children && (
          <span className="text-[13px] sm:text-[14px] text-[#c8c8d8] font-['DM_Sans',sans-serif]">
            {children}
          </span>
        )}
      </label>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
