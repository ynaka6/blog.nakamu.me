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
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
        {
          hid: 'twitter:site',
          name: 'twitter:site',
          content: this.author ? this.author.fields.twitter : ''
        },
        {
          id: 'twitter:author',
          name: 'twitter:author',
          content: this.author ? this.author.fields.twitter : ''
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content:
            'https://images.ctfassets.net/httuqftbm1yv/6A64KKKMmsY2W82Wgy082S/116a0e43794cbd6a00556c20c6131203/nakamu_blog_banner.png?w=1000&h=562&fit=fill'
        },
        { hid: 'twitter:title', name: 'twitter:title', content: this.title },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.description
        },
        { hid: 'og:title', name: 'og:title', content: this.title },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.description
        }
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
    return {
      title: 'プライバシーポリシー',
      description: 'プライバシーポリシーのページです。',
      author: store.getters['author/author']
    }
  }
}
</script>

<style scoped></style>
