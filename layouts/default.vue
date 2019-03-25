<template>
  <div class="min-h-screen flex flex-col font-sans">
    <Header />
    <div class="flex-grow">
      <nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/organisms/Header.vue'
import Footer from '~/components/organisms/Footer.vue'
// import Loading from '~/components/atoms/loading'

export default {
  components: { Header, Footer },
  data: () => ({})
}
</script>

<style></style>
