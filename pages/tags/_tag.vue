<template>
  <main>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="has-text-centered title is-size-2">
              #{{ tag }}の投稿 ({{ posts.length }})
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
                <a href="#" aria-current="page">#{{ tag }}の投稿</a>
            </li>
        </ul>
      </div>
    </nav>

    <section class="section" v-if="posts.length">
        <div class="container">
            <div class="columns">
                <div class="column is-8">
                    <div class="has-text-centered m-b-30">
                        <h2 class="title is-underline font-quicksand">Articles</h2>
                        <p class="subtitle has-text-grey is-6">記事一覧</p>
                    </div>
                    <div class="columns is-multiline">
                        <div class="column is-flex is-6" v-for="(post, index) in posts" :key="index">
                            <CardPost :post="post"></CardPost>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <CardProfile :person="person" />
                </div>
            </div>
        </div>
    </section>

    <Tags :tags="tags"/>
  </main>
</template>

<script>
import CardPost from '~/components/Card/Post.vue'
import Tags from '~/components/Tags.vue'
import CardProfile from '~/components/Card/Profile.vue'
import {createClient} from '~/plugins/contentful.js'

const client = createClient()
export default {
    head () {
        return {
            title: this.title ,
            meta: [
                { name: 'description', content: this.description },

                { name: 'twitter:card', content: 'summary' },
                { name: 'twitter:site', content: this.person ? this.person.fields.twitter : '' },
                { name: 'twitter:creator', content: this.person ? this.person.fields.twitter : '' },
              　{ name: 'twitter:image', content: 'https://images.ctfassets.net/httuqftbm1yv/6A64KKKMmsY2W82Wgy082S/116a0e43794cbd6a00556c20c6131203/nakamu_blog_banner.png?w=1000&h=562&fit=fill' },
                { name: 'twitter:title', content: this.title },
                { name: 'twitter:description', content: this.description },

                { name: 'og:title', content: this.title },
                { name: 'og:description', content: this.description },
            ]
        }
    },
    async asyncData ({ app, params }) {
        const [　entries, posts, postType ] = await Promise.all([
            client.getEntries({
                'sys.id': process.env.CTF_PERSON_ID
            }),
            client.getEntries({
            'content_type': process.env.CTF_BLOG_POST_TYPE_ID,
            'fields.tags[in]': params.tag,
            order: '-fields.publishDate'
            }),
            client.getContentType(process.env.CTF_BLOG_POST_TYPE_ID)
        ])
        return {
            person: entries.items[0],
            posts: posts.items,
            tag: params.tag,
            tags: postType.fields.find(field => field.id === 'tags').items.validations[0].in,
            title: `#${params.tag}の投稿一覧`,
            description: `#${params.tag}の投稿一覧ページです。`
        }
    },
    components: {
        CardPost,
        Tags,
        CardProfile
    }
}
</script>
