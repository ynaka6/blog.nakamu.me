<template>
  <categories />
</template>

<script>
const Categories = () => import('~/components/organisms/Categories')

export default {
  components: { Categories },
  validate({ params, query, store }) {
    return !params.page || /^\d+$/.test(params.page)
  },
  head() {
    const link = []
    if (this.nextPage)
      link.push({
        rel: 'next',
        href: `/categories/${this.category}/page/${this.nextPage}`
      })
    if (this.prevPage)
      link.push({
        rel: 'prev',
        href:
          this.prevPage === 1
            ? `/categories/${this.category}`
            : `/categories/${this.category}/page/${this.prevPage}`
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
    store.dispatch('category/setCategory', { category: params.category })

    if (payload) {
      if (payload.author) {
        store.dispatch('author/setAuthor', payload)
      }
      if (payload.posts) {
        store.dispatch('category/setPosts', payload)
      }
      if (payload.loadLatestPosts) {
        store.dispatch('post/setLatestPosts', payload)
      }
    } else {
      await Promise.all([
        store.dispatch('author/loadAuthor'),
        store.dispatch('category/loadPosts', parseInt(params.page) || 1),
        store.dispatch('post/loadLatestPosts', 6)
      ])
    }

    return {
      category: params.category,
      title: `${params.category}${
        store.getters['category/page'] > 1
          ? ' - ' + store.getters['category/page'] + 'ページ目'
          : ''
      }`,
      description: `${params.category}${
        store.getters['category/page'] > 1
          ? ' - ' + store.getters['category/page'] + 'ページ目'
          : ''
      }に関する情報をまとめたページです。本ブログでは筆者のエンジニアとしての経験をブログとして残しています。エンジニアを目指す方やIT業界に興味がある方、または海外移住に興味がある方向けの記事を投稿しています。`,
      author: store.getters['author/author'],
      page: store.getters['category/page'],
      prevPage: store.getters['category/prevPage'],
      nextPage: store.getters['category/nextPage']
    }
  }
}
</script>
