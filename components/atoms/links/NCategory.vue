<template>
  <nuxt-link :to="to" class="category">
    {{ label }}
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: { type: String, required: true },
    label: { type: String, required: true }
  }
}
</script>

<style scoped lang="postcss">
.category {
  @apply no-underline font-bold text-grey-darkest text-xs bg-yellow py-1 px-3 mt-2 mx-2 rounded-full;
}
.category:hover {
  @apply opacity-75;
}
</style>
