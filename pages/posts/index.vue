<template>
  <main>
    <section class="hero is-primary">
      <div class="tabs is-boxed is-centered main-menu" id="nav">
        <ul>
            <li class="is-active">
                <router-link to="/posts">
                  全て
                </router-link>
            </li>
            <li v-for="(c, index) in categories" :key="index">
                <nuxt-link
                    :to="`/categories/${c}/`">{{ c }}</nuxt-link>
            </li>
        </ul>
       </div>
    </section>
    <nav class="breadcrumb is-bg-white has-succeeds-separator has-shadow" aria-label="breadcrumbs">
      <div class="container">
        <ul>
            <li>
                <router-link to="/">
                  HOME
                </router-link>
            </li>
            <li class="is-active">
                <a href="#" aria-current="page">投稿一覧（{{ posts.length }}）</a>
            </li>
        </ul>
      </div>
    </nav>

    <section class="articles section" v-if="posts.length">
        <div class="container">
            <div class="columns">
                <div class="column is-8">
                    <div class="has-text-centered m-b-30">
                        <h1 class="title is-underline font-quicksand">投稿一覧（{{ posts.length }}）</h1>
                        <p class="subtitle has-text-grey is-6">記事一覧</p>
                    </div>
                    <div class="columns is-multiline">
                        <div class="column is-flex is-6" v-for="(post, index) in posts" :key="index">
                            <CardPost :post="post"></CardPost>
                        </div>
                    </div>
                </div>

                <div class="column">
                    <CardProfile :person="person" />
                </div>
            </div>
        </div>
    </section>

    <Tags :tags="tags"/>
  </main>
</template>

<script>
import PostPage from '~/pages/posts/page/_page.vue'
export default PostPage
</script>
