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
          text="Twitter Of Nakamu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1792 1792" fill="currentColor"><path d="M1684 408q-67 98-162 167 1 14 1 42 0 130-38 259.5t-115.5 248.5-184.5 210.5-258 146-323 54.5q-271 0-496-145 35 4 78 4 225 0 401-138-105-2-188-64.5t-114-159.5q33 5 61 5 43 0 85-11-112-23-185.5-111.5t-73.5-205.5v-4q68 38 146 41-66-44-105-115t-39-154q0-88 44-163 121 149 294.5 238.5t371.5 99.5q-8-38-8-74 0-134 94.5-228.5t228.5-94.5q140 0 236 102 109-21 205-78-37 115-142 178 93-10 186-50z"/></svg>
        </SocialButton>
        <SocialButton
          href="https://github.com/nakanakamu0828"
          text="Github Of Nakamu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1792 1792" fill="currentColor"><path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"/></svg>
        </SocialButton>
        <SocialButton
          href="https://medium.com/@nakamu"
          text="Medium Of Nakamu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1792 1792" fill="currentColor"><path d="M597 421v1173q0 25-12.5 42.5t-36.5 17.5q-17 0-33-8l-465-233q-21-10-35.5-33.5t-14.5-46.5v-1140q0-20 10-34t29-14q14 0 44 15l511 256q3 3 3 5zm64 101l534 866-534-266v-600zm1131 18v1054q0 25-14 40.5t-38 15.5-47-13l-441-220zm-3-120q0 3-256.5 419.5t-300.5 487.5l-390-634 324-527q17-28 52-28 14 0 26 6l541 270q4 2 4 6z"/></svg>
        </SocialButton>
        <SocialButton
          href="mailto:yuuki.nakamura.0828@gmail.com"
          text="Email Of Nakamu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1792 1792" fill="currentColor"><path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"/></svg>
        </SocialButton>
      </div>
      <p class="m-t-20">
        <small>
          Copyright © 2018.
        </small>
      </p>
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