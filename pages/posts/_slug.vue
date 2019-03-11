<template>
  <main>
    <CategoryMenu
        :selected="post.fields.category[0]"
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
            <li v-if="post">
                <nuxt-link
                    :to="{ name: 'categories-category', params: { category: post.fields.category[0] }}">
                    {{ post.fields.category[0] }}
                </nuxt-link>
            </li>
            <li class="is-active" v-if="post">
                <a href="#" aria-current="page">{{ post.fields.title }}</a>
            </li>
        </ul>
      </div>
    </nav>

    <section class="section" v-if="post">
      <div class="container">
        <div class="columns">
          <div class="column is-8">
            <div class="card article">
              <div class="card-content">
                <div class="media">
                    <div class="media-content">
                      <PostDate :publishTime="publishDate" :updateTime="updateDate" />
                      <h1 class="title article__title">
                        {{ post.fields.title }}
                      </h1>
                      <p class="subtitle is-6 has-text-gray m-t-5" v-html="post.fields.description"></p>

                      <div class="buttons m-t-5">
                        <Tag v-for="(tag, index) in post.fields.tags" :key="index" :tag="tag" size="is-small" />
                      </div>

                      <div style="position: relative;">
                        <img class="thumbnail"
                            :alt="post.fields.title"
                            :src="post.fields.heroImage.fields.file.url"
                            :srcset="`${post.fields.heroImage.fields.file.url}?w=350&h=196&fit=fill 350w, ${post.fields.heroImage.fields.file.url}?w=1000&h=562&fit=fill 1000w, ${post.fields.heroImage.fields.file.url}?w=2000&h=1125&fit=fill 2000w`"
                            v-if="post.fields.heroImage.fields.file.url"
                        >
                        <span class="image__category-label" v-text="post.fields.category[0]"></span>
                      </div>
                    </div>
                </div>

                <div class="content article__content" v-html="$md.render('@[toc](＜目次＞)\n' + post.fields.body)"></div>


                <div class="social m-t-50">

                  <div class="has-text-centered m-t-50 m-b-30">
                      <p class="title is-underline font-leckerli-one">Share</p>
                      <p class="subtitle has-text-dark is-7">SNSシェア</p>
                  </div>
                  <div class="button-group level is-mobile">
                    <div class="level-item" style="margin: 0;">
                      <a
                        :href="twitterShareUrl"
                        target="_blank"
                        rel="noreferrer"
                        class="button is-fullwidth is-twitter is-medium"
                        aria-label="Twitter"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1792 1792" fill="currentColor"><path d="M1684 408q-67 98-162 167 1 14 1 42 0 130-38 259.5t-115.5 248.5-184.5 210.5-258 146-323 54.5q-271 0-496-145 35 4 78 4 225 0 401-138-105-2-188-64.5t-114-159.5q33 5 61 5 43 0 85-11-112-23-185.5-111.5t-73.5-205.5v-4q68 38 146 41-66-44-105-115t-39-154q0-88 44-163 121 149 294.5 238.5t371.5 99.5q-8-38-8-74 0-134 94.5-228.5t228.5-94.5q140 0 236 102 109-21 205-78-37 115-142 178 93-10 186-50z"/></svg>
                      </a>
                    </div>
                    <div class="level-item" style="margin: 0;">
                      <a
                        :href=fbShareUrl
                        target="_blank"
                        rel="noreferrer"
                        class="button is-fullwidth is-facebook is-medium"
                        aria-label="Facebook"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1792 1792" fill="currentColor"><path d="M1376 128q119 0 203.5 84.5t84.5 203.5v960q0 119-84.5 203.5t-203.5 84.5h-188v-595h199l30-232h-229v-148q0-56 23.5-84t91.5-28l122-1v-207q-63-9-178-9-136 0-217.5 80t-81.5 226v171h-200v232h200v595h-532q-119 0-203.5-84.5t-84.5-203.5v-960q0-119 84.5-203.5t203.5-84.5h960z"/></svg>
                      </a>
                    </div>
                    <div class="level-item" style="margin: 0;">
                      <a
                        :href="hatenaShareUrl"
                        class="button is-hatena is-fullwidth is-medium"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="はてなブックマーク"
                      >
                        B!
                      </a>
                    </div>
                  </div>
                </div>

                <hr>

                <div class="is-clearfix">
                  <div v-if="prevPost" class="is-pulled-left">
                    <nuxt-link class="button is-large is-circle is-light" :to="`/posts/${prevPost.fields.slug}/`">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1792 1792" fill="currentColor"><path d="M1203 544q0 13-10 23l-393 393 393 393q10 10 10 23t-10 23l-50 50q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23z"/></svg>
                    </nuxt-link>
                    <p class="is-size-7 m-t-5">
                      前の記事
                    </p>
                  </div>
                  <div v-if="nextPost" class="is-pulled-right">
                    <nuxt-link class="button is-large is-circle is-light" :to="`/posts/${nextPost.fields.slug}/`">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1792 1792" fill="currentColor"><path d="M1171 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z"/></svg>
                    </nuxt-link>
                    <p class="is-size-7 m-t-5">
                      次の記事
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div class="column">
            <CardProfile :person="person" />
            <PostList
              v-if="relatedPosts.length"
              title="Rlated Articles"
              subtitle="関連記事"
              :posts="relatedPosts"
            />
            <TagList
                v-if="tags.length"
                title="Tags"
                subtitle="タグ"
                :tags="tags"
            />
            <PostList
              v-if="newlyPosts.length"
              title="Latest Articles"
              subtitle="新着記事"
              :posts="newlyPosts"
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
import PostList from '~/components/organisms/lists/PostList.vue'
import CardProfile from '~/components/organisms/cards/Profile.vue'
import TagList from '~/components/organisms/lists/TagList.vue'
import Tag from '~/components/atoms/Tag.vue'
import PostDate from '~/components/molecules/tags/PostDate.vue'
import {createClient} from '~/plugins/contentful.js'

const client = createClient()
export default {
  head () {
    return {
        title: this.title,
        meta: [
            { hid: 'description', name: 'description', content: this.description },

            { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
            { hid: 'twitter:image', name: 'twitter:image', content: this.post ? `${process.env.HTTP_SCHEMA}:${this.post.fields.heroImage.fields.file.url}` : '' },
            { hid: 'twitter:title', name: 'twitter:title', content: this.title },
            { hid: 'twitter:description', name: 'twitter:description', content: this.description },

            { hid: 'og:title', name: 'og:title', content: this.title },
            { hid: 'og:description', name: 'og:description', content: this.description },
        ]
    }
  },
  async asyncData ({ app, params }) {
    const [　entries, postType ] = await Promise.all([
        client.getEntries({
          'content_type': process.env.CTF_BLOG_POST_TYPE_ID,
          'fields.slug': params.slug
        }),
        client.getContentType(process.env.CTF_BLOG_POST_TYPE_ID)
    ])

    const [ prevEntries, nextEntries, categories, newlyPosts ] = await Promise.all([
        client.getEntries({
          'content_type': process.env.CTF_BLOG_POST_TYPE_ID,
          'fields.publishDate[lt]': entries.items[0].fields.publishDate,
          order: '-fields.publishDate',
          limit: 1
        }),
        client.getEntries({
            'content_type': process.env.CTF_BLOG_POST_TYPE_ID,
            'fields.publishDate[gt]': entries.items[0].fields.publishDate,
            order: 'fields.publishDate',
            limit: 1
        }),
        client.getEntries({
          'content_type': process.env.CTF_BLOG_POST_TYPE_ID,
          'fields.category[in]': entries.items[0].fields.category[0],
          'fields.slug[ne]': params.slug,
          order: '-fields.publishDate',
          limit: 3
        }),
        client.getEntries({
            'content_type': process.env.CTF_BLOG_POST_TYPE_ID,
            order: '-fields.publishDate',
            limit: 5
        }),
    ])
    const post = entries.items[0]
    return {
        post: post,
        prevPost: prevEntries.items.length ? prevEntries.items[0] : null,
        nextPost: nextEntries.items.length ? nextEntries.items[0] : null,
        person: entries.items[0].fields.author,
        tags: postType.fields.find(field => field.id === 'tags').items.validations[0].in,
        categories: postType.fields.find(field => field.id === 'category').items.validations[0].in,
        title: `${entries.items[0].fields.title}`,
        description: `${entries.items[0].fields.description}`,
        relatedPosts: categories ? categories.items : [],
        publishDate: post.fields.publishDate,
        updateDate: post.sys.updatedAt,
        newlyPosts: newlyPosts.items,
    }
  },
  computed: {
    twitterShareUrl: function () {
      const url = process.env.BASE_URL + this.$route.fullPath
      return `https://twitter.com/intent/tweet?text=${this.title}&url=${url}`
    },
    fbShareUrl: function () {
      const url = process.env.BASE_URL + this.$route.fullPath
      return `https://www.facebook.com/sharer/sharer.php?u=${url}`
    },
    hatenaShareUrl: function () {
      const url = process.env.BASE_URL + this.$route.fullPath
      return `https://b.hatena.ne.jp/add?mode=confirm&title=${this.title}&url=${url}`
    }
  },
  mounted () {
    this.$microlinkjs('.link-preview')
  },
  components: {
    CategoryMenu,
    CardPost,
    TagList,
    CardProfile,
    PostDate,
    PostList,
    Tag
  }
}
</script>

<style lang="scss" scoped>
  .image__category-label {
      position: absolute;
      top: .5rem;
      right: .5rem;
      background: #fcee21;
      padding: .2rem 1rem;
      color: #444444;
      font-weight: bold;
      font-size: .8rem;
  }

  .article__title {
    font-size: 1.8rem;
    margin-top: .5rem;
    margin-bottom: 1rem;
  }
  .article__content {
    margin-top: 2rem;
    line-height: 1.6rem;
  }

  @media screen and (max-width: 1088px) {
    .article__title {
      font-size: 1.3rem;
    }
  }
</style>
