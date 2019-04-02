<template>
  <contact />
</template>

<script>
const Contact = () => import('~/components/organisms/Contact')
export default {
  components: { Contact },
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
          hid: 'robots',
          name: 'robots',
          content: 'noindex'
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
      await Promise.all([store.dispatch('author/loadAuthor')])
    }
    return {
      title: '問い合わせ画面',
      description:
        '本ブログへの質問やお仕事、メンターの依頼は問い合わせフォームからご連絡ください',
      author: store.getters['author/author']
    }
  }
}
</script>

<style scoped></style>
