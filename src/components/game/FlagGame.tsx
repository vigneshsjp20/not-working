"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { countries } from "@/data/countries";
import { FlagCard } from "./FlagCard";
import { Timer } from "./Timer";
import { ScoreBoard } from "./ScoreBoard";
import { HintBox } from "./HintBox";
import { Button } from "@/components/ui/button";
import { educationalHintGeneration } from "@/ai/flows/educational-hint-generation";
import { cn } from "@/lib/utils";
import { RefreshCw, MapPin, CheckCircle2, XCircle, Zap, Shield, Flame, Play } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Difficulty = 'easy' | 'medium' | 'hard';

const DIFFICULTY_CONFIG = {
  easy: { time: 25, label: 'Easy', icon: Shield, color: 'text-green-500', level: 1 },
  medium: { time: 20, label: 'Medium', icon: Zap, color: 'text-amber-500', level: 2 },
  hard: { time: 10, label: 'Hard', icon: Flame, color: 'text-destructive', level: 3 },
};

export function FlagGame() {
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [currentCountry, setCurrentCountry] = useState<typeof countries[0] | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'answered' | 'finished'>('idle');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DIFFICULTY_CONFIG.medium.time);
  const [hint, setHint] = useState<string | null>(null);
  const [hintLoading, setHintLoading] = useState(false);
  const [usedIndices, setUsedIndices] = useState<Set<string>>(new Set());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const maxSeconds = DIFFICULTY_CONFIG[difficulty].time;

  const filteredCountries = useMemo(() => {
    const level = DIFFICULTY_CONFIG[difficulty].level;
    return countries.filter(c => c.difficulty === level);
  }, [difficulty]);

  const handleHint = useCallback(async (countryName: string) => {
    setHintLoading(true);
    try {
      const result = await educationalHintGeneration({ countryName });
      setHint(result.hint);
    } catch (error) {
      setHint("This country has a unique history and vibrant culture.");
    } finally {
      setHintLoading(false);
    }
  }, []);

  const generateQuestion = useCallback(() => {
    if (usedIndices.size >= filteredCountries.length) {
      setGameState('finished');
      return;
    }

    let availableCountries = filteredCountries.filter(c => !usedIndices.has(c.code));
    
    const country = availableCountries[Math.floor(Math.random() * availableCountries.length)];
    
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
      next.add(country.code);
      return next;
    });
  }, [usedIndices, difficulty, filteredCountries]);

  const startGame = () => {
    setScore(0);
    setTotalQuestions(0);
    setUsedIndices(new Set());
    generateQuestion();
  };

  useEffect(() => {
    if (currentCountry && gameState === 'playing' && !hint && !hintLoading) {
      handleHint(currentCountry.name);
    }
  }, [currentCountry, gameState, hint, hintLoading, handleHint]);

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

  const restartGame = () => {
    setGameState('idle');
    setUsedIndices(new Set());
    setScore(0);
    setTotalQuestions(0);
  };

  if (gameState === 'idle') {
    return (
      <div className="flex flex-col items-center justify-center p-8 glass max-w-lg mx-auto rounded-3xl animate-in zoom-in-95">
        <div className="mb-8 text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary/20">
            <MapPin className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-3xl font-black mb-2">Ready to Explore?</h2>
          <p className="text-muted-foreground">Let’s travel the world together, one flag at a time Ree🌍❤️</p>
        </div>

        <div className="w-full space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Challenge Level</label>
            <Tabs 
              value={difficulty} 
              onValueChange={(v) => setDifficulty(v as Difficulty)}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 glass-dark p-1 rounded-xl h-14">
                {(Object.entries(DIFFICULTY_CONFIG) as [Difficulty, typeof DIFFICULTY_CONFIG['easy']][]).map(([key, config]) => (
                  <TabsTrigger key={key} value={key} className="text-xs font-bold rounded-lg data-[state=active]:bg-white/80 h-full">
                    <div className="flex flex-col items-center gap-1">
                      <config.icon className={cn("h-4 w-4", config.color)} />
                      <span>{config.label}</span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="bg-secondary/10 p-4 rounded-2xl border border-secondary/20">
            <p className="text-xs font-medium text-secondary-foreground text-center italic">
              {difficulty === 'easy' && "Famous & recognizable world flags (25s per flag)"}
              {difficulty === 'medium' && "A balanced mix of global nations (20s per flag)"}
              {difficulty === 'hard' && "Rare flags and smaller nations (10s per flag)"}
            </p>
          </div>

          <Button onClick={startGame} className="w-full py-8 text-lg font-black rounded-2xl shadow-xl hover:scale-[1.02] transition-transform bg-primary text-primary-foreground">
            <Play className="mr-2 h-6 w-6 fill-current" /> START QUEST
          </Button>
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    return (
      <div className="flex flex-col items-center justify-center p-8 glass max-w-lg mx-auto rounded-3xl animate-in zoom-in-95">
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full" />
          <CheckCircle2 className="h-20 w-20 text-primary relative z-10" />
        </div>
        <h2 className="text-3xl font-black mb-2 text-center">Quest Complete!</h2>
        <p className="text-muted-foreground mb-8 text-center">You mastered {score} out of {totalQuestions} flags on {DIFFICULTY_CONFIG[difficulty].label} mode.</p>
        
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
          <RefreshCw className="mr-2 h-5 w-5" /> NEW QUEST
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
          <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border", DIFFICULTY_CONFIG[difficulty].color, "border-current")}>
            {DIFFICULTY_CONFIG[difficulty].label}
          </span>
        </div>
        
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
            onGetHint={() => currentCountry && handleHint(currentCountry.name)} 
            disabled={gameState !== 'playing'} 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {options.map((option) => {
              const isCorrect = option === currentCountry?.name;
              const isSelected = option === selectedAnswer;
              
              let buttonStyle = "glass-dark hover:bg-white/60 border-none justify-start text-left px-6 py-6 h-auto text-sm font-bold rounded-2xl transition-all active:scale-95 text-secondary-foreground";
              
              if (gameState === 'answered') {
                if (isCorrect) buttonStyle = cn(buttonStyle, "bg-primary text-primary-foreground ring-4 ring-primary/20");
                else if (isSelected) buttonStyle = cn(buttonStyle, "bg-destructive text-destructive-foreground opacity-80 ring-4 ring-destructive/20");
                else buttonStyle = cn(buttonStyle, "opacity-40 text-foreground");
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
