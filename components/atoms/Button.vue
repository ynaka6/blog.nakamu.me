<template>
    <a
      :id="id"
      :href="href"
      :target="target"
      class="button"
      :class="classes"
      @click="click"
    >
      <slot />
    </a>
</template>

<script>
export default {
  props: [
    'id',
    'href',
    'target',
    'text',
    'icon',
    'classes',
  ],
  methods: {
    click(event) {
      this.$emit('click', event)
    }
  }
}
</script>