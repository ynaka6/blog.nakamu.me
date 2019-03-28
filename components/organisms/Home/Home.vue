<template>
  <div>
    <section>
      <div
        class="text-center bg-white opacity-90 p-4 leading-normal border-b border-grey-lighter"
      >
        訪問ありがとうございます！
        <n-link
          :to="profile_site_url"
          class="text-blue hover:text-blue-darker"
          :target-blank="true"
        >
          プロフィールサイト
        </n-link>
        も合わせてご確認ください🙇🏻
      </div>
    </section>
    <section class="container mx-auto">
      <div class="flex flex-col lg:flex-row">
        <div class="lg:w-2/3 p-4">
          <n-title>
            Latest Posts
          </n-title>
          <div class="flex flex-wrap justify-center">
            <div
              v-for="(post, index) in $store.getters['post/latestPosts']"
              :key="index"
              :to="`/posts/${post.slug}/`"
              class="flex my-4 px-1 w-full md:w-1/2"
            >
              <post-card :post="post" />
            </div>
          </div>
        </div>
        <div class="lg:w-1/3 p-4">
          <profile-card :author="$store.getters['author/author']" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NTitle from '~/components/atoms/titles/NTitle'
import NLink from '~/components/atoms/links/NLink'
import PostCard from '~/components/molecules/Post/PostCard'
import ProfileCard from '~/components/molecules/Profile/ProfileCard'

export default {
  components: { NTitle, NLink, PostCard, ProfileCard },
  data: () => ({
    profile_site_url: process.env.PROFILE_SITE_URL
  })
}
</script>
