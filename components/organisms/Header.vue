<template>
  <header
    class="flex justify-between bg-blue-dark border-b border-grey-lighter py-5 px-2 lg:px-5"
  >
    <div class="text-center"></div>
    <div class="text-center text-white mr-6">
      <h1 class="my-1">
        <n-logo :label="title" color="text-white" />
      </h1>
      <p class="text-xs" v-text="subtitle" />
    </div>
    <div></div>
  </header>
</template>

<script>
import NLogo from '~/components/atoms/links/NLogo'

export default {
  components: { NLogo },
  data: () => ({
    title: process.env.APP_TITLE,
    subtitle: process.env.APP_SUBTITLE,
    scrollY: null
  }),
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.scrollY = window.scrollY
    }
  }
}
</script>
