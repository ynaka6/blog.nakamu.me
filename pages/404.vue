<template>
  <main class="container">
    <section class="section has-text-centered">
        <img src="~/assets/img/icon-broken-link-512.png" alt="404 Image" class="broken-link">
        <h1 class="title is-1 m-t-50">４０４</h1>
        <p class="subtitle is-6 has-text-dark m-t-30">
            指定されたページが見つかりませんでした。<br>
            既に削除されたか、URLが間違っている可能性があります。
        </p>
        <div class="columns has-text-centered m-t-30">
          <div class="column">
              <router-link to="/" class="button is-primary is-rounded is-large">
                トップページに戻る
              </router-link>
            </div>
        </div>
    </section>
  </main>
</template>


<script>
import CategoryMenu from '~/components/molecules/tabs/CategoryMenu.vue'
import CardPost from '~/components/organisms/cards/Post.vue'
import TagList from '~/components/organisms/lists/TagList.vue'
import PostList from '~/components/organisms/lists/PostList.vue'
import CardProfile from '~/components/organisms/cards/Profile.vue'
import {createClient} from '~/plugins/contentful.js'

const client = createClient()
export default {
    head () {
        return {
            title: '404 - Page Not Found',
            meta: [
                { hid: 'description', name: 'description', content: '404 - Page Not Found' },
                { hid: 'robots', name: 'robots', content: 'noindex, nofollow' },
            ]
        }
    }
}
</script>


<style lang="scss" scoped>
.broken-link {
    width: 10rem;
}
</style>

