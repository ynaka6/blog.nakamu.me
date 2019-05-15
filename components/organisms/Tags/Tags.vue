<template>
  <div>
    <section class="container mx-auto">
      <div class="flex flex-col lg:flex-row">
        <div class="lg:w-2/3 p-4">
          <n-title class="text-3xl">
            <n-icon icon="tag" class="w-5 h-5" />
            {{ $store.getters['tag/tag'].name }}
          </n-title>
          <information-box>
            <p
              v-if="$store.getters['tag/tag'].description"
              class="text-sm text-gray-600"
              v-text="$store.getters['tag/tag'].description"
            ></p>
            <p
              v-else
              class="text-sm text-gray-600"
              v-text="
                `
                ${$store.getters['tag/tag'].name}
                に関する技術情報をまとめ記事になります
                `
              "
            ></p>
          </information-box>
          <div class="flex flex-wrap justify-center">
            <div
              v-for="(post, index) in $store.getters['tag/posts']"
              :key="index"
              :to="`/posts/${post.slug}/`"
              class="flex my-4 px-1 w-full md:w-1/2"
            >
              <post-card :post="post" />
            </div>
          </div>
          <pagination :prev-url="prevUrl" :next-url="nextUrl" />
          <p class="pt-10">
            <n-link
              to="/posts"
              class="text-blue-600 hover:text-blue-300 no-underline hover:underline inline-flex"
            >
              記事一覧に戻る
            </n-link>
          </p>
        </div>
        <div class="lg:w-1/3 lg:p-4">
          <profile-card
            :author="$store.getters['author/author']"
            class="m-4 lg:m-0"
          />
          <post-list
            label="Latest Posts"
            :posts="latestPosts"
            class="mt-10 mb-10"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NLink from '~/components/atoms/links/NLink'
import NTitle from '~/components/atoms/titles/NTitle'
import PostCard from '~/components/molecules/Post/PostCard'
import ProfileCard from '~/components/molecules/Profile/ProfileCard'
import InformationBox from '~/components/molecules/Message/InformationBox'
import PostList from '~/components/molecules/Post/PostList'
import Pagination from '~/components/molecules/Pagination'

export default {
  components: {
    NLink,
    NTitle,
    PostCard,
    ProfileCard,
    InformationBox,
    PostList,
    Pagination
  },
  data: () => ({}),
  computed: {
    tag: function() {
      return this.$store.getters['tag/tag']
    },
    latestPosts: function() {
      return this.$store.getters['post/latestPosts']
    },
    prevUrl: function() {
      if (!this.$store.getters['tag/isPrevPage']) return null
      const prevPage = this.$store.getters['tag/prevPage']
      if (prevPage === 1) {
        return `/tags/${this.tag.slug}`
      }
      return `/tags/${this.tag.slug}/page/${prevPage}`
    },
    nextUrl: function() {
      if (!this.$store.getters['tag/isNextPage']) return null
      const nextPage = this.$store.getters['tag/nextPage']
      if (nextPage === 1) {
        return `/tags/${this.category.slug}`
      }
      return `/tags/${this.tag.slug}/page/${nextPage}`
    }
  }
}
</script>
