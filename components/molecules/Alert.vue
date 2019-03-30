<template>
  <div
    v-if="message"
    class="fixed pin-t pin-l w-full z-20 leading-normal"
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
          size="6"
          class="fill-current text-icon mr-4"
        />
      </div>
      <div>
        <p class="font-bold" v-text="message.title"></p>
        <p class="text-sm" v-text="message.description"></p>
      </div>
      <span class="absolute pin-t pin-r py-2 text-grey-darker" @click="close">
        <n-icon icon="close" size="6" />
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
  @apply bg-teal-lightest border-t-4 border-teal rounded-b text-teal-darkest px-4 py-3 shadow-md;
}
.alert-success .text-icon {
  @apply text-teal;
}
.alert-info {
  @apply bg-teal-lightest border-t-4 border-blue rounded-b text-blue-darkest px-4 py-3 shadow-md;
}
.alert-info .text-icon {
  @apply text-blue;
}
.alert-error {
  @apply bg-red-lightest border-t-4 border-red rounded-b text-red-darkest px-4 py-3 shadow-md;
}
.alert-error .text-icon {
  @apply text-red;
}
</style>
