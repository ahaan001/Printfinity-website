"use client";

import { motion } from "framer-motion";
import { Send, FileSearch, Printer, Package } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Send,
    title: "Submit Your Request",
    description: "Fill out our quick form with your project details: model, material, size, and deadline.",
  },
  {
    number: "02",
    icon: FileSearch,
    title: "We Review & Quote",
    description: "Our team evaluates your request and sends a detailed quote within 24 hours.",
  },
  {
    number: "03",
    icon: Printer,
    title: "Printing Begins",
    description: "Your model is printed with precision and care using calibrated FDM printers.",
  },
  {
    number: "04",
    icon: Package,
    title: "Delivered to You",
    description: "Quality-checked, securely packaged, and shipped to your doorstep across India.",
  },
];

export default function ProcessTimeline() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#111D35]/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white font-[Outfit] mb-4">
            How It Works
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#3B82F6] to-[#C0C8D8] rounded-full mx-auto mb-4" />
          <p className="text-[#C0C8D8] max-w-xl mx-auto">
            From idea to doorstep in four simple steps.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/30 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  className="relative flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  {/* Circle */}
                  <div className="relative mb-6 z-10">
                    <div className="w-20 h-20 rounded-full bg-[#111D35] border-2 border-[#3B82F6]/40 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                      <Icon size={28} className="text-[#3B82F6]" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#3B82F6] flex items-center justify-center text-white text-xs font-bold font-[JetBrains_Mono]">
                      {i + 1}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-white font-[Outfit] mb-2">{step.title}</h3>
                  <p className="text-[#C0C8D8] text-sm leading-relaxed max-w-xs">{step.description}</p>

                  {/* Mobile connector */}
                  {i < steps.length - 1 && (
                    <div className="lg:hidden w-px h-8 bg-gradient-to-b from-[#3B82F6]/40 to-transparent mt-6" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
