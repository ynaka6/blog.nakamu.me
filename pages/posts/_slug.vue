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
            <li>
                <nuxt-link
                    :to="{ name: 'categories-category', params: { category: post.fields.category }}">{{ post.fields.category }}</nuxt-link>
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

                      <img class="thumbnail"
                          :src="post.fields.heroImage.fields.file.url"
                          :srcset="`${post.fields.heroImage.fields.file.url}?w=350&h=196&fit=fill 350w, ${post.fields.heroImage.fields.file.url}?w=1000&h=562&fit=fill 1000w, ${post.fields.heroImage.fields.file.url}?w=2000&h=1125&fit=fill 2000w`"
                          v-if="post.fields.heroImage.fields.file.url"
                      >

                  </div>
              </div>
              <div class="content article__content">
                  <vue-markdown>{{post.fields.body}}</vue-markdown>
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

            </div>
          </div>
        </div>
      </div>
    </section>
    <Tags :tags="tags"/>
  </main>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import Tags from '~/components/Tags.vue'
import {createClient} from '~/plugins/contentful.js'

const client = createClient()

export default {
  head () {
    return {
        title: this.title,
        meta: [
            { name: 'description', content: this.description },

            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:site', content: this.person.fields.twitter },
            { name: 'twitter:creator', content: this.person.fields.twitter },
            { name: 'twitter:image', content: `${process.env.HTTP_SCHEMA}:${this.post.fields.heroImage.fields.file.url}` },
            { name: 'twitter:title', content: this.title },
            { name: 'twitter:description', content: this.description },

            { name: 'og:title', content: this.title },
            { name: 'og:description', content: this.description },
        ]
    }
  },
  asyncData ({ env, params }) {
    return Promise.all([
              client.getEntries({
                'content_type': env.CTF_BLOG_POST_TYPE_ID,
                'fields.slug': params.slug
              }),
              client.getContentType(process.env.CTF_BLOG_POST_TYPE_ID)
          ]).then(([entries, postType]) => {
              return {
                  post: entries.items[0],
                  person: entries.items[0].fields.author,
                  tags: postType.fields.find(field => field.id === 'tags').items.validations[0].in,
                  title: `${entries.items[0].fields.title}`,
                  description: `${entries.items[0].fields.description}`
              }
    }).catch(console.error)
  },
  components: {
    VueMarkdown,
    Tags
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
