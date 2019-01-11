<template>
  <nuxt-link
      :to="{ name: 'tags-tag', params: { tag: tag }}"
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