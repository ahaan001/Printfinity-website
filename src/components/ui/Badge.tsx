"use client";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "gold" | "outline";
  className?: string;
}

export default function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const variants = {
    default: "bg-[#2A4A7F] text-[#E8ECF2]",
    gold: "bg-[#C9A84C] text-[#0A1628] font-semibold",
    outline: "border border-[#C0C8D8] text-[#C0C8D8] bg-transparent",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs tracking-wide ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
