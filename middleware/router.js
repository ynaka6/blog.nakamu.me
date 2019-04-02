export default ({ store }) => {
  if (process.browser) {
    store.dispatch('setDrawerMenu', false)
  }
}
