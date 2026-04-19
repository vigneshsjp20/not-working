"use client";

import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HintBoxProps {
  hint: string | null;
  loading: boolean;
  onGetHint: () => void;
  disabled: boolean;
}

export function HintBox({ hint, loading, onGetHint, disabled }: HintBoxProps) {
  return (
    <div className="w-full">
      {!hint ? (
        <Button
          onClick={onGetHint}
          disabled={disabled || loading}
          variant="secondary"
          className="w-full glass-dark hover:bg-secondary/20 border-none text-secondary-foreground group py-6 rounded-2xl"
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4 transition-transform group-hover:scale-125 group-hover:rotate-12" />
          )}
          Get AI Educational Hint
        </Button>
      ) : (
        <div className="glass p-4 rounded-2xl border-secondary/30 bg-secondary/10 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-secondary-foreground" />
            <span className="text-xs font-bold uppercase tracking-widest text-secondary-foreground/70">Educational Insight</span>
          </div>
          <p className="text-sm italic leading-relaxed text-secondary-foreground">
            &ldquo;{hint}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}
