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
    const fullReward = `${randomOpener.replace('✈️', '').replace('❤️', '').replace('🌍', '').replace('💕', '').replace('💖', '').replace('🌎', '').replace('✨', '').trim()}… Now let's ${country.activity} ❤️✈️`;

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
      <div className="flex flex-col items-center justify-center p-4 md:p-8 glass w-full max-w-lg mx-auto rounded-[2rem] animate-in zoom-in-95 shadow-2xl border-white/50">
        <div className="mb-4 md:mb-8 text-center">
          <div className="w-12 h-12 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-primary/20">
            <MapPin className="h-6 w-6 md:h-10 md:w-10 text-primary" />
          </div>
          <h2 className="text-xl md:text-3xl font-black mb-1">Ready to Explore?</h2>
          <p className="text-[10px] md:text-base text-muted-foreground">Let’s travel the world together, one flag at a time Ree🌍❤️</p>
        </div>

        <div className="w-full space-y-4 md:space-y-6">
          <div className="space-y-1 text-center md:text-left">
            <label className="text-[8px] md:text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Challenge Level</label>
            <Tabs 
              value={difficulty} 
              onValueChange={(v) => setDifficulty(v as Difficulty)}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 glass-dark p-0.5 md:p-1 rounded-xl h-10 md:h-16">
                {(Object.entries(DIFFICULTY_CONFIG) as [Difficulty, typeof DIFFICULTY_CONFIG['easy']][]).map(([key, config]) => (
                  <TabsTrigger key={key} value={key} className="text-[9px] md:text-xs font-bold rounded-lg data-[state=active]:bg-white/80 h-full">
                    <div className="flex flex-col items-center gap-0.5">
                      <config.icon className={cn("h-3 w-3 md:h-4 md:w-4", config.color)} />
                      <span>{config.label}</span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <Button onClick={startGame} className="w-full py-4 md:py-8 text-sm md:text-lg font-black rounded-xl md:rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all bg-primary text-primary-foreground">
            <Play className="mr-2 h-4 w-4 md:h-6 md:w-6 fill-current" /> START QUEST
          </Button>
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    return (
      <div className="flex flex-col items-center justify-center p-4 md:p-8 glass w-full max-w-lg mx-auto rounded-[2rem] animate-in zoom-in-95">
        <div className="mb-4 relative">
          <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-full" />
          <CheckCircle2 className="h-10 w-10 md:h-20 md:w-20 text-primary relative z-10" />
        </div>
        <h2 className="text-lg md:text-3xl font-black mb-1 text-center">Quest Complete!</h2>
        <p className="text-[10px] md:text-base text-muted-foreground mb-4 text-center px-4">You mastered {score}/{totalQuestions} flags!</p>
        
        <div className="grid grid-cols-2 gap-2 md:gap-4 w-full mb-6">
          <div className="glass-dark p-2 md:p-4 rounded-xl text-center">
            <p className="text-[7px] uppercase font-bold text-muted-foreground mb-0.5">Accuracy</p>
            <p className="text-base md:text-2xl font-black">{totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0}%</p>
          </div>
          <div className="glass-dark p-2 md:p-4 rounded-xl text-center">
            <p className="text-[7px] uppercase font-bold text-muted-foreground mb-0.5">Flags</p>
            <p className="text-base md:text-2xl font-black">{totalQuestions}</p>
          </div>
        </div>

        <Button onClick={restartGame} className="w-full py-4 md:py-8 text-sm md:text-lg font-black rounded-xl shadow-xl hover:scale-[1.02] transition-all">
          <RefreshCw className="mr-2 h-4 w-4" /> NEW QUEST
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full h-full max-w-2xl mx-auto flex flex-col justify-center gap-1.5 md:gap-6 animate-in fade-in duration-500 overflow-hidden px-1">
      <div className="flex flex-row justify-between items-center px-1 shrink-0">
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3 md:h-5 md:w-5 text-primary" />
          <h1 className="text-[10px] md:text-xl font-black tracking-tighter uppercase whitespace-nowrap">FlagMaster Quest</h1>
        </div>
        <ScoreBoard score={score} total={totalQuestions} />
      </div>

      <div className="flex-1 flex flex-col justify-center min-h-0 gap-1.5 md:gap-6">
        <FlagCard 
          countryCode={currentCountry?.code || 'aq'} 
          isCorrect={gameState === 'answered' ? (selectedAnswer === currentCountry?.name) : null}
          className="p-1 md:p-4 shrink-0"
        />

        <div className="space-y-1.5 md:space-y-6 glass p-2 md:p-6 rounded-[1.5rem] md:rounded-[2.5rem] border-white/50 overflow-hidden flex flex-col justify-center">
          <Timer 
            seconds={timeLeft} 
            maxSeconds={maxSeconds} 
            onTimeUp={() => handleAnswer(null)} 
            isActive={gameState === 'playing'}
          />

          <HintBox 
            hint={hint} 
            loading={false} 
            onGetHint={() => {}} 
            disabled={gameState !== 'playing'} 
          />

          <div className="grid grid-cols-2 gap-1.5 md:gap-3 shrink-0">
            {options.map((option) => {
              const isCorrect = option === currentCountry?.name;
              const isSelected = option === selectedAnswer;
              
              let buttonStyle = "glass-dark hover:bg-white/60 border-none justify-start text-left px-2 py-2 md:py-6 h-auto text-[9px] sm:text-sm font-bold rounded-xl md:rounded-2xl transition-all active:scale-95 text-[#9333ea]";
              
              if (gameState === 'answered') {
                if (isCorrect) buttonStyle = cn(buttonStyle, "bg-primary text-primary-foreground ring-2 md:ring-4 ring-primary/20 opacity-100");
                else if (isSelected) buttonStyle = cn(buttonStyle, "bg-destructive text-destructive-foreground opacity-90 ring-2 md:ring-4 ring-destructive/20");
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
                    <span className="flex-1 truncate md:whitespace-normal">{option}</span>
                    {gameState === 'answered' && isCorrect && <CheckCircle2 className="h-2.5 w-2.5 md:h-5 md:w-5 ml-1 shrink-0" />}
                    {gameState === 'answered' && isSelected && !isCorrect && <XCircle className="h-2.5 w-2.5 md:h-5 md:w-5 ml-1 shrink-0" />}
                  </div>
                </Button>
              );
            })}
          </div>

          {gameState === 'answered' && (
            <div className="space-y-1.5 md:space-y-4 animate-in slide-in-from-bottom-2 shrink-0">
              {selectedAnswer === currentCountry?.name && reward && (
                <div className="p-2 md:p-5 glass border-primary/30 bg-primary/5 rounded-xl md:rounded-2xl text-center space-y-0.5 md:space-y-2">
                  <div className="flex items-center justify-center gap-1 text-primary">
                    <Heart className="h-2 w-2 md:h-4 md:w-4 fill-current" />
                    <span className="text-[7px] md:text-[10px] font-black uppercase tracking-widest">Adventure Reward</span>
                    <Heart className="h-2 w-2 md:h-4 md:w-4 fill-current" />
                  </div>
                  <p className="text-[9px] md:text-sm font-bold italic text-foreground leading-tight md:leading-relaxed px-1">
                    &ldquo;{reward}&rdquo;
                  </p>
                </div>
              )}
              <Button 
                onClick={generateQuestion} 
                className="w-full bg-accent text-accent-foreground hover:bg-accent/80 py-3 md:py-6 text-xs md:text-sm font-black rounded-xl md:rounded-2xl shadow-lg active:scale-95 transition-transform"
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
