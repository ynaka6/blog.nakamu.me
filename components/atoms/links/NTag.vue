<template>
  <nuxt-link :to="to" class="tag" :class="size">
    {{ label }}
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: { type: String, required: true },
    label: { type: String, required: true },
    size: { type: String, required: false, default: '' }
  }
}
</script>

<style scoped lang="postcss">
.tag {
  @apply no-underline inline-block bg-white rounded-full px-5 py-2 font-semibold text-grey-darker m-1 border border-grey;
}
.tag:hover {
  @apply border border-red-light text-red-light;
}
.tag.small {
  @apply px-3 py-1 text-sm;
}
</style>
