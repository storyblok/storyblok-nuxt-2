import { defineConfig } from "vite";
import path from "path";

const name = "storyblok-nuxt";

export default defineConfig(() => {
  return {
    build: {
      lib: {
        entry: path.resolve(__dirname, "index.js"),
        name: "storyblokNuxt",
        fileName: (format) => (format === "es" ? `${name}.mjs` : `${name}.js`),
      },
      rollupOptions: {
        output: {
          globals: {
            vue: "Vue",
          },
        },
        external: ["axios", "vue"],
        // external: [] // FIX: temporary till we remove axios dependency in storyblok-js-client
      },
    },
  };
});
