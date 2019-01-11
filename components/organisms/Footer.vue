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
            rel="noreferrer"
          >
            About me
          </a>
        </li>
      </ul>
      <div style="justify-content: center;">
        <SocialButton
          href="https://twitter.com/nakanakamu0828"
          icon="fab fa-twitter"
          text="Twitter Of Nakamu"
        />
        <SocialButton
          href="https://github.com/nakanakamu0828"
          icon="fab fa-github"
          text="Github Of Nakamu"
        />
        <SocialButton
          href="https://medium.com/@nakamu"
          icon="fab fa-medium-m"
          text="Medium Of Nakamu"
        />
        <SocialButton
          href="mailto:yuuki.nakamura.0828@gmail.com"
          icon="far fa-envelope"
          text="Email Of Nakamu"
        />
      </div>
      <p>
        <small>
          Copyright © 2018.<br>Made with
          <a href="https://bulma.io/" target="_blank" class="has-text-light" rel="noreferrer"><b>Bulma</b></a>,
          <a href="https://jp.vuejs.org/" target="_blank" class="has-text-light" rel="noreferrer"><b>Vue.js</b></a>,
          and <b>many more</b>.
        </small>
      </p>
      <div class="m-t-20">
        <a href="https://bulma.io" rel="noreferrer">
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
  padding: 6rem 1.5rem;
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