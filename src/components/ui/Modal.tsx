'use client'

import { forwardRef, ReactNode, useState } from 'react'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export interface ModalProps {
  title?: ReactNode
  footer?: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  onClose?: () => void
  children?: ReactNode
  className?: string
}

export function useDisclosure(defaultOpen = false) {
  const [isOpen, setOpen] = useState(defaultOpen)
  return {
    isOpen,
    onOpen: () => setOpen(true),
    onClose: () => setOpen(false),
    onToggle: () => setOpen((v) => !v),
    setOpen,
  }
}

const sizeClasses: Record<NonNullable<ModalProps['size']>, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      title,
      footer,
      children,
      size = 'md',
      isOpen,
      onOpenChange,
      onClose,
      className,
    },
    ref
  ) => {
    const handleOpenChange = (open: boolean) => {
      onOpenChange?.(open)
      if (!open) onClose?.()
    }

    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent
          ref={ref}
          className={cn(
            'gap-0 p-0 overflow-hidden',
            sizeClasses[size],
            className
          )}
        >
          {title != null && title !== '' && (
            <DialogHeader className="border-b border-border px-6 py-4 text-left">
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
          )}
          <div className="px-6 py-6 text-muted-foreground">{children}</div>
          {footer != null && (
            <DialogFooter className="border-t border-border px-6 py-4 sm:justify-end">
              {footer}
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    )
  }
)

Modal.displayName = 'Modal'

export interface ModalSubComponentProps {
  children?: ReactNode
  className?: string
}

export const ModalContent = ({ children }: ModalSubComponentProps) => <>{children}</>
ModalContent.displayName = 'ModalContent'

export const ModalHeader = ({ children, className = '' }: ModalSubComponentProps) => (
  <div className={cn('px-6 pt-6 pb-0', className)}>{children}</div>
)
ModalHeader.displayName = 'ModalHeader'

export const ModalBody = ({ children, className = '' }: ModalSubComponentProps) => (
  <div className={cn('px-6 py-6', className)}>{children}</div>
)
ModalBody.displayName = 'ModalBody'

export const ModalFooter = ({ children, className = '' }: ModalSubComponentProps) => (
  <div className={cn('px-6 pt-0 pb-6', className)}>{children}</div>
)
ModalFooter.displayName = 'ModalFooter'

export default Modal
