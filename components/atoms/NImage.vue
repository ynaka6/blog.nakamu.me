<template>
  <img class="loading" :alt="alt" :src="src" :srcset="srcset" :sizes="sizes" />
</template>

<script>
export default {
  props: {
    alt: { type: String, required: true },
    src: { type: String, required: true },
    srcset: { type: String, required: false, default: '' },
    sizes: { type: String, required: false, default: '' },
    placeholder: { type: String, required: false, default: '' }
  }
}
</script>

<style scoped lang="postcss">
img.loading {
  filter: blur(0.5em);
}
</style>
