<template>
  <footer>
    <Tags />
    <section class="bg-gradient-blue py-8 w-full">
      <div class="container mx-auto px-4 lg:px-8">
        <div class="flex flex-col lg:flex-row">
          <div class="lg:w-2/3 lg:px-2">
            <h2 class="mb-3 text-white">
              <n-logo :label="title" color="text-white" />
            </h2>
            <p class="mb-6 text-white text-sm max-w-md" v-text="explain"></p>
          </div>
          <div class="lg:w-1/3 flex">
            <div class="w-1/2">
              <p class="uppercase text-white text-sm sm:mb-6">
                Contents
              </p>
              <ul class="list-reset text-xs mb-6">
                <li class="mt-2 inline-block mr-2 sm:block sm:mr-0">
                  <n-link
                    to="/"
                    label="Home"
                    link-class="text-white hover:text-grey-dark"
                  />
                </li>
                <li class="mt-2 inline-block mr-2 sm:block sm:mr-0">
                  <n-link
                    to="/posts"
                    label="Posts"
                    link-class="text-white hover:text-grey-dark"
                  />
                </li>
              </ul>
            </div>
            <div class="w-1/2">
              <p class="uppercase text-white text-sm sm:mb-6">
                ABOUT
              </p>
              <ul class="list-reset text-xs mb-6">
                <li class="mt-2 inline-block mr-2 sm:block sm:mr-0">
                  <n-link
                    :to="profile_site_url"
                    label="Profile"
                    link-class="text-white hover:text-grey"
                    :target-blank="true"
                  />
                </li>
                <li class="mt-2 inline-block mr-2 sm:block sm:mr-0">
                  <n-link
                    to="/policy/privacy"
                    label="Privacy"
                    link-class="text-white hover:text-grey-dark"
                  />
                </li>
                <li class="mt-2 inline-block mr-2 sm:block sm:mr-0">
                  <n-link
                    to="/"
                    label="Contact"
                    link-class="text-white hover:text-grey-dark"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-grey-darkest text-white">
      <div class="p-6 container mx-auto px-4">
        <div class="flex flex-wrap">
          <div class="w-full md:w-1/5 mb-4 lg:mb-0" />
          <div
            class="w-full md:w-3/5 mb-4 lg:mb-0 text-xs sm:text-sm text-center"
          >
            Copyright © 2018.
          </div>
          <div class="w-full md:w-1/5 mb-4 lg:mb-0 flex justify-center">
            <a
              class="bg-white w-10 h-10 mr-2 rounded-full font-semibold flex items-center justify-center font-hairline no-underline"
              href="https://github.com/manniL/lichter.io"
              target="_blank"
              rel="noopener"
            >
              <svg
                class="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Twitter</title>
                <path
                  d="M6.29 18.25c7.55 0 11.67-6.25 11.67-11.67v-.53c.8-.59 1.49-1.3 2.04-2.13-.75.33-1.54.55-2.36.65a4.12 4.12 0 0 0 1.8-2.27c-.8.48-1.68.81-2.6 1a4.1 4.1 0 0 0-7 3.74 11.65 11.65 0 0 1-8.45-4.3 4.1 4.1 0 0 0 1.27 5.49C2.01 8.2 1.37 8.03.8 7.7v.05a4.1 4.1 0 0 0 3.3 4.03 4.1 4.1 0 0 1-1.86.07 4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 0 16.4a11.62 11.62 0 0 0 6.29 1.84"
                ></path>
              </svg>
            </a>
            <a
              class="bg-white w-10 h-10 rounded-full font-semibold flex items-center justify-center font-hairline no-underline"
              href="https://github.com/manniL/lichter.io"
              target="_blank"
              rel="noopener"
            >
              <svg
                class="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Twitter</title>
                <path
                  d="M6.29 18.25c7.55 0 11.67-6.25 11.67-11.67v-.53c.8-.59 1.49-1.3 2.04-2.13-.75.33-1.54.55-2.36.65a4.12 4.12 0 0 0 1.8-2.27c-.8.48-1.68.81-2.6 1a4.1 4.1 0 0 0-7 3.74 11.65 11.65 0 0 1-8.45-4.3 4.1 4.1 0 0 0 1.27 5.49C2.01 8.2 1.37 8.03.8 7.7v.05a4.1 4.1 0 0 0 3.3 4.03 4.1 4.1 0 0 1-1.86.07 4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 0 16.4a11.62 11.62 0 0 0 6.29 1.84"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  </footer>
</template>

<script>
import NLogo from '~/components/atoms/links/NLogo'
import NLink from '~/components/atoms/links/NLink'
import Tags from '~/components/molecules/Footer/Tags'

export default {
  components: { NLogo, NLink, Tags },
  data: () => ({
    title: process.env.APP_TITLE,
    explain: process.env.APP_DESCRIPTION,
    profile_site_url: process.env.PROFILE_SITE_URL
  })
}
</script>

<style scoped>
.bg-gradient-blue {
  background-image: linear-gradient(
    to top,
    #51daf5,
    config('colors.blue-dark')
  );
}
</style>
