<template>
  <div>
    <breadcrumb
      :list="[{ link: '/', label: 'Home' }, { link: null, label: '記事一覧' }]"
    />
    <section class="container mx-auto">
      <div class="flex flex-col lg:flex-row">
        <div class="lg:w-2/3 p-4">
          <n-title>
            記事一覧
          </n-title>
          <div class="flex flex-wrap justify-center">
            <div
              v-for="(post, index) in $store.getters['post/posts']"
              :key="index"
              :to="`/posts/${post.slug}`"
              class="flex my-4 px-1 w-full md:w-1/2"
            >
              <post-card :post="post" />
            </div>
          </div>
          <pagination :prev-url="prevUrl" :next-url="nextUrl" />
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
import Breadcrumb from '~/components/molecules/Breadcrumb'
import PostCard from '~/components/molecules/Post/PostCard'
import ProfileCard from '~/components/molecules/Profile/ProfileCard'
import Pagination from '~/components/molecules/Pagination'

export default {
  components: { NTitle, Breadcrumb, PostCard, ProfileCard, Pagination },
  data: () => ({}),
  computed: {
    prevUrl: function() {
      if (!this.$store.getters['post/isPrevPage']) return null
      const prevPage = this.$store.getters['post/prevPage']
      if (prevPage === 1) {
        return `/posts`
      }
      return `/posts/page/${this.$store.getters['post/prevPage']}`
    },
    nextUrl: function() {
      if (!this.$store.getters['post/isNextPage']) return null
      const prevPage = this.$store.getters['post/nextPage']
      if (prevPage === 1) {
        return `/posts`
      }
      return `/posts/page/${this.$store.getters['post/nextPage']}`
    }
  }
}
</script>
