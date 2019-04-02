<template>
  <section>
    <div
      class="text-center bg-white opacity-90 p-6 border-b border-grey-lighter"
    >
      <n-title>
        Tags
      </n-title>
      <div>
        <n-tag
          v-for="(tag, index) in tags"
          :key="index"
          :to="`/tags/${tag.slug}`"
          :label="tag.name"
        />
      </div>
    </div>
  </section>
</template>

<script>
import NTag from '~/components/atoms/links/NTag'
import NTitle from '~/components/atoms/titles/NTitle'

export default {
  components: { NTag, NTitle },
  props: {
    tags: { type: Array, required: true }
  }
}
</script>

<style scoped lang="postcss"></style>
