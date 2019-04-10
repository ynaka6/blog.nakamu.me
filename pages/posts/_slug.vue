<template>
  <post />
</template>

<script>
const Post = () => import('~/components/organisms/Post')

export default {
  components: { Post },
  validate({ params, query, store }) {
    return !params.page || /^\d+$/.test(params.page)
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: this.description },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          id: 'twitter:author',
          name: 'twitter:author',
          content: this.author ? this.author.fields.twitter : ''
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.post
            ? `${process.env.HTTP_SCHEMA}:${
                this.post.fields.heroImage.fields.file.url
              }
            `
            : ''
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
      if (payload.post) {
        store.dispatch('post/setPost', payload)
      }
      if (payload.prevPost) {
        store.dispatch('post/setPrevPost', payload)
      }
      if (payload.nextPost) {
        store.dispatch('post/setNextPost', payload)
      }
      if (payload.loadLatestPosts) {
        store.dispatch('post/setLatestPosts', payload)
      }
    } else {
      await Promise.all([
        store.dispatch('author/loadAuthor'),
        store.dispatch('post/loadPost', params.slug),
        store.dispatch('post/loadLatestPosts', 6)
      ])
    }

    const post = store.getters['post/post']
    const breadcrumb = [
      { link: '/', label: 'Home', icon: 'home-solid' },
      { link: '/posts', label: '記事一覧' }
    ]

    if (post.fields.category) {
      const category = store.getters['category/categoryOfName'](
        post.fields.category[0]
      )
      if (category) {
        breadcrumb.push({
          link: `/categories/${category.slug}`,
          label: category.name
        })
      }
    }
    breadcrumb.push({ link: null, label: post.fields.title })
    store.dispatch('setBreadcrumb', breadcrumb)

    return {
      title: `${store.getters['post/post'].fields.title}`,
      description: `${store.getters['post/post'].fields.description}`,
      post: post,
      author: store.getters['author/author']
    }
  }
}
</script>
