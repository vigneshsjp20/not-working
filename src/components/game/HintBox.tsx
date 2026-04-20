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
    <div className="w-full min-h-[50px] flex items-center justify-center">
      {loading ? (
        <div className="flex items-center gap-2 glass-dark px-4 py-3 rounded-xl text-secondary-foreground/60 animate-pulse w-full">
          <Loader2 className="h-4 w-4 animate-spin text-primary shrink-0" />
          <span className="text-xs font-medium">Generating insight...</span>
        </div>
      ) : hint ? (
        <div className="glass p-3 rounded-xl border-secondary/30 bg-secondary/10 animate-in fade-in slide-in-from-top-1 w-full">
          <div className="flex items-center gap-1 mb-1">
            <Sparkles className="h-3 w-3 text-secondary-foreground shrink-0" />
            <span className="text-[8px] font-bold uppercase tracking-widest text-secondary-foreground/70">Global Insight</span>
          </div>
          <p className="text-[11px] italic font-medium leading-tight text-secondary-foreground px-1 line-clamp-3">
            &ldquo;{hint}&rdquo;
          </p>
        </div>
      ) : (
        <div className="w-full h-full min-h-[50px] border-2 border-dashed border-secondary/20 rounded-xl flex items-center justify-center">
          <p className="text-[8px] text-secondary-foreground/40 font-bold uppercase tracking-widest">Awaiting Hint...</p>
        </div>
      )}
    </div>
  );
}
