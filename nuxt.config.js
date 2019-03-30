/* eslint-disable nuxt/no-cjs-in-config */
import pkg from './package'
import categories from './assets/json/categories.json'
import tags from './assets/json/tags.json'
import flatten from 'flatten'

if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const { createClient } = require('./plugins/contentful')
const client = createClient()

export default {
  mode: 'universal',

  env: {
    APP_TITLE: process.env.APP_TITLE,
    APP_SUBTITLE: process.env.APP_SUBTITLE,
    APP_DESCRIPTION: process.env.APP_DESCRIPTION,
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
    CTF_CMA_ACCESS_TOKEN: process.env.CTF_CMA_ACCESS_TOKEN,
    CTF_PERSON_ID: process.env.CTF_PERSON_ID,
    CTF_BLOG_POST_TYPE_ID: process.env.CTF_BLOG_POST_TYPE_ID,
    HTTP_SCHEMA: process.env.HTTP_SCHEMA,
    BASE_URL: process.env.BASE_URL,
    API_URL: process.env.API_URL,
    PAGENATE_LIMIT: process.env.PAGENATE_LIMIT || 20,
    PROFILE_SITE_URL: process.env.PROFILE_SITE_URL,
    CONTACT_API_URL: process.env.CONTACT_API_URL
  },

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Leckerli+One'
      }
    ],
    htmlAttrs: {
      lang: 'ja'
    },
    bodyAttrs: {
      class: 'bg-grey-lighter'
    }
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [
    '~/assets/css/tailwind.css',
    { src: '~/node_modules/highlight.js/styles/hopscotch.css', lang: 'css' },
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/day.js',
    { src: '~/plugins/microlink.js', ssr: false },
    { src: '~/plugins/vuelidate.js', ssr: false }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/markdownit'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    vendor: [
      'vuelidate'
    ],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
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
    interval: 1000,
    subFolders: false,
    routes: () => {
      return Promise.all([
        client.getEntries({
          'sys.id': process.env.CTF_PERSON_ID
        }),
        client.getEntries({
          content_type: process.env.CTF_BLOG_POST_TYPE_ID,
          order: '-fields.publishDate',
          limit: 1000
        })
      ]).then(([person, posts]) => {
        const postRoutes = posts.items.map(entry => {
          return {
            route: `/posts/${entry.fields.slug}`,
            payload: {
              author: person.items[0],
              post: entry,
              loadLatestPosts: posts.items.slice(0, 6)
            }
          }
        })
        const categoryRoutes = flatten(categories
          .map(category => {
            const categoryPosts = posts.items.filter(post => post.fields.category[0] === category.name)
            const total = categoryPosts.length
            const limit = parseInt(process.env.PAGENATE_LIMIT)
            const pageCount = Math.floor((total - 1) / process.env.PAGENATE_LIMIT) + 1

            if (total == 0) return null

            return [
              {
                route: `/categories/${category.slug}`,
                payload: {
                  author: person.items[0],
                  posts: categoryPosts.slice(0, limit),
                  page: 1,
                  prevPage: null,
                  nextPage: pageCount > 1 ? 2 : null,
                  loadLatestPosts: posts.items.slice(0, 6)
                }
              },
              ...[...Array(0 == pageCount ? 0 : pageCount - 1).keys()].map(i => {
                const page = i + 2
                return {
                  route: `/categories/${category.slug}/page/${page}`,
                  payload: {
                    author: person.items[0],
                    posts: categoryPosts.slice(
                      process.env.PAGENATE_LIMIT * page,
                      limit
                    ),
                    page: page,
                    prevPage: page,
                    nextPage: pageCount > page ? page + 1 : null,
                    loadLatestPosts: posts.items.slice(0, 6)
                  }
                }
              })
            ]
          })
          .filter(r => r != null))

        const tagRoutes = flatten(tags
          .map(tag => {
            const tagPosts = posts.items.filter(post => post.fields.tags && post.fields.tags.includes(tag.name))
            const total = tagPosts.length
            const limit = parseInt(process.env.PAGENATE_LIMIT)
            const pageCount = Math.floor((total - 1) / process.env.PAGENATE_LIMIT) + 1

            if (total == 0) return null

            return [
              {
                route: `/tags/${tag.slug}`,
                payload: {
                  author: person.items[0],
                  posts: tagPosts.slice(0, limit),
                  page: 1,
                  prevPage: null,
                  nextPage: pageCount > 1 ? 2 : null,
                  loadLatestPosts: posts.items.slice(0, 6)
                }
              },
              ...[...Array(0 == pageCount ? 0 : pageCount - 1).keys()].map(i => {
                const page = i + 2
                return {
                  route: `/tags/${tag.slug}/page/${page}`,
                  payload: {
                    author: person.items[0],
                    posts: tagPosts.slice(
                      process.env.PAGENATE_LIMIT * page,
                      limit
                    ),
                    page: page,
                    prevPage: page,
                    nextPage: pageCount > page ? page + 1 : null,
                    loadLatestPosts: posts.items.slice(0, 6)
                  }
                }
              })
            ]
          })
          .filter(r => r != null))

        const total = posts.items.length
        const limit = parseInt(process.env.PAGENATE_LIMIT)
        const pageCount = Math.floor((total - 1) / limit) + 1
        const route = [
          ...postRoutes,
          {
            route: '/posts',
            payload: {
              author: person.items[0],
              posts: posts.items.slice(0, limit),
              page: 1,
              prevPage: null,
              nextPage: pageCount > 1 ? 2 : null
            }
          },
          ...[...Array(pageCount === 0 ? 0 : pageCount - 1).keys()].map(i => {
            const page = i + 2
            return {
              route: '/posts/page/' + page,
              payload: {
                author: person.items[0],
                posts: posts.items.slice(
                  process.env.PAGENATE_LIMIT * page,
                  limit
                ),
                page: page,
                prevPage: page,
                nextPage: pageCount > page ? page + 1 : null
              }
            }
          }),
          ...categoryRoutes,
          ...tagRoutes
        ]
        return route
      })
    }
  },
  markdownit: {
    preset: 'default',
    injected: true,
    breaks: true,
    html: true,
    linkify: true,
    typography: true,
    use: [
      ['markdown-it-container', 'warning', {

        validate: function(params) {
          return params.trim().match(/^message\s+(.*)$/);
        },
      
        render: function (tokens, idx) {
          var m = tokens[idx].info.trim().match(/^message\s+(.*)$/);
      
          if (tokens[idx].nesting === 1) {
            return '<div class="message ' + md.utils.escapeHtml(m[1]) + '">';
      
          } else {
            return '</div>\n';
          }
        }
      }],
      'markdown-it-toc',
      ['markdown-it-video', {
        youtube: { width: 640, height: 390 },
        vimeo: { width: 500, height: 281 },
        vine: { width: 600, height: 600, embed: 'simple' },
        prezi: { width: 550, height: 400 }
      }],
      'markdown-it-mark',
      ['markdown-it-link-attributes', {
        pattern: /^http(s):/,
        attrs: {
          target: '_blank',
          rel: 'noopener'
        }
      }],
      'markdown-it-attrs'
    ],
    highlight: (str, lang) => {
      const hljs = require('highlight.js');
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="hljs"><code>' +
                  hljs.highlight(lang, str, true).value +
                  '</code></pre>';
        } catch (__) {}
      }
      // 言語設定がない場合、プレーンテキストとして表示する
      return '<pre class="hljs"><code>' +  hljs.highlight('plaintext', str, true).value + '</code></pre>';
    }
  },
  manifest: {
    name: process.env.APP_TITLE,
    lang: 'ja',
    short_name: process.env.APP_TITLE,
    theme_color: '#ffffff',
    background_color: '#ffffff'
  },
}
