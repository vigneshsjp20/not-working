"use client";

import { Trophy, Target } from "lucide-react";

interface ScoreBoardProps {
  score: number;
  total: number;
}

export function ScoreBoard({ score, total }: ScoreBoardProps) {
  return (
    <div className="flex gap-4">
      <div className="glass px-4 py-2 rounded-2xl flex items-center gap-2">
        <Trophy className="h-4 w-4 text-accent animate-float" />
        <span className="text-sm font-bold">{score}</span>
      </div>
      <div className="glass px-4 py-2 rounded-2xl flex items-center gap-2">
        <Target className="h-4 w-4 text-primary" />
        <span className="text-sm font-bold">{total}</span>
      </div>
    </div>
  );
}
