import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
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

// --- 特性卡片组件 ---
const FeatureCard = ({ icon: Icon, title, desc, colorClass }) => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    <motion.div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -5 }} 
      className="relative group bg-slate-900/40 p-8 rounded-3xl border border-white/5 backdrop-blur-md overflow-hidden transition-all"
    >
      <motion.div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(6, 182, 212, 0.1), transparent 80%)`,
        }}
      />
      
      <div className="relative z-10">
        <Icon className={`${colorClass} mb-4`} />
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-slate-400 text-sm">{desc}</p>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isExploring, setIsExploring] = useState(false); // 控制背景视频切换

  // --- 鼠标跟随逻辑 ---
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 150 };
  const mainCursorX = useSpring(cursorX, springConfig);
  const mainCursorY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);

    // --- 核心优化：预加载视频 ---
    const bgVideo = document.createElement("video");
    bgVideo.src = "/background.mp4"; // 对应 public/background.mp4
    bgVideo.preload = "auto";

    const timer = setTimeout(() => setIsLoading(false), 2500);
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      clearTimeout(timer);
    };
  }, []);

  // --- 处理点击探索 ---
  const handleExplore = () => {
    setIsExploring(true);
    // 稍微延迟滚动，增强视觉冲击力
    setTimeout(() => {
      document.getElementById('tech-stack')?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden relative cursor-none">
      
      {/* --- 全局鼠标跟随 --- */}
      {!isLoading && (
        <div className="fixed inset-0 z-[999] pointer-events-none hidden md:block">
          <motion.div
            style={{ x: mainCursorX, y: mainCursorY }}
            className="absolute w-10 h-10 -ml-5 -mt-5 rounded-full bg-cyan-500/20 blur-xl shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          />
          <motion.div
            style={{ x: cursorX, y: cursorY }}
            className="absolute w-2 h-2 -ml-1 -mt-1 rounded-full bg-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,1)]"
          />
        </div>
      )}

      {/* --- A. 动态背景切换层 --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* 1. 初始太空图片背景 */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isExploring || isLoading ? 0 : 1,
            scale: isExploring ? 1.2 : 1 
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/space-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* 2. 点击后出现的视频背景 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isExploring ? 1 : 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 overflow-hidden"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/background.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* 3. 覆盖遮罩层 (保持 UI 可读性) */}
        <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-900/20 via-transparent to-cyan-900/20" />
      </div>

      {/* --- B. 开场动画 --- */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-slate-950 cursor-wait"
          >
            <motion.div
              animate={{ 
                rotate: 360,
                borderColor: ["#22d3ee", "#d946ef", "#22d3ee"],
                boxShadow: ["0 0 20px rgba(34,211,238,0.3)", "0 0 50px rgba(217,70,239,0.5)", "0 0 20px rgba(34,211,238,0.3)"]
              }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="w-24 h-24 rounded-full border-t-2 border-r-2 flex items-center justify-center"
            >
              <Zap className="text-cyan-400" size={32} />
            </motion.div>
            <div className="mt-10 text-center">
              <div className="text-cyan-400 font-mono tracking-[0.4em] text-xs mb-2 animate-pulse">NEBULA SYSTEM BOOTING...</div>
              <div className="text-[10px] text-slate-600 font-mono italic tracking-widest uppercase">Establishing Neural Link</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- C. 网页主内容 --- */}
      <motion.main className="relative z-10" animate={{ opacity: isLoading ? 0 : 1 }} transition={{ duration: 1 }}>
        
        {/* 顶部导航 */}
        <nav className="fixed top-0 w-full z-50 bg-slate-950/40 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2 group">
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
              className="bg-cyan-500/10 hover:bg-cyan-500/30 text-cyan-400 px-5 py-2 rounded-full text-sm font-medium border border-cyan-500/30 transition-all active:scale-95 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
            >
              联系我们
            </button>
          </div>
        </nav>

        {/* Hero Section */}
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
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* 关键按钮：点击切换背景并滚动 */}
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(6,182,212,0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleExplore}
                  className="group relative px-10 py-4 bg-cyan-500 text-slate-950 font-bold rounded-xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center gap-2">开始探索 <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
                </motion.button>

                <motion.button 
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                  onClick={() => setIsOpen(true)} 
                  className="px-10 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-xl flex items-center gap-2 backdrop-blur-md"
                >
                  <Play size={18} /> 观看 Showreel
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 技术栈部分 */}
        <section id="tech-stack" className="py-32 px-6 bg-slate-950/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-16 font-mono tracking-tighter">CORE_TECH // 核心技术栈</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard 
                icon={Film} 
                title="横竖屏电影感视效" 
                desc="无论是横屏还是竖屏，电影级调色与光影。" 
                colorClass="text-cyan-400"
              />
              <FeatureCard 
                icon={Cpu} 
                title="AIGC 剧本辅助" 
                desc="利用大语言模型构建多分支、非线性叙事逻辑。" 
                colorClass="text-fuchsia-400"
              />
              <FeatureCard 
                icon={Globe} 
                title="全球化发行" 
                desc="支持多语种 AI 实时译制。" 
                colorClass="text-emerald-400"
              />
            </div>
          </div>
        </section>

        <footer className="py-12 border-t border-white/5 text-center text-slate-600 text-xs font-mono tracking-widest uppercase">
          © 2026 NEBULA STUDIO // DIGITAL FRONTIER
        </footer>
      </motion.main>

      {/* --- D. 弹窗逻辑 --- */}
      <AnimatePresence>
        {/* Showreel 视频弹窗 */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl cursor-default"
            >
              <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 z-20 text-white p-2 bg-black/50 rounded-full hover:bg-red-500 transition-colors"><X size={24} /></button>
              <video autoPlay controls playsInline className="w-full h-full object-contain">
                <source src="/showreel.mp4" type="video/mp4" />
              </video>
            </motion.div>
          </motion.div>
        )}

        {/* 联系方式弹窗 */}
        {isContactOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsContactOpen(false)}
            className="fixed inset-0 z-[160] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-lg cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotateX: 45 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-900 border border-cyan-500/30 p-8 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.2)] max-w-sm w-full text-center cursor-default"
            >
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400 rounded-br-lg" />
              <h3 className="text-cyan-400 font-mono tracking-widest mb-6 uppercase">Contact_Node</h3>
              <div className="relative group overflow-hidden rounded-xl bg-black border border-white/10 mb-6">
                <img src="/contact-qr.jpg" alt="Contact QR" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent h-20 w-full animate-pulse pointer-events-none" />
              </div>
              <button onClick={() => setIsContactOpen(false)} className="w-full py-3 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-xl font-mono text-xs border border-cyan-500/20">CLOSE_CONNECTION</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
