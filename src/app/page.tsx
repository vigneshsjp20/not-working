import { FlagGame } from "@/components/game/FlagGame";

export default function Home() {
  return (
    <main className="fixed inset-0 h-[100svh] w-full bg-black text-white flex flex-col items-center justify-center overflow-hidden touch-none selection:bg-primary selection:text-primary-foreground">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full h-1/2 bg-primary/10 blur-[120px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="w-full h-full max-w-md mx-auto relative flex flex-col p-4 md:p-6 overflow-hidden">
        <header className="text-center mb-2 md:mb-4 shrink-0 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-2xl md:text-3xl font-black tracking-tighter">
            FLAGMASTER <span className="text-primary underline decoration-accent/50 decoration-4 underline-offset-2">QUEST</span> 🌍
          </h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-bold mt-1">Adventure with Ree ❤️</p>
        </header>

        <div className="flex-1 flex flex-col justify-center min-h-0 relative z-10">
          <FlagGame />
        </div>

        <footer className="mt-2 md:mt-4 text-center shrink-0 animate-in fade-in duration-1000">
          <p className="text-[9px] text-white/20 uppercase tracking-[0.2em] font-bold">Interactive AI Educational Experience</p>
          <div className="flex justify-center gap-3 mt-1.5 opacity-30">
            <span className="w-1 h-1 bg-white rounded-full" />
            <span className="w-1 h-1 bg-white rounded-full" />
            <span className="w-1 h-1 bg-white rounded-full" />
          </div>
        </footer>
      </div>
    </main>
  );
}
