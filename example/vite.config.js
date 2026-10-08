import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// 本番ビルドにだけ CSP（読み込んでよいものの許可リスト）を付ける。
// 万が一 XSS があっても、外部スクリプトの実行をブラウザが止めてくれる。
const csp = [
  "default-src 'self'",
  "img-src 'self' data:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'csp',
      apply: 'build',
      transformIndexHtml: () => [
        {
          tag: 'meta',
          attrs: { 'http-equiv': 'Content-Security-Policy', content: csp },
          injectTo: 'head-prepend',
        },
      ],
    },
  ],
})
