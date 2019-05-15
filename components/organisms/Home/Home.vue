<template>
  <div>
    <section class="container mx-auto">
      <div class="flex flex-col lg:flex-row">
        <div class="lg:w-2/3 p-4">
          <n-title class="text-3xl">
            Latest Posts
          </n-title>
          <div class="flex flex-wrap justify-center">
            <div
              v-for="(post, index) in $store.getters['post/latestPosts']"
              :key="index"
              :to="`/posts/${post.slug}/`"
              class="flex my-4 px-1 w-full md:w-1/2"
            >
              <post-card :post="post" />
            </div>
          </div>
          <div class="flex justify-center">
            <n-link
              to="/posts"
              class="lg:w-1/3 block p-4 text-center text-gray-800 hover:text-gray-600 bg-white hover:bg-gray-700 border border-gray-800 no-underline"
            >
              記事をもっと見る
            </n-link>
          </div>
        </div>
        <div class="lg:w-1/3 p-4">
          <profile-card :author="$store.getters['author/author']" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NTitle from '~/components/atoms/titles/NTitle'
import NLink from '~/components/atoms/links/NLink'
import PostCard from '~/components/molecules/Post/PostCard'
import ProfileCard from '~/components/molecules/Profile/ProfileCard'

export default {
  components: { NTitle, NLink, PostCard, ProfileCard },
  data: () => ({}),
  computed: {
    author() {
      return this.$store.getters['author/author']
    }
  }
}
</script>
