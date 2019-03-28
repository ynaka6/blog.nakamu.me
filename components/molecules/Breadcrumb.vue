<template>
  <div class="bg-white border-b border-grey-lighter">
    <div class="container mx-auto">
      <nav>
        <ol class="breadcrumb">
          <li v-for="(data, index) in list" :key="index">
            <n-link
              v-if="data.link"
              :to="data.link"
              :label="data.label"
              class="text-blue-dark font-bold no-underline hover:underline"
            />
            <span v-else class="text-grey-darkest" v-text="data.label" />
          </li>
        </ol>
      </nav>
    </div>
  </div>
</template>

<script>
import NLink from '~/components/atoms/links/NLink'
export default {
  components: { NLink },
  props: {
    list: { type: Array, required: true }
  }
}
</script>

<style scoped lang="postcss">
ol.breadcrumb {
  @apply list-reset flex text-grey-dark p-4 overflow-x-scroll whitespace-no-wrap;
}
ol.breadcrumb > li {
  @apply flex items-center;
}
ol.breadcrumb > li + li:before {
  content: '\0227B';
  @apply mx-2;
}
</style>
