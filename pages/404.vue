<template>
  <main class="container">
    <section class="section has-text-centered">
        <img src="~/assets/img/icon-broken-link-512.png" class="broken-link">
        <h1 class="title is-1 m-t-50">４０４</h1>
        <p class="subtitle is-6 has-text-grey m-t-30">
            指定されたページが見つかりませんでした。<br>
            既に削除されたか、URLが間違っている可能性があります。
        </p>
        <div class="columns has-text-centered m-t-30">
          <div class="column">
              <router-link to="/" class="button is-primary is-rounded is-large">
                トップページに戻る
              </router-link>
            </div>
        </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.broken-link {
    width: 10rem;
}
</style>

