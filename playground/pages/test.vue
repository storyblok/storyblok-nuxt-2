<template>
  <div>
    <p>{{ story }}</p>
    <StoryblokComponent v-if="story" :blok="story.content" />
  </div>
</template>

<script>
import { useStoryblokBridge, useStoryblokApi } from "@storyblok/nuxt-2";

export default {
  //eslint-disable-next-line
  asyncData: async ({ app }) => {
    const storyblokApi = useStoryblokApi();
    const { data } = await storyblokApi.get("cdn/stories/vue/test", {
      version: "draft",
      resolve_relations: "page.resolveRels",
    });
    // OR: const { data } = await app.$storyapi.get("cdn/stories/vue", { version: "draft" });

    return { story: data.story };
  },
  mounted() {
    useStoryblokBridge(this.story.id, (newStory) => (this.story = newStory));
  },
};
</script>
