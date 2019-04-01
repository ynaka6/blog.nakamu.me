import tags from '~/assets/json/tags.json'
import postJson from '~/assets/json/posts.json'
import { createClient } from '~/plugins/contentful.js'
const client = createClient()

export const state = () => ({
  tags: tags,
  tag: {},
  postJson: postJson,
  posts: [],
  page: null,
  prevPage: null,
  nextPage: null
})

export const getters = {
  tags: ({ tags }) => tags,
  tag: ({ tag }) => tag,
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
  tagOfName: state => name => {
    return state.tags.find(tag => tag.name === name)
  }
}

export const actions = {
  setTag({ commit, state }, payload) {
    commit('SET_TAG', state.tags.find(tag => tag.slug === payload.tag))
  },
  setPosts({ commit }, payload) {
    const { posts, page, prevPage, nextPage } = payload

    commit('SET_POST', posts)
    commit('SET_PAGE', parseInt(page) || 1)
    commit('SET_PREV_PAGE', parseInt(prevPage))
    commit('SET_NEXT_PAGE', parseInt(nextPage))
  },
  async loadPosts({ commit, state }, page) {
    const p = parseInt(page) || 1
    const limit = parseInt(process.env.PAGENATE_LIMIT) || 20
    const skip = (p - 1) * limit

    if (process.browser && state.postJson && state.postJson.length > 0) {
      const tagPostJson = state.postJson.filter(post =>
        post.fields.tags.includes(state.tag.name)
      )
      const prevPage = p > 1 ? p - 1 : null
      const nextPage = tagPostJson.length > skip + limit ? p + 1 : null

      commit('SET_POSTS', tagPostJson.slice(skip, skip + limit))
      commit('SET_PAGE', p)
      commit('SET_PREV_PAGE', prevPage)
      commit('SET_NEXT_PAGE', nextPage)
      return
    }

    const posts = await client.getEntries({
      content_type: process.env.CTF_BLOG_POST_TYPE_ID,
      'fields.tags[in]': state.tag.name,
      order: '-fields.publishDate',
      skip: skip,
      limit: limit + 1
    })

    const prevPage = p > 1 ? p - 1 : null
    const nextPage = posts.items.length > limit ? p + 1 : null
    if (nextPage) {
      posts.items.pop()
    }

    commit('SET_POST', posts.items)
    commit('SET_PAGE', p)
    commit('SET_PREV_PAGE', prevPage)
    commit('SET_NEXT_PAGE', nextPage)
  }
}

export const mutations = {
  SET_TAG: (state, tag) => {
    state.tag = tag
  },
  SET_POST: (state, posts) => {
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
