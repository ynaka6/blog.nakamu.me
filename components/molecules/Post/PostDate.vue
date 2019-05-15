<template>
  <p class="my-1 text-sm text-gray-600">
    <span class="text-gray-600 text-sm flex">
      <time
        class="mr-3 flex items-center"
        :datetime="publishDate.format('YYYY/MM/DD')"
      >
        <n-icon icon="calendar-alt" class="w-3 h-3 mr-1" />
        <span>{{ publishDate.format('YYYY.MM.DD') }}</span>
      </time>
      <time
        v-if="publishDate.add(7, 'day').isBefore(updateDate)"
        :datetime="updateDate.format('YYYY/MM/DD')"
        class="flex items-center"
      >
        <n-icon icon="history" class="w-3 h-3 mr-1" />
        <span>{{ updateDate.format('YYYY.MM.DD') }}</span>
      </time>
    </span>
  </p>
</template>

<script>
import NIcon from '~/components/atoms/NIcon'

export default {
  components: { NIcon },
  props: {
    publishTime: { type: String, required: true },
    updateTime: { type: String, required: true }
  },
  computed: {
    publishDate: function() {
      return this.$dayjs(this.publishTime, { timeZone: 'Asia/Tokyo' })
        .set('h', 0)
        .set('m', 0)
        .set('s', 0)
        .set('ms', 0)
    },
    updateDate: function() {
      return this.$dayjs(this.updateTime, { timeZone: 'Asia/Tokyo' })
        .set('h', 0)
        .set('m', 0)
        .set('s', 0)
        .set('ms', 0)
    }
  }
}
</script>

<style scoped lang="postcss"></style>
