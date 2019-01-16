<template>
    <span class="tag is-rounded">
        <time :datetime="publishDate.format('YYYY/MM/DD')">
            {{ publishDate.format('YYYY.MM.DD') }}
        </time>
        <!-- 記事投稿から数日は内容を調整する為、1週間以内は調整期間として更新日は表示しない -->
        <span v-if="publishDate.add(7, 'day').isBefore(updateDate)">
            <svg class="p-t-5" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 1792 1792" fill="currentColor"><path d="M1639 1056q0 5-1 7-64 268-268 434.5t-478 166.5q-146 0-282.5-55t-243.5-157l-129 129q-19 19-45 19t-45-19-19-45v-448q0-26 19-45t45-19h448q26 0 45 19t19 45-19 45l-137 137q71 66 161 102t187 36q134 0 250-65t186-179q11-17 53-117 8-23 30-23h192q13 0 22.5 9.5t9.5 22.5zm25-800v448q0 26-19 45t-45 19h-448q-26 0-45-19t-19-45 19-45l138-138q-148-137-349-137-134 0-250 65t-186 179q-11 17-53 117-8 23-30 23h-199q-13 0-22.5-9.5t-9.5-22.5v-7q65-268 270-434.5t480-166.5q146 0 284 55.5t245 156.5l130-129q19-19 45-19t45 19 19 45z"/></svg>
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
