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
    if (payload) {
      if (payload.author) {
        store.dispatch('author/setAuthor', payload)
      }
      if (payload.posts) {
        store.dispatch('post/setPosts', payload)
      }
    } else {
      await Promise.all([
        store.dispatch('author/loadAuthor'),
        store.dispatch('post/loadPosts', parseInt(params.page) || 1)
      ])
    }
  }
}
</script>
