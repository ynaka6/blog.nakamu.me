<template>
  <a
    :href="href"
    target="_blank"
    class="button is-circle is-medium"
    rel="noreferrer"
    :aria-label="text"
  >
    <i v-if="icon" :class="icon"></i>
  </a>
</template>

<script>
export default {
  props: [
    'href',
    'icon',
    'text'
  ]
}
</script>


<style lang="scss" scoped>
a {
  justify-content: start;
  padding-left: calc(0.625em - 1px);
  padding-right: calc(0.625em - 1px);
}
</style>