"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: "md" | "lg" | "xl";
}

export default function Modal({ isOpen, onClose, children, title, size = "lg" }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  const sizeClasses = {
    md: "max-w-md",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      firstFocusableRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal content */}
          <motion.div
            className={`relative w-full ${sizeClasses[size]} bg-[#111D35]/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_32px_80px_rgba(10,22,40,0.8)] overflow-hidden max-h-[90vh] flex flex-col`}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Header */}
            {title && (
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 shrink-0">
                <h2 className="text-xl font-bold text-white font-[Outfit]">{title}</h2>
                <button
                  ref={firstFocusableRef}
                  onClick={onClose}
                  className="p-2 rounded-xl text-[#C0C8D8] hover:text-white hover:bg-white/10 transition-all duration-200"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>
            )}
            {!title && (
              <button
                ref={firstFocusableRef}
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-xl text-[#C0C8D8] hover:text-white hover:bg-white/10 transition-all duration-200"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            )}

            {/* Body */}
            <div className="overflow-y-auto flex-1">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
