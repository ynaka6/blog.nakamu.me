<template>
  <nuxt-link to="/" class="logo">{{ label }}</nuxt-link>
</template>

<script>
export default {
  props: {
    label: { type: String, required: true }
  }
}
</script>

<style scoped lang="postcss">
.logo {
  @apply no-underline font-sans;
}
.logo.text-white {
  @apply text-white;
}
.logo.text-white:hover {
  @apply text-gray-300;
}
</style>
