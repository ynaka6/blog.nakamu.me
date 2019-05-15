<template>
  <div
    class="bg-blue-100 border-t-4 border-blue-500 rounded-b px-4 py-3 shadow-md"
    role="alert"
  >
    <div class="flex items-center">
      <div class="py-1">
        <n-icon
          icon="info-circle"
          class="w-6 h-6 fill-current text-blue-500 mr-4"
        />
      </div>
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import NIcon from '~/components/atoms/NIcon'
export default {
  components: { NIcon }
}
</script>

<style scoped lang="postcss"></style>
