import categories from '~/assets/json/categories.json'
import postJson from '~/assets/json/posts.json'
import { createClient } from '~/plugins/contentful.js'
const client = createClient()

export const state = () => ({
  categories: categories,
  category: {},
  postJson: postJson,
  posts: [],
  page: null,
  prevPage: null,
  nextPage: null
})

export const getters = {
  categories: ({ categories }) => categories,
  category: ({ category }) => category,
  posts: ({ posts }) => posts,
  page: ({ page }) => page,
  prevPage: ({ prevPage }) => prevPage,
  nextPage: ({ nextPage }) => nextPage,
  isPrevPage: ({ page, prevPage }) => {
    return prevPage && page > prevPage
  },
  isNextPage: ({ page, nextPage }) => {
    return nextPage && nextPage > page
  },
  categoryOfName: state => name => {
    return state.categories.find(category => category.name === name)
  }
}

export const actions = {
  setCategory({ commit, state }, payload) {
    commit(
      'SET_CATEGORY',
      state.categories.find(category => category.slug === payload.category)
    )
  },
  setPosts({ commit }, payload) {
    const { posts, page, prevPage, nextPage } = payload

    commit('SET_POSTS', posts)
    commit('SET_PAGE', parseInt(page) || 1)
    commit('SET_PREV_PAGE', parseInt(prevPage))
    commit('SET_NEXT_PAGE', parseInt(nextPage))
  },
  async loadPosts({ commit, state }, page) {
    const p = parseInt(page) || 1
    const limit = parseInt(process.env.PAGENATE_LIMIT) || 20
    const skip = (p - 1) * limit

    if (process.browser && state.postJson && state.postJson.length > 0) {
      const categoryPostJson = state.postJson.filter(
        post => state.category.name === post.fields.category[0]
      )
      const prevPage = p > 1 ? p - 1 : null
      const nextPage = categoryPostJson.length > skip + limit ? p + 1 : null

      commit('SET_POSTS', categoryPostJson.slice(skip, skip + limit))
      commit('SET_PAGE', p)
      commit('SET_PREV_PAGE', prevPage)
      commit('SET_NEXT_PAGE', nextPage)
      return
    }

    const posts = await client.getEntries({
      content_type: process.env.CTF_BLOG_POST_TYPE_ID,
      'fields.category[in]': state.category.name,
      order: '-fields.publishDate',
      skip: skip,
      limit: limit + 1
    })

    const prevPage = p > 1 ? p - 1 : null
    const nextPage = posts.items.length > limit ? p + 1 : null
    if (nextPage) {
      posts.items.pop()
    }

    commit('SET_POSTS', posts.items)
    commit('SET_PAGE', p)
    commit('SET_PREV_PAGE', prevPage)
    commit('SET_NEXT_PAGE', nextPage)
  }
}

export const mutations = {
  SET_CATEGORY: (state, category) => {
    state.category = category
  },
  SET_POSTS: (state, posts) => {
    state.posts = posts
  },
  SET_PAGE: (state, page) => {
    state.page = page
  },
  SET_PREV_PAGE: (state, prevPage) => {
    state.prevPage = prevPage
  },
  SET_NEXT_PAGE: (state, nextPage) => {
    state.nextPage = nextPage
  }
}
