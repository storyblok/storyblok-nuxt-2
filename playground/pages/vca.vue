<script setup>
import { useStoryblok } from "@storyblok/nuxt-2";
const { story, fetchState } = useStoryblok("vue/test", { version: "draft" });
console.log(story);
</script>

<template>
  <div>
    <p>{{ fetchState }}</p>
    <StoryblokComponent v-if="story && story.content" :blok="story.content" />
  </div>
</template>
