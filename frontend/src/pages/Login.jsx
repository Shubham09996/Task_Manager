import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { ArrowLeft, Sparkles, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const res = await login(email, password);
    setIsLoading(false);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white font-sans flex overflow-hidden selection:bg-[#c084fc]/30">
      
      {/* Left side - Lottie & Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#111218] border-r border-white/5 flex-col justify-start p-12 overflow-hidden gap-10">
        {/* Glow effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#c084fc]/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#67e8f9]/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative z-10 w-full">
          <div className="flex items-center justify-between w-full mb-10">
            <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft size={16} />
              <span className="text-sm font-medium">Back</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#9b6cf8] to-[#c58dfa] flex items-center justify-center font-bold text-white text-sm shadow-[0_0_15px_rgba(155,108,248,0.4)]">
                F
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Flow
              </span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1]">
              Welcome back to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c084fc] to-[#67e8f9]">your workflow.</span>
            </h1>
          </motion.div>
        </div>

        {/* Lottie Animation inside a glass mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative z-10 w-full max-w-xl mx-auto mt-2"
        >
           <div className="rounded-2xl border border-white/10 bg-[#16171d]/80 backdrop-blur-xl p-4 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#eab308]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#22c55e]"></div>
                </div>
                <div className="text-[11px] font-mono text-gray-500 bg-black/30 px-3 py-1 rounded">flow.ai/auth</div>
              </div>
              <div className="aspect-[4/3] sm:aspect-[16/10] bg-[#000000]/40 rounded-xl flex items-center justify-center relative overflow-hidden border border-white/5">
                 <DotLottieReact
                    src="https://lottie.host/bdcc4ed2-2d72-4a32-914e-cf8a860a415a/gyKp6Zqr5U.lottie"
                    loop
                    autoplay
                    className="w-full h-full opacity-90 mix-blend-screen"
                  />
              </div>
           </div>
        </motion.div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#111218] via-[#0B0C10] to-[#0B0C10] lg:hidden z-0"></div>
         
         <div className="w-full max-w-md relative z-10">
           {/* Mobile header (hidden on lg) */}
           <div className="lg:hidden flex justify-between items-center mb-12">
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#9b6cf8] to-[#c58dfa] flex items-center justify-center font-bold text-white text-sm">
                 F
               </div>
               <span className="text-xl font-bold tracking-tight text-white">Flow</span>
             </div>
             <Link to="/" className="text-xs font-medium text-gray-400 hover:text-white transition-colors">
               Back to website
             </Link>
           </div>

           <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.4 }}
           >
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 mb-6">
                <Sparkles size={12} className="text-[#c084fc]" />
                <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Sign in to workspace</span>
             </div>

             <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome back</h2>
             <p className="text-gray-400 text-sm mb-8 font-light">Enter your credentials to access your account.</p>

             {error && (
               <motion.div 
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: 'auto' }}
                 className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm flex items-center gap-2"
               >
                 <div className="w-1 h-4 bg-red-500 rounded-full"></div>
                 {error}
               </motion.div>
             )}

             <form onSubmit={handleSubmit} className="space-y-5">
               <div>
                 <label className="block text-sm font-medium text-gray-300 mb-2">Work Email</label>
                 <input 
                   type="email" 
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className="w-full bg-[#16171d] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c084fc]/50 focus:border-[#c084fc] transition-all"
                   placeholder="name@company.com"
                   required
                 />
               </div>
               <div>
                 <div className="flex items-center justify-between mb-2">
                   <label className="block text-sm font-medium text-gray-300">Password</label>
                   <a href="#" className="text-xs font-medium text-[#c084fc] hover:text-[#d8b4fe] transition-colors">Forgot password?</a>
                 </div>
                 <input 
                   type="password" 
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="w-full bg-[#16171d] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c084fc]/50 focus:border-[#c084fc] transition-all"
                   placeholder="••••••••"
                   required
                 />
               </div>
               
               <button 
                 type="submit" 
                 disabled={isLoading}
                 className="w-full py-3.5 mt-4 rounded-xl bg-gradient-to-r from-[#9b6cf8] to-[#c58dfa] text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(155,108,248,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
               >
                 {isLoading ? (
                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                 ) : (
                   'Sign In to Workspace'
                 )}
               </button>
             </form>

             <div className="mt-8 relative">
               <div className="absolute inset-0 flex items-center">
                 <div className="w-full border-t border-white/5"></div>
               </div>
               <div className="relative flex justify-center text-xs">
                 <span className="bg-[#0B0C10] px-4 text-gray-500">Or continue with</span>
               </div>
             </div>

             <div className="mt-8 grid grid-cols-2 gap-4">
               <button type="button" className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#16171d] border border-white/5 hover:bg-[#1c1d25] transition-colors text-sm font-medium text-white">
                 <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
                 Google
               </button>
               <button type="button" className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#16171d] border border-white/5 hover:bg-[#1c1d25] transition-colors text-sm font-medium text-white">
                 <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                 GitHub
               </button>
             </div>

             <p className="text-center text-sm text-gray-400 mt-8 font-light">
               Don't have an account? <Link to="/register" className="text-white hover:text-[#c084fc] font-medium transition-colors">Sign up</Link>
             </p>
           </motion.div>
         </div>
      </div>

    </div>
  );
};

export default Login;
