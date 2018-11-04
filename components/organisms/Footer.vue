<template>
  <footer class="footer has-background-dark has-text-light">
    <div class="container is-fluid has-text-centered">
      <ul class="footer__menu-list">
        <li>
          <router-link to="/">
            HOME
          </router-link>
        </li>
        <li>
          <router-link to="/posts">
            Posts
          </router-link>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            class=""
            @click="$store.dispatch('toggleContactModal')"
          >
            Contact
          </a>
        </li>
        <li>
          <router-link to="/policy/privacy">
            Privacy
          </router-link>
        </li>
        <li>
          <a
            href="https://nakamu.life/"
            target="_blank"
          >
            About me
          </a>
        </li>
      </ul>
      <div class="buttons" style="justify-content: center;">
        <SocialButton
          href="https://twitter.com/nakanakamu0828"
          icon="fab fa-twitter"
        />
        <SocialButton
          href="https://github.com/nakanakamu0828"
          icon="fab fa-github"
        />
        <SocialButton
          href="https://medium.com/@nakamu"
          icon="fab fa-medium-m"
        />
        <SocialButton
          href="mailto:yuuki.nakamura.0828@gmail.com"
          icon="far fa-envelope"
        />
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

    <cookie-law theme="dark-lime--rounded" message="あなたがこのサイト上でベストな経験/体験ができるようにCookieを使用しています" buttonText="同意"></cookie-law>
  </footer>
</template>

<script>
import SocialButton from '~/components/molecules/buttons/SocialButton.vue'

export default {
  components: {
    SocialButton,
  }
}
</script>

<style lang="scss" scoped>
footer {
  ul.footer__menu-list {
    margin-bottom: 2rem;
    & > li {
      display: inline-block;
      margin: auto 1rem;
      margin-bottom: .5rem;

      & > a {
        color: whitesmoke;

        &:hover {
          opacity: .8;
        }
      }
    }
  }
}
</style>