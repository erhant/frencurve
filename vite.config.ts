import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.NEXT_PUBLIC_ALCHEMY_ID": env.NEXT_PUBLIC_ALCHEMY_ID,
      "process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID":
        env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    },
    plugins: [react()],
  };
});
