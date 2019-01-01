<template>
    <span class="tag is-rounded">
        <time :datetime="publishDate.format('YYYY/MM/DD')">
            {{ publishDate.format('YYYY.MM.DD') }}
        </time>
        <!-- 記事投稿から数日は内容を調整する為、1週間以内は調整期間として更新日は表示しない -->
        <span v-if="publishDate.add(7, 'day').isBefore(updateDate)">
            <i class="fas fa-sync-alt m-l-5 m-r-5"></i>
            <time :datetime="updateDate.format('YYYY/MM/DD')" style="margin-left: -4px;" v-text="updateDate.format('YYYY.MM.DD')"></time>
        </span>
    </span>
</template>

<script>
export default {
    props: {
        publishTime: String,
        updateTime: String
    },
    data: function (app) {
        return {
            publishDate: app.$dayjs(this.publishTime, { timeZone: 'Asia/Tokyo' }).set('h', 0).set('m', 0).set('s', 0).set('ms', 0),
            updateDate: app.$dayjs(this.updateTime, { timeZone: 'Asia/Tokyo' }).set('h', 0).set('m', 0).set('s', 0).set('ms', 0)
        }
    }
}
</script>
