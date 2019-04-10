<template>
  <privacy-policy />
</template>

<script>
const PrivacyPolicy = () => import('~/components/organisms/PrivacyPolicy')
export default {
  components: { PrivacyPolicy },
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
      await store.dispatch('author/loadAuthor')
    }

    store.dispatch('setBreadcrumb', [
      { link: '/', label: 'Home' },
      { link: null, label: 'プライバシーポリシー' }
    ])

    return {
      title: 'プライバシーポリシー',
      description: 'プライバシーポリシーのページです。',
      author: store.getters['author/author']
    }
  }
}
</script>

<style scoped></style>
