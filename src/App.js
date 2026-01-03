import React from "react";
import { motion } from "framer-motion";
import { Play, Film, Zap, Globe, Cpu, ChevronRight, Menu } from "lucide-react";

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
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      {/* 1. 顶部导航栏 (玻璃拟态) */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/50 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-cyan-400 to-fuchsia-600 rounded-lg animate-pulse" />
            <span className="text-xl font-bold tracking-wider">
              NEBULA STUDIO
            </span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
            <a href="#" className="hover:text-cyan-400 transition-colors">
              作品
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              技术
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              关于
            </a>
          </div>
          <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-md border border-white/5">
            联系我们
          </button>
        </div>
      </nav>

      {/* 2. Hero Section (首屏视觉冲击) */}
      <section className="relative pt-40 pb-20 px-6 min-h-screen flex items-center justify-center overflow-hidden">
        {/* 背景光效 */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px]" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-6"
            >
              <Zap size={12} fill="currentColor" />
              Next Gen Short Drama
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-tight"
            >
              重塑{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-600">
                科幻叙事
              </span>
              <br />
              的短剧边界
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              我们利用 AI 辅助编剧与虚幻引擎渲染，打造沉浸式赛博朋克短剧宇宙。
              Nebula Studio，为未来的屏幕而生。
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="group relative px-8 py-4 bg-cyan-500 text-slate-950 font-bold rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
                <span className="relative flex items-center gap-2">
                  开始探索 <ChevronRight size={18} />
                </span>
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium rounded-xl transition-all flex items-center gap-2">
                <Play size={18} /> 观看 Showreel
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. Bento Grid 特性展示 (便当盒布局) */}
      <section className="py-32 px-6 bg-slate-950/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">核心技术栈</h2>
            <p className="text-slate-400">融合艺术与算法的创作流程</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* 大卡片 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 row-span-1 bg-slate-900/50 border border-white/5 rounded-3xl p-8 relative overflow-hidden group hover:border-cyan-500/30 transition-colors"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="p-3 bg-cyan-500/10 w-fit rounded-xl text-cyan-400">
                  <Film size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">竖屏电影感视效</h3>
                  <p className="text-slate-400">
                    专为移动端优化的 9:16
                    构图，引入电影级调色与光影，打破短剧廉价感。
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 卡片 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-slate-900/50 border border-white/5 rounded-3xl p-8 relative overflow-hidden group hover:border-fuchsia-500/30 transition-colors"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="p-3 bg-fuchsia-500/10 w-fit rounded-xl text-fuchsia-400">
                  <Cpu size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">AIGC 剧本辅助</h3>
                  <p className="text-slate-400">
                    利用大模型生成非线性叙事结构。
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 卡片 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-slate-900/50 border border-white/5 rounded-3xl p-8 relative overflow-hidden group hover:border-emerald-500/30 transition-colors"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="p-3 bg-emerald-500/10 w-fit rounded-xl text-emerald-400">
                  <Globe size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">全球化发行</h3>
                  <p className="text-slate-400">
                    覆盖北美、东南亚市场的本地化译制。
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 大卡片 4 (纯视觉装饰) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-2 bg-gradient-to-r from-cyan-900/20 to-fuchsia-900/20 border border-white/5 rounded-3xl p-8 flex items-center justify-center relative overflow-hidden"
            >
              <div className="text-center">
                <h3 className="text-4xl md:text-6xl font-black text-white/10 tracking-tighter">
                  FUTURE IS NOW
                </h3>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. 页脚 */}
      <footer className="py-12 border-t border-white/10 bg-black text-slate-500 text-center text-sm">
        <p>© 2025 Nebula Studio. All rights reserved.</p>
        <p className="mt-2">Designed for the Next Generation.</p>
      </footer>
    </div>
  );
}
