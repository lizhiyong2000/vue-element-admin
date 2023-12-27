import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import commonjs from 'vite-plugin-commonjs';

import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// import ElementPlus from 'unplugin-element-plus/vite' // 不加这个配置，ElMessage出不来

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env,
    global: 'window',
  },
  // 静态资源引用路径，默认为"/"
   base: './',
   build: {
    // build目录名称，默认为"dist"
      outDir: 'build',
    // 静态资源存放目录名称，默认为"assets"
      assetsDir: 'static',
      commonjsOptions: {
        transformMixedEsModules: true, // 轉換兼容 commonjs
      },
    },
   server: {
    // 支持IP访问
    host: true,
    port: 3000,
    // 设置反向代理
    proxy: {
      // 以下示例表示：请求URL中含有"/api"，则反向代理到http://localhost
      // 例如: http://localhost:3000/api/login -> http://localhost/api/login
      '/api': {
          target: 'http: //localhost/',
          changeOrigin: true,
      },
    },
    open: '/',
    hmr: { timeout: 30000, overlay: false
    },
    watch: { usePolling: true
    },
  },  
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定目录
      iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
      // 使用svg图标的格式
      symbolId: "icon-[dir]-[name]",
    }),
    vueJsx(),
    commonjs(),
    AutoImport({
        resolvers: [ElementPlusResolver()],
    }),
    Components({
        resolvers: [ElementPlusResolver()],
    }),


    // ElementPlus(),
  ],
  css: {
    preprocessorOptions: {
      // 覆盖掉element-plus包中的主题变量文件
      scss: {
        // additionalData: `@use "@/styles/element/index.scss" as *;`,
      },
    },
  },
})
