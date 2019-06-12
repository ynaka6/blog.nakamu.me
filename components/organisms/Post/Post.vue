<template>
  <div>
    <section class="container mx-auto">
      <div class="flex flex-col lg:flex-row">
        <div class="lg:w-2/3 lg:p-4">
          <article
            class="border-b lg:border bg-white shadow-sm px-4 lg:px-6 py-6"
          >
            <post-date
              :publish-time="post.fields.publishDate"
              :update-time="post.sys.updatedAt"
            />
            <h1 class="my-2 text-2xl lg:text-3xl leading-tight">
              {{ post.fields.title }}
            </h1>
            <!-- eslint-disable vue/no-v-html -->
            <p
              class="text-sm text-gray-600 mb-4"
              v-html="post.fields.description"
            />
            <!--eslint-enable-->
            <div>
              <n-tag
                v-for="(tag, index) in tags"
                :key="index"
                :to="`/tags/${tag.slug}`"
                :label="tag.name"
                size="small"
              />
            </div>
            <div class="relative">
              <picture class="block h-auto w-full my-4">
                <source
                  type="image/webp"
                  :srcset="`${post.fields.heroImage.fields.file.url}?fm=webp`"
                />
                <n-image
                  :alt="post.fields.title"
                  :src="`${post.fields.heroImage.fields.file.url}?w=10`"
                  :placeholder="post.fields.heroImage.fields.file.url"
                  :srcset="
                    `
                    ${
                      post.fields.heroImage.fields.file.url
                    }?w=350&h=196&fit=fill 350w,
                    ${
                      post.fields.heroImage.fields.file.url
                    }?w=1000&h=562&fit=fill 1000w,
                    ${
                      post.fields.heroImage.fields.file.url
                    }?w=2000&h=1125&fit=fill 2000w
                    `
                  "
                  sizes="(min-width: 1024px) 400px, 100vw"
                />
              </picture>
              <n-category
                v-if="category"
                :to="`/categories/${category.slug}`"
                :label="category.name"
                class="absolute top-0 right-0"
              />
            </div>
            <post-content :content="post.fields.body" />
            <pagination :prev-url="prevUrl" :next-url="nextUrl" />
            <div v-show="disqus_shortname" class="mt-10">
              <vue-disqus
                :shortname="disqus_shortname"
                :identifier="post.fields.slug"
                :url="`${base_url}/posts/${post.fields.slug}`"
              ></vue-disqus>
            </div>
          </article>
        </div>
        <div class="lg:w-1/3 lg:p-4">
          <profile-card
            :author="$store.getters['author/author']"
            class="m-4 lg:m-0"
          />
          <div class="w-full my-4 mx-auto">
            <adsbygoogle />
          </div>
          <post-list label="Latest Posts" :posts="latestPosts" class="my-10" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NCategory from '~/components/atoms/links/NCategory'
import NTag from '~/components/atoms/links/NTag'
import NImage from '~/components/atoms/NImage'
import ProfileCard from '~/components/molecules/Profile/ProfileCard'
import PostDate from '~/components/molecules/Post/PostDate'
import PostContent from '~/components/molecules/Post/PostContent'
import PostList from '~/components/molecules/Post/PostList'
import Pagination from '~/components/molecules/Pagination'

export default {
  components: {
    NCategory,
    NTag,
    NImage,
    ProfileCard,
    PostContent,
    PostDate,
    PostList,
    Pagination
  },
  data: () => ({
    just_comments_apy_key: process.env.JUST_COMMENTS_APY_KEY,
    base_url: process.env.BASE_URL,
    disqus_shortname: process.env.DISQUS_SHORTNAME
  }),
  computed: {
    post() {
      return this.$store.getters['post/post']
    },
    category() {
      if (!this.post.fields.category) return null

      return this.$store.getters['category/categoryOfName'](
        this.post.fields.category[0]
      )
    },
    tags: function() {
      if (!this.post.fields.tags) return []
      return this.post.fields.tags
        .map(t => this.$store.getters['tag/tagOfName'](t))
        .filter(t => t != null)
    },
    latestPosts: function() {
      return this.$store.getters['post/latestPosts']
    },
    prevUrl: function() {
      const prevPost = this.$store.getters['post/prevPost']
      if (prevPost) {
        return `/posts/${prevPost.fields.slug}`
      }
      return null
    },
    nextUrl: function() {
      const nextPost = this.$store.getters['post/nextPost']
      if (nextPost) {
        return `/posts/${nextPost.fields.slug}`
      }
      return null
    }
  },
  mounted: function() {
    // this.$nextTick(() => {
    //   if (this.$refs.comments) {
    //     const s = document.createElement('script')
    //     s.src = '//just-comments.com/w.js'
    //     s.setAttribute('data-timestamp', +new Date())
    //     this.$refs.comments.appendChild(s)
    //   }
    // })
  }
}
</script>
