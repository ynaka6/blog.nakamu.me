<template>
  <nuxt-link
      :to="`/tags/${tag}/`"
      class="button is-rounded"
      :class="size"
  >
      #{{ tag }}
  </nuxt-link>
</template>

<script>
export default {
  props: [
    'tag',
    'size',
  ]
}
</script>