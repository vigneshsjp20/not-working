"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

interface TimerProps {
  seconds: number;
  maxSeconds: number;
  onTimeUp: () => void;
  isActive: boolean;
}

export function Timer({ seconds, maxSeconds, onTimeUp, isActive }: TimerProps) {
  const progress = (seconds / maxSeconds) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center px-1">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Time Remaining</span>
        <span className={cn(
          "text-sm font-black font-mono",
          seconds <= 3 ? "text-destructive animate-pulse" : "text-primary"
        )}>
          {seconds}s
        </span>
      </div>
      <Progress 
        value={progress} 
        className={cn(
          "h-2 transition-all duration-1000",
          seconds <= 3 ? "bg-destructive/20 [&>div]:bg-destructive" : ""
        )} 
      />
    </div>
  );
}

import { cn } from "@/lib/utils";
