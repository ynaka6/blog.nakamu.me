<template>
  <home />
</template>

<script>
const Home = () => import('~/components/organisms/Home')
export default {
  components: { Home },
  head() {
    return {
      title: this.title,
      titleTemplate: '%s',
      meta: [
        { hid: 'description', name: 'description', content: this.description },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          hid: 'twitter:creator',
          name: 'twitter:creator',
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
      if (payload.loadLatestPosts) {
        store.dispatch('post/setLatestPosts', payload)
      }
    } else {
      await Promise.all([
        store.dispatch('author/loadAuthor'),
        store.dispatch('post/loadLatestPosts', 6)
      ])
    }
    return {
      title: `${process.env.APP_TITLE} | ${process.env.APP_SUBTITLE}`,
      description: process.env.APP_DESCRIPTION,
      author: store.getters['author/author']
    }
  }
}
</script>

<style scoped></style>
