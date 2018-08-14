<template>
  <main>
    
    <nav class="breadcrumb is-bg-white has-succeeds-separator" aria-label="breadcrumbs">
      <div class="container">
        <ul>
            <li>
                <router-link to="/">
                  HOME
                </router-link>
            </li>
            <li class="is-active">
                <a href="#" aria-current="page">{{ post.fields.title }}</a>
            </li>
        </ul>
      </div>
    </nav>

    <section class="section">
      <div class="columns">
        <div class="column is-8 is-offset-2">
          <div class="card article">
            <div class="card-content">
              <div class="media">
                  <div class="media-content">
                      <time class="tag is-rounded m-b-10">{{ ( new Date(post.fields.publishDate)).toDateString() }}</time>
                      <h1 class="title article__title">
                        {{ post.fields.title }}
                      </h1>

                      <div class="tags m-t-10">
                        <nuxt-link
                            v-for="tag in post.fields.tags"
                            :key="tag"
                            :to="{ name: 'tags-tag', params: { tag: tag }}" class="tag is-danger">{{ tag }}</nuxt-link>
                      </div>
                  </div>
              </div>
              <div class="content article__content">
                  <vue-markdown>{{post.fields.body}}</vue-markdown>
              </div>

              <hr>

              <div class="media">
                <div class="media-left">
                  <figure class="image is-64x64 is-circle">
                      <img :src="post.fields.author.fields.image.fields.file.url" alt="Image">
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-4">
                    <a :href="post.fields.author.fields.url">@{{ post.fields.author.fields.name }}</a>
                  </p>
                  <p class="subtitle is-6">
                    {{ post.fields.author.fields.shortBio }}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>

  </main>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import {createClient} from '~/plugins/contentful.js'

const client = createClient()

export default {
  head () {
    return {
        title: this.title,
        meta: [
            { name: 'description', content: this.description },

            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:site', content: this.person.fields.twitter },
            { name: 'twitter:creator', content: this.person.fields.twitter },
            { name: 'twitter:image', content: this.person.fields.image.fields.file.url },
            { name: 'twitter:title', content: this.title },
            { name: 'twitter:description', content: this.description },

            { name: 'og:title', content: this.title },
            { name: 'og:description', content: this.description },
        ]
    }
  },
  asyncData ({ env, params }) {
    return client.getEntries({
      'content_type': env.CTF_BLOG_POST_TYPE_ID,
      'fields.slug': params.slug
    }).then(entries => {
      return {
        post: entries.items[0],
        person: entries.items[0].fields.author,
        title: `${entries.items[0].fields.title}`,
        description: `「${entries.items[0].fields.title}」の詳細ページ`
      }
    })
    .catch(console.error)
  },
  components: {
    VueMarkdown
  }
}
</script>

<style lang="scss" scoped>
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
