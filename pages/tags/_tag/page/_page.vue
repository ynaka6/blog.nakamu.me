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
                <router-link to="/posts">
                  全て
                </router-link>
            </li>
            <li class="is-active">
                <a href="#" aria-current="page">#{{ tag }}の投稿（{{ posts.length }}）</a>
            </li>
        </ul>
      </div>
    </nav>

    <section class="section" v-if="posts.length">
        <div class="container">
            <div class="columns">
                <div class="column is-8">
                    <div class="has-text-centered m-b-30">
                        <h2 class="title is-underline font-quicksand">#{{ tag }}の投稿（{{ posts.length }}）</h2>
                        <p class="subtitle has-text-dark is-6">記事一覧</p>
                    </div>
                    <div class="columns is-multiline">
                        <div class="column is-flex is-6" v-for="(post, index) in posts" :key="index">
                            <CardPost :post="post"></CardPost>
                        </div>
                    </div>
                    <div class="is-clearfix">
                        <div v-if="prevPage && prevPage < page" class="is-pulled-left">
                            <nuxt-link v-if="1 == prevPage" class="button is-large is-circle is-light" :to="{ name: 'tags-tag', params: { tag: tag, page: null }}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1792 1792" fill="currentColor"><path d="M1203 544q0 13-10 23l-393 393 393 393q10 10 10 23t-10 23l-50 50q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23z"/></svg>
                            </nuxt-link>
                            <nuxt-link v-else class="button is-large is-circle is-light" :to="{ name: 'tags-tag-page-page', params: { tag: tag, page: prevPage }}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1792 1792" fill="currentColor"><path d="M1203 544q0 13-10 23l-393 393 393 393q10 10 10 23t-10 23l-50 50q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23z"/></svg>
                            </nuxt-link>
                            <p class="is-size-7 m-t-5">
                                前のページ
                            </p>
                        </div>
                        <div v-if="nextPage && nextPage > page" class="is-pulled-right">
                            <nuxt-link class="button is-large is-circle is-light" :to="{ name: 'tags-tag-page-page', params: { tag: tag, page: nextPage }}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1792 1792" fill="currentColor"><path d="M1171 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z"/></svg>
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
import TagList from '~/components/organisms/lists/TagList.vue'
import CardProfile from '~/components/organisms/cards/Profile.vue'
import {createClient} from '~/plugins/contentful.js'

const client = createClient()
export default {
    validate({ params, query, store }) {
        return !params.page || /^\d+$/.test(params.page)
    },
    head () {
        const link = []
        if (this.nextPage) link.push({ rel: 'next', href: `/tags/${this.tag}/page/${this.nextPage}/` })
        if (this.prevPage) link.push({ rel: 'prev', href: (1 == this.prevPage ? `/tags/${this.tag}` : `/tags/${this.tag}/page/${this.prevPage}/`) })
        return {
            title: this.title ,
            meta: [
                { hid: 'description', name: 'description', content: this.description },

                { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
                { hid: 'twitter:site', name: 'twitter:site', content: this.person ? this.person.fields.twitter : '' },
                { hid: 'twitter:creator', name: 'twitter:creator', content: this.person ? this.person.fields.twitter : '' },
              　{ hid: 'twitter:image', name: 'twitter:image', content: 'https://images.ctfassets.net/httuqftbm1yv/6A64KKKMmsY2W82Wgy082S/116a0e43794cbd6a00556c20c6131203/nakamu_blog_banner.png?w=1000&h=562&fit=fill' },
                { hid: 'twitter:title', name: 'twitter:title', content: this.title },
                { hid: 'twitter:description', name: 'twitter:description', content: this.description },

                { hid: 'og:title', name: 'og:title', content: this.title },
                { hid: 'og:description', name: 'og:description', content: this.description },
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
                'fields.tags[in]': params.tag,
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
            tag: params.tag,
            tags: postType.fields.find(field => field.id === 'tags').items.validations[0].in,
            title: `#${params.tag}の投稿一覧`,
            description: `#${params.tag}の投稿一覧ページです。`,
            categories: postType.fields.find(field => field.id === 'category').items.validations[0].in,
            page: page,
            prevPage: prevPage,
            nextPage: nextPage
        }
    },
    components: {
        CategoryMenu,
        CardPost,
        TagList,
        CardProfile
    }
}
</script>