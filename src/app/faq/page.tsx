"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MessageCircle } from "lucide-react";
import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import { WHATSAPP_URL } from "@/lib/constants";

const FAQ_DATA = [
  {
    category: "Ordering",
    items: [
      {
        question: "How do I place an order?",
        answer: "Click 'Get a Quote' anywhere on our site to open our quick order form. Fill in your contact details, describe or upload your model, choose your material and color, select a product, and submit. We'll get back to you with a quote within 24 hours.",
      },
      {
        question: "What file formats do you accept?",
        answer: "We accept STL, OBJ, and 3MF files , the three most common 3D printing formats. If you have a different format (like STEP, IGES, or Fusion 360 files), contact us on WhatsApp and we'll help you convert.",
      },
      {
        question: "Can I order without a 3D file?",
        answer: "Absolutely! You can choose a model from our gallery and order it directly, or submit a 'Custom Design' request describing what you want. Our team can source or adapt models based on your requirements.",
      },
      {
        question: "What is the minimum order quantity?",
        answer: "There is no minimum. We print single items all the time , perfect for prototypes, gifts, or one-of-a-kind creations. Bulk orders (10+) receive discounted pricing.",
      },
    ],
  },
  {
    category: "Printing",
    items: [
      {
        question: "What is FDM printing?",
        answer: "FDM (Fused Deposition Modeling) is the most popular 3D printing technology. A thermoplastic filament is heated and extruded layer by layer to build up your model. It's excellent for functional parts, prototypes, figurines, and decorative objects.",
      },
      {
        question: "What materials do you offer?",
        answer: "We currently offer PLA (great for most uses, eco-friendly, easy to finish), PETG (stronger, more flexible, food-safe options available), and ABS (impact-resistant, suitable for heat environments). Contact us if you need a specific material.",
      },
      {
        question: "What is the maximum print size?",
        answer: "Our standard build volume is 256×256×256mm. For larger objects, we can print in multiple parts and assemble them. There's no upper limit , we've handled prints up to 600mm tall by splitting them strategically.",
      },
      {
        question: "How accurate are the prints?",
        answer: "Our prints typically achieve ±0.2mm dimensional accuracy. High-resolution prints use 0.1mm layer height for smoother surfaces. Functional parts like gears and snap-fits are designed with appropriate tolerances.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    items: [
      {
        question: "Where do you deliver?",
        answer: "We deliver pan-India to all major cities and most pin codes. Delivery is via trusted courier partners with tracking. For remote locations, please contact us to confirm serviceability.",
      },
      {
        question: "How long does delivery take?",
        answer: "Total time = print time + shipping. Print time is 3–7 days depending on your tier. Shipping adds 2–5 days depending on your location. Metro cities typically receive orders in 5–8 business days total.",
      },
      {
        question: "How are prints packaged?",
        answer: "Every print is wrapped in bubble wrap, placed in a rigid box with foam padding, and sealed securely. Fragile or tall prints receive additional bracing. We've shipped hundreds of prints with zero damage reported.",
      },
    ],
  },
  {
    category: "Pricing",
    items: [
      {
        question: "How is pricing calculated?",
        answer: "Pricing is based on print volume (how much filament is used), print time, model complexity, material choice, and quantity. Our tiers give you a starting estimate , the final quote after reviewing your file is always exact.",
      },
      {
        question: "Do you offer bulk discounts?",
        answer: "Yes! Orders of 10 or more units of the same model receive a 10–20% discount depending on complexity. Contact us for a custom bulk quote.",
      },
    ],
  },
];

export default function FAQPage() {
  const [search, setSearch] = useState("");

  const filtered = search.trim()
    ? FAQ_DATA.map(cat => ({
        ...cat,
        items: cat.items.filter(
          item =>
            item.question.toLowerCase().includes(search.toLowerCase()) ||
            item.answer.toLowerCase().includes(search.toLowerCase())
        ),
      })).filter(cat => cat.items.length > 0)
    : FAQ_DATA;

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white font-[Outfit] mb-4">
            Frequently Asked Questions
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-[#3B82F6] to-[#C0C8D8] rounded-full mx-auto mb-4" />
          <p className="text-[#C0C8D8]">
            Everything you need to know about our 3D printing services.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          className="relative mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C0C8D8]/50" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white placeholder-[#C0C8D8]/40 focus:outline-none focus:border-[#3B82F6] transition-colors"
          />
        </motion.div>

        {/* FAQ categories */}
        <div className="space-y-10">
          {filtered.map((cat, ci) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
            >
              <h2 className="text-xl font-bold text-white font-[Outfit] mb-4 flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#3B82F6] flex items-center justify-center text-xs text-white font-bold shrink-0">
                  {ci + 1}
                </span>
                {cat.category}
              </h2>
              <Accordion items={cat.items} />
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-[#C0C8D8] py-12">
            No results found for "{search}". Try a different search term.
          </p>
        )}

        {/* CTA */}
        <motion.div
          className="text-center mt-16 p-8 bg-white/5 rounded-3xl border border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-bold text-white font-[Outfit] mb-2">Still have questions?</h3>
          <p className="text-[#C0C8D8] mb-6">We're happy to help. Chat with us directly on WhatsApp.</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="md" className="gap-2">
              <MessageCircle size={18} />
              Chat on WhatsApp
            </Button>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
