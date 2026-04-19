'use client'

import {
  Modal as HeroModal,
  ModalDialog,
  ModalBackdrop,
  ModalContainer,
  ModalHeader as HeroModalHeader,
  ModalBody as HeroModalBody,
  ModalFooter as HeroModalFooter,
  ModalCloseTrigger,
  useOverlayState,
  type ModalProps as HeroModalProps,
} from '@heroui/react'
import { forwardRef, ReactNode } from 'react'

export interface ModalProps extends Omit<HeroModalProps, 'size'> {
  title?: ReactNode
  footer?: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  onClose?: () => void
}

export const useDisclosure = (defaultOpen = false) => {
  const state = useOverlayState({ defaultOpen })
  return {
    isOpen: state.isOpen,
    onOpen: state.open,
    onClose: state.close,
    onToggle: state.toggle,
    setOpen: state.setOpen,
  }
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ title, footer, children, size = 'md', isOpen, onOpenChange, onClose, ...props }, ref) => {
    const handleOpenChange = (open: boolean) => {
      if (onOpenChange) onOpenChange(open)
      if (!open && onClose) onClose()
    }

    return (
      <HeroModal isOpen={isOpen} onOpenChange={handleOpenChange} {...props}>
        <ModalBackdrop className="bg-black/60 backdrop-blur-sm" />
        <ModalContainer>
          <ModalDialog
            ref={ref}
            className={`
              bg-gradient-to-br from-[#1A1A2E] to-[#141424]
              border border-primary/15
              rounded-2xl
              shadow-2xl
              ${sizeClasses[size]}
            `}
          >
            <ModalCloseTrigger className="
              absolute top-4 right-4
              p-1.5 rounded-lg
              text-[#6B6B80]
              hover:bg-primary/10 hover:text-primary
              transition-colors
            " />
            
            {title && (
              <HeroModalHeader className="px-6 pt-6 pb-0 border-b border-border">
                <h3 className="font-['Syne',sans-serif] font-bold text-lg text-[#E8E8F0] pb-4">
                  {title}
                </h3>
              </HeroModalHeader>
            )}
            
            <HeroModalBody className="px-6 py-6 text-[#a0a0b8]">
              {children}
            </HeroModalBody>
            
            {footer && (
              <HeroModalFooter className="px-6 pt-0 pb-6 border-t border-border">
                <div className="pt-4 w-full">
                  {footer}
                </div>
              </HeroModalFooter>
            )}
          </ModalDialog>
        </ModalContainer>
      </HeroModal>
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
  <div className={`px-6 pt-6 pb-0 ${className}`}>{children}</div>
)
ModalHeader.displayName = 'ModalHeader'

export const ModalBody = ({ children, className = '' }: ModalSubComponentProps) => (
  <div className={`px-6 py-6 ${className}`}>{children}</div>
)
ModalBody.displayName = 'ModalBody'

export const ModalFooter = ({ children, className = '' }: ModalSubComponentProps) => (
  <div className={`px-6 pt-0 pb-6 ${className}`}>{children}</div>
)
ModalFooter.displayName = 'ModalFooter'

export default Modal
