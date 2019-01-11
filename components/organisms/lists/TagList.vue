<template>
    <div class="m-t-40">
        <div class="has-text-centered m-b-15">
            <h2 class="title is-5 is-underline font-quicksand" v-text="title"></h2>
            <p v-if="subtitle" class="subtitle has-text-grey is-7" v-text="subtitle"></p>
        </div>
        <div class="card">
            <div class="card-content">
                <div class="buttons">
                    <Tag v-for="(tag, index) in tags" :key="index" :tag="tag" size="is-small" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Tag from '~/components/atoms/Tag.vue'
export default {
    props: ['title', 'subtitle', 'tags'],
    components: {
        Tag
    }
};
</script>
