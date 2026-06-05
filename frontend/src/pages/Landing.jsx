import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ArrowRight, Zap, Layout, BarChart2, Shield, CheckCircle, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

const Landing = () => {
  const { user } = useContext(AuthContext);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f13] text-white font-sans selection:bg-primary/30 relative overflow-hidden">
      {/* Background Meshes */}
      <div className="absolute top-0 inset-x-0 h-[1000px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-[#0f0f13] to-transparent opacity-60 pointer-events-none"></div>
      <div className="absolute top-[20%] left-[-10%] w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[180px] pointer-events-none"></div>
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-8 py-6 flex items-center justify-between relative z-50"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white shadow-[0_0_30px_rgba(168,85,247,0.5)] border border-white/20">
            Q
          </div>
          <span className="text-2xl font-black tracking-tight text-white">
            Quantum
          </span>
        </div>
        <div className="flex items-center gap-8">
          <a href="#features" className="text-sm font-semibold text-muted hover:text-white transition-colors hidden md:block">Features</a>
          <a href="#customers" className="text-sm font-semibold text-muted hover:text-white transition-colors hidden md:block">Customers</a>
          {user ? (
            <Link to="/dashboard" className="text-sm font-semibold text-white hover:text-primary transition-colors flex items-center gap-2">
              Enter Workspace <ArrowRight size={16} />
            </Link>
          ) : (
            <div className="flex items-center gap-6">
              <Link to="/login" className="text-sm font-semibold text-muted hover:text-white transition-colors">Sign in</Link>
              <Link to="/register" className="relative group bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all backdrop-blur-md overflow-hidden">
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-accent/50 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
              </Link>
            </div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <main className="container mx-auto px-8 pt-24 pb-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
            </span>
            <span className="text-xs font-bold tracking-widest uppercase text-white/80">Quantum 2.0 is live</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-6xl md:text-[7rem] font-black tracking-tight mb-8 leading-[1]">
            Build better.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-gradient-x inline-block">
              Ship faster.
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-muted max-w-3xl mx-auto mb-14 font-light leading-relaxed">
            The intelligent task management platform that brings your team's workflows into perfect harmony. Beautifully designed, blazingly fast.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-32 w-full sm:w-auto">
            {user ? (
              <Link to="/dashboard" className="w-full sm:w-auto bg-white hover:bg-gray-100 text-black px-10 py-4 rounded-full text-lg font-bold transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                Go to Dashboard <ArrowRight size={20} />
              </Link>
            ) : (
              <>
                <Link to="/register" className="w-full sm:w-auto bg-white hover:bg-gray-100 text-black px-10 py-4 rounded-full text-lg font-bold transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                  Start for free <ArrowRight size={20} />
                </Link>
                <button className="w-full sm:w-auto px-10 py-4 rounded-full text-lg font-bold text-white/80 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center gap-2 group">
                  Book a demo
                </button>
              </>
            )}
          </motion.div>
        </motion.div>

        {/* Floating App Preview with 3D Transform */}
        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, rotateX: 15, scale: 0.95 }}
          transition={{ duration: 1, delay: 0.5, type: 'spring', damping: 20 }}
          className="relative max-w-6xl mx-auto cursor-pointer group perspective-1000"
          style={{ perspective: '1200px' }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-transparent to-transparent z-20 top-[40%] bottom-[-10%]"></div>

          <div className="transition-all duration-700 ease-out transform group-hover:rotate-x-0 group-hover:scale-100" style={{ transformOrigin: 'top center' }}>

            <div className="p-2 rounded-[2rem] bg-gradient-to-b from-white/10 to-white/0 shadow-[0_0_100px_rgba(168,85,247,0.2)] relative">
              <div className="absolute inset-0 rounded-[2rem] border border-white/10 pointer-events-none"></div>

              <div className="rounded-[1.5rem] overflow-hidden bg-[#0a0a0f] border border-white/10 shadow-2xl relative">

                {/* Fake Dashboard Header */}
                <div className="h-16 border-b border-white/5 flex items-center px-8 gap-4 bg-surface/80 backdrop-blur-md">
                  <div className="flex gap-2.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#ef4444] border border-black/20"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-[#eab308] border border-black/20"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-[#22c55e] border border-black/20"></div>
                  </div>
                  <div className="w-72 h-8 bg-[#1a1a24] rounded-lg ml-6 border border-white/5 flex items-center px-3">
                    <div className="w-4 h-4 rounded-full bg-white/10"></div>
                    <div className="w-24 h-2 bg-white/10 rounded ml-2"></div>
                  </div>
                  <div className="ml-auto flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-white/5"></div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent"></div>
                  </div>
                </div>

                {/* Fake Dashboard Body - Bento Layout */}
                <div className="p-8 grid grid-cols-12 gap-6 h-[500px] bg-[#0a0a0f] relative">

                  {/* Left Sidebar */}
                  <div className="col-span-2 flex flex-col gap-4">
                    <div className="h-10 w-full bg-white/10 rounded-lg"></div>
                    <div className="h-10 w-full bg-white/5 rounded-lg"></div>
                    <div className="h-10 w-full bg-white/5 rounded-lg"></div>
                    <div className="h-10 w-full bg-white/5 rounded-lg"></div>
                  </div>

                  {/* Main Content */}
                  <div className="col-span-10 grid grid-cols-3 gap-6">
                    {/* Top Stats */}
                    <div className="col-span-3 flex gap-6">
                      <div className="flex-1 h-32 bg-gradient-to-br from-[#1a1a24] to-[#0f0f13] rounded-2xl border border-white/5 p-6 flex flex-col justify-between relative overflow-hidden">
                        <div className="w-24 h-4 bg-white/10 rounded-full mb-2"></div>
                        <div className="text-4xl font-bold text-white">48</div>
                        <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
                      </div>
                      <div className="flex-1 h-32 bg-gradient-to-br from-[#1a1a24] to-[#0f0f13] rounded-2xl border border-white/5 p-6 flex flex-col justify-between relative overflow-hidden">
                        <div className="w-32 h-4 bg-white/10 rounded-full mb-2"></div>
                        <div className="text-4xl font-bold text-white">12</div>
                        <div className="absolute bottom-0 right-0 w-24 h-24 bg-secondary/20 rounded-full blur-2xl"></div>
                      </div>
                      <div className="flex-1 h-32 bg-gradient-to-br from-[#1a1a24] to-[#0f0f13] rounded-2xl border border-white/5 p-6 flex flex-col justify-between relative overflow-hidden">
                        <div className="w-20 h-4 bg-white/10 rounded-full mb-2"></div>
                        <div className="text-4xl font-bold text-white">84%</div>
                        <div className="absolute bottom-0 right-0 w-24 h-24 bg-success/20 rounded-full blur-2xl"></div>
                      </div>
                    </div>

                    {/* Chart Area */}
                    <div className="col-span-2 h-full bg-[#1a1a24] rounded-2xl border border-white/5 p-6 flex flex-col relative overflow-hidden">
                      <div className="w-40 h-5 bg-white/10 rounded-full mb-8"></div>
                      <div className="flex items-end justify-between flex-1 gap-4">
                        {[...Array(8)].map((_, i) => (
                          <div key={i} className="flex-1 bg-gradient-to-t from-primary to-accent rounded-t-md opacity-80" style={{ height: `${[30, 50, 40, 70, 60, 90, 80, 100][i]}%` }}></div>
                        ))}
                      </div>
                    </div>

                    {/* Right Panel */}
                    <div className="col-span-1 h-full bg-[#1a1a24] rounded-2xl border border-white/5 p-6 flex flex-col gap-4">
                      <div className="w-24 h-5 bg-white/10 rounded-full mb-2"></div>
                      <div className="w-full h-20 bg-white/5 rounded-xl border border-white/5 p-4 flex gap-3 items-center">
                        <div className="w-10 h-10 rounded-full bg-secondary/20 flex-shrink-0"></div>
                        <div className="flex-1"><div className="w-full h-3 bg-white/10 rounded-full mb-2"></div><div className="w-1/2 h-2 bg-white/5 rounded-full"></div></div>
                      </div>
                      <div className="w-full h-20 bg-white/5 rounded-xl border border-white/5 p-4 flex gap-3 items-center">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex-shrink-0"></div>
                        <div className="flex-1"><div className="w-3/4 h-3 bg-white/10 rounded-full mb-2"></div><div className="w-1/3 h-2 bg-white/5 rounded-full"></div></div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </main>

      {/* Bento Grid Features Section */}
      <section id="features" className="container mx-auto px-8 py-40 relative z-10 border-t border-white/5 bg-[#0a0a0f]">
        <div className="flex flex-col items-center mb-24 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Everything you need.<br />Nothing you don't.</h2>
          <p className="text-xl text-muted max-w-2xl font-light">We stripped away the complexity so you can focus on executing your vision. Experience the ultimate flow state.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Big Bento Item 1 */}
          <motion.div whileHover={{ scale: 0.98 }} className="md:col-span-2 md:row-span-2 glass-card p-10 border border-white/10 hover:border-white/20 transition-all rounded-[2rem] bg-gradient-to-br from-[#1a1a24] to-[#0f0f13] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] group-hover:bg-primary/20 transition-colors"></div>
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary mb-8 shadow-lg shadow-primary/10">
              <Layout size={32} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Fluid Kanban</h3>
            <p className="text-muted leading-relaxed text-lg mb-8 max-w-md">Organize tasks your way. Drag, drop, and prioritize with buttery smooth animations that feel native.</p>
            <div className="w-full h-48 bg-[#0a0a0f] rounded-xl border border-white/5 p-4 flex gap-4 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0f] z-10"></div>
              <div className="flex-1 bg-white/5 rounded-lg border border-white/5 p-3 flex flex-col gap-2 transform -translate-y-4">
                <div className="w-full h-12 bg-white/10 rounded border border-white/5"></div>
                <div className="w-full h-16 bg-white/10 rounded border border-white/5"></div>
              </div>
              <div className="flex-1 bg-white/5 rounded-lg border border-white/5 p-3 flex flex-col gap-2 transform translate-y-4">
                <div className="w-full h-16 bg-primary/20 rounded border border-primary/30"></div>
                <div className="w-full h-12 bg-white/10 rounded border border-white/5"></div>
              </div>
            </div>
          </motion.div>

          {/* Small Bento Item 1 */}
          <motion.div whileHover={{ scale: 0.98 }} className="md:col-span-2 glass-card p-10 border border-white/10 hover:border-white/20 transition-all rounded-[2rem] bg-gradient-to-br from-[#1a1a24] to-[#0f0f13] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/10 rounded-full blur-[60px] group-hover:bg-secondary/20 transition-colors"></div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-secondary shadow-lg shadow-secondary/10">
                <BarChart2 size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white">Actionable Insights</h3>
            </div>
            <p className="text-muted leading-relaxed text-lg">Real-time charts and velocity tracking help you identify bottlenecks before they happen.</p>
          </motion.div>

          {/* Small Bento Item 2 */}
          <motion.div whileHover={{ scale: 0.98 }} className="md:col-span-1 glass-card p-10 border border-white/10 hover:border-white/20 transition-all rounded-[2rem] bg-gradient-to-br from-[#1a1a24] to-[#0f0f13] relative overflow-hidden group flex flex-col items-center text-center">
            <div className="absolute bottom-0 left-0 w-full h-32 bg-accent/10 blur-[40px]"></div>
            <Zap size={48} className="text-accent mb-6" />
            <h3 className="text-xl font-bold text-white mb-2">Zero Latency</h3>
            <p className="text-muted">Built for speed.</p>
          </motion.div>

          {/* Small Bento Item 3 */}
          <motion.div whileHover={{ scale: 0.98 }} className="md:col-span-1 glass-card p-10 border border-white/10 hover:border-white/20 transition-all rounded-[2rem] bg-gradient-to-br from-[#1a1a24] to-[#0f0f13] relative overflow-hidden group flex flex-col items-center text-center">
            <div className="absolute bottom-0 right-0 w-full h-32 bg-success/10 blur-[40px]"></div>
            <Shield size={48} className="text-success mb-6" />
            <h3 className="text-xl font-bold text-white mb-2">Secure</h3>
            <p className="text-muted">Enterprise-grade.</p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-8 py-32 relative z-10">
        <div className="glass-card rounded-[3rem] p-16 md:p-24 text-center border border-white/10 bg-gradient-to-b from-primary/10 to-[#0f0f13] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">Ready to move faster?</h2>
            <p className="text-xl text-muted max-w-2xl mx-auto mb-12">Join thousands of teams already using Quantum to orchestrate their best work.</p>
            <Link to="/register" className="inline-block bg-white hover:bg-gray-100 text-black px-12 py-5 rounded-full text-xl font-bold transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95">
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0a0a0f] py-16 relative z-10">
        <div className="container mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white text-sm">
              Q
            </div>
            <span className="text-lg font-bold tracking-tight text-white/90">Quantum</span>
          </div>

          <div className="flex gap-8 text-sm font-medium text-muted">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Discord</a>
          </div>

          <p className="text-sm font-medium text-muted">© 2026 Quantum Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
