import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    {
      name: "import-meta-env-ssr",
      enforce: "pre",
      transform(code, id, options) {
        if (!options?.ssr && code.includes("import.meta.env.SSR")) {
          return code.replace(/import.meta.env.SSR/g, "false");
        }
      },
    },
    remixCloudflareDevProxy(),
    remix(),
    tsconfigPaths(),
  ],
});
