<template>
  <Button
    id="page-top"
    :classes="[ 'is-circle', 'is-large', 'is-primary', { 'is-hidden': scrollY < 200 } ]"
    icon="fas fa-angle-up"
  />
</template>

<script>
import Button from '~/components/atoms/Button.vue'

export default {
  props: [
    'scrollY'
  ],
  components: {
      Button
  }
}
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