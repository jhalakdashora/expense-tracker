import React, { memo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Z_INDEX } from '@/constants';

const Modal = memo(({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnBackdropClick = true,
  showCloseButton = true,
}) => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4',
  };

  // Handle ESC key press
  const handleEscKey = useCallback((e) => {
    if (e.key === 'Escape' && isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscKey]);

  if (!isOpen) return null;

  const handleBackdropClick = () => {
    if (closeOnBackdropClick) {
      onClose();
    }
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 overflow-y-auto"
      style={{ zIndex: Z_INDEX.MODAL }}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gradient-to-br from-gray-900/60 to-gray-900/80 backdrop-blur-sm transition-opacity duration-300"
        style={{ zIndex: Z_INDEX.MODAL_BACKDROP }}
        onClick={handleBackdropClick}
      />

      {/* Modal content */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={`relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-soft-xl w-full ${sizeClasses[size]} transform transition-all animate-slide-up`}
          style={{ zIndex: Z_INDEX.MODAL }}
          onClick={handleContentClick}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              {title && (
                <h3 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  {title}
                </h3>
              )}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-danger-600 transition-all duration-200 p-2 rounded-xl hover:bg-danger-50 hover:scale-110 active:scale-95"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="flex items-center justify-end gap-3 px-6 py-5 border-t border-gray-100 bg-gray-50/50 rounded-b-3xl">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'full']),
  closeOnBackdropClick: PropTypes.bool,
  showCloseButton: PropTypes.bool,
};

Modal.displayName = 'Modal';

export default Modal;

