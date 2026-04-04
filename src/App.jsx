import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Film, Zap, Globe, Cpu, ChevronRight, X } from "lucide-react";

// --- 动画配置 ---
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
  // 新增：控制“联系我们”弹窗的状态
  const [isContactOpen, setIsContactOpen] = useState(false);

  // 1. 模拟开场加载过程 (2.5秒)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      
      {/* --- A. 酷炫全屏开场动画 --- */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-slate-950"
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
              <div className="text-[10px] text-slate-600 font-mono italic">
                ESTABLISHING NEURAL LINK
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- B. 网页主内容 --- */}
      <motion.main
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1 }}
      >
        {/* 1. 顶部导航栏 */}
        <nav className="fixed top-0 w-full z-50 bg-slate-950/50 backdrop-blur-lg border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/20260104-051248.jpg" alt="Logo" className="w-8 h-8 object-contain" />
              <span className="text-xl font-bold tracking-wider">NEBULA STUDIO</span>
            </div>
            <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
              <a href="#" className="hover:text-cyan-400">作品</a>
              <a href="#tech-stack" className="hover:text-cyan-400">技术</a>
              <a href="#" className="hover:text-cyan-400">关于</a>
            </div>
            {/* 修改：点击按钮打开联系弹窗 */}
            <button 
              onClick={() => setIsContactOpen(true)}
              className="bg-white/10 hover:bg-cyan-500/20 hover:text-cyan-400 px-4 py-2 rounded-full text-sm font-medium border border-white/5 transition-all"
            >
              联系我们
            </button>
          </div>
        </nav>

        {/* 2. Hero Section */}
        <section className="relative pt-40 pb-20 px-6 min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px]" />

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.div initial="hidden" animate={isLoading ? "hidden" : "visible"} variants={staggerContainer}>
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-6">
                <Zap size={12} fill="currentColor" /> Next Gen Short Drama
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-tight">
                重塑 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-600">科幻叙事</span> <br /> 的短剧边界
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                我们利用 AI 辅助编剧与 AI 视频模型创作，打造沉浸式赛博朋克短剧宇宙。
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('tech-stack')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group relative px-8 py-4 bg-cyan-500 text-slate-950 font-bold rounded-xl overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center gap-2">开始探索 <ChevronRight size={18} /></span>
                </motion.button>

                <button onClick={() => setIsOpen(true)} className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium rounded-xl transition-all flex items-center gap-2">
                  <Play size={18} /> 观看 Showreel
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 3. Bento Grid 特性展示 */}
        <section id="tech-stack" className="py-32 px-6 bg-slate-950/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-16">核心技术栈</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5">竖屏电影感视效</div>
               <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5">AIGC 剧本辅助</div>
               <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5">全球化发行</div>
            </div>
          </div>
        </section>
      </motion.main>

      {/* --- C. 视频弹窗逻辑 --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10"
            >
              <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 z-20 text-white p-2 bg-black/50 rounded-full"><X size={24} /></button>
              <video autoPlay controls playsInline className="w-full h-full object-contain">
                <source src="/showreel.mp4" type="video/mp4" />
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- D. 新增：联系我们弹窗 (全息投影动画) --- */}
      <AnimatePresence>
        {isContactOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsContactOpen(false)}
            className="fixed inset-0 z-[160] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotateX: 45 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-900 border border-cyan-500/30 p-8 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.2)] max-w-sm w-full text-center"
            >
              {/* 四角装饰 */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400 rounded-br-lg" />

              <h3 className="text-cyan-400 font-mono tracking-widest mb-6">CONTACT_NODE</h3>
              
              <div className="relative group overflow-hidden rounded-xl bg-black border border-white/10 mb-6">
                <img 
                  src="/contact-qr.jpg"  // 请确保 public 文件夹中有这张图
                  alt="Contact QR" 
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
                />
                {/* 扫描线光效 */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent h-20 w-full animate-pulse pointer-events-none" />
              </div>

              <p className="text-slate-400 text-sm font-mono mb-6 text-left border-l-2 border-cyan-500 pl-3">
                扫描二维码联系我们 <br />
                <span className="text-white">Nebula Studio Team</span>
              </p>

              <button 
                onClick={() => setIsContactOpen(false)}
                className="w-full py-2 bg-white/5 hover:bg-white/10 text-xs text-slate-500 rounded-lg transition-colors font-mono"
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
