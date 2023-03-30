/*
** Uncomment this to run the HTTPS server
import path from 'path'
import fs from 'fs'
*/
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
  buildModules: [
    ["@storyblok/nuxt-2/module", { accessToken: "OurklwV5XsDJTIE1NJaD2wtt" }],
    // "@nuxtjs/composition-api/module",
  ],
  /*
  ** Uncomment this to run the HTTPS server
  ** -- [Previously] Create mkcert credentials in the root of the project: `mkcert localhost`
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, '..', 'localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, '..', 'localhost.pem'))
    }
  }
  */
};
