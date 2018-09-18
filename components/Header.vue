<template>
  <nav class="navbar is-primary" :class="{'is-fixed-top is-fadein': scrollY > 100}">
    <div class="container">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item is-block">
          <div class="font-leckerli-one navbar-brand__title">
            Nakamu Blog
          </div>
          <div class="subtitle is-size-7"> 自由な場所でエンジニアとして生きていくためのメディア</div>
        </router-link>

        <span class="navbar-burger burger" :class="{'is-active': drawer}" @click="drawer = !drawer">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
      <div class="navbar-menu" :class="{'is-active': drawer}">
        <div class="navbar-end">
          <a
            href="https://nakamu.life/"
            class="navbar-item is-text-font-quicksand"
            target="_blank"
          >
            About
          </a>
          <router-link
            to="/"
            class="navbar-item is-active is-text-font-quicksand"
          >
            Blog
          </router-link>
          <a
            href="javascript:void(0)"
            class="navbar-item is-text-font-quicksand"
            @click="toggleContactModal"
          >
            Contact
          </a>

        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  props: {
  },
  data: () => ({
    drawer: false,
    scrollY: 0,
  }),
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.scrollY = window.scrollY;
    },
    toggleContactModal() {
      this.$store.dispatch('toggleContactModal');
    },
  },
};
</script>

<style lang="scss" scoped>
</style>