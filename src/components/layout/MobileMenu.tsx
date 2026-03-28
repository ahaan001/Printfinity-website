"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { NAV_LINKS, WHATSAPP_URL } from "@/lib/constants";
import { useModal } from "@/context/ModalContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { openOrderModal } = useModal();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-[#0A1628] border-l border-white/10 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <Logo size={32} />
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-[#C0C8D8] hover:text-white hover:bg-white/10 transition-all"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-6 py-8">
              <ul className="space-y-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="block px-4 py-3 text-xl font-medium text-[#C0C8D8] hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Bottom actions */}
            <div className="px-6 pb-8 space-y-3 border-t border-white/10 pt-6">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366]/10 transition-all duration-200"
              >
                <MessageCircle size={20} />
                <span className="font-medium">Chat on WhatsApp</span>
              </a>
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => { openOrderModal(); onClose(); }}
              >
                Get a Quote
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
