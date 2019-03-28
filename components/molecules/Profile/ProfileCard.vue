<template>
  <div class="border bg-white shadow-sm p-2 md:px-4">
    <h3>Profile</h3>
    <div>
      <n-image
        class="p-6 block w-48 h-48 mx-auto rounded-full"
        :alt="author.fields.name"
        :src="`${author.fields.image.fields.file.url}`"
      />
      <p class="text-center">
        <n-link
          :to="author.fields.url"
          :label="author.fields.name"
          class="text-blue hover:text-blue-darker no-underline hover:underline"
          :target-blank="true"
        />
      </p>
      <p class="py-4 text-grey-darkest" v-text="author.fields.shortBio"></p>
      <div class="py-2">
        <a
          :href="'https://twitter.com/' + author.fields.twitter"
          target="_blank"
          style="color: #55acee;"
          rel="noreferrer"
          aria-label="Twitter"
        >
          <n-icon icon="twitter" size="6" />
        </a>
        <a
          :href="'https://github.com/' + author.fields.github"
          target="_blank"
          style="color: #333;"
          rel="noreferrer"
          aria-label="Github"
        >
          <n-icon icon="github" size="6" />
        </a>
        <a
          :href="'https://gitlab.com/' + author.fields.gitlab"
          target="_blank"
          style="color: #fa6d34;"
          rel="noreferrer"
          aria-label="Gitlab"
        >
          <n-icon icon="gitlab" size="6" />
        </a>
        <a
          :href="'https://www.instagram.com/' + author.fields.instagram"
          target="_blank"
          style="color: #d93177;"
          rel="noreferrer"
          aria-label="instagram"
        >
          <n-icon icon="instagram" size="6" />
        </a>
      </div>
      <p class="py-2 text-right">
        <n-link
          :to="author.fields.url"
          label="プロフィール詳細はこちら"
          class="text-blue hover:text-blue-darker no-underline hover:underline"
          :target-blank="true"
        />
      </p>
    </div>
  </div>
</template>

<script>
import NLink from '~/components/atoms/links/NLink'
import NIcon from '~/components/atoms/NIcon'
import NImage from '~/components/atoms/NImage'

export default {
  components: { NLink, NIcon, NImage },
  props: {
    author: { type: Object, required: true }
  }
}
</script>

<style scoped lang="postcss"></style>
