<template>
  <main>
    <CategoryMenu
        :selected="null"
        :categories="categories"
    />
    <nav class="breadcrumb is-bg-white has-succeeds-separator has-shadow" aria-label="breadcrumbs">
      <div class="container">
        <ul>
            <li>
                <router-link to="/">
                  HOME
                </router-link>
            </li>
            <li class="is-active">
                <a href="#" aria-current="page">投稿一覧（{{ posts.length }}）</a>
            </li>
        </ul>
      </div>
    </nav>

    <section class="articles section" v-if="posts.length">
        <div class="container">
            <div class="columns">
                <div class="column is-8">
                    <div class="has-text-centered m-b-30">
                        <h1 class="title is-underline font-quicksand">投稿一覧（{{ posts.length }}）</h1>
                        <p class="subtitle has-text-grey is-6">記事一覧</p>
                    </div>
                    <div class="columns is-multiline">
                        <div class="column is-flex is-6" v-for="(post, index) in posts" :key="index">
                            <CardPost :post="post"></CardPost>
                        </div>
                    </div>
                    <div class="is-clearfix">
                        <div v-if="prevPage && prevPage < page" class="is-pulled-left">
                            <nuxt-link v-if="1 == prevPage" class="button is-large is-circle is-light" :to="{ name: 'posts' }">
                                <i class="fas fa-angle-left"></i>
                            </nuxt-link>
                            <nuxt-link v-else class="button is-large is-circle is-light" :to="{ name: 'posts-page-page', params: { page: prevPage }}">
                                <i class="fas fa-angle-left"></i>
                            </nuxt-link>
                            <p class="is-size-7 m-t-5">
                                前のページ
                            </p>
                        </div>
                        <div v-if="nextPage && nextPage > page" class="is-pulled-right">
                            <nuxt-link class="button is-large is-circle is-light" :to="{ name: 'posts-page-page', params: { page: nextPage }}">
                                <i class="fas fa-angle-right"></i>
                            </nuxt-link>
                            <p class="is-size-7 m-t-5">
                                次のページ
                            </p>
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
import CardProfile from '~/components/organisms/cards/Profile.vue'
import TagList from '~/components/organisms/lists/TagList.vue'
import {createClient} from '~/plugins/contentful.js'

const client = createClient()
export default {
    validate({ params, query, store }) {
        return !params.page || /^\d+$/.test(params.page)
    },
    head () {
        const link = []
        if (this.nextPage) link.push({ rel: 'next', href: `/posts/page/${this.nextPage}/` })
        if (this.prevPage) link.push({ rel: 'prev', href: (1 == this.prevPage ? '/posts' : `/posts/page/${this.prevPage}/`) })
        return {
            title: this.title,
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
            ],
            link: link,
        }
    },
    async asyncData ({ app, params }) {
        const page = parseInt(params.page) || 1
        const limit = parseInt(process.env.PAGENATE_LIMIT) || 20
        const skip = (page - 1) * limit
        const [　entries, posts, postType ] = await Promise.all([
            client.getEntries({
                'sys.id': process.env.CTF_PERSON_ID
            }),
            client.getEntries({
                'content_type': process.env.CTF_BLOG_POST_TYPE_ID,
                order: '-fields.publishDate',
                skip: skip,
                limit: limit + 1
            }),
            client.getContentType(process.env.CTF_BLOG_POST_TYPE_ID)
        ])

        const prevPage = page > 1 ? page - 1 : null
        const nextPage = posts.items.length > limit ? page + 1 : null
        if (nextPage) {
            posts.items.pop()
        }
        return {
            person: entries.items[0],
            posts: posts.items,
            tags: postType.fields.find(field => field.id === 'tags').items.validations[0].in,
            title: `投稿一覧`,
            description: `投稿一覧ページです。`,
            categories: postType.fields.find(field => field.id === 'category').items.validations[0].in,
            page: page,
            prevPage: prevPage,
            nextPage: nextPage
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
