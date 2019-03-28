<template>
  <div class="flex justify-between">
    <div>
      <div v-if="prevUrl">
        <nuxt-link
          :to="prevUrl"
          class="button is-large is-circle is-light"
          aria-label="前のページ"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 1792 1792"
            fill="currentColor"
          >
            <path
              d="M1203 544q0 13-10 23l-393 393 393 393q10 10 10 23t-10 23l-50 50q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23z"
            />
          </svg>
        </nuxt-link>
      </div>
    </div>
    <div>
      <nuxt-link
        v-if="nextUrl"
        :to="nextUrl"
        class="button is-large is-circle is-light"
        aria-label="次のページ"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 1792 1792"
          fill="currentColor"
        >
          <path
            d="M1171 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z"
          />
        </svg>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    prevUrl: {
      type: String,
      required: false,
      useDefaultForNull: true,
      default: null
    },
    nextUrl: {
      type: String,
      required: false,
      useDefaultForNull: true,
      default: null
    }
  }
}
</script>

<style scoped lang="postcss"></style>
