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
            <li data-target="pane-1" v-for="(category, index) in categories" :key="index">
                <nuxt-link
                    :to="{ name: 'categories-category', params: { category: category }}">{{ category }}</nuxt-link>
            </li>
        </ul>
       </div>
    </section>
    <div class="box">
      <p class="has-text-centered">
        訪問ありがとうございます！<a :href="person.fields.url" target="_blank" rel="noreferrer">プロフィールサイト <sup><i class="fas fa-external-link-alt"></i></sup></a>も合わせてご確認ください🙇
      </p>
    </div>
    <section class="section">
        <div class="container">
            <div class="columns">
                <div class="column is-8">
                    <div class="has-text-centered m-b-30">
                        <h2 class="title is-underline font-quicksand">Services</h2>
                        <p class="subtitle has-text-grey is-6">本ブログについての説明</p>
                    </div>
                    <div class="columns m-b-20">
                        <div class="column is-6 is-flex">
                            <div class="card is-shady">
                                <div class="card-content">
                                    <div class="content">
                                        <h4 class="m-b-5"><span class="shadow is-primary">〜 本ブログの目的 〜</span></h4>
                                        <p class="subtitle has-text-grey is-7">なぜ記事を書くのか？</p>
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
                                        <p class="subtitle has-text-grey is-7">どんな人に読んでもらいたいのか？</p>
                                        <p>目的でも述べた通り自分へのメッセージ性が強いブログではありますが、<span class="shadow is-danger">"エンジニアとしてスタートしたばかりの初学者"</span>や<span class="shadow is-danger">"エンジニアのキャリアに悩んでいる方などのサポート"</span>ができればと考えています。現時点では<nuxt-link :to="{ name: 'posts-slug', params: { slug: 'i-am-programming-mentor' }}">メンター活動</nuxt-link>がその一貫です。ブログ上でも貢献していきたいと考えています。</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="posts.length">
                        <div class="has-text-centered m-b-30">
                            <h2 class="title is-underline font-quicksand">Latest Articles</h2>
                            <p class="subtitle has-text-grey is-6">最新記事</p>
                        </div>
                        <div class="columns is-multiline">
                            <div class="column is-flex is-6" v-for="(post, index) in posts" :key="index">
                                <CardPost :post="post"></CardPost>
                            </div>
                        </div>

                        <div class="columns has-text-centered m-t-30">
                            <div class="column">
                                <MoreButton 
                                    href="/posts"
                                    v-on:click="$router.push('/posts')"
                                />
                            </div>
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

import MoreButton from '~/components/molecules/buttons/MoreButton.vue'

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
            categories: postType.fields.find(field => field.id === 'category').items.validations[0].in,
            tags: postType.fields.find(field => field.id === 'tags').items.validations[0].in,
            title: 'なかむ🇭🇰エンジニアブログ | 世界を旅して暮らしたい放浪エンジニアブログ',
            description: '香港在住のWebデベロッパー「なかむ」が今ままでのエンジニア経験を元にした技術ブログまとめます。',
        }
    },
    components: {
        CardPost,
        CardProfile,
        Tags,
        MoreButton
    }
}
</script>

