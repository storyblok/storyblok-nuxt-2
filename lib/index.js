export {
  useStoryblokApi,
  useStoryblokBridge,
  apiPlugin,
  StoryblokVue,
  renderRichText,
} from "@storyblok/vue-2";
import { onMounted } from "vue";

import { useFetch, ssrRef } from "@nuxtjs/composition-api";
import { useStoryblokApi, useStoryblokBridge } from "@storyblok/vue-2";

export const useStoryblok = (slug, apiOptions = {}, bridgeOptions = {}) => {
  const storyblokApi = useStoryblokApi(apiOptions);
  if (!storyblokApi)
    return console.error(
      "useStoryblok cannot be used if you disabled useApiClient when adding @storyblok/nuxt-2 to your nuxt.config.js"
    );

  const story = ssrRef(null, slug);

  onMounted(() => {
    if (story.value && story.value.id) {
      useStoryblokBridge(
        story.value.id,
        (evStory) => (story.value = evStory),
        bridgeOptions
      );
    }
  });

  const { fetchState } = useFetch(async () => {
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, apiOptions);
    story.value = data.story;
  }, slug);

  return { story, fetchState };
};
