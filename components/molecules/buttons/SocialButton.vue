<template>
  <Button
    :href="href"
    target="_blank"
    :icon="icon"
    :classes="[ 'is-circle', 'is-medium' ]"
  />
</template>

<script>
import Button from '~/components/atoms/Button.vue'

export default {
  props: [
    'href',
    'icon'
  ],
  components: {
      Button
  }
}
</script>