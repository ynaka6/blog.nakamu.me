<template>
  <article class="article">
    <div class="relative">
      <nuxt-link :to="`/posts/${post.fields.slug}`" class="block">
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
              ${
                post.fields.heroImage.fields.file.url
              }?w=350&h=196&fit=fill 350w,
              ${
                post.fields.heroImage.fields.file.url
              }?w=1000&h=562&fit=fill 1000w,
              ${
                post.fields.heroImage.fields.file.url
              }?w=2000&h=1125&fit=fill 2000w
              `
            "
            sizes="(min-width: 1024px) 400px, 100vw"
          />
        </picture>
      </nuxt-link>
      <n-category
        v-if="category"
        :to="`/categories/${category.slug}`"
        :label="category.name"
        class="absolute top-0 right-0"
      />
    </div>
    <div class="p-2 md:px-4">
      <post-date
        :publish-time="post.fields.publishDate"
        :update-time="post.sys.updatedAt"
      />
      <h3 class="my-3 text-lg">
        <nuxt-link
          :to="`/posts/${post.fields.slug}`"
          class="no-underline text-black font-bold text-xl py-1"
        >
          {{ post.fields.title }}
        </nuxt-link>
      </h3>
      <p class="text-gray-600 text-sm mb-4" v-text="post.fields.description" />
      <div class="my-1">
        <n-tag
          v-for="(tag, index) in tags"
          :key="index"
          :to="`/tags/${tag.slug}`"
          :label="tag.name"
          size="small"
        />
      </div>
    </div>
  </article>
</template>

<script>
import NCategory from '~/components/atoms/links/NCategory'
import NTag from '~/components/atoms/links/NTag'
import NImage from '~/components/atoms/NImage'
import PostDate from '~/components/molecules/Post/PostDate'

export default {
  components: { NCategory, NTag, NImage, PostDate },
  props: {
    post: { type: Object, required: true }
  },
  computed: {
    tags: function() {
      if (!this.post.fields.tags) return []
      return this.post.fields.tags
        .map(t => this.$store.getters['tag/tagOfName'](t))
        .filter(t => t != null)
    },
    category() {
      if (!this.post.fields.category) return null

      return this.$store.getters['category/categoryOfName'](
        this.post.fields.category[0]
      )
    }
  }
}
</script>

<style scoped lang="postcss">
.article {
  @apply overflow-hidden rounded-lg bg-white;
}
.article:hover {
  -webkit-transform: translateY(-0.25rem);
  -ms-transform: translateY(-0.25rem);
  transform: translateY(-0.25rem);
  @apply shadow-lg;
}
</style>
