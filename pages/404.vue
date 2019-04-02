<template>
  <not-found />
</template>

<script>
const NotFound = () => import('~/components/organisms/NotFound')
export default {
  components: { NotFound },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: this.description },
        { hid: 'robots', name: 'robots', content: 'noindex, nofollow' }
      ]
    }
  },
  async asyncData({ store, params, payload }) {
    if (payload) {
      if (payload.author) {
        store.dispatch('author/setAuthor', payload)
      }
    } else {
      await Promise.all([store.dispatch('author/loadAuthor')])
    }
    return {
      title: '404 - Page Not Found',
      description: '404 - Page Not Found',
      author: store.getters['author/author']
    }
  }
}
</script>

<style scoped></style>
