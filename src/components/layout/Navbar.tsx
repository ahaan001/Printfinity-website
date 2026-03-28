"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import MobileMenu from "@/components/layout/MobileMenu";
import { NAV_LINKS, WHATSAPP_URL } from "@/lib/constants";
import { useModal } from "@/context/ModalContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { openOrderModal } = useModal();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-[#0A1628]/80 backdrop-blur-xl border-b border-white/5 shadow-[0_8px_32px_rgba(10,22,40,0.4)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <Logo size={36} className="transition-transform duration-300 group-hover:scale-110" />
              <span className="text-lg font-bold text-white font-[Outfit] tracking-wide hidden sm:block">
                Printfinity
              </span>
            </Link>

            {/* Center nav links */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    pathname === link.href
                      ? "text-white bg-white/10"
                      : "text-[#C0C8D8] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl text-[#25D366] hover:bg-[#25D366]/10 transition-all duration-200 hidden sm:flex"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle size={22} />
              </a>
              <Button
                variant="primary"
                size="sm"
                onClick={() => openOrderModal()}
                className="hidden sm:inline-flex"
              >
                Get a Quote
              </Button>
              <button
                className="lg:hidden p-2 rounded-xl text-[#C0C8D8] hover:text-white hover:bg-white/10 transition-all duration-200"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
