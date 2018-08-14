<template>
  <div class="card large">
    <div class="card-image">
        <nuxt-link class="image" :to="{ name: 'posts-slug', params: { slug: post.fields.slug }}">
          <img class="thumbnail"
                :src="post.fields.heroImage.fields.file.url + '?fit=scale&w=350&h=196'"
                :srcset="`${post.fields.heroImage.fields.file.url}?w=350&h=196&fit=fill 350w, ${post.fields.heroImage.fields.file.url}?w=1000&h=562&fit=fill 1000w, ${post.fields.heroImage.fields.file.url}?w=2000&h=1125&fit=fill 2000w`"
                sizes="(min-width: 1024px) 400px, 100vw"
            >
        </nuxt-link>
    </div>
    <div class="card-content">
        <div class="media">
            <div class="media-left">
                <figure class="image is-48x48 is-circle">
                    <img :src="post.fields.author.fields.image.fields.file.url" alt="Image">
                </figure>
            </div>
            <div class="media-content">
                <h4><nuxt-link :to="{ name: 'posts-slug', params: { slug: post.fields.slug }}" class="title post__title m-b-0">{{ post.fields.title }}</nuxt-link></h4>
                <p><span class="title is-6"><a :href="post.fields.author.fields.url">@{{ post.fields.author.fields.name }}</a></span></p>
                <!-- <p class="subtitle is-6">{{ ( new Date(post.fields.publishDate)).toDateString() }}</p> -->
            </div>
        </div>
        <div class="content">
              {{ post.fields.description }}
              <div class="background-icon"><span class="icon-twitter"></span></div>
              <div class="tags m-t-10">
                  <nuxt-link
                      v-for="tag in post.fields.tags"
                      :key="tag"
                      :to="{ name: 'tags-tag', params: { tag: tag }}" class="tag is-success">{{ tag }}</nuxt-link>
              </div>
        </div>
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
  font-size: 1.4rem;
}
</style>