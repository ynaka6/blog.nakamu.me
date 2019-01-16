<template>
    <div class="m-t-40">
        <div class="has-text-centered m-b-15">
            <h2 class="title is-5 is-underline font-quicksand" v-text="title"></h2>
            <p v-if="subtitle" class="subtitle has-text-dark is-7" v-text="subtitle"></p>
        </div>

        <ListPostItem v-for="(post, index) in posts" :key="index" :post="post"></ListPostItem>
    </div>
</template>

<script>
import ListPostItem from '~/components/molecules/lists/PostItem.vue'
export default {
    props: ['posts', 'title', 'subtitle'],
    components: {
        ListPostItem
    }
};
</script>

<style lang="scss" scoped>
</style>