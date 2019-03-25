<template>
  <home />
</template>

<script>
const Home = () => import('~/components/organisms/Home')
export default {
  components: { Home },
  async asyncData({ store, params, payload }) {
    if (payload && payload.loadLatestPosts) {
      store.dispatch('post/setLatestPosts', payload)
    } else {
      await store.dispatch('post/loadLatestPosts', {
        order: '-fields.publishDate',
        limit: 6
      })
    }
  }
}
</script>

<style scoped></style>
