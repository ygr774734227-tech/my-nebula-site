import React, { useState } from "react"; // 1. 增加了 useState
import { motion, AnimatePresence } from "framer-motion"; // 2. 增加了 AnimatePresence
import { Play, Film, Zap, Globe, Cpu, ChevronRight, X } from "lucide-react"; // 3. 增加了 X 图标

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

// --- 组件部分 ---

export default function App() {
  // 4. 定义状态控制弹窗
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      {/* 1. 顶部导航栏 (保持不变) */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/50 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/20260104-051248.jpg" alt="Nebula Studio Logo" className="w-8 h-8 object-contain" />
            <span className="text-xl font-bold tracking-wider">
              NEBULA STUDIO
            </span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
            <a href="#" className="hover:text-cyan-400 transition-colors">作品</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">技术</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">关于</a>
          </div>
          <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-md border border-white/5">
            联系我们
          </button>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative pt-40 pb-20 px-6 min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px]" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-6"
            >
              <Zap size={12} fill="currentColor" />
              Next Gen Short Drama
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-tight">
              重塑 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-600">科幻叙事</span> <br /> 的短剧边界
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              我们利用 AI 辅助编剧与 AI 视频模型创作，打造沉浸式赛博朋克短剧宇宙。
              Nebula Studio，为未来的屏幕而生。
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group relative px-8 py-4 bg-cyan-500 text-slate-950 font-bold rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
                <span className="relative flex items-center gap-2">开始探索 <ChevronRight size={18} /></span>
              </button>

              {/* 5. 这里给“观看 Showreel”按钮增加了点击事件 */}
              <button 
                onClick={() => setIsOpen(true)}
                className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium rounded-xl transition-all flex items-center gap-2"
              >
                <Play size={18} /> 观看 Showreel
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 6. 视频弹窗实现 (Video Modal) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)} // 点击遮罩层关闭
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()} // 阻止点击视频时关闭
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-cyan-500/20"
            >
              {/* 关闭按钮 */}
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-white/10 rounded-full transition-colors text-white"
              >
                <X size={24} />
              </button>

              {/* 视频主体 - 请确保你的视频放在 public/showreel.mp4 */}
              <video 
                autoPlay 
                controls 
                className="w-full h-full object-cover"
              >
                <source src="/showreel.mp4" type="video/mp4" />
                您的浏览器不支持视频播放。
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Bento Grid 特性展示 (保持不变) */}
      <section className="py-32 px-6 bg-slate-950/50">
        {/* ... 原有内容 ... */}
      </section>

      {/* 4. 页脚 (保持不变) */}
      <footer className="py-12 border-t border-white/10 bg-black text-slate-500 text-center text-sm">
        <p>© 2025 Nebula Studio. All rights reserved.</p>
        <p className="mt-2">Designed for the Next Generation.</p>
      </footer>
    </div>
  );
}
