import { defineConfig } from "vite";
import path from "path";

const name = "storyblok-nuxt";

export default defineConfig(() => {
  return {
    build: {
      // target: "esnext",
      lib: {
        entry: path.resolve(__dirname, "index.js"),
        name: "storyblokNuxt",
        fileName: (format) => (format === "es" ? `${name}.mjs` : `${name}.js`),
      },
      rollupOptions: {
        output: {
          compact: true,
          globals: {
            vue: "Vue",
            "@storyblok/vue-2": "@storyblok/vue-2",
          },
        },
        external: ["vue", "@storyblok/vue-2"],
      },
    },
  };
});
