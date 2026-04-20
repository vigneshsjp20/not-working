"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface FlagCardProps {
  countryCode: string;
  className?: string;
  isCorrect?: boolean | null;
}

export function FlagCard({ countryCode, className, isCorrect }: FlagCardProps) {
  const flagUrl = `https://flagcdn.com/w640/${countryCode.toLowerCase()}.png`;

  return (
    <div className={cn(
      "glass p-2 sm:p-4 rounded-[2rem] transition-all duration-300 relative overflow-hidden flex items-center justify-center",
      isCorrect === true && "ring-4 ring-primary shadow-primary/20",
      isCorrect === false && "animate-shake ring-4 ring-destructive shadow-destructive/20",
      className
    )}>
      <div className="relative aspect-[3/2] w-full max-w-sm md:max-w-md shadow-2xl rounded-xl overflow-hidden border-2 sm:border-4 border-white/50">
        <Image
          src={flagUrl}
          alt="Country Flag"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
