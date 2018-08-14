<template>
  <footer class="footer has-background-dark has-text-light">
    <div class="container is-fluid has-text-centered">
      <div class="buttons" style="justify-content: center;">
        <a
          href="https://twitter.com/nakanakamu0828"
          target="_blank"
          class="button is-circle is-medium"
        >
          <i class="fab fa-twitter"></i>
        </a>
        <a
          href="https://github.com/nakanakamu0828"
          target="_blank"
          class="button is-circle is-medium"
        >
          <i class="fab fa-github"></i>
        </a>
        <a
          href="https://medium.com/@nakamu"
          target="_blank"
          class="button is-circle is-medium"
        >
          <i class="fab fa-medium-m"></i>
        </a>
        <a
          href="mailto:yuuki.nakamura.0828@gmail.com"
          target="_blank"
          class="button is-circle is-medium"
        >
          <i class="far fa-envelope"></i>
        </a>
      </div>
      <p>
        <small>
          Copyright © 2018.<br>Made with
          <a href="https://bulma.io/" target="_blank" class="has-text-light"><b>Bulma</b></a>,
          <a href="https://jp.vuejs.org/" target="_blank" class="has-text-light"><b>Vue.js</b></a>,
          and <a class="has-text-light" href="/madewith"><b>many more</b></a>.
        </small>
      </p>
      <div class="m-t-20">
        <a href="https://bulma.io">
          <img src="https://bulma.io/images/made-with-bulma--white.png" alt="Made with Bulma" width="163" height="31">
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: {
  },
};
</script>

<style scoped>
</style>
