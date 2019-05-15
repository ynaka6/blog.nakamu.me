<template>
  <header class="z-10">
    <div
      class="flex justify-between items-center bg-gradient-blue border-b border-gray-400 py-4 px-2 lg:px-5"
    >
      <div class="w-1/6 text-center"></div>
      <div class="w-5/6 text-center text-white mr-6">
        <h1 class="my-1 text-3xl">
          <n-logo :label="title" class="text-white" />
        </h1>
        <p class="text-xs" v-text="subtitle" />
      </div>
      <div class="w-1/6 flex items-center justify-end">
        <div class="">
          <n-hamburger-menu
            :active="$store.getters['drawerMenu']"
            @toggle="toggleMenu"
          />
        </div>
      </div>
    </div>
    <div
      class="dropdown-menu"
      :class="{ active: $store.getters['drawerMenu'] }"
    >
      <ul class="list-none p-0 flex flex-col">
        <li class="border-b">
          <n-link
            to="/"
            class="flex items-center justify-between block py-4 px-4 lg:px-8 text-black hover:text-gray-600 no-underline"
          >
            <span class="font-bold">Home</span>
            <div class="flex items-center">
              <n-icon icon="chevron-right" class="w-6 h-6" />
            </div>
          </n-link>
        </li>
        <li class="border-b">
          <n-link
            to="/posts"
            class="flex items-center justify-between block py-4 px-4 lg:px-8 text-black hover:text-gray-600 no-underline"
          >
            <span class="font-bold">記事一覧</span>
            <div class="flex items-center">
              <span class="mr-2 text-xs">ブログ記事の投稿一覧</span>
              <n-icon icon="chevron-right" class="w-6 h-6" />
            </div>
          </n-link>
        </li>
        <li v-if="author && author.fields.url" class="border-b">
          <n-link
            :to="author.fields.url"
            class="block py-4 px-4 lg:px-8 text-black hover:text-gray-600 no-underline"
            :target-blank="true"
          >
            <span class="font-bold">プロフィール</span>
          </n-link>
        </li>
      </ul>
      <div class="p-4">
        <n-link
          to="/contact"
          class="lg:w-2/5 lg:mx-auto block p-4 text-center text-white font-bold hover:text-grey-light bg-gray-800 hover:bg-gray-600 border border-gray-500-darkest no-underline"
        >
          お問い合わせはこちら
        </n-link>
      </div>
    </div>
  </header>
</template>

<script>
import NLogo from '~/components/atoms/links/NLogo'
import NIcon from '~/components/atoms/NIcon'
import NLink from '~/components/atoms/links/NLink'
import NHamburgerMenu from '~/components/atoms/NHamburgerMenu'

export default {
  components: { NLogo, NIcon, NLink, NHamburgerMenu },
  data: () => ({
    title: process.env.APP_TITLE,
    subtitle: process.env.APP_SUBTITLE,
    scrollY: null
  }),
  computed: {
    author() {
      return this.$store.getters['author/author']
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.scrollY = window.scrollY
    },
    toggleMenu() {
      this.$store.dispatch('toggleDrawerMenu')
    }
  }
}
</script>

<style scoped lang="postcss">
.dropdown-menu {
  transition: all 500ms ease;
  max-height: 0%;
  pointer-events: none;
  @apply absolute inset-x-0 bg-white shadow-lg overflow-y-hidden;
}
.dropdown-menu.active {
  transition: all 500ms ease;
  pointer-events: auto;
  @apply max-h-full;
}
</style>
