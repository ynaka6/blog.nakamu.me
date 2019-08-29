<template>
  <div class="no-underlink block group hover:bg-blue-lightest border-b">
    <div class="flex items-center">
      <div class="w-2/3 pt-4 pl-4 pr-2">
        <nuxt-link
          :to="`/posts/${post.fields.slug}`"
          class="title group-hover:text-white"
        >
          {{ post.fields.title }}
        </nuxt-link>
        <p class="description group-hover:text-white">
          {{ post.fields.description }}
        </p>
      </div>
      <div class="w-1/3 pt-4 pr-4 pl-2">
        <picture class="block h-auto w-full">
          <source
            type="image/webp"
            :srcset="`${post.fields.heroImage.fields.file.url}?fm=webp`"
          />
          <n-image
            :alt="post.fields.title"
            :src="`${post.fields.heroImage.fields.file.url}?w=10`"
            :placeholder="post.fields.heroImage.fields.file.url"
            :srcset="
              `
              ${post.fields.heroImage.fields.file.url}?w=350&h=196&fit=fill 350w,
              ${post.fields.heroImage.fields.file.url}?w=1000&h=562&fit=fill 1000w,
              ${post.fields.heroImage.fields.file.url}?w=2000&h=1125&fit=fill 2000w
              `
            "
            sizes="(min-width: 1024px) 400px, 100vw"
          />
        </picture>
      </div>
    </div>
    <div class="px-4">
      <post-date
        :publish-time="post.fields.publishDate"
        :update-time="post.sys.updatedAt"
      />
    </div>
  </div>
</template>

<script>
import NImage from '~/components/atoms/NImage'
import PostDate from '~/components/molecules/Post/PostDate'
export default {
  components: { NImage, PostDate },
  props: {
    post: { type: Object, required: true }
  },
  computed: {
    tags: function() {
      if (!this.post.fields.tags) return []
      return this.post.fields.tags
        .map(t => this.$store.getters['tag/tagOfName'](t))
        .filter(t => t != null)
    }
  }
}
</script>

<style scoped lang="postcss">
.title {
  @apply block no-underline font-bold text-base text-gray-800 mb-2 text-black;
}
.description {
  text-overflow: ellipsis;
  @apply overflow-hidden whitespace-no-wrap text-sm text-gray-600 mb-1;
}
</style>
