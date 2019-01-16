<template>
  <Button
    :href="href"
    :classes="[ 'is-rounded', 'is-large', 'is-primary' ]"
    v-on:click="$emit('click', event)"
  >
    もっと見る
  </Button>
</template>

<script>
import Button from '~/components/atoms/Button.vue'

export default {
  props: [
    'href'
  ],
  components: {
      Button
  }
}
</script>