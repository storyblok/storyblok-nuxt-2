export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "playground-2",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  plugins: ["~/plugins/polyfill.js"],
  buildModules: [
    ["@storyblok/nuxt-2/module", { accessToken: "tqITNsRwbyxrQQ1t4GLcJAtt" }],
    // "@nuxtjs/composition-api/module",
  ],
};
