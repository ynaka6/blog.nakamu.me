<template>
  <main>

    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="has-text-centered title is-size-2">
              投稿一覧 ({{ posts.length }})
          </h1>
        </div>
      </div>
    </section>

    <nav class="breadcrumb is-bg-white has-succeeds-separator has-shadow" aria-label="breadcrumbs">
      <div class="container">
        <ul>
            <li>
                <router-link to="/">
                  HOME
                </router-link>
            </li>
            <li class="is-active">
                <a href="#" aria-current="page">投稿一覧</a>
            </li>
        </ul>
      </div>
    </nav>

    <section class="articles section">
        <div class="has-text-centered m-b-30">
            <h2 class="title is-underline font-quicksand">Articles</h2>
            <p class="subtitle has-text-grey is-6">記事一覧</p>
        </div>
        <div class="columns is-multiline is-tablet">
          <div class="column is-flex is-6-tablet is-4-desktop" v-for="(post, index) in posts" :key="index">
              <PostCard :post="post"></PostCard>
          </div>
        </div>
    </section>

    <Tags :tags="tags"/>
  </main>
</template>

<script>
import PostCard from '~/components/Post/Card.vue'
import Tags from '~/components/Tags.vue'
import {createClient} from '~/plugins/contentful.js'

const client = createClient()

export default {
  head () {
    return {
        title: this.title,
        meta: [
            { name: 'description', content: this.description },

            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:site', content: this.person.fields.twitter },
            { name: 'twitter:creator', content: this.person.fields.twitter },
            { name: 'twitter:image', content: 'https://images.ctfassets.net/httuqftbm1yv/6A64KKKMmsY2W82Wgy082S/116a0e43794cbd6a00556c20c6131203/nakamu_blog_banner.png?w=1000&h=562&fit=fill' },
            { name: 'twitter:title', content: this.title },
            { name: 'twitter:description', content: this.description },

            { name: 'og:title', content: this.title },
            { name: 'og:description', content: this.description },
        ]
    }
  },
  asyncData ({env}) {
      return Promise.all([
                client.getEntries({
                    'sys.id': env.CTF_PERSON_ID
                }),
                client.getEntries({
                    'content_type': env.CTF_BLOG_POST_TYPE_ID,
                    order: '-sys.createdAt',
                }),
                client.getContentType(process.env.CTF_BLOG_POST_TYPE_ID)
            ]).then(([entries, posts, postType]) => {
                return {
                    person: entries.items[0],
                    posts: posts.items,
                    tags: postType.fields.find(field => field.id === 'tags').items.validations[0].in,
                    title: `投稿一覧`,
                    description: `投稿一覧ページです。`
                }
      }).catch(console.error)
  },
  components: {
      PostCard,
      Tags
  }
}
</script>
