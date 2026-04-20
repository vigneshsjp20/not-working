"use client";

import { Trophy, Target } from "lucide-react";

interface ScoreBoardProps {
  score: number;
  total: number;
}

export function ScoreBoard({ score, total }: ScoreBoardProps) {
  return (
    <div className="flex gap-2 md:gap-4">
      <div className="glass px-2 md:px-4 py-1 md:py-2 rounded-xl flex items-center gap-1.5 md:gap-2">
        <Trophy className="h-3 w-3 md:h-4 md:w-4 text-accent animate-float" />
        <span className="text-xs md:text-sm font-bold">{score}</span>
      </div>
      <div className="glass px-2 md:px-4 py-1 md:py-2 rounded-xl flex items-center gap-1.5 md:gap-2">
        <Target className="h-3 w-3 md:h-4 md:w-4 text-primary" />
        <span className="text-xs md:text-sm font-bold">{total}</span>
      </div>
    </div>
  );
}
