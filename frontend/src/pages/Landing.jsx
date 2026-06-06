import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { 
  ArrowRight, 
  Play, 
  Check, 
  Workflow, 
  Sparkles, 
  BarChart2, 
  Link as LinkIcon, 
  Quote, 
  Star 
} from 'lucide-react';
import { motion } from 'framer-motion';

const Landing = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white font-sans selection:bg-[#c084fc]/30 overflow-x-hidden">
      
      {/* Top Navbar */}
      <nav className="fixed w-full top-0 z-50 bg-[#0B0C10]/80 backdrop-blur-lg border-b border-white/5">
        <div className="container mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#9b6cf8] to-[#c58dfa] flex items-center justify-center font-bold text-white text-sm">
              F
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Flow
            </span>
          </div>
        <div className="flex items-center gap-8">
          <a href="#features" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors hidden md:block">Features</a>
          <a href="#customers" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors hidden md:block">Customers</a>
          <a href="#pricing" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors hidden md:block">Pricing</a>
          {user ? (
            <Link to="/dashboard" className="text-sm font-semibold text-white hover:text-[#c084fc] transition-colors flex items-center gap-2">
              Dashboard <ArrowRight size={16} />
            </Link>
          ) : (
            <div className="flex items-center gap-6">
              <Link to="/login" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">Log in</Link>
              <Link to="/register" className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-lg text-sm font-semibold transition-all">
                Sign Up
              </Link>
            </div>
          )}
        </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mt-12 pt-24 pb-20 px-6 flex flex-col items-center text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 mb-8 cursor-pointer hover:bg-white/[0.05] transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
          <span className="text-xs font-medium text-gray-300">New &middot; Flow AI now drafts your entire sprint</span>
          <ArrowRight size={12} className="text-gray-400 ml-1" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight max-w-4xl leading-[1.05]"
        >
          The task platform built for teams who <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c084fc] to-[#67e8f9] relative inline-block pb-2">
            ship fast.
            {/* SVG Underline */}
            <svg className="absolute w-full h-4 bottom-0 left-0 text-[#67e8f9]" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M0 15 Q 50 5 100 15" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-400 max-w-2xl mb-10 leading-relaxed font-light"
        >
          Flow is the elegant, lightning-fast workspace for modern product teams. Plan sprints, track work, and stay in flow — all in one beautifully crafted place.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-8 w-full sm:w-auto"
        >
          <Link to="/register" className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#9b6cf8] to-[#c58dfa] text-white font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity w-full sm:w-auto justify-center shadow-[0_0_20px_rgba(155,108,248,0.3)]">
            Start for free <ArrowRight size={18} />
          </Link>
          <button className="px-8 py-3.5 rounded-xl bg-[#181920] border border-[#2a2b32] text-white font-semibold flex items-center gap-2 hover:bg-[#22232d] transition-colors w-full sm:w-auto justify-center">
            <Play size={18} fill="currentColor" /> Watch the demo
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400 font-medium"
        >
          <span className="flex items-center gap-2"><Check size={16} className="text-emerald-500" /> Free for 10 users</span>
          <span className="flex items-center gap-2"><Check size={16} className="text-emerald-500" /> No credit card</span>
          <span className="flex items-center gap-2"><Check size={16} className="text-emerald-500" /> Setup in 2 min</span>
        </motion.div>

        {/* Lottie Browser Window Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-28 w-full max-w-5xl mx-auto"
        >
          <div className="rounded-t-2xl border border-[#2a2b32] border-b-0 bg-[#16171d] p-4 flex items-center gap-4 shadow-2xl">
             <div className="flex gap-2">
               <div className="w-3 h-3 rounded-full bg-[#ef4444]"></div>
               <div className="w-3 h-3 rounded-full bg-[#eab308]"></div>
               <div className="w-3 h-3 rounded-full bg-[#22c55e]"></div>
             </div>
             <div className="bg-[#111218] border border-[#2a2b32] rounded-md px-4 py-1.5 text-xs text-gray-500 flex-1 max-w-md mx-auto text-center font-mono">
               flow.app / sprint / Q3-launch
             </div>
          </div>
          <div className="border border-[#2a2b32] bg-[#0d0e12] rounded-b-2xl overflow-hidden relative aspect-[16/9] flex items-center justify-center shadow-2xl">
             <DotLottieReact 
                src="https://lottie.host/08935321-3556-45c3-a2ed-eebe23eea76a/rox8aL49fz.lottie" 
                loop 
                autoplay 
                className="w-[80%] h-auto absolute inset-0 m-auto mix-blend-screen" 
              />
          </div>
        </motion.div>

        {/* Trusted By Marquee */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 w-full overflow-hidden relative pb-10"
        >
          <p className="text-center text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-10">
            Trusted by fast-moving teams at
          </p>
          
          <div className="relative flex overflow-hidden group">
            {/* Left/Right Fade Masks */}
            <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-[#0B0C10] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-[#0B0C10] to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex w-max animate-marquee">
              {/* Array duplicated to loop seamlessly */}
              {[...Array(2)].map((_, arrayIndex) => (
                <div key={arrayIndex} className="flex gap-16 md:gap-24 items-center px-8 md:px-12">
                  {['Mercury', 'Linear', 'Vercel', 'Stripe', 'Notion', 'Framer', 'Loom', 'Raycast', 'Arc', 'Cursor'].map((company, i) => (
                    <span key={i} className="text-xl md:text-2xl font-bold text-gray-600/70 hover:text-white transition-all duration-300 cursor-default whitespace-nowrap">
                      {company}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Bento Section */}
      <section id="features" className="py-5 px-6 flex flex-col items-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c084fc]"></span>
          <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Everything you need</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center tracking-tight">
          One workspace.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c084fc] to-[#f472b6]">Infinite focus.</span>
        </h2>
        <p className="text-gray-400 text-lg mb-16 text-center max-w-2xl font-light">
          A complete toolkit for modern product teams — from quick capture to deep analytics.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
          {/* Large Left Card */}
          <div className="col-span-1 md:col-span-2 rounded-3xl bg-[#111218] border border-white/5 p-8 flex flex-col overflow-hidden relative group">
             <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c084fc]/20 to-[#c084fc]/5 flex items-center justify-center mb-6 text-[#c084fc] border border-[#c084fc]/20">
               <Workflow size={24} />
             </div>
             <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Kanban that actually flows</h3>
             <p className="text-gray-400 mb-10 max-w-sm text-sm leading-relaxed">Drag, drop, and prioritize on a real-time engine that feels instant — even on huge boards.</p>
             <div className="flex-1 rounded-xl bg-[#0B0C10] border border-white/5 p-4 flex gap-4 min-h-[200px]">
               {/* Mock Kanban */}
               {[1,2,3].map(i => (
                 <div key={i} className="flex-1 bg-white/[0.02] rounded-lg border border-white/5 p-3 flex flex-col gap-3">
                   <div className="flex items-center gap-2 mb-2">
                     <span className={`w-2 h-2 rounded-full ${i===1?'bg-gray-500':i===2?'bg-blue-400':'bg-emerald-400'}`}></span>
                     <span className="text-xs text-white/60 font-medium">{i===1?'Todo':i===2?'Doing':'Done'}</span>
                   </div>
                   <div className="h-12 bg-white/5 rounded-md flex items-center px-3 justify-between">
                     <div className="w-16 h-2 bg-white/10 rounded"></div>
                     <div className="w-4 h-4 rounded-full bg-white/10"></div>
                   </div>
                   <div className="h-12 bg-white/5 rounded-md flex items-center px-3 justify-between">
                     <div className="w-24 h-2 bg-white/10 rounded"></div>
                     <div className="w-4 h-4 rounded-full bg-purple-500/50"></div>
                   </div>
                 </div>
               ))}
             </div>
          </div>

          {/* Right Cards Stack */}
          <div className="flex flex-col gap-6">
            <div className="rounded-3xl bg-[#111218] border border-white/5 p-8 flex-1 group">
               <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c084fc]/20 to-[#c084fc]/5 flex items-center justify-center mb-6 text-[#c084fc] border border-[#c084fc]/20">
                 <Sparkles size={24} />
               </div>
               <h3 className="text-xl font-bold text-white mb-3 tracking-tight">AI sprint drafts</h3>
               <p className="text-gray-400 text-sm leading-relaxed">Describe an outcome. Flow generates tasks, estimates, and owners.</p>
            </div>
            <div className="rounded-3xl bg-[#111218] border border-white/5 p-8 flex-1 group">
               <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c084fc]/20 to-[#c084fc]/5 flex items-center justify-center mb-6 text-[#c084fc] border border-[#c084fc]/20">
                 <BarChart2 size={24} />
               </div>
               <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Built-in analytics</h3>
               <p className="text-gray-400 text-sm leading-relaxed">Cycle time, throughput, burndown. No spreadsheets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-20 px-6 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c084fc]"></span>
          <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">How it works</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center tracking-tight">
          A workflow that <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c084fc] to-[#f472b6]">scales with<br/>you</span>
        </h2>
        <p className="text-gray-400 text-lg mb-16 text-center max-w-2xl font-light">
          From the first ticket to the thousandth release — Flow stays out of your way.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full relative">
          {/* Connecting Line behind cards */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -translate-y-1/2 z-0"></div>

          {[
            { icon: <Workflow />, title: "Plan", desc: "Capture ideas, group them into sprints, and align in minutes — not meetings.", num: "01" },
            { icon: <LinkIcon />, title: "Execute", desc: "Track work on boards, lists, and timelines tuned for deep focus.", num: "02" },
            { icon: <BarChart2 />, title: "Measure", desc: "Out-of-the-box analytics surface exactly where work is stuck.", num: "03" }
          ].map((step, i) => (
            <div key={i} className="rounded-3xl bg-[#111218] border border-white/5 p-8 relative z-10 hover:bg-[#15161c] transition-colors">
               <div className="absolute top-8 right-8 text-xs font-mono text-gray-600 font-bold">{step.num}</div>
               <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#c084fc] to-[#818cf8] flex items-center justify-center mb-8 text-white shadow-[0_0_30px_rgba(192,132,252,0.3)]">
                 {step.icon}
               </div>
               <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{step.title}</h3>
               <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="customers" className="py-20 px-6 flex flex-col items-center bg-[#0d0e12]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c084fc]"></span>
          <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Loved by builders</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center tracking-tight">
          The team behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c084fc] to-[#f472b6]">your team</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
          {[
            { name: "Anya Petrova", title: "Head of Product, Mercury", quote: "\"Flow is the first task tool our designers and engineers both love. The interface is a joy.\"", initials: "AP", color: "bg-[#818cf8]" },
            { name: "Daniel Reeves", title: "Eng Manager, Linear", quote: "\"We replaced four tools with Flow. Sprint planning is now 20 minutes, not two hours.\"", initials: "DR", color: "bg-[#06b6d4]" },
            { name: "Maya Chen", title: "Founder, Sundial", quote: "\"It's stupid fast. Keyboard shortcuts, AI sprint drafts, gorgeous analytics. This is the future.\"", initials: "MC", color: "bg-[#f472b6]" }
          ].map((t, i) => (
            <div key={i} className="rounded-3xl bg-[#111218] border border-white/5 p-8 flex flex-col">
              <Quote size={20} className="text-[#c084fc] mb-6 opacity-50" />
              <p className="text-gray-300 text-sm leading-relaxed mb-8 flex-1 font-light">{t.quote}</p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${t.color}`}>
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-semibold">{t.name}</h4>
                    <p className="text-gray-500 text-[11px] uppercase tracking-wider mt-0.5">{t.title}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={12} className="fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Big CTA */}
      <section className="py-20 px-6 flex justify-center bg-[#0d0e12]">
        <div className="max-w-5xl w-full rounded-[3rem] bg-gradient-to-br from-[#134e4a]/40 via-[#111218] to-[#4c1d95]/40 p-16 text-center border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#0B0C10]/60 backdrop-blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8">
              <Sparkles size={12} className="text-[#c084fc]" />
              <span className="text-xs font-semibold text-gray-300">Limited launch pricing</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Ready to find <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c084fc] to-[#f472b6]">your flow?</span>
            </h2>
            <p className="text-gray-300 text-lg mb-10 max-w-lg mx-auto font-light">
              Join 12,000+ teams who replaced their stack with one beautifully fast workspace.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link to="/register" className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#9b6cf8] to-[#c58dfa] text-white font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity">
                Start for free <ArrowRight size={18} />
              </Link>
              <button className="px-8 py-3.5 rounded-xl bg-[#181920] border border-[#2a2b32] text-white font-semibold hover:bg-[#22232d] transition-colors">
                Explore the app
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 pt-16 pb-12 px-6 bg-[#0B0C10]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-[#9b6cf8] to-[#c58dfa] flex items-center justify-center font-bold text-white text-xs">
                F
              </div>
              <span className="text-lg font-bold tracking-tight text-white">Flow</span>
            </div>
            <p className="text-gray-500 text-sm font-light max-w-sm mb-6">
              The task platform built for teams who ship fast. Organize, plan, and execute your sprints beautifully.
            </p>
            <div className="text-gray-600 text-xs font-light">
              &copy; {new Date().getFullYear()} Flow, Inc. All rights reserved.
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-8 md:col-span-3 text-sm">
            <div>
              <h4 className="text-white font-medium mb-4 tracking-tight">Product</h4>
              <ul className="space-y-3 text-gray-500 font-light text-xs">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4 tracking-tight">Company</h4>
              <ul className="space-y-3 text-gray-500 font-light text-xs">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Customers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4 tracking-tight">Resources</h4>
              <ul className="space-y-3 text-gray-500 font-light text-xs">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
