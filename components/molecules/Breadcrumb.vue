<template>
  <div ref="section" class="section" :class="{ active: list.length > 1 }">
    <div class="container">
      <nav>
        <ol class="breadcrumb">
          <li v-for="(data, index) in list" :key="index">
            <n-link
              v-if="data.link"
              :to="data.link"
              class="text-blue-dark font-bold no-underline hover:underline"
            >
              {{ data.label }}
            </n-link>
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
.section {
  transition: all 1000ms ease;
  max-height: 0;
  pointer-events: none;
  @apply bg-white border-b border-grey-lighter opacity-0 overflow-y-hidden;
}
.section.active {
  transition: all 2000ms ease;
  pointer-events: auto;
  @apply opacity-100 max-h-full;
}
.container {
  @apply mx-auto h-full;
}
ol.breadcrumb {
  @apply list-reset flex text-grey-dark px-4 py-5 overflow-x-scroll whitespace-no-wrap;
}
ol.breadcrumb > li {
  @apply flex items-center;
}
ol.breadcrumb > li + li:before {
  content: '\0227B';
  @apply mx-2;
}
</style>
