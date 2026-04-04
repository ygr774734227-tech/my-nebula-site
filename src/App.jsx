import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Film, Zap, Globe, Cpu, ChevronRight, X } from "lucide-react";

// --- 动画预设 ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // 模拟系统初始化加载
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden relative">
      
      {/* --- A. 动态太空背景层 --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ 
          opacity: isLoading ? 0 : 1, 
          scale: 1,
          y: [0, -15, 0],
          x: [0, 10, 0]
        }}
        transition={{ 
          opacity: { duration: 2 },
          y: { repeat: Infinity, duration: 25, ease: "easeInOut" },
          x: { repeat: Infinity, duration: 30, ease: "easeInOut" }
        }}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/space-bg.jpg')", // 请确保 public 下有此图
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* 深色暗场遮罩，增强对比度 */}
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[1px]" />
        {/* 霓虹氛围光 */}
        <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-900/20 via-transparent to-cyan-900/20" />
      </motion.div>

      {/* --- B. 酷炫全屏开场动画 --- */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-slate-950"
          >
            <motion.div
              animate={{ 
                rotate: 360,
                borderColor: ["#22d3ee", "#d946ef", "#22d3ee"],
                boxShadow: [
                  "0 0 20px rgba(34,211,238,0.3)",
                  "0 0 50px rgba(217,70,239,0.5)",
                  "0 0 20px rgba(34,211,238,0.3)"
                ]
              }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="w-24 h-24 rounded-full border-t-2 border-r-2 flex items-center justify-center"
            >
              <Zap className="text-cyan-400" size={32} />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 text-center"
            >
              <div className="text-cyan-400 font-mono tracking-[0.4em] text-xs mb-2 animate-pulse">
                NEBULA SYSTEM BOOTING...
              </div>
              <div className="text-[10px] text-slate-600 font-mono italic tracking-widest">
                ESTABLISHING NEURAL LINK
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- C. 网页主内容 --- */}
      <motion.main
        className="relative z-10"
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1 }}
      >
        {/* 1. 顶部导航栏 */}
        <nav className="fixed top-0 w-full z-50 bg-slate-950/40 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2 group cursor-pointer">
              <img src="/20260104-051248.jpg" alt="Logo" className="w-8 h-8 object-contain group-hover:rotate-12 transition-transform" />
              <span className="text-xl font-bold tracking-wider group-hover:text-cyan-400 transition-colors">NEBULA STUDIO</span>
            </div>
            <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
              <a href="#" className="hover:text-cyan-400 transition-colors">作品</a>
              <a href="#tech-stack" className="hover:text-cyan-400 transition-colors">技术</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">关于</a>
            </div>
            <button 
              onClick={() => setIsContactOpen(true)}
              className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 px-5 py-2 rounded-full text-sm font-medium border border-cyan-500/30 transition-all active:scale-95 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
            >
              联系我们
            </button>
          </div>
        </nav>

        {/* 2. Hero Section */}
        <section className="relative pt-40 pb-20 px-6 min-h-screen flex items-center justify-center overflow-hidden">
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.div initial="hidden" animate={isLoading ? "hidden" : "visible"} variants={staggerContainer}>
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-6">
                <Zap size={12} fill="currentColor" /> Next Gen Short Drama
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-tight">
                重塑 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-600">科幻叙事</span> <br /> 的短剧边界
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                我们利用 AI 辅助编剧与虚幻引擎渲染，打造沉浸式赛博朋克短剧宇宙。
                Nebula Studio，为未来的屏幕而生。
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(6,182,212,0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('tech-stack')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group relative px-10 py-4 bg-cyan-500 text-slate-950 font-bold rounded-xl overflow-hidden transition-all"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center gap-2">开始探索 <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
                </motion.button>

                <motion.button 
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                  onClick={() => setIsOpen(true)} 
                  className="px-10 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-xl transition-all flex items-center gap-2 backdrop-blur-md"
                >
                  <Play size={18} /> 观看 Showreel
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 3. Bento Grid 特性展示 */}
        <section id="tech-stack" className="py-32 px-6 bg-slate-950/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-16 font-mono tracking-tighter">CORE_TECH // 核心技术栈</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <motion.div whileHover={{ y: -5 }} className="bg-slate-900/40 p-8 rounded-3xl border border-white/5 backdrop-blur-md hover:border-cyan-500/30 transition-colors">
                  <Film className="text-cyan-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2">竖屏电影感视效</h3>
                  <p className="text-slate-400 text-sm">专为移动端优化的 9:16 构图，打破短剧廉价感。</p>
               </motion.div>
               <motion.div whileHover={{ y: -5 }} className="bg-slate-900/40 p-8 rounded-3xl border border-white/5 backdrop-blur-md hover:border-fuchsia-500/30 transition-colors">
                  <Cpu className="text-fuchsia-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2">AIGC 剧本辅助</h3>
                  <p className="text-slate-400 text-sm">利用大语言模型构建多分支、非线性叙事逻辑。</p>
               </motion.div>
               <motion.div whileHover={{ y: -5 }} className="bg-slate-900/40 p-8 rounded-3xl border border-white/5 backdrop-blur-md hover:border-emerald-500/30 transition-colors">
                  <Globe className="text-emerald-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2">全球化发行</h3>
                  <p className="text-slate-400 text-sm">覆盖北美、东南亚市场，支持多语种 AI 实时译制。</p>
               </motion.div>
            </div>
          </div>
        </section>

        <footer className="py-12 border-t border-white/5 text-center text-slate-600 text-xs font-mono tracking-widest">
          © 2026 NEBULA STUDIO // ALL RIGHTS RESERVED
        </footer>
      </motion.main>

      {/* --- D. 弹窗逻辑 (通用背景) --- */}
      <AnimatePresence>
        {/* 视频弹窗 */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 z-20 text-white p-2 bg-black/50 rounded-full hover:bg-red-500 transition-colors"><X size={24} /></button>
              <video autoPlay controls playsInline className="w-full h-full object-contain">
                <source src="/showreel.mp4" type="video/mp4" />
              </video>
            </motion.div>
          </motion.div>
        )}

        {/* 联系我们弹窗 */}
        {isContactOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsContactOpen(false)}
            className="fixed inset-0 z-[160] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-lg"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotateX: 45 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-900 border border-cyan-500/30 p-8 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.2)] max-w-sm w-full text-center"
            >
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400 rounded-br-lg" />
              <h3 className="text-cyan-400 font-mono tracking-widest mb-6">CONTACT_NODE</h3>
              <div className="relative group overflow-hidden rounded-xl bg-black border border-white/10 mb-6">
                <img src="/contact-qr.jpg" alt="Contact QR" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent h-20 w-full animate-pulse pointer-events-none" />
              </div>
              <p className="text-slate-400 text-xs font-mono mb-6 text-left border-l-2 border-cyan-500 pl-3">
                扫描二维码联系我们 <br /><br />
                <span className="text-white tracking-normal">微信 ID: Nebula_Studio_Official</span>
              </p>
              <button 
                onClick={() => setIsContactOpen(false)}
                className="w-full py-3 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-xl transition-all font-mono text-xs border border-cyan-500/20"
              >
                CLOSE_CONNECTION [ESC]
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
