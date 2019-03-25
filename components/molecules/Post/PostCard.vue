<template>
  <article class="overflow-hidden rounded-lg bg-white hover:shadow-lg">
    <nuxt-link to="/">
      <img
        class="block h-auto w-full"
        :alt="post.fields.title"
        :src="post.fields.heroImage.fields.file.url + '?fit=scale&w=350&h=196'"
        :srcset="
          `
          ${post.fields.heroImage.fields.file.url}?w=350&h=196&fit=fill 350w,
          ${post.fields.heroImage.fields.file.url}?w=1000&h=562&fit=fill 1000w,
          ${post.fields.heroImage.fields.file.url}?w=2000&h=1125&fit=fill 2000w
          `
        "
        sizes="(min-width: 1024px) 400px, 100vw"
      />
    </nuxt-link>
    <div class="p-2 md:px-4">
      <p class="my-1 text-sm text-grey-darker">
        <span class="text-grey-darker text-sm">
          2019/01/01
          <svg
            class="h-3 w-3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1792 1792"
            fill="currentColor"
          >
            <path
              d="M1639 1056q0 5-1 7-64 268-268 434.5t-478 166.5q-146 0-282.5-55t-243.5-157l-129 129q-19 19-45 19t-45-19-19-45v-448q0-26 19-45t45-19h448q26 0 45 19t19 45-19 45l-137 137q71 66 161 102t187 36q134 0 250-65t186-179q11-17 53-117 8-23 30-23h192q13 0 22.5 9.5t9.5 22.5zm25-800v448q0 26-19 45t-45 19h-448q-26 0-45-19t-19-45 19-45l138-138q-148-137-349-137-134 0-250 65t-186 179q-11 17-53 117-8 23-30 23h-199q-13 0-22.5-9.5t-9.5-22.5v-7q65-268 270-434.5t480-166.5q146 0 284 55.5t245 156.5l130-129q19-19 45-19t45 19 19 45z"
            />
          </svg>
          2019/02/01
        </span>
      </p>

      <h3 class="my-3 text-lg">
        <nuxt-link
          to="/"
          class="no-underline text-black font-bold text-xl py-1"
        >
          {{ post.fields.title }}
        </nuxt-link>
      </h3>
      <p
        class="text-grey-darker text-sm mb-4"
        v-text="post.fields.description"
      />
      <div class="my-1">
        <n-tag
          v-for="(tag, index) in post.fields.tags"
          :key="index"
          :to="`/`"
          :label="tag"
          size="small"
        />
      </div>
    </div>
  </article>
</template>

<script>
import NTag from '~/components/atoms/links/NTag'

export default {
  components: { NTag },
  props: {
    post: { type: Object, required: true }
  }
}
</script>

<style scoped lang="postcss"></style>
