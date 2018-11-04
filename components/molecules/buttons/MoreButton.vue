<template>
  <Button
    :href="href"
    text="もっと見る"
    :classes="[ 'is-rounded', 'is-large', 'is-primary' ]"
    v-on:click="$emit('click', event)"
  />
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