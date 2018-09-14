import Vuex from 'vuex';

const store = () => new Vuex.Store({
  state: {
    firstView: null,
    contactModal: false,
  },
  mutations: {
    setFirstView(state, context) {
      state.firstView = context.firstView;
    },
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
    setFirstView: (context, payload) => {
      context.commit({
        type: 'setFirstView',
        firstView: payload.firstView
      })
    },
    toggleContactModal: ({ commit }) => {
      commit('toggleContactModal');
    },
    closeContactModal: ({ commit }) => {
      commit('closeContactModal');
    },
  },
  getters: {
    isFirstView: state => state.firstView,
    isContactModal: state => state.contactModal,
  },
})


export default store