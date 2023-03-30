/* eslint-disable */

import Vue from "vue";
import {
  StoryblokVue,
  useStoryblokApi,
  useStoryblokBridge,
} from "@storyblok/nuxt-2";
<% if (options.useApiClient !== false) { %>
import { apiPlugin } from "@storyblok/nuxt-2";
<% } %>

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
  const { app, store } = ctx
  Vue.use(StoryblokVue, {
    accessToken: "<%= options.accessToken %>",
    bridge: <%= typeof options.bridge === "undefined" ? true : options.bridge %>,
    apiOptions: <%= JSON.stringify(options.apiOptions || {}) %>,
    <% if (options.useApiClient !== false) { %>
    use: [apiPlugin]
    <% } %>
  });
  const api = useStoryblokApi()
  inject('storyapi', api)
  inject('storybridge', useStoryblokBridge)
};
