<template>
  <div
    v-if="message"
    class="fixed top-0 left-0 w-full z-20 leading-normal"
    :class="{
      'alert-success': 'success' === type,
      'alert-info': 'info' === type,
      'alert-error': 'error' === type
    }"
    role="alert"
  >
    <div class="flex relative">
      <div class="py-1">
        <n-icon
          icon="info-circle"
          class="w-6 h-6 fill-current text-icon mr-4"
        />
      </div>
      <div>
        <p class="font-bold" v-text="message.title"></p>
        <p class="text-sm" v-text="message.description"></p>
      </div>
      <span class="absolute top-0 right-0 py-2 text-gray-600" @click="close">
        <n-icon icon="close" class="w-6 h-6" />
      </span>
    </div>
  </div>
</template>

<script>
import NIcon from '~/components/atoms/NIcon'

export default {
  components: { NIcon },
  props: {
    type: {
      type: String,
      default: 'info'
    },
    message: {
      type: Object,
      required: false,
      default: null,
      useDefaultForNull: true
    }
  },
  methods: {
    close(event) {
      this.$emit('close', event)
    }
  }
}
</script>

<style scoped lang="postcss">
.alert-success {
  @apply bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-800 px-4 py-3 shadow-md;
}
.alert-success .text-icon {
  @apply text-teal-500;
}
.alert-info {
  @apply bg-teal-100 border-t-4 border-blue-500 rounded-b text-blue-800 px-4 py-3 shadow-md;
}
.alert-info .text-icon {
  @apply text-blue-500;
}
.alert-error {
  @apply bg-red-100 border-t-4 border-red-500 rounded-b text-red-800 px-4 py-3 shadow-md;
}
.alert-error .text-icon {
  @apply text-red-500;
}
</style>
