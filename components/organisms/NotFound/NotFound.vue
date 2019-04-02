<template>
  <div>
    <section class="container mx-auto">
      <div class="flex justify-center">
        <div class="lg:w-2/3 p-4 text-center">
          <n-title class="text-4xl mt-10">
            Page not found.
          </n-title>
          <p class="my-16">
            お探しのページは削除されたか存在しません。
          </p>
          <div class="my-10 mx-4">
            <n-link
              to="/"
              class="p-4 text-2xl text-grey-darkest hover:text-grey-dark bg-white hover:bg-grey-lighter border border-grey-darkest no-underline"
            >
              <n-icon icon="undo" class="w-6 h-6" />
              Homeに戻る
            </n-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NTitle from '~/components/atoms/titles/NTitle'
import NLink from '~/components/atoms/links/NLink'
import NIcon from '~/components/atoms/NIcon'

export default {
  components: { NTitle, NLink, NIcon },
  data: () => ({})
}
</script>
