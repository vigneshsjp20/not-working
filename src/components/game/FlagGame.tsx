"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { countries } from "@/data/countries";
import { FlagCard } from "./FlagCard";
import { Timer } from "./Timer";
import { ScoreBoard } from "./ScoreBoard";
import { HintBox } from "./HintBox";
import { Button } from "@/components/ui/button";
import { educationalHintGeneration } from "@/ai/flows/educational-hint-generation";
import { cn } from "@/lib/utils";
import { RefreshCw, MapPin, CheckCircle2, XCircle, Zap, Shield, Flame } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Difficulty = 'easy' | 'medium' | 'hard';

const DIFFICULTY_CONFIG = {
  easy: { time: 15, label: 'Easy', icon: Shield, color: 'text-green-500' },
  medium: { time: 10, label: 'Medium', icon: Zap, color: 'text-amber-500' },
  hard: { time: 5, label: 'Hard', icon: Flame, color: 'text-destructive' },
};

export function FlagGame() {
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [currentCountry, setCurrentCountry] = useState<typeof countries[0] | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [gameState, setGameState] = useState<'playing' | 'answered' | 'finished'>('playing');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DIFFICULTY_CONFIG.medium.time);
  const [hint, setHint] = useState<string | null>(null);
  const [hintLoading, setHintLoading] = useState(false);
  const [usedIndices, setUsedIndices] = useState<Set<number>>(new Set());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const maxSeconds = DIFFICULTY_CONFIG[difficulty].time;

  const generateQuestion = useCallback(() => {
    if (usedIndices.size >= countries.length) {
      setGameState('finished');
      return;
    }

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * countries.length);
    } while (usedIndices.has(randomIndex));

    const country = countries[randomIndex];
    const otherOptions: string[] = [];
    while (otherOptions.length < 3) {
      const opt = countries[Math.floor(Math.random() * countries.length)].name;
      if (opt !== country.name && !otherOptions.includes(opt)) {
        otherOptions.push(opt);
      }
    }

    const allOptions = [country.name, ...otherOptions].sort(() => Math.random() - 0.5);

    setCurrentCountry(country);
    setOptions(allOptions);
    setGameState('playing');
    setSelectedAnswer(null);
    setTimeLeft(DIFFICULTY_CONFIG[difficulty].time);
    setHint(null);
    setUsedIndices(prev => {
      const next = new Set(prev);
      next.add(randomIndex);
      return next;
    });
  }, [usedIndices, difficulty]);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      handleAnswer(null);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLeft, gameState]);

  const handleAnswer = (answer: string | null) => {
    if (gameState !== 'playing') return;

    if (timerRef.current) clearInterval(timerRef.current);
    
    setSelectedAnswer(answer);
    setGameState('answered');
    setTotalQuestions(prev => prev + 1);

    if (answer === currentCountry?.name) {
      setScore(prev => prev + 1);
    }
  };

  const handleHint = async () => {
    if (!currentCountry || hint || hintLoading) return;
    setHintLoading(true);
    try {
      const result = await educationalHintGeneration({ countryName: currentCountry.name });
      setHint(result.hint);
    } catch (error) {
      setHint("This country has a unique history and vibrant culture.");
    } finally {
      setHintLoading(false);
    }
  };

  const restartGame = () => {
    setScore(0);
    setTotalQuestions(0);
    setUsedIndices(new Set());
    setGameState('playing');
    generateQuestion();
  };

  useEffect(() => {
    if (!currentCountry && usedIndices.size === 0) {
      generateQuestion();
    }
  }, [generateQuestion, currentCountry, usedIndices.size]);

  if (!currentCountry && gameState !== 'finished') return null;

  if (gameState === 'finished') {
    return (
      <div className="flex flex-col items-center justify-center p-8 glass max-w-lg mx-auto rounded-3xl animate-in zoom-in-95">
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full" />
          <CheckCircle2 className="h-20 w-20 text-primary relative z-10" />
        </div>
        <h2 className="text-3xl font-black mb-2 text-center">Quest Complete!</h2>
        <p className="text-muted-foreground mb-8 text-center">You mastered {score} out of {totalQuestions} flags. You're becoming a true Global Explorer!</p>
        
        <div className="grid grid-cols-2 gap-4 w-full mb-8">
          <div className="glass-dark p-4 rounded-2xl text-center">
            <p className="text-xs uppercase font-bold text-muted-foreground mb-1">Accuracy</p>
            <p className="text-2xl font-black">{totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0}%</p>
          </div>
          <div className="glass-dark p-4 rounded-2xl text-center">
            <p className="text-xs uppercase font-bold text-muted-foreground mb-1">Flags Seen</p>
            <p className="text-2xl font-black">{totalQuestions}</p>
          </div>
        </div>

        <Button onClick={restartGame} className="w-full py-8 text-lg font-black rounded-2xl shadow-xl hover:scale-[1.02] transition-transform">
          <RefreshCw className="mr-2 h-5 w-5" /> RESTART QUEST
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-black tracking-tighter uppercase">FlagMaster Quest</h1>
        </div>
        
        <Tabs 
          value={difficulty} 
          onValueChange={(v) => {
            setDifficulty(v as Difficulty);
            setUsedIndices(new Set()); // Restart session when difficulty changes
            restartGame();
          }}
          className="w-full md:w-auto"
        >
          <TabsList className="grid grid-cols-3 glass-dark p-1 rounded-xl">
            {(Object.entries(DIFFICULTY_CONFIG) as [Difficulty, typeof DIFFICULTY_CONFIG['easy']][]).map(([key, config]) => (
              <TabsTrigger key={key} value={key} className="text-xs font-bold rounded-lg data-[state=active]:bg-white/80">
                <config.icon className={cn("h-3 w-3 mr-1", config.color)} />
                {config.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <ScoreBoard score={score} total={totalQuestions} />
      </div>

      <div className="space-y-6">
        <FlagCard 
          countryCode={currentCountry?.code || 'aq'} 
          isCorrect={gameState === 'answered' ? (selectedAnswer === currentCountry?.name) : null}
        />

        <div className="space-y-6 glass p-6 rounded-3xl">
          <Timer 
            seconds={timeLeft} 
            maxSeconds={maxSeconds} 
            onTimeUp={() => handleAnswer(null)} 
            isActive={gameState === 'playing'}
          />

          <HintBox 
            hint={hint} 
            loading={hintLoading} 
            onGetHint={handleHint} 
            disabled={gameState !== 'playing'} 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {options.map((option) => {
              const isCorrect = option === currentCountry?.name;
              const isSelected = option === selectedAnswer;
              
              let buttonStyle = "glass-dark hover:bg-white/60 border-none justify-start text-left px-6 py-6 h-auto text-sm font-bold rounded-2xl transition-all active:scale-95 text-foreground";
              
              if (gameState === 'answered') {
                if (isCorrect) buttonStyle = "bg-primary text-primary-foreground border-none justify-start text-left px-6 py-6 h-auto text-sm font-bold rounded-2xl ring-4 ring-primary/20";
                else if (isSelected) buttonStyle = "bg-destructive text-destructive-foreground border-none justify-start text-left px-6 py-6 h-auto text-sm font-bold rounded-2xl opacity-80 ring-4 ring-destructive/20";
                else buttonStyle = "glass-dark border-none justify-start text-left px-6 py-6 h-auto text-sm font-bold rounded-2xl opacity-40 text-foreground";
              } else {
                // Default playing state text color
                buttonStyle = cn(buttonStyle, "text-primary hover:text-primary-foreground");
              }

              return (
                <Button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  disabled={gameState === 'answered'}
                  className={buttonStyle}
                >
                  <div className="flex items-center w-full">
                    <span className="flex-1">{option}</span>
                    {gameState === 'answered' && isCorrect && <CheckCircle2 className="h-5 w-5 ml-2" />}
                    {gameState === 'answered' && isSelected && !isCorrect && <XCircle className="h-5 w-5 ml-2" />}
                  </div>
                </Button>
              );
            })}
          </div>

          {gameState === 'answered' && (
            <Button 
              onClick={generateQuestion} 
              className="w-full bg-accent text-accent-foreground hover:bg-accent/80 py-6 font-black rounded-2xl shadow-lg mt-4 animate-in slide-in-from-bottom-2"
            >
              NEXT CHALLENGE
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
