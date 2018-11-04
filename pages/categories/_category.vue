<template>

  <main>
    <section class="hero is-primary">
      <div class="tabs is-boxed is-centered main-menu" id="nav">
        <ul>
            <li>
                <router-link to="/posts">
                  全て
                </router-link>
            </li>
            <li :class="{'is-active': c === category}" v-for="(c, index) in categories" :key="index">
                <nuxt-link
                    :to="`/categories/${c}/`">{{ c }}</nuxt-link>
            </li>
        </ul>
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
                <a href="#" aria-current="page">{{ category }}に関する投稿（{{ posts.length }}）</a>
            </li>
        </ul>
      </div>
    </nav>

    <section class="section" v-if="posts.length">
        <div class="container">
            <div class="columns">
                <div class="column is-8">
                    <div class="has-text-centered m-b-30">
                        <h1 class="title is-underline font-quicksand">{{ category }}に関する投稿（{{ posts.length }}）</h1>
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
import CardPost from '~/components/organisms/cards/Post.vue'
import Tags from '~/components/organisms/Tags.vue'
import CardProfile from '~/components/organisms/cards/Profile.vue'
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
            'fields.category[in]': params.category,
            order: '-fields.publishDate'
            }),
            client.getContentType(process.env.CTF_BLOG_POST_TYPE_ID)
        ])

        return {
            person: entries.items[0],
            posts: posts.items,
            category: params.category,
            categories: postType.fields.find(field => field.id === 'category').items.validations[0].in,
            tags: postType.fields.find(field => field.id === 'tags').items.validations[0].in,
            title: `#${params.category}の投稿一覧`,
            description: `#${params.category}の投稿一覧ページです。`
        }
    },
    components: {
        CardPost,
        Tags,
        CardProfile
    }
}
</script>
