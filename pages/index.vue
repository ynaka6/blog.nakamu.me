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
            <li data-target="pane-1" id="1">
                <a>
                    <span>Pictures</span>
                </a>
            </li>
            <li data-target="pane-2" id="2" class="is-active">
                <a>
                    <span>Article</span>
                </a>
            </li>
            <li data-target="pane-3" id="3">
                <a>
                    <span>Team</span>
                </a>
            </li>
            <li data-target="pane-4" id="4">
                <a>
                    <span>Video</span>
                </a>
            </li>
            <li data-target="pane-1" id="1">
                <a>
                    <span>Pictures</span>
                </a>
            </li>
            <li data-target="pane-2" id="2">
                <a>
                    <span>Article</span>
                </a>
            </li>
            <li data-target="pane-3" id="3">
                <a>
                    <span>Team</span>
                </a>
            </li>
            <li data-target="pane-4" id="4">
                <a>
                    <span>Video</span>
                </a>
            </li>
        </ul>
       </div> -->
    </section>


    <section class="section">

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
                limit: 6
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

<style>
</style>

