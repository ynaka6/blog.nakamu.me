<template>
    <a
      id="page-top"
      class="button is-danger is-large is-circle"
      :class="{'is-hidden': scrollY < 200}"
      v-scroll-to="'body'"
    >
      <i class="fas fa-angle-up"></i>
    </a>
</template>

<script>
export default {
  props: [],
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
};
</script>

<style lang="scss" scoped>
#page-top {
    position: fixed;
    right: 3rem;
    bottom: 3rem;
    border-radius: 50%;
    font-size: 2rem;

    animation:fadein 1s both;

    &.is-hidden {
        animation:fadeout 1s both;
    }
}

@media screen and (max-width: 1088px) {
  #page-top {
    right: 1rem;
    bottom: 1rem;
  }
}

@keyframes fadein {
	0% {
		opacity:0;
	}
	100% {
		opacity:1;
	}
}

@keyframes fadeout {
	0% {
		opacity:1;
	}
	100% {
		opacity:0;
	}
}
</style>