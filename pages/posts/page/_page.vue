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
  head() {
    const link = []
    if (this.nextPage)
      link.push({ rel: 'next', href: `/posts/page/${this.nextPage}` })
    if (this.prevPage)
      link.push({
        rel: 'prev',
        href: this.prevPage === 1 ? '/posts' : `/posts/page/${this.prevPage}`
      })
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: this.description },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
        {
          id: 'twitter:author',
          name: 'twitter:author',
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
        }
      ],
      link: link
    }
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

    return {
      title: `投稿一覧${
        store.getters['post/page'] > 1
          ? ' - ' + store.getters['post/page'] + 'ページ目'
          : ''
      }`,
      description: `投稿一覧${
        store.getters['post/page'] > 1
          ? ' - ' + store.getters['post/page'] + 'ページ目'
          : ''
      }です。エンジニアとして経験をブログとして残しています。エンジニアを目指す方やIT業界に興味がある方、海外移住に興味がある方向けの記事を投稿しています。`,
      author: store.getters['author/author'],
      page: store.getters['post/page'],
      prevPage: store.getters['post/prevPage'],
      nextPage: store.getters['post/nextPage']
    }
  }
}
</script>
