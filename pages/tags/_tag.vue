<template>
  <main>


    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="has-text-centered title is-size-2">
              #{{ tag }}の投稿 ({{ posts.length }})
          </h1>
        </div>
      </div>
    </section>

    <section class="section">

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
  asyncData ({ env, params }) {
    return client.getEntries({
      'content_type': env.CTF_BLOG_POST_TYPE_ID,
      'fields.tags[in]': params.tag,
      order: '-sys.createdAt'
    }).then(entries => {
      return {
        posts: entries.items,
        tag: params.tag
      }
    })
  },
  components: {
      PostCard
  }
}
</script>
