import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 下面这段配置是为了兼容 CodeSandbox 的老习惯
  // 允许在 .js 文件里写 JSX 代码
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.js?$/, 
    exclude: []
  },
})
