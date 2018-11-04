<template>
  <div>
    <Header/>
    <nuxt/>
    <Footer/>
    <no-ssr>
      <PageTopButton
        :scrollY="scrollY"
        v-scroll-to="'body'"
      />
    </no-ssr>
    <ModalContact />
  </div>
</template>

<script>
import Header from '~/components/organisms/Header.vue'
import Footer from '~/components/organisms/Footer.vue'
import PageTopButton from '~/components/molecules/buttons/PageTopButton.vue'
import ModalContact from '~/components/organisms/modals/Contact.vue'


export default {
  data: () => ({
    scrollY: 0,
  }),
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.scrollY = window.scrollY;
    }
  },
  components: {
    Header,
    Footer,
    PageTopButton,
    ModalContact,
  }
}
</script>

<style lang="scss" scoped>
</style>

