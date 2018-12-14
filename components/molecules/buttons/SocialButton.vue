<template>
  <a
    :href="href"
    target="_blank"
    class="button is-circle is-medium"
    rel="noreferrer"
  >
    <i v-if="icon" :class="icon"></i>
    <span class="is-invisible" v-if="text" v-text="text"></span>
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