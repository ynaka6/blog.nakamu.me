<template>
  <home />
</template>

<script>
const Home = () => import('~/components/organisms/Home')
export default {
  components: { Home },
  async asyncData({ store, params, payload }) {
    if (payload) {
      if (payload.author) {
        store.dispatch('author/setAuthor', payload)
      }
      if (payload.loadLatestPosts) {
        store.dispatch('post/setLatestPosts', payload)
      }
    } else {
      await Promise.all([
        store.dispatch('author/loadAuthor'),
        store.dispatch('post/loadLatestPosts', {
          order: '-fields.publishDate',
          limit: 6
        })
      ])
    }
  }
}
</script>

<style scoped></style>
