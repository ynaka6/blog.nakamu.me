<template>
  <div>
    <Header/>
    <nuxt/>
    <Footer/>
    <ButtonPageTop />
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import ButtonPageTop from '~/components/Button/PageTop.vue'

export default {
  components: {
    Header,
    Footer,
    ButtonPageTop
  }
}
</script>

<style lang="scss" scoped>
</style>

