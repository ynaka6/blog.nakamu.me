<template>
  <div class="font-sans flex flex-col items-center justify-center w-full">
    <n-title>
      {{ label }}
    </n-title>
    <div
      class="overflow-hidden bg-white rounded w-full shadow-lg leading-normal"
    >
      <post-list-item
        v-for="(post, index) in posts"
        :key="index"
        :post="post"
      />
    </div>
  </div>
</template>

<script>
import NTitle from '~/components/atoms/titles/NTitle'
import PostListItem from '~/components/molecules/Post/PostListItem'

export default {
  components: { NTitle, PostListItem },
  props: {
    label: { type: String, required: true },
    posts: { type: Array, required: true }
  }
}
</script>

<style scoped lang="postcss"></style>
