<template>
  <div>
    <breadcrumb
      :list="[
        { link: '/', label: 'Home' },
        { link: '/posts', label: '記事一覧' },
        { link: `/categories/${category.slug}`, label: category.name },
        { link: null, label: post.fields.title }
      ]"
    />
    <section class="container mx-auto">
      <div class="flex flex-col lg:flex-row">
        <div class="lg:w-2/3 lg:p-4">
          <article
            class="border-b lg:border bg-white shadow-sm px-4 lg:px-6 py-6"
          >
            <post-date
              :publish-time="post.fields.publishDate"
              :update-time="post.sys.updatedAt"
            />
            <h1 class="my-2 text-2xl lg:text-3xl leading-tight">
              {{ post.fields.title }}
            </h1>
            <!-- eslint-disable vue/no-v-html -->
            <p
              class="text-sm text-grey-darker mb-4"
              v-html="post.fields.description"
            />
            <!--eslint-enable-->
            <div>
              <n-tag
                v-for="(tag, index) in tags"
                :key="index"
                :to="`/tags/${tag.slug}`"
                :label="tag.name"
                size="small"
              />
            </div>
            <div class="relative">
              <picture>
                <n-image
                  class="block h-auto w-full my-4"
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
              <p
                class="absolute pin-t pin-r font-bold text-grey-darkest text-xs bg-yellow py-1 px-3 mt-2 mx-2 rounded-full"
              >
                {{ category.name }}
              </p>
            </div>
            <post-content :content="post.fields.body" />
            <pagination :prev-url="prevUrl" :next-url="nextUrl" />
          </article>
        </div>
        <div class="lg:w-1/3 lg:p-4">
          <profile-card
            :author="$store.getters['author/author']"
            class="m-4 lg:m-0"
          />
          <post-list label="Latest Posts" :posts="latestPosts" class="my-10" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NTag from '~/components/atoms/links/NTag'
import NImage from '~/components/atoms/NImage'
import Breadcrumb from '~/components/molecules/Breadcrumb'
import ProfileCard from '~/components/molecules/Profile/ProfileCard'
import PostDate from '~/components/molecules/Post/PostDate'
import PostContent from '~/components/molecules/Post/PostContent'
import PostList from '~/components/molecules/Post/PostList'
import Pagination from '~/components/molecules/Pagination'

export default {
  components: {
    NTag,
    NImage,
    Breadcrumb,
    ProfileCard,
    PostContent,
    PostDate,
    PostList,
    Pagination
  },
  data: () => ({}),
  computed: {
    post() {
      return this.$store.getters['post/post']
    },
    category() {
      return this.$store.getters['category/categoryOfName'](
        this.$store.getters['post/post'].fields.category[0]
      )
    },
    tags: function() {
      if (!this.$store.getters['post/post'].fields.tags) return []
      return this.$store.getters['post/post'].fields.tags
        .map(t => this.$store.getters['tag/tagOfName'](t))
        .filter(t => t != null)
    },
    latestPosts: function() {
      return this.$store.getters['post/latestPosts']
    },
    prevUrl: function() {
      const prevPost = this.$store.getters['post/prevPost']
      if (prevPost) {
        return `/posts/${prevPost.fields.slug}`
      }
      return null
    },
    nextUrl: function() {
      const nextPost = this.$store.getters['post/nextPost']
      if (nextPost) {
        return `/posts/${nextPost.fields.slug}`
      }
      return null
    }
  }
}
</script>
