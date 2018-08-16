<template>
  <main>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="has-text-centered title is-size-1 font-leckerli-one">
              Engineer Blog
          </h1>
          <div class="content">
            <!-- <div class="control has-icons-left has-icons-right search-field">
              <input type="text" placeholder="" class="input is-large">
              <span class="icon is-medium is-left"><i class="fa fa-search"></i></span>
            </div> -->
          </div>
        </div>
      </div>
      <!-- <div class="tabs is-boxed is-centered main-menu" id="nav">
        <ul>
            <li data-target="pane-1" id="1" v-for="(tag, index) in tags" :key="index">
                <nuxt-link
                    :to="{ name: 'tags-tag', params: { tag: tag }}">{{ tag }}</nuxt-link>
            </li>
        </ul>
       </div> -->
    </section>


    <section class="section">

        <div class="has-text-centered m-b-30">
            <h2 class="title is-underline font-quicksand">Latest Articles</h2>
            <p class="subtitle has-text-grey is-6">最新記事</p>
        </div>
        <div class="columns is-multiline">
          <div class="column is-one-third" v-for="(post, index) in posts" :key="index">
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
    </section>

    <Tags :tags="tags"/>
  </main>
</template>

<script>
import PostCard from '~/components/Post/Card.vue'
import Tags from '~/components/Tags.vue'
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
    asyncData ({env}) {
        return Promise.all([
            client.getEntries({
                'sys.id': env.CTF_PERSON_ID
            }),
            client.getEntries({
                'content_type': env.CTF_BLOG_POST_TYPE_ID,
                order: '-sys.createdAt',
                limit: 6
            }),
            client.getContentType(process.env.CTF_BLOG_POST_TYPE_ID)
            ]).then(([entries, posts, postType]) => {
            return {
                person: entries.items[0],
                posts: posts.items,
                tags: postType.fields.find(field => field.id === 'tags').items.validations[0].in,
                title: 'Blogホーム',
                description: '香港在住のWebデベロッパー「Nakamu」が今ままでのエンジニア経験を元にした技術ブログまとめます。'
            }
        }).catch(console.error)
    },
    components: {
        PostCard,
        Tags
    }
}
</script>

<style>
</style>

