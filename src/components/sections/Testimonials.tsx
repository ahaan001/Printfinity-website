"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Card from "@/components/ui/Card";

const testimonials = [
  {
    quote:
      "I ordered custom keychains from Printfinity to help label my house keys. It is a beautiful design and the product quality exceeded my expectations!",
    name: "Apurva K.",
    city: "Mumbai",
    stars: 5,
  },
  {
    quote:
      "I have already placed my second order! I loved the designs as well as the flexibility of sending my own CAD files. Best prices on the market.",
    name: "Ahaan K.",
    city: "Mumbai",
    stars: 5,
  },
  {
    quote:
      "Premium work. I have gotten custom designs done with even higher quality than more expensive competitors. Will definitely order again.",
    name: "Kimaya M.",
    city: "Mumbai",
    stars: 5,
  },
];


export default function Testimonials() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white font-[Outfit] mb-4">
            What Our Customers Say
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#C9A84C] to-[#3B82F6] rounded-full mx-auto" />
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Card className="p-8 h-full relative border-l-2 border-l-[#C9A84C]">
                <Quote size={28} className="text-[#C9A84C]/40 mb-4" />
                <p className="text-[#E8ECF2] italic leading-relaxed mb-6 text-sm">
                  "{t.quote}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold font-[Outfit]">{t.name}</p>
                    <p className="text-[#C0C8D8] text-xs">{t.city}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(t.stars)].map((_, s) => (
                      <Star key={s} size={14} className="text-[#C9A84C] fill-[#C9A84C]" />
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
