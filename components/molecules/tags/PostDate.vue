<template>
    <span class="tag is-rounded m-b-10">
        <time :datetime="publishDate.format('YYYY/MM/DD')" v-text="publishDate.format('YYYY.MM.DD')"></time>
        <span v-if="publishDate.isBefore(updateDate)">
            &nbsp;<i class="fas fa-sync-alt"></i>&nbsp;
            <time :datetime="updateDate.format('YYYY/MM/DD')" v-text="updateDate.format('YYYY.MM.DD')"></time>
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
