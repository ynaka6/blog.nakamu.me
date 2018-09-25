<template>
  <main>
    <section class="section" v-if="posts.length">
        <div class="container">
            <div class="columns">
                <div class="column is-8">
                    <div class="has-text-centered m-b-30">
                        <h2 class="title is-underline font-quicksand">Latest Articles</h2>
                        <p class="subtitle has-text-grey is-6">最新記事</p>
                    </div>
                    <div class="columns is-multiline">
                        <div class="column is-flex is-6" v-for="(post, index) in posts" :key="index">
                            <PostCard :post="post"></PostCard>
                        </div>
                    </div>

                    <div class="columns has-text-centered m-t-30">
                    <div class="column">
                        <router-link to="/posts/" class="button is-primary is-outlined is-rounded is-large">
                            もっとみる
                        </router-link>
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
import PostCard from '~/components/Post/Card.vue'
import Tags from '~/components/Tags.vue'
import CardProfile from '~/components/Card/Profile.vue'
import {createClient} from '~/plugins/contentful.js'
const client = createClient()

export default {
    head () {
        return {
            title: this.title,
            titleTemplate: '%s',
            meta: [
                { name: 'description', content: this.description },

                { name: 'twitter:card', content: 'summary_large_image' },
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
        const [　entries, posts, postType ] = await Promise.all([
            client.getEntries({
                'sys.id': process.env.CTF_PERSON_ID
            }),
            client.getEntries({
                'content_type': process.env.CTF_BLOG_POST_TYPE_ID,
                order: '-fields.publishDate',
                limit: 6
            }),
            client.getContentType(process.env.CTF_BLOG_POST_TYPE_ID)
        ])

        return {
            person: entries.items[0],
            posts: posts.items,
            // TODO : APIから項目の一覧が取得できないので調査する
            // categories: postType.fields.find(field => field.id === 'category').validations[0].in,
            categories: [ 'フロントエンド', 'バックエンド', 'プログラミング', 'その他' ],
            tags: postType.fields.find(field => field.id === 'tags').items.validations[0].in,
            title: 'なかむ🇭🇰エンジニアブログ | 自由な場所でエンジニアとして生きていくためのメディア',
            description: '香港在住のWebデベロッパー「なかむ」が今ままでのエンジニア経験を元にした技術ブログまとめます。',
        }
    },
    components: {
        PostCard,
        Tags,
        CardProfile
    },
}
</script>

