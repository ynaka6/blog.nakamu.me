<template>
  <posts />
</template>

<script>
const Posts = () => import('~/components/organisms/Posts')

export default {
  components: { Posts },
  validate({ params, query, store }) {
    return !params.page || /^\d+$/.test(params.page)
  },
  async asyncData({ store, params, payload }) {
    if (payload && payload.posts) {
      store.dispatch('post/setPosts', payload)
    } else {
      await store.dispatch('post/loadPosts', parseInt(params.page) || 1)
    }
  }
}
</script>
