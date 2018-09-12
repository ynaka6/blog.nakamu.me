<template>
  <main class="container">
    <section class="section has-text-centered">
        <h1 class="title is-1">４０４</h1>
        <img src="~/assets/img/icon-broken-link-512.png" class="broken-link">
        <p class="subtitle has-text-grey m-t-30">
            指定されたページが見つかりませんでした。<br>
            既に削除されたか、URLが間違っている可能性があります。
        </p>
        <div class="columns has-text-centered m-t-30">
          <div class="column">
              <router-link to="/posts" class="button is-primary is-rounded is-large">
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

