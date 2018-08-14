const config = require('./.contentful.json')
const {createClient} = require('./plugins/contentful')
const client = createClient()

module.exports = {
  env: {
    CTF_SPACE_ID: config.CTF_SPACE_ID || process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: config.CTF_CDA_ACCESS_TOKEN || process.env.CTF_CDA_ACCESS_TOKEN,
    CTF_PERSON_ID: config.CTF_PERSON_ID || process.env.CTF_PERSON_ID,
    CTF_BLOG_POST_TYPE_ID: config.CTF_BLOG_POST_TYPE_ID || process.env.CTF_BLOG_POST_TYPE_ID,
  },
  /*
  ** Headers of the page
  */
 head: {
    title: 'Nakamu Engineer Blog',
    titleTemplate: '%s - Nakamu Engineer Blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, minimum-scale=1' },
      { hid: 'description', name: 'description', content: 'Nakamu Engneer Blog' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  plugins: [
    '~/plugins/buefy.js'
  ],
  css: [
    '~/assets/style/app.scss'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  generate: {
    routes () {
      return Promise.all([
        client.getEntries({
          'content_type': process.env.CTF_BLOG_POST_TYPE_ID
        })
      ])
      .then(([entries, postType]) => {
        return [
          '/posts',
          ...entries.items.map(entry => `/posts/${entry.fields.slug}`),
        ]
      })
    }
  },
  // generate: {
  //   routes () {
  //     return client.getEntries({
  //         'content_type': config.CTF_BLOG_POST_TYPE_ID
  //       }).then((entries) => {
  //         return [ 'posts' ] + [...entries.items.map(entry => `posts/${entry.fields.slug}`)]
  //       }).catch(error => {})
  //   }
  // },
}

