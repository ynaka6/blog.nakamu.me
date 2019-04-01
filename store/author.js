import json from '~/assets/json/authors.json'
import { createClient } from '~/plugins/contentful.js'
const client = createClient()

export const state = () => ({
  json: json,
  author: null
})

export const getters = {
  author: ({ author }) => author
}

export const actions = {
  setAuthor({ commit }, payload) {
    commit('SET_AUTHOR', payload.author)
  },
  async loadAuthor({ commit, state }) {
    if (state.json && state.json.length > 0) {
      commit('SET_AUTHOR', state.json[0])
      return
    }

    const person = await client.getEntries({
      'sys.id': process.env.CTF_PERSON_ID
    })
    commit('SET_AUTHOR', person.items[0])
  }
}

export const mutations = {
  SET_AUTHOR: (state, posts) => {
    state.author = posts
  }
}
