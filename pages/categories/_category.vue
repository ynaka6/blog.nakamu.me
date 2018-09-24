<template>

  <main v-if="posts.length">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="has-text-centered title is-size-2">
              "{{ category }}"の投稿 ({{ posts.length }})
          </h1>
        </div>
      </div>
      <div class="tabs is-boxed is-centered main-menu" id="nav">
        <ul>
            <li>
                <router-link to="/">
                  HOME
                </router-link>
            </li>
            <li :class="{'is-active': c === category}" v-for="(c, index) in categories" :key="index">
                <nuxt-link
                    :to="{ name: 'categories-category', params: { category: c }}" class="is-active">{{ c }}</nuxt-link>
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
                <a href="#" aria-current="page">{{ category }}に関する投稿</a>
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
                            <PostCard :post="post"></PostCard>
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
  <Loading v-else />
</template>

<script>
import Loading from '~/components/Loading.vue'
import PostCard from '~/components/Post/Card.vue'
import Tags from '~/components/Tags.vue'
import CardProfile from '~/components/Card/Profile.vue'
import {createClient} from '~/plugins/contentful.js'

const client = createClient()
const initData = async ({ app, params }) => {
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
        // categories: postType.fields.find(field => field.id === 'category').validations[0].in,
        categories: [ 'フロントエンド', 'バックエンド', 'プログラミング', 'その他' ],
        tags: postType.fields.find(field => field.id === 'tags').items.validations[0].in,
        title: `#${params.category}の投稿一覧`,
        description: `#${params.category}の投稿一覧ページです。`
    }
}


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
    async asyncData (context) {
        if (process.browser) {
            return {
                person: null,
                posts: [],
                category: context.params.category,
                // categories: postType.fields.find(field => field.id === 'category').validations[0].in,
                categories: [ 'フロントエンド', 'バックエンド', 'プログラミング', 'その他' ],
                tags: [],
                title: `#${context.params.category}の投稿一覧`,
                description: `#${context.params.category}の投稿一覧ページです。`
            }
        }
        return await initData(context);
    },
    async mounted () {
        if (this.$store.getters.isFirstView) {
            this.$store.dispatch('setFirstView', {
                firstView: false
            });
        } else {
            const { person, posts, tags } = await initData({ app: this, params: this.$route.params });
            this.person = person;
            this.posts = posts;
            this.tags = tags;
        }
    },
    components: {
        Loading,
        PostCard,
        Tags,
        CardProfile
    }
}
</script>
