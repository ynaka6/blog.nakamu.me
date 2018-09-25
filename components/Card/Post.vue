<template>
    <div class="card large">
        <div class="card-image">
            <nuxt-link class="image" :to="{ name: 'posts-slug', params: { slug: post.fields.slug }}">
            <img class="thumbnail"
                    :src="post.fields.heroImage.fields.file.url + '?fit=scale&w=350&h=196'"
                    :srcset="`${post.fields.heroImage.fields.file.url}?w=350&h=196&fit=fill 350w, ${post.fields.heroImage.fields.file.url}?w=1000&h=562&fit=fill 1000w, ${post.fields.heroImage.fields.file.url}?w=2000&h=1125&fit=fill 2000w`"
                    sizes="(min-width: 1024px) 400px, 100vw"
                    v-if="post.fields.heroImage"
                >
                <span class="image__category-label" v-text="post.fields.category"></span>
            </nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
  props: ['post']
};
</script>

<style lang="scss" scoped>

.post__title {
  font-size: 1.2rem;
}
.image__category-label {
    position: absolute;
    top: .5rem;
    right: .5rem;
    background: #fcee21;
    padding: .2rem 1rem;
    color: #444444;
    font-weight: bold;
    font-size: .8rem;
}

.media--position-bottom {
    position: absolute;
    bottom: .5rem;
}

</style>