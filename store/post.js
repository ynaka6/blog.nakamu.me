import { createClient } from '~/plugins/contentful.js'
const client = createClient()

export const state = () => ({
  latestPosts: [],
  posts: [],
  page: null,
  prevPage: null,
  nextPage: null,
  post: null
})

export const getters = {
  latestPosts: ({ latestPosts }) => latestPosts,
  posts: ({ posts }) => posts,
  page: ({ page }) => page,
  prevPage: ({ prevPage }) => prevPage,
  nextPage: ({ nextPage }) => nextPage,
  post: ({ post }) => post,
  isPrevPage: ({ page, prevPage }) => {
    return prevPage && page > prevPage
  },
  isNextPage: ({ page, nextPage }) => {
    return nextPage && nextPage > page
  }
}

export const actions = {
  setLatestPosts({ commit }, payload) {
    commit('SET_LATEST_POSTS', payload.loadLatestPosts)
  },
  async loadLatestPosts({ commit }, attributes) {
    const posts = await client.getEntries(
      Object.assign(
        { content_type: process.env.CTF_BLOG_POST_TYPE_ID },
        attributes
      )
    )
    commit('SET_LATEST_POSTS', posts.items)
  },
  setPosts({ commit }, payload) {
    const { posts, page, prevPage, nextPage } = payload

    commit('SET_POSTS', posts)
    commit('SET_PAGE', parseInt(page) || 1)
    commit('SET_PREV_PAGE', parseInt(prevPage))
    commit('SET_NEXT_PAGE', parseInt(nextPage))
  },
  async loadPosts({ commit }, page) {
    const p = parseInt(page) || 1
    const limit = parseInt(process.env.PAGENATE_LIMIT) || 20
    const skip = (p - 1) * limit
    const posts = await client.getEntries({
      content_type: process.env.CTF_BLOG_POST_TYPE_ID,
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
  },
  setPost({ commit }, payload) {
    commit('SET_POST', payload.post)
  },
  async loadPost({ commit }, slug) {
    const posts = await client.getEntries({
      content_type: process.env.CTF_BLOG_POST_TYPE_ID,
      'fields.slug': slug
    })
    commit('SET_POST', posts.items[0])
  }
}

export const mutations = {
  SET_LATEST_POSTS: (state, posts) => {
    state.latestPosts = posts
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
  },
  SET_POST: (state, post) => {
    state.post = post
  }
}
