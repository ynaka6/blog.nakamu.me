<template>
  <a
    class="block sm:inline btn bg-register text-center text-white font-bold py-4 px-12 rounded-full"
    v-text="label"
  />
</template>

<script>
export default { props: { label: { type: String, required: true } } }
</script>

<style scoped lang="postcss">
.bg-register {
  background-image: linear-gradient(to right, #ff91fc, #ff6544);
}
</style>
