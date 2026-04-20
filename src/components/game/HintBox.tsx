"use client";

import { Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface HintBoxProps {
  hint: string | null;
  loading: boolean;
  onGetHint: () => void;
  disabled: boolean;
}

export function HintBox({ hint, loading, onGetHint, disabled }: HintBoxProps) {
  return (
    <div className="w-full min-h-[45px] md:min-h-[80px] flex items-center justify-center">
      {loading ? (
        <div className="flex items-center gap-2 glass-dark px-3 py-2 md:px-6 md:py-4 rounded-xl md:rounded-2xl text-secondary-foreground/60 animate-pulse w-full">
          <Loader2 className="h-3 w-3 md:h-5 md:w-5 animate-spin text-primary shrink-0" />
          <span className="text-[10px] md:text-sm font-medium">Generating insight...</span>
        </div>
      ) : hint ? (
        <div className="glass p-2.5 md:p-5 rounded-xl md:rounded-2xl border-secondary/30 bg-secondary/10 animate-in fade-in slide-in-from-top-1 w-full">
          <div className="flex items-center gap-1.5 mb-1 md:mb-2">
            <Sparkles className="h-2.5 w-2.5 md:h-4 md:w-4 text-secondary-foreground shrink-0" />
            <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-secondary-foreground/70">Global Insight</span>
          </div>
          <p className="text-[10px] md:text-sm italic font-medium leading-tight md:leading-relaxed text-secondary-foreground px-1">
            &ldquo;{hint}&rdquo;
          </p>
        </div>
      ) : (
        <div className="w-full h-full min-h-[45px] border-2 border-dashed border-secondary/20 rounded-xl md:rounded-2xl flex items-center justify-center">
          <p className="text-[8px] text-secondary-foreground/40 font-bold uppercase tracking-widest">Awaiting Hint...</p>
        </div>
      )}
    </div>
  );
}
