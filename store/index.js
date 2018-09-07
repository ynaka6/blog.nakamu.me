import Vuex from 'vuex';

const store = () => new Vuex.Store({
  state: {
    contactModal: false,
  },
  mutations: {
    toggleContactModal(state) {
      state.contactModal = !state.contactModal;
      document.querySelector('html').classList.toggle('is-clipped');
    },
    closeContactModal(state) {
      state.contactModal = false;
      document.querySelector('html').classList.remove('is-clipped');
    },
  },
  actions: {
    toggleContactModal: ({ commit }) => {
      commit('toggleContactModal');
    },
    closeContactModal: ({ commit }) => {
      commit('closeContactModal');
    },
  },
  getters: {
    isContactModal: state => state.contactModal,
  },
})


export default store