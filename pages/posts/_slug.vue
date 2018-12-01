<template>
  <main>
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
                      <PostDate :publishDate="publishDate" :updateDate="updateDate" />
                      <h1 class="title article__title">
                        {{ post.fields.title }}
                      </h1>
                      <p class="subtitle is-6 has-text-gray m-t-5" v-html="post.fields.description"></p>

                      <div class="tags m-t-5">
                        <nuxt-link
                            v-for="tag in post.fields.tags"
                            :key="tag"
                            :to="{ name: 'tags-tag', params: { tag: tag }}" class="tag is-danger">{{ tag }}</nuxt-link>
                      </div>

                      <div style="position: relative;">
                        <img class="thumbnail"
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
                      <p class="subtitle has-text-grey is-7">SNSシェア</p>
                  </div>
                  <div class="button-group level is-mobile">
                    <div class="level-item" style="margin: 0;">
                      <a :href="twitterShareUrl" target="_blank" class="button is-fullwidth is-twitter is-medium">
                        <i class="fab fa-twitter"></i>
                      </a>
                    </div>
                    <div class="level-item" style="margin: 0;">
                      <a :href=fbShareUrl target="_blank" class="button is-fullwidth is-facebook is-medium">
                        <i class="fab fa-facebook"></i>
                      </a>
                    </div>
                    <div class="level-item" style="margin: 0;">
                      <a :href="hatenaShareUrl" class="button is-hatena is-fullwidth is-medium" target="_blank">
                        B!
                      </a>
                    </div>
                  </div>
                </div>

                <hr>

                <div class="is-clearfix">
                  <div v-if="prevPost" class="is-pulled-left">
                    <nuxt-link class="button is-large is-circle is-light" :to="{ name: 'posts-slug', params: { slug: prevPost.fields.slug }}">
                      <i class="fas fa-angle-left"></i>
                    </nuxt-link>
                    <p class="is-size-7 m-t-5">
                      前の記事
                    </p>
                  </div>
                  <div v-if="nextPost" class="is-pulled-right">
                    <nuxt-link class="button is-large is-circle is-light" :to="{ name: 'posts-slug', params: { slug: nextPost.fields.slug }}">
                      <i class="fas fa-angle-right"></i>
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
          </div>

        </div>
      </div>
    </section>

    <section class="section" v-if="relatedPosts.length">
      <div class="container">
        <div class="has-text-centered m-b-30">
            <h2 class="title is-underline font-quicksand">Rlated Articles</h2>
            <p class="subtitle has-text-grey is-6">関連記事</p>
        </div>
        <div class="columns is-centered is-multiline is-tablet">
          <div class="column is-flex is-6-tablet is-4-desktop" v-for="(post, index) in relatedPosts" :key="index">
              <CardPost :post="post"></CardPost>
          </div>
        </div>
      </div>
    </section>

    <Tags :tags="tags"/>
  </main>
</template>

<script>
import CardPost from '~/components/organisms/cards/Post.vue'
import CardProfile from '~/components/organisms/cards/Profile.vue'
import Tags from '~/components/organisms/Tags.vue'
import PostDate from '~/components/molecules/tags/PostDate.vue'
import {createClient} from '~/plugins/contentful.js'

const client = createClient()
export default {
  head () {
    return {
        title: this.title,
        meta: [
            { name: 'description', content: this.description },

            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:site', content: this.person ? this.person.fields.twitter : '' },
            { name: 'twitter:creator', content: this.person ? this.person.fields.twitter : '' },
            { name: 'twitter:image', content: this.post ? `${process.env.HTTP_SCHEMA}:${this.post.fields.heroImage.fields.file.url}` : '' },
            { name: 'twitter:title', content: this.title },
            { name: 'twitter:description', content: this.description },

            { name: 'og:title', content: this.title },
            { name: 'og:description', content: this.description },
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

    const [ prevEntries, nextEntries, categories ] = await Promise.all([
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
        })
    ])
    const post = entries.items[0]
    return {
        post: post,
        prevPost: prevEntries.items.length ? prevEntries.items[0] : null,
        nextPost: nextEntries.items.length ? nextEntries.items[0] : null,
        person: entries.items[0].fields.author,
        tags: postType.fields.find(field => field.id === 'tags').items.validations[0].in,
        title: `${entries.items[0].fields.title}`,
        description: `${entries.items[0].fields.description}`,
        relatedPosts: categories ? categories.items : [],
        publishDate: app.$dayjs(post.fields.publishDate).format('YYYY-MM-DD'),
        updateDate: app.$dayjs(post.sys.updatedAt).format('YYYY-MM-DD')
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
  components: {
    CardPost,
    Tags,
    CardProfile,
    PostDate
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
