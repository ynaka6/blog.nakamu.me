export default function ({ app, store }) {
    app.router.onReady(() => store.dispatch('setFirstView', {
        firstView: true
    }))
}