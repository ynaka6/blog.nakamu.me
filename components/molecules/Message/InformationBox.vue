<template>
  <div
    class="bg-blue-lightest border-t-4 border-blue rounded-b px-4 py-3 shadow-md"
    role="alert"
  >
    <div class="flex items-center">
      <div class="py-1">
        <n-icon
          icon="info-circle"
          class="w-6 h-6 fill-current text-blue mr-4"
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
