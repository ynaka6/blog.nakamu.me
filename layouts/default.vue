<template>
  <div class="min-h-screen flex flex-col font-sans">
    <Header />
    <breadcrumb :list="breadcrumb" />
    <div class="flex-grow">
      <nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '~/components/molecules/Breadcrumb'
import Header from '~/components/organisms/Header.vue'
import Footer from '~/components/organisms/Footer.vue'

export default {
  components: { Breadcrumb, Header, Footer },
  middleware: 'router',
  data: () => ({}),
  computed: {
    ...mapGetters(['breadcrumb'])
  }
}
</script>

<style></style>
