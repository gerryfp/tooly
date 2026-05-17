import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { mcpuiDevPlugin } from "@mcpui/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mcpuiDevPlugin({
      staticMarkdownFile: "mcpui/layout.md",
      staticJsonFile: "mcpui/mcpui.json",
    }),
  ],
});
