import path from "path";

const nuxtModule = function (moduleOptions) {
  let options = Object.assign({}, this.options.storyblok, moduleOptions);

  if (options.enableSudoMode !== true) {
    this.addPlugin({
      src: path.resolve(__dirname, "plugin.mjs"),
      options,
    });
  }

  const nuxtConfig = this.nuxt.options;
  const componentsPath = "~/components/storyblok";
  if (Array.isArray(nuxtConfig.components))
    nuxtConfig.components.push(componentsPath);
  else nuxtConfig.components = [componentsPath];

  // Self-transpile to fix the ESM require() issue
  this.nuxt.options.build.transpile = this.nuxt.options.build.transpile || [];
  this.nuxt.options.build.transpile.push("@storyblok/nuxt-2");

  const alias = this.options.alias["@storyblok/nuxt-2"] || this.nuxt.resolver.resolveModule("@storyblok/nuxt-2");
  if (alias) this.options.alias["@storyblok/nuxt-2"] = alias;

  // Deduplicate vue versions to ensure we're using the same instance
  const vueEntry =
    this.nuxt.options.alias.vue ||
    (this.nuxt.options.dev
      ? this.nuxt.resolver.resolveModule("vue/dist/vue.common.dev.js")
      : this.nuxt.resolver.resolveModule("vue/dist/vue.runtime.esm.js"));

  const vueAliases = Object.fromEntries(
    [
      // vue 2 dist files
      ".common.dev",
      ".common",
      ".common.prod",
      ".esm.browser",
      ".esm.browser.min",
      ".esm",
      "",
      ".min",
      ".runtime.common.dev",
      ".runtime.common",
      ".runtime.common.prod",
      ".runtime.esm",
      ".runtime",
      ".runtime.min",
    ]
      .flatMap((m) => [`vue/dist/vue${m}`, `vue/dist/vue${m}.js`])
      .map((m) => [m, vueEntry])
  );

  this.nuxt.options.alias = {
    ...vueAliases,
    ...this.nuxt.options.alias,
    vue: vueEntry,
  };

  // Disable Webpack 4 mjs support (has issues)
  this.extendBuild((config) => {
    if (!config.module) return;
    config.module.rules.forEach((rule) => {
      if (rule.test instanceof RegExp && rule.test.test("index.mjs")) {
        rule.type = "javascript/auto";
      }
    });
    config.module.rules.unshift({
      test: /\.mjs$/,
      type: "javascript/auto",
      include: [/node_modules/],
    });
  });
};

// nuxtModule.meta = {
//   name:
// }

export default nuxtModule;
