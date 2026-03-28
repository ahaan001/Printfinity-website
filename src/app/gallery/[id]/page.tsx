"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Clock, Layers, Ruler, Box } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { useModal } from "@/context/ModalContext";
import models from "@/data/models.json";

const ModelViewer = dynamic(() => import("@/components/three/ModelViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-[#0d1a2d] rounded-2xl flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-[#3B82F6] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function ModelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const model = models.find(m => m.id === id);
  const { openOrderModal } = useModal();

  if (!model) notFound();

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link href="/gallery" className="inline-flex items-center gap-2 text-[#C0C8D8] hover:text-white transition-colors text-sm">
            <ArrowLeft size={16} />
            Back to Gallery
          </Link>
        </motion.div>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 3D Viewer */}
          <motion.div
            className="lg:w-3/5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ModelViewer stlPath={model.file} modelCategory={model.category} autoRotate={true} height="60vh" />
            <p className="text-center text-[#C0C8D8]/40 text-xs mt-3">
              Click & drag to rotate • Scroll to zoom • Right-click to pan
            </p>
          </motion.div>

          {/* Info panel */}
          <motion.div
            className="lg:w-2/5 flex flex-col gap-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Title & category */}
            <div>
              <Badge variant="default" className="mb-3">{model.category}</Badge>
              <h1 className="text-3xl font-bold text-white font-[Outfit] mb-3">{model.name}</h1>
              <p className="text-[#C0C8D8] leading-relaxed">{model.description}</p>
            </div>

            {/* Print specs */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-semibold mb-4 font-[Outfit]">Print Specifications</h3>
              <div className="space-y-3">
                {[
                  { icon: Ruler, label: "Height", value: model.specs.height },
                  { icon: Clock, label: "Est. Print Time", value: model.specs.printTime },
                  { icon: Box, label: "Recommended Material", value: model.specs.material },
                  { icon: Layers, label: "Layer Height", value: model.specs.layerHeight },
                ].map(spec => {
                  const Icon = spec.icon;
                  return (
                    <div key={spec.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#C0C8D8] text-sm">
                        <Icon size={14} />
                        {spec.label}
                      </div>
                      <span className="text-white text-sm font-mono">{spec.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => openOrderModal(model.name)}
            >
              Order This Print
            </Button>

            {/* Source attribution */}
            <a
              href={model.sourceUrl === "#" ? undefined : model.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#C0C8D8]/50 hover:text-[#C0C8D8] text-xs transition-colors"
            >
              <ExternalLink size={12} />
              Model sourced via {model.source}
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
