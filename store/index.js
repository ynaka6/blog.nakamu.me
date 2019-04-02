export const state = () => ({
  drawerMenu: false
})

export const getters = {
  drawerMenu: ({ drawerMenu }) => drawerMenu
}

export const actions = {
  toggleDrawerMenu({ commit, state }) {
    commit('SET_DRAWER_MENU', !state.drawerMenu)
  },
  setDrawerMenu({ commit }, value) {
    commit('SET_DRAWER_MENU', value)
  }
}

export const mutations = {
  SET_DRAWER_MENU: (state, posts) => {
    state.drawerMenu = posts
  }
}
