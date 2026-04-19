import { FlagGame } from "@/components/game/FlagGame";

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-12 md:py-20 flex flex-col items-center">
      <div className="w-full max-w-4xl relative">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 -left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px] -z-10 animate-float" />
        <div className="absolute bottom-0 -right-10 w-72 h-72 bg-secondary/10 rounded-full blur-[100px] -z-10 animate-float" style={{ animationDelay: '1.5s' }} />
        
        <div className="mb-12 text-center md:text-left">
          <p className="text-primary font-bold uppercase tracking-widest text-xs mb-2 animate-in slide-in-from-left-4">Become a Geography Expert</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground">
            Explore the World <span className="text-primary underline decoration-accent/50 decoration-4 underline-offset-4">Flag by Flag</span> 🌍
          </h2>
        </div>

        <FlagGame />
        
        <footer className="mt-20 text-center text-muted-foreground/60 text-xs">
          <p>Powered by GenAI Educational Hints & Global Discovery Data</p>
          <div className="mt-2 flex justify-center gap-4">
            <span>🚀 Interactive Learning</span>
            <span>✨ Glassmorphism UI</span>
            <span>⚡ Real-time Feedback</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
