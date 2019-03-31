<template>
  <div>
    <div class="flex flex-col items-center justify-center w-full">
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
    <div class="mt-10 mx-4">
      <n-link
        to="/posts"
        class="w-full block p-4 text-center text-grey-darkest hover:text-grey-dark bg-white hover:bg-grey-lighter border border-grey-darkest no-underline"
      >
        記事をもっと見る
      </n-link>
    </div>
  </div>
</template>

<script>
import NTitle from '~/components/atoms/titles/NTitle'
import NLink from '~/components/atoms/links/NLink'
import PostListItem from '~/components/molecules/Post/PostListItem'

export default {
  components: { NTitle, NLink, PostListItem },
  props: {
    label: { type: String, required: true },
    posts: { type: Array, required: true }
  }
}
</script>

<style scoped lang="postcss"></style>
