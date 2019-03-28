<template>
  <p class="my-1 text-sm text-grey-darker">
    <span class="text-grey-darker text-sm">
      <time class="mr-3" :datetime="publishDate.format('YYYY/MM/DD')">
        <n-icon icon="calendar-alt" size="3" />
        {{ publishDate.format('YYYY.MM.DD') }}
      </time>
      <time
        v-if="publishDate.add(7, 'day').isBefore(updateDate)"
        :datetime="updateDate.format('YYYY/MM/DD')"
      >
        <n-icon icon="history" size="3" />
        {{ updateDate.format('YYYY.MM.DD') }}
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
