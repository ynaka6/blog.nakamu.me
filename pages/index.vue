<template>
  <main v-if="posts.length">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="has-text-centered title is-size-1 font-leckerli-one">
              Engineer Blog
          </h1>
          <div>
            <div class="control has-icons-left has-icons-right search-field" :class="{'is-large is-loading': this.loading}">
              <input type="text" placeholder="" class="input is-large is-rounded" v-model="keyword">
              <span class="icon is-medium is-left"><i class="fa fa-search"></i></span>
            </div>

            <div class="dropdown is-block is-fullwidth" :class="{'is-active': this.algoliaResults.length > 0}">
                <div class="dropdown-menu" style="width: 100%">
                    <div class="dropdown-content suggest__content">
                        <nuxt-link
                            v-for="(algoliaResult, index) in algoliaResults" :key="index"
                            :to="{ name: 'posts-slug', params: { slug: algoliaResult.slug }}"
                            class="dropdown-item"
                        >
                            <p class="suggest__item__title" v-html="algoliaResult._highlightResult.title.value"></p>
                            <p class="suggest__item__description has-text-grey" v-html="algoliaResult._highlightResult.description.value"></p>
                        </nuxt-link>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tabs is-boxed is-centered main-menu" id="nav">
        <ul>
            <li class="is-active">
                <nuxt-link
                    to="/">ホーム</nuxt-link>
            </li>
            <li data-target="pane-1" id="1" v-for="(category, index) in categories" :key="index">
                <nuxt-link
                    :to="{ name: 'categories-category', params: { category: category }}">{{ category }}</nuxt-link>
            </li>
        </ul>
       </div>
    </section>


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
                        <router-link to="/posts" class="button is-primary is-outlined is-rounded is-large">
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
  <Loading v-else />
</template>

<script>
import Loading from '~/components/Loading.vue'
import PostCard from '~/components/Post/Card.vue'
import Tags from '~/components/Tags.vue'
import CardProfile from '~/components/Card/Profile.vue'
import {createClient} from '~/plugins/contentful.js'
const client = createClient()

import algoliasearch from 'algoliasearch'
const algoliaSearch = algoliasearch(process.env.ALGOLIA_APPLICATION_ID, process.env.ALGOLIA_SEARCH_API_KEY)
const algoliaClient= algoliaSearch.initIndex('myblog')


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
            keyword: '',
            algoliaResults: [],
            loading: false,
        }
    },
    watch: {
        keyword: function(val) {
            if (val === '') {
                this.algoliaResults = []
                return
            }
            this.loading = true
            algoliaClient.search(val, function (err, content) {
                this.loading = false
                if (err) {
                    throw err
                }
                this.algoliaResults = content.hits
            }.bind(this))
        }
    },
    components: {
        Loading,
        PostCard,
        Tags,
        CardProfile
    },
}
</script>

<style lang="scss" scoped>
</style>

