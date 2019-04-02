<template>
  <div class="flex justify-between">
    <div>
      <div v-if="prevUrl">
        <n-link
          :to="prevUrl"
          class="bg-white hover:bg-grey-light border text-grey-darkest w-12 h-12 rounded-full font-semibold flex items-center justify-center no-underline"
          aria-label="前のページ"
        >
          <n-icon icon="chevron-left" class="w-6 h-6" />
        </n-link>
        <p class="text-grey-darker text-xs pt-1">前のページ</p>
      </div>
    </div>
    <div>
      <div v-if="nextUrl">
        <n-link
          :to="nextUrl"
          class="bg-white hover:bg-grey-light border text-grey-darkest w-12 h-12 rounded-full font-semibold flex items-center justify-center no-underline"
          aria-label="次のページ"
        >
          <n-icon icon="chevron-right" class="w-6 h-6" />
        </n-link>
        <p class="text-grey-darker text-xs pt-1">次のページ</p>
      </div>
    </div>
  </div>
</template>

<script>
import NLink from '~/components/atoms/links/NLink'
import NIcon from '~/components/atoms/NIcon'
export default {
  components: { NLink, NIcon },
  props: {
    prevUrl: {
      type: String,
      required: false,
      useDefaultForNull: true,
      default: null
    },
    nextUrl: {
      type: String,
      required: false,
      useDefaultForNull: true,
      default: null
    }
  }
}
</script>

<style scoped lang="postcss"></style>
