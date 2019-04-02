<template>
  <header class="z-10">
    <div
      class="flex justify-between items-center bg-gradient-blue border-b border-grey-lighter py-5 px-2 lg:px-5"
    >
      <div class="w-1/6 text-center"></div>
      <div class="w-5/6 text-center text-white mr-6">
        <h1 class="my-1">
          <n-logo :label="title" color="text-white" />
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
      <ul class="list-reset flex flex-col">
        <li class="border-b">
          <n-link
            to="/"
            class="flex items-center justify-between block py-4 px-4 lg:px-8 text-black hover:text-grey-dark no-underline"
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
            class="flex items-center justify-between block py-4 px-4 lg:px-8 text-black hover:text-grey-dark no-underline"
          >
            <span class="font-bold">記事一覧</span>
            <div class="flex items-center">
              <span class="mr-2 text-xs">ブログ記事の投稿一覧</span>
              <n-icon icon="chevron-right" class="w-6 h-6" />
            </div>
          </n-link>
        </li>
        <li class="border-b">
          <n-link
            :to="profile_site_url"
            class="block py-4 px-4 lg:px-8 text-black hover:text-grey-dark no-underline"
            :target-blank="true"
          >
            <span class="font-bold">プロフィール</span>
          </n-link>
        </li>
      </ul>
      <div class="p-4">
        <n-link
          to="/contact"
          class="lg:w-2/5 lg:mx-auto block p-4 text-center text-white font-bold hover:text-grey-light bg-grey-darkest hover:bg-grey-dark border border-grey-darkest no-underline"
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
    profile_site_url: process.env.PROFILE_SITE_URL,
    scrollY: null
  }),
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
  @apply absolute pin-x bg-white shadow-lg overflow-y-hidden;
}
.dropdown-menu.active {
  transition: all 500ms ease;
  @apply max-h-full;
}
</style>
