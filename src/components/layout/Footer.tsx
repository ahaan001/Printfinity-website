"use client";

import Link from "next/link";
import { MessageCircle, Mail, ExternalLink, Play } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { SITE_CONFIG, WHATSAPP_URL, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-[#060E1A] border-t border-white/5 rounded-t-[2rem] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Logo size={32} />
              <span className="text-lg font-bold text-white font-[Outfit]">Printfinity</span>
            </div>
            <p className="text-[#C0C8D8] text-sm leading-relaxed">
              {SITE_CONFIG.tagline}<br />
              Premium 3D printing services across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-[Outfit]">Quick Links</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#C0C8D8] text-sm hover:text-[#3B82F6] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-[Outfit]">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-2 text-[#C0C8D8] text-sm hover:text-[#3B82F6] transition-colors duration-200"
                >
                  <Mail size={16} />
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#C0C8D8] text-sm hover:text-[#25D366] transition-colors duration-200"
                >
                  <MessageCircle size={16} />
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>

          {/* Follow */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-[Outfit]">Follow Us</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={SITE_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#C0C8D8] text-sm hover:text-[#3B82F6] transition-colors duration-200"
                >
                  <ExternalLink size={16} />
                  {SITE_CONFIG.instagramHandle}
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#C0C8D8] text-sm hover:text-[#FF0000] transition-colors duration-200"
                >
                  <Play size={16} />
                  @Printfinity
                </a>
              </li>
            </ul>
            <p className="text-[#C0C8D8] text-xs mt-4 leading-relaxed">
              Follow us for behind-the-scenes prints, new model drops, and customer showcases.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#C0C8D8] text-sm">
            © 2025 Printfinity. All rights reserved.
          </p>
          <p className="text-[#C0C8D8] text-xs">
            Made with precision in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}
