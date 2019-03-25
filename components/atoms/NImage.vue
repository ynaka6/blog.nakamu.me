<template>
  <img
    :alt="alt"
    :src="src"
    :srcset="srcset"
    :sizes="sizes"
  />
</template>

<script>
export default {
  props: {
    alt: { type: String, required: true },
    src: { type: String, required: true },
    srcset: { type: String, required: false, default: '' },
    sizes: { type: String, required: false, default: '' },
  }
}
</script>
