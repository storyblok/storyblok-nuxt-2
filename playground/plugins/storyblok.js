import Vue from "vue";
import {
  StoryblokVue,
  useStoryblokApi,
  useStoryblokBridge,
  apiPlugin,
} from "@storyblok/nuxt-2";

import fetchPonyfill from "fetch-ponyfill";
import { AbortController } from "node-abort-controller";

const { fetch, Request, Response, Headers } = fetchPonyfill();

if (global && !global.fetch) {
  global.fetch = fetch;
  global.Request = Request;
  global.Response = Response;
  global.Headers = Headers;
  global.AbortController = AbortController;
}

export default (ctx, inject) => {
  Vue.use(StoryblokVue, {
    accessToken: "OurklwV5XsDJTIE1NJaD2wtt",
    bridge: true,
    apiOptions: {
      cache: {
        clear: "manual",
        type: "custom",
        custom: {
          flush() {
            return "all right";
          },
        },
      },
    },
    use: [apiPlugin],
  });
  const api = useStoryblokApi();
  inject("storyapi", api);
  inject("storybridge", useStoryblokBridge);
};
