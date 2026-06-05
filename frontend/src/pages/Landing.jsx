import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ArrowRight, Zap, Layout, BarChart2 } from 'lucide-react';

const Landing = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-[#0f0f13] text-white font-sans selection:bg-primary/30 relative overflow-hidden">
      {/* Ambient Backgrounds */}
      <div className="absolute top-0 inset-x-0 h-[800px] bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>

      {/* Navbar */}
      <nav className="container mx-auto px-8 py-6 flex items-center justify-between relative z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            Q
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Quantum
          </span>
        </div>
        <div className="flex items-center gap-6">
          {user ? (
            <Link to="/dashboard" className="text-sm font-medium text-white hover:text-primary transition-colors flex items-center gap-2">
              Enter Workspace <ArrowRight size={16} />
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-muted hover:text-white transition-colors">Sign in</Link>
              <Link to="/register" className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all backdrop-blur-md">
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-8 pt-32 pb-20 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
          <span className="text-xs font-semibold tracking-wider uppercase text-white/80">The New Standard for Tasks</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1]">
          Plan, build, and <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-gradient-x">
            ship at lightspeed.
          </span>
        </h1>
        
        <p className="text-xl text-muted max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          Quantum brings your team's work together in one beautifully designed workspace. Ditch the clutter and focus on what matters.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-32">
          {user ? (
              <Link to="/dashboard" className="bg-white hover:bg-gray-100 text-black px-8 py-3.5 rounded-xl text-base font-semibold transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] flex items-center gap-2">
                Go to Dashboard <ArrowRight size={18} />
              </Link>
          ) : (
            <>
              <Link to="/register" className="bg-white hover:bg-gray-100 text-black px-8 py-3.5 rounded-xl text-base font-semibold transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] flex items-center gap-2">
                Start for free <ArrowRight size={18} />
              </Link>
            </>
          )}
        </div>

        {/* Floating App Preview with 3D Transform */}
        <div className="relative max-w-5xl mx-auto" style={{ perspective: '1000px' }}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-transparent to-transparent z-20 top-[60%] bottom-[-20%]"></div>
          
          <div className="transition-all duration-1000 ease-out transform" style={{ transform: 'rotateX(15deg) scale(0.95)', transformOrigin: 'top center' }} onMouseEnter={(e) => {e.currentTarget.style.transform = 'rotateX(0deg) scale(1)'}} onMouseLeave={(e) => {e.currentTarget.style.transform = 'rotateX(15deg) scale(0.95)'}}>
            
            <div className="glass-card border border-white/10 rounded-2xl p-2 shadow-[0_0_100px_rgba(168,85,247,0.15)] bg-surface/40 backdrop-blur-2xl">
              <div className="rounded-xl overflow-hidden bg-[#0f0f13] border border-white/5 shadow-inner">
                {/* Fake Dashboard Header */}
                <div className="h-14 border-b border-white/5 flex items-center px-6 gap-4 bg-surface/30">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-white/20"></div>
                    <div className="w-3 h-3 rounded-full bg-white/20"></div>
                    <div className="w-3 h-3 rounded-full bg-white/20"></div>
                  </div>
                  <div className="w-64 h-6 bg-white/5 rounded-md ml-4"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent ml-auto"></div>
                </div>
                {/* Fake Dashboard Body */}
                <div className="p-8 grid grid-cols-3 gap-6 h-[400px]">
                  <div className="col-span-2 space-y-4">
                    <div className="flex gap-4">
                       <div className="flex-1 h-24 bg-surface/50 rounded-xl border border-white/5 p-4 flex flex-col justify-between">
                         <div className="w-16 h-4 bg-white/10 rounded"></div>
                         <div className="w-10 h-8 bg-white/20 rounded"></div>
                       </div>
                       <div className="flex-1 h-24 bg-surface/50 rounded-xl border border-white/5 p-4 flex flex-col justify-between">
                         <div className="w-20 h-4 bg-white/10 rounded"></div>
                         <div className="w-12 h-8 bg-white/20 rounded"></div>
                       </div>
                       <div className="flex-1 h-24 bg-surface/50 rounded-xl border border-white/5 p-4 flex flex-col justify-between">
                         <div className="w-24 h-4 bg-white/10 rounded"></div>
                         <div className="w-8 h-8 bg-white/20 rounded"></div>
                       </div>
                    </div>
                    <div className="w-full h-48 bg-surface/50 rounded-xl border border-white/5 mt-4 flex items-end justify-between p-6 gap-3">
                       {[...Array(7)].map((_,i) => <div key={i} className="flex-1 bg-gradient-to-t from-primary/80 to-accent/80 rounded-t-sm opacity-80" style={{height: `${Math.random() * 70 + 30}%`}}></div>)}
                    </div>
                  </div>
                  <div className="col-span-1 space-y-4">
                     <div className="w-full h-full bg-surface/50 rounded-xl border border-white/5 p-4 flex flex-col gap-3">
                       <div className="w-1/2 h-4 bg-white/10 rounded mb-2"></div>
                       <div className="w-full h-16 bg-white/5 rounded-lg border border-white/5 p-3">
                         <div className="w-3/4 h-3 bg-white/20 rounded mb-2"></div>
                         <div className="w-1/4 h-2 bg-white/10 rounded"></div>
                       </div>
                       <div className="w-full h-16 bg-white/5 rounded-lg border border-white/5 p-3">
                         <div className="w-2/3 h-3 bg-white/20 rounded mb-2"></div>
                         <div className="w-1/3 h-2 bg-white/10 rounded"></div>
                       </div>
                       <div className="w-full h-16 bg-white/5 rounded-lg border border-white/5 border-l-2 border-l-primary p-3 bg-gradient-to-r from-primary/5 to-transparent">
                         <div className="w-4/5 h-3 bg-primary/80 rounded mb-2"></div>
                         <div className="w-1/2 h-2 bg-primary/40 rounded"></div>
                       </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="container mx-auto px-8 py-32 relative z-10 border-t border-white/5">
        <div className="flex flex-col items-center mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Designed for velocity</h2>
          <p className="text-xl text-muted max-w-2xl">Every component is meticulously crafted to ensure you spend less time managing, and more time building.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-10 hover:-translate-y-2 transition-transform duration-300 border-white/5 hover:border-primary/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px] group-hover:bg-primary/20 transition-colors"></div>
            <div className="w-14 h-14 rounded-2xl bg-surface border border-white/10 flex items-center justify-center text-primary mb-8 shadow-lg shadow-primary/10 group-hover:scale-110 transition-transform">
              <Layout size={28} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Kanban Boards</h3>
            <p className="text-muted leading-relaxed text-lg">Visually track your progress. Drag and drop tasks seamlessly across completely customizable stages.</p>
          </div>

          <div className="glass-card p-10 hover:-translate-y-2 transition-transform duration-300 border-white/5 hover:border-secondary/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-[50px] group-hover:bg-secondary/20 transition-colors"></div>
            <div className="w-14 h-14 rounded-2xl bg-surface border border-white/10 flex items-center justify-center text-secondary mb-8 shadow-lg shadow-secondary/10 group-hover:scale-110 transition-transform">
              <BarChart2 size={28} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Deep Analytics</h3>
            <p className="text-muted leading-relaxed text-lg">Understand your velocity. Real-time charts give you instant insights into team performance and bottlenecks.</p>
          </div>

          <div className="glass-card p-10 hover:-translate-y-2 transition-transform duration-300 border-white/5 hover:border-accent/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-[50px] group-hover:bg-accent/20 transition-colors"></div>
            <div className="w-14 h-14 rounded-2xl bg-surface border border-white/10 flex items-center justify-center text-accent mb-8 shadow-lg shadow-accent/10 group-hover:scale-110 transition-transform">
              <Zap size={28} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Lightning Fast</h3>
            <p className="text-muted leading-relaxed text-lg">Built with React and Vite. Experience zero-latency interactions and a buttery-smooth interface.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#0f0f13] py-12 relative z-10">
        <div className="container mx-auto px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white text-xs">
              Q
            </div>
            <span className="text-sm font-semibold text-white/80">Quantum</span>
          </div>
          <p className="text-sm text-muted">© 2026 Quantum Inc. Built for speed.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
