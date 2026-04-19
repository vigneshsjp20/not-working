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
    <div className="w-full min-h-[80px] flex items-center justify-center">
      {loading ? (
        <div className="flex items-center gap-3 glass-dark px-6 py-4 rounded-2xl text-secondary-foreground/60 animate-pulse w-full">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span className="text-sm font-medium">Generating educational insight...</span>
        </div>
      ) : hint ? (
        <div className="glass p-5 rounded-2xl border-secondary/30 bg-secondary/10 animate-in fade-in slide-in-from-top-2 w-full">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-secondary-foreground" />
            <span className="text-xs font-bold uppercase tracking-widest text-secondary-foreground/70">Global Insight</span>
          </div>
          <p className="text-sm italic font-medium leading-relaxed text-secondary-foreground">
            &ldquo;{hint}&rdquo;
          </p>
        </div>
      ) : (
        <div className="w-full h-full border-2 border-dashed border-secondary/20 rounded-2xl flex items-center justify-center">
          <p className="text-xs text-secondary-foreground/40 font-bold uppercase tracking-widest">Awaiting Hint...</p>
        </div>
      )}
    </div>
  );
}
