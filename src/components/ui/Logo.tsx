"use client";

import Image from "next/image";

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 40, className = "" }: LogoProps) {
  return (
    <Image
      src="/images/logo.png"
      alt="Printfinity"
      width={size}
      height={size}
      className={className}
    />
  );
}
