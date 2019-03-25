<template>
  <nuxt-link to="/" class="logo" :class="color">{{ label }}</nuxt-link>
</template>

<script>
export default {
  props: {
    label: { type: String, required: true },
    color: { type: String, required: true }
  }
}
</script>

<style scoped lang="postcss">
.logo {
  font-family: Leckerli One, cursive;
  @apply no-underline font-normal;
}
.logo.text-white {
  @apply text-white;
}
.logo.text-white:hover {
  @apply text-grey;
}
</style>
