"use client";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export default function Card({ children, className = "", hoverable = false }: CardProps) {
  return (
    <div
      className={`
        bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl
        ${hoverable ? "transition-all duration-300 hover:border-white/20 hover:scale-[1.02] hover:shadow-[0_16px_64px_rgba(10,22,40,0.6)]" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
