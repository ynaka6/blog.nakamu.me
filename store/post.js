import json from '~/assets/json/posts.json'
import { createClient } from '~/plugins/contentful.js'
const client = createClient()

export const state = () => ({
  json: json,
  latestPosts: [],
  posts: [],
  page: null,
  prevPage: null,
  nextPage: null,
  post: null,
  prevPost: null,
  nextPost: null
})

export const getters = {
  latestPosts: ({ latestPosts }) => latestPosts,
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
  post: ({ post }) => post,
  prevPost: ({ prevPost }) => prevPost,
  nextPost: ({ nextPost }) => nextPost
}

export const actions = {
  setLatestPosts({ commit }, payload) {
    commit('SET_LATEST_POSTS', payload.loadLatestPosts)
  },
  async loadLatestPosts({ commit, state }, limit) {
    if (state.json && state.json.length > 0) {
      commit('SET_LATEST_POSTS', state.json.slice(0, limit))
      return
    }

    const posts = await client.getEntries({
      content_type: process.env.CTF_BLOG_POST_TYPE_ID,
      order: '-fields.publishDate',
      limit: limit
    })
    commit('SET_LATEST_POSTS', posts.items)
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

    if (state.json && state.json.length > 0) {
      const prevPage = p > 1 ? p - 1 : null
      const nextPage = state.json.length > limit ? p + 1 : null

      commit('SET_POSTS', state.json.slice(skip, skip + limit))
      commit('SET_PAGE', p)
      commit('SET_PREV_PAGE', prevPage)
      commit('SET_NEXT_PAGE', nextPage)
      return
    }

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
  setPrevPost({ commit }, payload) {
    commit('SET_PREV_POST', payload.prevPost)
  },
  setNextPost({ commit }, payload) {
    commit('SET_NEXT_POST', payload.nextPost)
  },
  async loadPost({ commit, state }, slug) {
    if (state.json && state.json.length > 0) {
      const index = state.json.findIndex(
        p => p.fields && p.fields.slug === slug
      )
      commit('SET_POST', state.posts[index])
      commit('SET_PREV_POST', index > 0 ? state.posts[index - 1] : null)
      commit(
        'SET_NEXT_POST',
        state.posts.length > index ? state.posts[index + 1] : null
      )
      return
    }

    const index = state.posts.findIndex(p => p.fields && p.fields.slug === slug)
    let post = null
    if (index >= 0) {
      post = state.posts[index]
    } else {
      const posts = await client.getEntries({
        content_type: process.env.CTF_BLOG_POST_TYPE_ID,
        'fields.slug': slug
      })
      post = posts.items[0]
    }
    commit('SET_POST', post)

    let prevPost = index >= 0 ? state.posts[index + 1] : null
    if (!prevPost) {
      const prevPosts = await client.getEntries({
        content_type: process.env.CTF_BLOG_POST_TYPE_ID,
        'fields.publishDate[lt]': post.fields.publishDate,
        order: '-fields.publishDate',
        limit: 1
      })
      prevPost = prevPosts.items.length ? prevPosts.items[0] : null
    }
    commit('SET_PREV_POST', prevPost)

    let nextPost = index > 0 ? state.posts[index - 1] : null
    if (!nextPost) {
      const nextPosts = await client.getEntries({
        content_type: process.env.CTF_BLOG_POST_TYPE_ID,
        'fields.publishDate[gt]': post.fields.publishDate,
        order: 'fields.publishDate',
        limit: 1
      })
      nextPost = nextPosts.items.length ? nextPosts.items[0] : null
    }
    commit('SET_NEXT_POST', nextPost)
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
  },
  SET_PREV_POST: (state, prevPost) => {
    state.prevPost = prevPost
  },
  SET_NEXT_POST: (state, nextPost) => {
    state.nextPost = nextPost
  }
}
