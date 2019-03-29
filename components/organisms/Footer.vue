<template>
  <footer>
    <tags :tags="tags" />
    <section class="bg-gradient-blue py-8 w-full">
      <div class="container mx-auto px-4 lg:px-8">
        <div class="flex flex-col lg:flex-row">
          <div class="lg:w-2/3 lg:px-2">
            <h2 class="mb-3 text-white">
              <n-logo :label="title" color="text-white" />
            </h2>
            <p class="mb-6 text-white text-sm max-w-md" v-text="explain"></p>
          </div>
          <div class="lg:w-1/3 flex">
            <div class="w-1/2">
              <p class="uppercase text-white text-sm sm:mb-3">
                Contents
              </p>
              <ul class="list-reset text-xs mb-6">
                <li class="mt-2 inline-block mr-2 sm:block sm:mr-0">
                  <n-link to="/" class="text-white hover:text-grey-dark">
                    Home
                  </n-link>
                </li>
                <li class="mt-2 inline-block mr-2 sm:block sm:mr-0">
                  <n-link to="/posts" class="text-white hover:text-grey-dark">
                    記事一覧
                  </n-link>
                </li>
                <li class="mt-2 inline-block mr-2 sm:block sm:mr-0">
                  <n-link
                    to="/policy/privacy"
                    class="text-white hover:text-grey-dark"
                  >
                    プライバシーポリシー
                  </n-link>
                </li>
                <li class="mt-2 inline-block mr-2 sm:block sm:mr-0">
                  <n-link to="/" class="text-white hover:text-grey-dark">
                    お問い合わせ
                  </n-link>
                </li>
              </ul>
            </div>
            <div class="w-1/2">
              <p class="uppercase text-white text-sm sm:mb-3">
                ABOUT
              </p>
              <ul class="list-reset text-xs mb-8">
                <li class="mt-2 inline-block mr-2 sm:block sm:mr-0">
                  <n-link
                    :to="profile_site_url"
                    class="text-white hover:text-grey"
                    :target-blank="true"
                  >
                    Profile
                  </n-link>
                </li>
              </ul>
              <p class="uppercase text-white text-sm sm:mb-3">
                CATEGORY
              </p>
              <ul class="list-reset text-xs mb-6">
                <li
                  v-for="(category, index) in categories"
                  :key="index"
                  class="mt-2 inline-block mr-2 sm:block sm:mr-0"
                >
                  <n-link
                    :to="`/categories/${category.slug}`"
                    class="text-white hover:text-grey"
                  >
                    {{ category.name }}
                  </n-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-grey-darkest text-white">
      <div class="p-6 container mx-auto px-4">
        <div class="flex items-center flex-wrap">
          <div class="w-full md:w-1/5 mb-4 lg:mb-0" />
          <div
            class="w-full md:w-3/5 mb-4 lg:mb-0 text-xs sm:text-sm text-center"
          >
            Copyright © nnn All Rights Reserved.
          </div>
          <div class="w-full md:w-1/5 mb-4 lg:mb-0 flex justify-center">
            <n-link
              :to="'https://twitter.com/' + author.fields.twitter"
              :target-blank="true"
              :external-icon="false"
              class="bg-white hover:bg-grey-light text-grey-darkest w-10 h-10 mr-2 rounded-full font-semibold flex items-center justify-center font-hairline no-underline"
            >
              <n-icon icon="twitter" size="5" />
            </n-link>
            <n-link
              :to="'https://github.com/' + author.fields.github"
              :target-blank="true"
              :external-icon="false"
              class="bg-white hover:bg-grey-light text-grey-darkest w-10 h-10 mr-2 rounded-full font-semibold flex items-center justify-center font-hairline no-underline"
            >
              <n-icon icon="github" size="5" />
            </n-link>
          </div>
        </div>
      </div>
    </section>
  </footer>
</template>

<script>
import NLogo from '~/components/atoms/links/NLogo'
import NLink from '~/components/atoms/links/NLink'
import NIcon from '~/components/atoms/NIcon'
import Tags from '~/components/molecules/Footer/Tags'

export default {
  components: { NLogo, NLink, NIcon, Tags },
  data: () => ({
    title: process.env.APP_TITLE,
    explain: process.env.APP_DESCRIPTION,
    profile_site_url: process.env.PROFILE_SITE_URL
  }),
  computed: {
    categories() {
      return this.$store.getters['category/categories']
    },
    tags() {
      return this.$store.getters['tag/tags']
    },
    author() {
      return this.$store.getters['author/author']
    }
  }
}
</script>
