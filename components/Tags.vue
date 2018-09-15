<template>
  <section class="hero is-dark is-medium" v-if="tags.length">
    <div class="hero-body p-t-50">
      <div class="container">
        <div class="box">
          <div class="has-text-centered">
              <h2 class="title has-text-dark is-underline is-text-font-quicksand">
              Tags
              </h2>
              <p class="subtitle has-text-grey is-6">タグ</p>
          </div>

          <div class="columns" style="margin-top: 1.5rem;">
            <div class="column is-offset-1 is-10">
              <div class="tags m-t-10 is-centered">
                  <nuxt-link
                      v-for="tag in tags"
                      :key="tag"
                      :to="{ name: 'tags-tag', params: { tag: tag }}" class="tag is-danger is-medium is-rounded">{{ tag }}</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {createClient} from '~/plugins/contentful.js'
const client = createClient()
export default {
  name: 'Tags',
  props: ['tags']
};
</script>

<style scoped>
</style>
