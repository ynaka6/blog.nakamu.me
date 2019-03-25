<template>
  <div>
    <section class="container mx-auto">
      <div class="flex flex-col lg:flex-row">
        <div class="lg:w-3/4 p-4">
          <n-title label="Posts" />
          <div class="flex flex-wrap justify-center">
            <div
              v-for="(post, index) in $store.getters['post/posts']"
              :key="index"
              :to="`/posts/${post.slug}/`"
              class="flex my-4 px-1 w-full md:w-1/2"
            >
              <post-card :post="post" />
            </div>
          </div>
          <div class="flex justify-between">
            <div>
              <div v-if="$store.getters['post/isPrevPage']">
                <nuxt-link
                  v-if="1 == $store.getters['post/prevPage']"
                  :to="{ name: 'posts' }"
                  class="button is-large is-circle is-light"
                  aria-label="前のページ"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 1792 1792"
                    fill="currentColor"
                  >
                    <path
                      d="M1203 544q0 13-10 23l-393 393 393 393q10 10 10 23t-10 23l-50 50q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23z"
                    />
                  </svg>
                </nuxt-link>
                <nuxt-link
                  v-else
                  class="button is-large is-circle is-light"
                  :to="{
                    name: 'posts-page-page',
                    params: { page: $store.getters['post/prevPage'] }
                  }"
                  aria-label="前のページ"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 1792 1792"
                    fill="currentColor"
                  >
                    <path
                      d="M1203 544q0 13-10 23l-393 393 393 393q10 10 10 23t-10 23l-50 50q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23z"
                    />
                  </svg>
                </nuxt-link>
              </div>
            </div>
            <div>
              <nuxt-link
                v-if="$store.getters['post/isNextPage']"
                :to="{
                  name: 'posts-page-page',
                  params: { page: $store.getters['post/nextPage'] }
                }"
                class="button is-large is-circle is-light"
                aria-label="次のページ"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 1792 1792"
                  fill="currentColor"
                >
                  <path
                    d="M1171 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z"
                  />
                </svg>
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="lg:w-1/4 p-4"></div>
      </div>
    </section>
  </div>
</template>

<script>
import NTitle from '~/components/atoms/titles/NTitle'
import PostCard from '~/components/molecules/Post/PostCard'

export default {
  components: { NTitle, PostCard },
  data: () => ({})
}
</script>
