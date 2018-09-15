<template>
  <main v-if="post">
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
                    :to="{ name: 'categories-category', params: { category: post.fields.category }}">
                    {{ post.fields.category }}
                </nuxt-link>
            </li>
            <li class="is-active" v-if="post">
                <a href="#" aria-current="page">{{ post.fields.title }}</a>
            </li>
        </ul>
      </div>
    </nav>

    <section class="section" v-if="post">
      <div class="columns">
        <div class="column is-8 is-offset-2">
          <div class="card article">
            <div class="card-content">
              <div class="media">
                  <div class="media-content">
                      <time class="tag is-rounded m-b-10">{{ $moment(new Date(post.fields.publishDate)).format('YYYY.MM.DD') }}</time>
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
                        <span class="image__category-label" v-text="post.fields.category"></span>
                      </div>


                  </div>
              </div>

              <div class="content article__content">
                <div class="post-toc">
                  <p class="post-toc__title">目次</p>
                  <div v-html="tocHtml"></div>
                </div>
                <vue-markdown :toc="toc" toc-id="toc" v-on:toc-rendered="tocAllRight">{{post.fields.body}}</vue-markdown>
              </div>

              <div class="m-t-50 columns is-multiple is-mobile">
                <div class="column">
                  <a :href="twitterShareUrl" class="button is-twitter is-block is-medium" target="_blank">
                    <i class="fab fa-twitter"></i>
                  </a>
                </div>
                <div class="column">
                  <a :href="fbShareUrl" class="button is-facebook is-block is-medium" target="_blank">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                </div>
                <div class="column">
                  <a :href="hatenaShareUrl" class="button is-hatena is-block is-medium" target="_blank">
                    B!
                  </a>
                </div>
              </div>

              <hr>

              <div class="media is-block-mobile">
                <div class="media-left">
                  <figure class="image is-profile-image is-circle">
                      <img :src="post.fields.author.fields.image.fields.file.url" alt="Image">
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-4">
                    <a :href="post.fields.author.fields.url">@{{ post.fields.author.fields.name }}</a>
                  </p>
                  <p class="subtitle is-6 m-b-10">
                    {{ post.fields.author.fields.shortBio }}
                  </p>
                  <div class="socials">
                    <a
                      :href="'https://twitter.com/' + post.fields.author.fields.twitter"
                      target="_blank"
                      style="color: #55acee;"
                    >
                      <i class="fab fa-twitter"></i>
                    </a>
                    <a
                      :href="'https://github.com/' + post.fields.author.fields.github"
                      target="_blank"
                      style="color: #333;"
                    >
                      <i class="fab fa-github"></i>
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
      </div>
    </section>

    <section class="section" v-if="relatedPosts.length">
        <div class="has-text-centered m-b-30">
            <h2 class="title is-underline font-quicksand">Rlated Articles</h2>
            <p class="subtitle has-text-grey is-6">関連記事</p>
        </div>
        <div class="columns is-centered is-multiline is-tablet">
          <div class="column is-flex is-6-tablet is-3-desktop" v-for="(post, index) in relatedPosts" :key="index">
              <PostCard :post="post"></PostCard>
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
import VueMarkdown from 'vue-markdown'
import Tags from '~/components/Tags.vue'
import {createClient} from '~/plugins/contentful.js'

const client = createClient()
const initData = async ({ app, params }) => {
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
          'fields.category[in]': entries.items[0].fields.category,
          'fields.slug[ne]': params.slug,
          order: '-fields.publishDate',
          limit: 4
        })
    ])

    return {
        post: entries.items[0],
        prevPost: prevEntries.items.length ? prevEntries.items[0] : null,
        nextPost: nextEntries.items.length ? nextEntries.items[0] : null,
        person: entries.items[0].fields.author,
        tags: postType.fields.find(field => field.id === 'tags').items.validations[0].in,
        title: `${entries.items[0].fields.title}`,
        description: `${entries.items[0].fields.description}`,
        toc: true,
        tocHtml: '',
        relatedPosts: categories.items
    }
}
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
  async asyncData (context) {
      if (process.browser) {
          return {
            post: null,
            prevPost: null,
            nextPost: null,
            person: null,
            tags: [],
            title: null,
            description: null,
            toc: true,
            tocHtml: '',
            relatedPosts: []
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
          const { post, prevPost, nextPost, person, tags, relatedPosts, title, description } = await initData({ app: this, params: this.$route.params });
          this.person = person;
          this.post = post;
          this.prevPost = prevPost;
          this.nextPost = nextPost;
          this.relatedPosts = relatedPosts;
          this.title = title;
          this.description = description;
          this.tags = tags;
      }
  },
  computed: {
    twitterShareUrl: function () {
      console.log(this.$route.fullPath)
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
  methods: {
    tocAllRight: function (tocHtmlStr) {
      this.tocHtml = tocHtmlStr
    }
  },
  components: {
    Loading,
    PostCard,
    VueMarkdown,
    Tags
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
  .post-toc {
    background-color: #F9F9F9;
    border: 1px solid #AAAAAA;
    margin-bottom: 4rem;
    padding: 1rem;
  }
  .post-toc__title {
    text-align: center;
    font-weight: bold;
    font-size: 1.2rem;
  }

  .article__title {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
  .article__content {
    margin-top: 2rem;
    line-height: 1.6rem;
  }
  .image.is-profile-image {
    width: 64px;
    height: 64px;
  }

  .socials {
    & > a {
      display: inline-block;
      margin-left: .5rem;
      font-size: 1.5rem;

      &:first-child {
        margin-left: 0;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .image.is-profile-image {
      width: auto;
      height: auto;
      padding: 0 7rem 2rem;
    }
  }

  @media screen and (max-width: 1088px) {
    .article__title {
      font-size: 1.3rem;
    }
  }
</style>
