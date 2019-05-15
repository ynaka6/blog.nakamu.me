<template>
  <div ref="section" class="section" :class="{ active: list.length > 0 }">
    <div class="container">
      <nav>
        <ol class="breadcrumb">
          <li v-for="(data, index) in list" :key="index">
            <n-link
              v-if="data.link"
              :to="data.link"
              class="flex items-center text-blue-600 font-bold no-underline hover:underline"
            >
              <n-icon
                v-if="data.icon"
                :icon="data.icon"
                class="text-blue-600 w-4 h-4 mr-1"
              />
              {{ data.label }}
            </n-link>
            <span v-else class="flex items-center text-gray-800">
              <n-icon
                v-if="data.icon"
                :icon="data.icon"
                class="text-gray-800 w-4 h-4"
              />
              {{ data.label }}
            </span>
          </li>
        </ol>
      </nav>
    </div>
  </div>
</template>

<script>
import NLink from '~/components/atoms/links/NLink'
import NIcon from '~/components/atoms/NIcon'
export default {
  components: { NLink, NIcon },
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
  @apply bg-white border-b border-gray-400 opacity-0 overflow-y-hidden;
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
  @apply list-none flex text-gray-600 px-4 py-5 overflow-x-scroll whitespace-no-wrap;
}
ol.breadcrumb::-webkit-scrollbar {
  @apply hidden;
}
ol.breadcrumb > li {
  @apply flex items-center;
}
ol.breadcrumb > li + li:before {
  content: '\0227B';
  @apply mx-2;
}
</style>
