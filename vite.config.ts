import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  return {
    plugins: [react(), tailwindcss(), viteSingleFile()],
    define: {
      // fallback: if .env.local not present, use these values directly
      // (overridden by .env.local when it exists)
      "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(env.VITE_SUPABASE_URL ?? ""),
      "import.meta.env.VITE_SUPABASE_ANON_KEY": JSON.stringify(env.VITE_SUPABASE_ANON_KEY ?? ""),
    },
  };
});
