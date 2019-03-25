<template>
  <h2 class="text-center title-underline">{{ label }}</h2>
</template>

<script>
export default {
  props: {
    label: { type: String, required: true }
  }
}
</script>

<style scoped lang="postcss">
.title-underline {
  @apply relative mb-8 text-blue-darkest;
}
.title-underline:before {
  content: '';
  bottom: -15px;
  width: 60px;
  height: 5px;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  background-color: config('colors.blue-darkest');
  border-radius: 2px;
  @apply absolute inline-block;
}
</style>
