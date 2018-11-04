<template>
    <a
      :id="id"
      :href="href"
      :target="target"
      class="button"
      :class="classes"
      @click="click"
    >
      <i v-if="icon" :class="icon"></i>
      <span v-if="text" v-text="text"></span>
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