<template>
  <div>
    <breadcrumb
      :list="[
        { link: '/', label: 'Home' },
        { link: '/posts', label: 'Posts' },
        { link: null, label: $store.getters['tag/tag'].name }
      ]"
    />
    <section class="container mx-auto">
      <div class="flex flex-col lg:flex-row">
        <div class="lg:w-2/3 p-4">
          <n-title>
            <n-icon icon="tag" size="5" />
            {{ $store.getters['tag/tag'].name }}
          </n-title>
          <information-box>
            <p
              v-if="$store.getters['tag/tag'].description"
              class="text-sm text-grey-darker"
              v-text="$store.getters['tag/tag'].description"
            ></p>
            <p
              v-else
              class="text-sm text-grey-darker"
              v-text="
                `
                ${$store.getters['tag/tag'].name}
                に関する技術情報をまとめ記事になります
                `
              "
            ></p>
          </information-box>

          <div class="flex flex-wrap justify-center">
            <div
              v-for="(post, index) in $store.getters['tag/posts']"
              :key="index"
              :to="`/posts/${post.slug}/`"
              class="flex my-4 px-1 w-full md:w-1/2"
            >
              <post-card :post="post" />
            </div>
          </div>
          <div class="flex justify-between">
            <div>
              <div v-if="$store.getters['tag/isPrevPage']">
                <nuxt-link
                  v-if="1 == $store.getters['tag/prevPage']"
                  :to="`/tags/${$store.getters['tag/tag'].slug}`"
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
                  :to="
                    `
                      /tags/${$store.getters['tag/tag'].slug}/page/${
                      $store.getters['tag/prevPage']
                    }
                    `
                  "
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
                v-if="$store.getters['tag/isNextPage']"
                :to="
                  `/tags/${$store.getters['tag/tag'].slug}/page/${
                    $store.getters['tag/nextPage']
                  }`
                "
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
        <div class="lg:w-1/3 p-4">
          <profile-card :author="$store.getters['author/author']" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NTitle from '~/components/atoms/titles/NTitle'
import NIcon from '~/components/atoms/NIcon'
import Breadcrumb from '~/components/molecules/Breadcrumb'
import PostCard from '~/components/molecules/Post/PostCard'
import ProfileCard from '~/components/molecules/Profile/ProfileCard'
import InformationBox from '~/components/molecules/Message/InformationBox'

export default {
  components: {
    NTitle,
    NIcon,
    Breadcrumb,
    PostCard,
    ProfileCard,
    InformationBox
  },
  data: () => ({})
}
</script>
