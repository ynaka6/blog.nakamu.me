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
          content: 'summary'
        },
        {
          hid: 'twitter:creator',
          name: 'twitter:creator',
          content: this.author ? this.author.fields.twitter : ''
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: `${process.env.BASE_URL}/icon.png`
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
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: `${process.env.BASE_URL}/icon.png`
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
    store.dispatch('setBreadcrumb', [
      { link: '/', label: 'Home', icon: 'home-solid' }
    ])
    return {
      title: `${process.env.APP_TITLE} | ${process.env.APP_SUBTITLE}`,
      description: process.env.APP_DESCRIPTION,
      author: store.getters['author/author']
    }
  }
}
</script>

<style scoped></style>
