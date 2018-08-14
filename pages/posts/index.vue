<template>
  <main>

    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="has-text-centered title is-size-2">
              投稿一覧 ({{ posts.length }})
          </h1>
        </div>
      </div>
    </section>

    <nav class="breadcrumb is-bg-white has-succeeds-separator" aria-label="breadcrumbs">
      <div class="container">
        <ul>
            <li>
                <router-link to="/">
                  HOME
                </router-link>
            </li>
            <li class="is-active">
                <a href="#" aria-current="page">投稿一覧</a>
            </li>
        </ul>
      </div>
    </nav>

    <section class="articles section">

        <div class="columns is-multiline">
          <div class="column is-one-third" v-for="(post, index) in posts" :key="index">
              <PostCard :post="post"></PostCard>
          </div>
        </div>

    </section>

  </main>
</template>

<script>
import PostCard from '~/components/Post/Card.vue'
import {createClient} from '~/plugins/contentful.js'

const client = createClient()

export default {
  asyncData ({env}) {
      return Promise.all([
          // fetch the owner of the blog
          client.getEntries({
              'sys.id': env.CTF_PERSON_ID
          }),
          // fetch all blog posts sorted by creation date
          client.getEntries({
              'content_type': env.CTF_BLOG_POST_TYPE_ID,
              order: '-sys.createdAt',
          })
          ]).then(([entries, posts]) => {
          // return data that should be available
          // in the template
          return {
              person: entries.items[0],
              posts: posts.items
          }
      }).catch(console.error)
  },
  components: {
      PostCard
  }
}
</script>
