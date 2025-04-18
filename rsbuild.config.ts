import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

export default defineConfig({
  output: {
    assetPrefix: '/2025-04-16-edufeed-prototype/',
  },
  plugins: [pluginReact()],
})
