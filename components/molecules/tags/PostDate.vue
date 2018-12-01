<template>
    <span class="tag is-rounded m-b-10">
        <time :datetime="$dayjs(publishDate).format('YYYY/MM/DD')" v-text="$dayjs(publishDate).format('YYYY.MM.DD')"></time>
        <span v-if="$dayjs(publishDate).isBefore($dayjs(updateDate))">
            &nbsp;<i class="fas fa-sync-alt"></i>&nbsp;
            <time :datetime="$dayjs(updateDate).format('YYYY/MM/DD')" v-text="$dayjs(updateDate).format('YYYY.MM.DD')"></time>
        </span>
    </span>
</template>

<script>
export default {
  props: [
    'publishDate',
    'updateDate',
  ]
}
</script>
