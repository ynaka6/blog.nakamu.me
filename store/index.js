export const state = () => ({
  drawerMenu: false,
  breadcrumb: []
})

export const getters = {
  drawerMenu: ({ drawerMenu }) => drawerMenu,
  breadcrumb: ({ breadcrumb }) => breadcrumb
}

export const actions = {
  toggleDrawerMenu({ commit, state }) {
    commit('SET_DRAWER_MENU', !state.drawerMenu)
  },
  setDrawerMenu({ commit }, value) {
    commit('SET_DRAWER_MENU', value)
  },
  setBreadcrumb({ commit }, value) {
    commit('SET_BREADCRUMB', value)
  }
}

export const mutations = {
  SET_DRAWER_MENU: (state, posts) => {
    state.drawerMenu = posts
  },
  SET_BREADCRUMB: (state, breadcrumb) => {
    state.breadcrumb = breadcrumb
  }
}
