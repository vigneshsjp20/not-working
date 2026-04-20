"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { countries, openers, CountryData } from "@/data/countries";
import { FlagCard } from "./FlagCard";
import { Timer } from "./Timer";
import { ScoreBoard } from "./ScoreBoard";
import { HintBox } from "./HintBox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RefreshCw, MapPin, CheckCircle2, XCircle, Zap, Shield, Flame, Play, Heart } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Difficulty = 'easy' | 'medium' | 'hard';

const DIFFICULTY_CONFIG = {
  easy: { time: 25, label: 'Easy', icon: Shield, color: 'text-green-500', level: 1 },
  medium: { time: 20, label: 'Medium', icon: Zap, color: 'text-amber-500', level: 2 },
  hard: { time: 10, label: 'Hard', icon: Flame, color: 'text-destructive', level: 3 },
};

export function FlagGame() {
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [currentCountry, setCurrentCountry] = useState<CountryData | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'answered' | 'finished'>('idle');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DIFFICULTY_CONFIG.medium.time);
  const [hint, setHint] = useState<string | null>(null);
  const [reward, setReward] = useState<string | null>(null);
  const [usedIndices, setUsedIndices] = useState<Set<string>>(new Set());

  const maxSeconds = DIFFICULTY_CONFIG[difficulty].time;

  const filteredCountries = useMemo(() => {
    const level = DIFFICULTY_CONFIG[difficulty].level;
    return countries.filter(c => c.difficulty === level);
  }, [difficulty]);

  const generateQuestion = useCallback(() => {
    if (usedIndices.size >= filteredCountries.length) {
      setGameState('finished');
      return;
    }

    const availableCountries = filteredCountries.filter(c => !usedIndices.has(c.code));
    const country = availableCountries[Math.floor(Math.random() * availableCountries.length)];
    
    const otherOptions: string[] = [];
    while (otherOptions.length < 3) {
      const opt = countries[Math.floor(Math.random() * countries.length)].name;
      if (opt !== country.name && !otherOptions.includes(opt)) {
        otherOptions.push(opt);
      }
    }

    const allOptions = [country.name, ...otherOptions].sort(() => Math.random() - 0.5);

    // Pick a random opener for the reward
    const randomOpener = openers[Math.floor(Math.random() * openers.length)];
    const cleanOpener = randomOpener.replace(/[✈️❤️🌍💕💖🌎✨]/g, '').trim();
    const fullReward = `${cleanOpener}… Now let's ${country.activity} ❤️✈️`;

    setCurrentCountry(country);
    setOptions(allOptions);
    setGameState('playing');
    setSelectedAnswer(null);
    setTimeLeft(DIFFICULTY_CONFIG[difficulty].time);
    setHint(country.hint);
    setReward(fullReward);
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
    let timer: NodeJS.Timeout;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      handleAnswer(null);
    }
    return () => clearInterval(timer);
  }, [timeLeft, gameState]);

  const handleAnswer = (answer: string | null) => {
    if (gameState !== 'playing') return;
    
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
      <div className="flex flex-col items-center justify-center p-4 md:p-8 glass w-full max-w-sm mx-auto rounded-[2rem] animate-in zoom-in-95 shadow-2xl border-white/50">
        <div className="mb-6 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary/20">
            <MapPin className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-black mb-2">Ready to Explore?</h2>
          <p className="text-sm text-muted-foreground px-4">Let’s travel the world together, one flag at a time Ree🌍❤️</p>
        </div>

        <div className="w-full space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-center block">Challenge Level</label>
            <Tabs 
              value={difficulty} 
              onValueChange={(v) => setDifficulty(v as Difficulty)}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 glass-dark p-1 rounded-xl h-14">
                {(Object.entries(DIFFICULTY_CONFIG) as [Difficulty, typeof DIFFICULTY_CONFIG['easy']][]).map(([key, config]) => (
                  <TabsTrigger key={key} value={key} className="text-[10px] font-bold rounded-lg data-[state=active]:bg-white/80 h-full">
                    <div className="flex flex-col items-center gap-0.5">
                      <config.icon className={cn("h-4 w-4", config.color)} />
                      <span>{config.label}</span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <Button onClick={startGame} className="w-full py-6 text-lg font-black rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all bg-primary text-primary-foreground">
            <Play className="mr-2 h-6 w-6 fill-current" /> START QUEST
          </Button>
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    return (
      <div className="flex flex-col items-center justify-center p-6 glass w-full max-w-sm mx-auto rounded-[2rem] animate-in zoom-in-95">
        <div className="mb-4 relative">
          <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-full" />
          <CheckCircle2 className="h-16 w-16 text-primary relative z-10" />
        </div>
        <h2 className="text-2xl font-black mb-1 text-center">Quest Complete!</h2>
        <p className="text-sm text-muted-foreground mb-6 text-center px-4">You mastered {score}/{totalQuestions} flags!</p>
        
        <div className="grid grid-cols-2 gap-4 w-full mb-8">
          <div className="glass-dark p-4 rounded-2xl text-center">
            <p className="text-[8px] uppercase font-bold text-muted-foreground mb-1">Accuracy</p>
            <p className="text-xl font-black">{totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0}%</p>
          </div>
          <div className="glass-dark p-4 rounded-2xl text-center">
            <p className="text-[8px] uppercase font-bold text-muted-foreground mb-1">Flags</p>
            <p className="text-xl font-black">{totalQuestions}</p>
          </div>
        </div>

        <Button onClick={restartGame} className="w-full py-6 text-lg font-black rounded-2xl shadow-xl hover:scale-[1.02] transition-all">
          <RefreshCw className="mr-2 h-5 w-5" /> NEW QUEST
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-between gap-2 animate-in fade-in duration-500 max-h-[100%]">
      <div className="flex flex-row justify-between items-center px-2 shrink-0 h-10">
        <div className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4 text-primary" />
          <h1 className="text-xs font-black tracking-tighter uppercase whitespace-nowrap">FlagMaster Quest</h1>
        </div>
        <ScoreBoard score={score} total={totalQuestions} />
      </div>

      <div className="flex-1 flex flex-col justify-center gap-3 overflow-hidden">
        <FlagCard 
          countryCode={currentCountry?.code || 'aq'} 
          isCorrect={gameState === 'answered' ? (selectedAnswer === currentCountry?.name) : null}
          className="shrink-0"
        />

        <div className="flex-1 flex flex-col gap-3 glass p-3 md:p-6 rounded-[2rem] border-white/50 overflow-hidden">
          <div className="shrink-0">
            <Timer 
              seconds={timeLeft} 
              maxSeconds={maxSeconds} 
              onTimeUp={() => handleAnswer(null)} 
              isActive={gameState === 'playing'}
            />
          </div>

          <div className="shrink-0">
            <HintBox 
              hint={hint} 
              loading={false} 
              onGetHint={() => {}} 
              disabled={gameState !== 'playing'} 
            />
          </div>

          <div className="grid grid-cols-2 gap-2 overflow-y-auto pr-1">
            {options.map((option) => {
              const isCorrect = option === currentCountry?.name;
              const isSelected = option === selectedAnswer;
              
              let buttonStyle = "glass-dark hover:bg-white/60 border-none justify-start text-left px-3 py-4 h-auto text-[11px] font-bold rounded-xl transition-all active:scale-95 text-[#9333ea] leading-tight";
              
              if (gameState === 'answered') {
                if (isCorrect) buttonStyle = cn(buttonStyle, "bg-primary text-primary-foreground ring-2 ring-primary/20 opacity-100");
                else if (isSelected) buttonStyle = cn(buttonStyle, "bg-destructive text-destructive-foreground opacity-90 ring-2 ring-destructive/20");
                else buttonStyle = cn(buttonStyle, "opacity-40 text-foreground");
              }

              return (
                <Button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  disabled={gameState === 'answered'}
                  className={buttonStyle}
                >
                  <div className="flex items-center w-full min-w-0">
                    <span className="flex-1 line-clamp-2">{option}</span>
                    {gameState === 'answered' && isCorrect && <CheckCircle2 className="h-3 w-3 ml-1 shrink-0" />}
                    {gameState === 'answered' && isSelected && !isCorrect && <XCircle className="h-3 w-3 ml-1 shrink-0" />}
                  </div>
                </Button>
              );
            })}
          </div>

          {gameState === 'answered' && (
            <div className="mt-auto space-y-2 animate-in slide-in-from-bottom-2 shrink-0">
              {selectedAnswer === currentCountry?.name && reward && (
                <div className="p-3 glass border-primary/30 bg-primary/5 rounded-xl text-center space-y-1">
                  <div className="flex items-center justify-center gap-1 text-primary">
                    <Heart className="h-3 w-3 fill-current" />
                    <span className="text-[8px] font-black uppercase tracking-widest">Adventure Reward</span>
                    <Heart className="h-3 w-3 fill-current" />
                  </div>
                  <p className="text-[11px] font-bold italic text-foreground leading-tight px-1">
                    &ldquo;{reward}&rdquo;
                  </p>
                </div>
              )}
              <Button 
                onClick={generateQuestion} 
                className="w-full bg-accent text-accent-foreground hover:bg-accent/80 py-5 text-sm font-black rounded-xl shadow-lg active:scale-95 transition-transform"
              >
                NEXT CHALLENGE
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
