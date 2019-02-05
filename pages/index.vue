<template>
  <main>
    <CategoryMenu
        :selected="null"
        :categories="categories"
    />
    <div class="box">
      <p class="has-text-centered">
        訪問ありがとうございます！
        <a :href="person.fields.url" target="_blank" rel="noreferrer">
            プロフィールサイト 
            <sup>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 1792 1792" fill="currentColor"><path d="M1408 928v320q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h704q14 0 23 9t9 23v64q0 14-9 23t-23 9h-704q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113v-320q0-14 9-23t23-9h64q14 0 23 9t9 23zm384-864v512q0 26-19 45t-45 19-45-19l-176-176-652 652q-10 10-23 10t-23-10l-114-114q-10-10-10-23t10-23l652-652-176-176q-19-19-19-45t19-45 45-19h512q26 0 45 19t19 45z"/></svg>
            </sup>
        </a>
        も合わせてご確認ください🙇🏻
      </p>
    </div>
    <section class="section">
        <div class="container">
            <div class="columns">
                <div class="column is-8">
                    <div class="has-text-centered m-b-30">
                        <h2 class="title is-underline font-quicksand">Services</h2>
                        <p class="subtitle has-text-dark is-6">本ブログについての説明</p>
                    </div>
                    <div class="columns m-b-20">
                        <div class="column is-6 is-flex">
                            <div class="card is-shady">
                                <div class="card-content">
                                    <div class="content">
                                        <h4 class="m-b-5"><span class="shadow is-primary">〜 本ブログの目的 〜</span></h4>
                                        <p class="subtitle has-text-dark is-7">なぜ記事を書くのか？</p>
                                        <p><span class="shadow is-danger">未来の自分に伝えたいこと</span>や<span class="shadow is-danger">メモ、記録として残しておきたいこと</span>などをメインに記事を投稿しています。エンジニアとして経験したことだけでなく、気になっていた技術、やってみたい技術など思っていることを履歴として残していきます。</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column is-6 is-flex">
                            <div class="card is-shady">
                                <div class="card-content">
                                    <div class="content">
                                        <h4 class="m-b-5"><span class="shadow is-primary">〜 伝えたい内容 〜</span></h4>
                                        <p class="subtitle has-text-dark is-7">どんな人に読んでもらいたいのか？</p>
                                        <p>目的でも述べた通り自分へのメッセージ性が強いブログではありますが、<span class="shadow is-danger">"エンジニアとしてスタートしたばかりの初学者"</span>や<span class="shadow is-danger">"エンジニアのキャリアに悩んでいる方などのサポート"</span>ができればと考えています。現時点では<nuxt-link :to="{ name: 'posts-slug', params: { slug: 'i-am-programming-mentor' }}">メンター活動</nuxt-link>がその一貫です。ブログ上でも貢献していきたいと考えています。</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        class="m-b-40"
                        v-if="posts.length"
                    >
                        <div class="has-text-centered m-b-30">
                            <h2 class="title is-underline font-quicksand">Tech Articles</h2>
                            <p class="subtitle has-text-dark is-6">技術 - 最新記事</p>
                        </div>
                        <div class="columns is-multiline">
                            <div class="column is-flex is-6" v-for="(post, index) in posts" :key="index">
                                <CardPost :post="post"></CardPost>
                            </div>
                        </div>
                    </div>

                    <div
                        class="m-b-40"
                        v-if="lifePosts.length"
                    >
                        <div class="has-text-centered m-b-30">
                            <h2 class="title is-underline font-quicksand">Life Articles</h2>
                            <p class="subtitle has-text-dark is-6">生活 - 最新記事</p>
                        </div>
                        <div class="columns is-multiline">
                            <div class="column is-flex is-6" v-for="(post, index) in lifePosts" :key="index">
                                <CardPost :post="post"></CardPost>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="column">
                    <CardProfile :person="person" />
                    <TagList
                        v-if="tags.length"
                        title="Tags"
                        subtitle="タグ"
                        :tags="tags"
                    />
                </div>
            </div>
        </div>
    </section>
  </main>
</template>

<script>
import CategoryMenu from '~/components/molecules/tabs/CategoryMenu.vue'
import CardPost from '~/components/organisms/cards/Post.vue'
import TagList from '~/components/organisms/lists/TagList.vue'
import CardProfile from '~/components/organisms/cards/Profile.vue'

import {createClient} from '~/plugins/contentful.js'
const client = createClient()

export default {
    head () {
        return {
            title: this.title,
            titleTemplate: '%s',
            meta: [
                { hid: 'description', name: 'description', content: this.description },

                { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
                { hid: 'twitter:creator', name: 'twitter:creator', content: this.person ? this.person.fields.twitter : '' },
                { hid: 'twitter:image', name: 'twitter:image', content: 'https://images.ctfassets.net/httuqftbm1yv/6A64KKKMmsY2W82Wgy082S/116a0e43794cbd6a00556c20c6131203/nakamu_blog_banner.png?w=1000&h=562&fit=fill' },
                { hid: 'twitter:title', name: 'twitter:title', content: this.title },
                { hid: 'twitter:description', name: 'twitter:description', content: this.description },

                { hid: 'og:title', name: 'og:title', content: this.title },
                { hid: 'og:description', name: 'og:description', content: this.description },
            ]
        }
    },
    async asyncData (context) {
        const [　entries, posts, lifePosts, postType ] = await Promise.all([
            client.getEntries({
                'sys.id': process.env.CTF_PERSON_ID
            }),
            client.getEntries({
                'content_type': process.env.CTF_BLOG_POST_TYPE_ID,
                'fields.category[nin]': '海外生活',
                order: '-fields.publishDate',
                limit: 6
            }),
            client.getEntries({
                'content_type': process.env.CTF_BLOG_POST_TYPE_ID,
                'fields.category[in]': '海外生活',
                order: '-fields.publishDate',
                limit: 6
            }),
            client.getContentType(process.env.CTF_BLOG_POST_TYPE_ID)
        ])

        return {
            person: entries.items[0],
            posts: posts.items,
            lifePosts: lifePosts.items,
            categories: postType.fields.find(field => field.id === 'category').items.validations[0].in,
            tags: postType.fields.find(field => field.id === 'tags').items.validations[0].in,
            title: 'なかむ🇭🇰エンジニアブログ | 世界を旅して暮らしたい放浪エンジニアブログ',
            description: '香港在住のWebデベロッパー「なかむ」が今ままでのエンジニア経験を元にした技術ブログまとめます。',
        }
    },
    components: {
        CategoryMenu,
        CardPost,
        CardProfile,
        TagList
    }
}
</script>

