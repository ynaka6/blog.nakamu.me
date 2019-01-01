<template>
    <div class="card">
        <article class="media">
            <figure class="media-left">
                <nuxt-link class="image" :to="{ name: 'posts-slug', params: { slug: post.fields.slug }}">
                    <lazy-component>
                        <img class=""
                            :alt="post.fields.title"
                            :src="post.fields.heroImage.fields.file.url + '?fit=scale&w=350&h=196'"
                            :srcset="`${post.fields.heroImage.fields.file.url}?w=350&h=196&fit=fill 350w, ${post.fields.heroImage.fields.file.url}?w=1000&h=562&fit=fill 1000w, ${post.fields.heroImage.fields.file.url}?w=2000&h=1125&fit=fill 2000w`"
                            sizes="(min-width: 1024px) 400px, 100vw"
                            v-if="post.fields.heroImage"
                        >
                    </lazy-component>
                </nuxt-link>
            </figure>
            <div class="media-content">
                <PostDate
                    :publishTime="post.fields.publishDate"
                    :updateTime="post.sys.updatedAt"
                />
                <div class="content m-t-5">
                    <nuxt-link class="has-text-dark has-text-weight-semibold" :to="{ name: 'posts-slug', params: { slug: post.fields.slug }}">{{ post.fields.title }}</nuxt-link>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
import PostDate from '~/components/molecules/tags/PostDate.vue'
export default {
    props: ['post'],
    components: {
        PostDate
    }
};
</script>

<style lang="scss" scoped>
.card {
    padding: .5rem;
}
.image {
    width: 96px;
}
.media {
    & > .media-content {
    }
}
</style>