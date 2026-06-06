import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite"; // 1. Add this import

export default defineConfig({
  plugins: [tanstackStart(), react(), tailwindcss(), tsconfigPaths(),nitro() // 2. Add the Nitro server plugin here
  ],
});