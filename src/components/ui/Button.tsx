"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-medium rounded-2xl transition-all duration-300 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-[#3B82F6] text-white hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] active:scale-100",
      secondary:
        "bg-transparent border border-[#C0C8D8] text-[#C0C8D8] hover:bg-white/5 hover:border-white hover:text-white hover:scale-105 active:scale-100",
      ghost:
        "bg-transparent text-[#C0C8D8] hover:bg-white/5 hover:text-white active:bg-white/10",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm gap-1.5",
      md: "px-6 py-3 text-base gap-2",
      lg: "px-8 py-4 text-lg gap-2.5",
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
