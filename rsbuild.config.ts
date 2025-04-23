import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

export default defineConfig({
  html: { title: 'EduFeed Prototype' },
  output: {
    assetPrefix: '/2025-04-16-edufeed-prototype/',
  },
  plugins: [pluginReact()],
})
