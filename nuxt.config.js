/* eslint-disable nuxt/no-cjs-in-config */
import fs from 'fs'
import path from 'path'
import glob from 'glob-all'
import PurgecssPlugin from 'purgecss-webpack-plugin'
import purgecss from '@fullhuman/postcss-purgecss'
import flatten from 'flatten'
import pkg from './package'
import categories from './assets/json/categories.json'
import tags from './assets/json/tags.json'

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\\/]+/g) || []
  }
}

if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const { createClient } = require('./plugins/contentful')
const client = createClient()

const generateRoutes = routeOnly => {
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
    // jsonファイル出力
    fs.writeFile(
      './assets/json/authors.json',
      JSON.stringify(person.items, null, '    '),
      err => {
        if (err) console.log(err)
      }
    )
    fs.writeFile(
      './assets/json/posts.json',
      JSON.stringify(posts.items, null, '    '),
      err => {
        if (err) console.log(err)
      }
    )

    const postRoutes = posts.items.map(post => {
      const index = posts.items.findIndex(
        p => p.fields && p.fields.slug === post.fields.slug
      )
      const prevPost = index >= 0 ? posts.items[index + 1] : null
      const nextPost = index > 0 ? posts.items[index - 1] : null
      const route = `/posts/${post.fields.slug}`
      return routeOnly
        ? route
        : {
            route: route,
            payload: {
              author: person.items[0],
              post: post,
              prevPost: prevPost,
              nextPost: nextPost,
              loadLatestPosts: posts.items.slice(0, 6)
            }
          }
    })
    const categoryRoutes = flatten(
      categories
        .map(category => {
          const categoryPosts = posts.items.filter(post => {
            return (
              Array.isArray(post.fields.category) &&
              post.fields.category.length > 0 &&
              post.fields.category[0] === category.name
            )
          })
          const total = categoryPosts.length
          const limit = parseInt(process.env.PAGENATE_LIMIT)
          const pageCount =
            Math.floor((total - 1) / process.env.PAGENATE_LIMIT) + 1

          if (total === 0) return null
          return [
            routeOnly
              ? `/categories/${category.slug}`
              : {
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
            ...[...Array(pageCount === 0 ? 0 : pageCount - 1).keys()].map(i => {
              const page = i + 2
              const route = `/categories/${category.slug}/page/${page}`
              const start = (page - 1) * limit
              const end = start + limit
              return routeOnly
                ? route
                : {
                    route: route,
                    payload: {
                      author: person.items[0],
                      posts: categoryPosts.slice(start, end),
                      page: page,
                      prevPage: page - 1,
                      nextPage: pageCount > page ? page + 1 : null,
                      loadLatestPosts: posts.items.slice(0, 6)
                    }
                  }
            })
          ]
        })
        .filter(r => r != null)
    )

    const tagRoutes = flatten(
      tags
        .map(tag => {
          const tagPosts = posts.items.filter(
            post => post.fields.tags && post.fields.tags.includes(tag.name)
          )
          const total = tagPosts.length
          const limit = parseInt(process.env.PAGENATE_LIMIT)
          const pageCount =
            Math.floor((total - 1) / process.env.PAGENATE_LIMIT) + 1

          if (total === 0) return null

          return [
            routeOnly
              ? `/tags/${tag.slug}`
              : {
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
            ...[...Array(pageCount === 0 ? 0 : pageCount - 1).keys()].map(i => {
              const page = i + 2
              const route = `/tags/${tag.slug}/page/${page}`
              const start = (page - 1) * limit
              const end = start + limit
              return routeOnly
                ? route
                : {
                    route: route,
                    payload: {
                      author: person.items[0],
                      posts: tagPosts.slice(start, end),
                      page: page,
                      prevPage: page - 1,
                      nextPage: pageCount > page ? page + 1 : null,
                      loadLatestPosts: posts.items.slice(0, 6)
                    }
                  }
            })
          ]
        })
        .filter(r => r != null)
    )

    const total = posts.items.length
    const limit = parseInt(process.env.PAGENATE_LIMIT)
    const pageCount = Math.floor((total - 1) / limit) + 1
    const route = [
      routeOnly
        ? '/'
        : {
            route: '/',
            payload: {
              author: person.items[0],
              loadLatestPosts: posts.items.slice(0, 6)
            }
          },
      ...postRoutes,
      routeOnly
        ? '/posts'
        : {
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
        const route = '/posts/page/' + page
        const start = (page - 1) * limit
        const end = start + limit
        return routeOnly
          ? route
          : {
              route: route,
              payload: {
                author: person.items[0],
                posts: posts.items.slice(start, end),
                page: page,
                prevPage: page - 1,
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

export default {
  mode: 'universal',

  env: {
    APP_TITLE: process.env.APP_TITLE,
    APP_SHORT_NAME: process.env.APP_SHORT_NAME,
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
    CONTACT_API_URL: process.env.CONTACT_API_URL,
    GOOGLE_ANALYTICS_TRACKING_ID: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
    JUST_COMMENTS_APY_KEY: process.env.JUST_COMMENTS_APY_KEY,
    GOOGLE_ADSENSE_ID: process.env.GOOGLE_ADSENSE_ID
  },

  /*
   ** Headers of the page
   */
  head: {
    title: process.env.APP_TITLE,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.APP_DESCRIPTION
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      },
      {
        rel: 'manifest',
        href: '/site.webmanifest'
      }
    ],
    htmlAttrs: {
      lang: 'ja'
    },
    bodyAttrs: {
      class: 'bg-gray-200'
    }
  },

  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style'].includes(type)
      }
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
    { src: '~/node_modules/highlight.js/styles/hopscotch.css', lang: 'css' }
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
    '@nuxtjs/markdownit',
    '@nuxtjs/feed',
    '@nuxtjs/sitemap',
    '@nuxtjs/google-analytics',
    ['@nuxtjs/google-adsense', { id: process.env.GOOGLE_ADSENSE_ID || '' }]
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
    maxChunkSize: 300000,
    extractCSS: true,
    postcss: {
      plugins: [
        purgecss({
          content: [
            './pages/**/*.vue',
            './layouts/**/*.vue',
            './components/**/*.vue',
            './plugins/**/*.js',
            './node_modules/highlight.js/**/*.js'
          ],
          whitelist: ['html', 'body']
        })
      ]
    },
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

      if (!ctx.isDev) {
        config.plugins.push(
          new PurgecssPlugin({
            paths: glob.sync([
              path.join(__dirname, './pages/**/*.vue'),
              path.join(__dirname, './layouts/**/*.vue'),
              path.join(__dirname, './components/**/*.vue'),
              path.join(__dirname, './node_modules/highlight.js/**/*.js')
            ]),
            extractors: [
              {
                extractor: TailwindExtractor,
                extensions: ['vue', 'js']
              }
            ],
            whitelist: ['html', 'body'],
            whitelistPatterns: [/hljs/, /is-*/]
          })
        )
      }
    }
  },
  generate: {
    interval: 2000,
    subFolders: false,
    routes: () => {
      return generateRoutes(false)
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
      [
        'markdown-it-container',
        'warning',
        {
          validate: function(params) {
            return params.trim().match(/^message\s+(.*)$/)
          },
          render: function(tokens, idx) {
            const m = tokens[idx].info.trim().match(/^message\s+(.*)$/)
            if (tokens[idx].nesting === 1) {
              return '<div class="message ' + md.utils.escapeHtml(m[1]) + '">'
            } else {
              return '</div>\n'
            }
          }
        }
      ],
      'markdown-it-toc',
      'markdown-it-video',
      'markdown-it-mark',
      [
        'markdown-it-link-attributes',
        {
          pattern: /https?:/,
          attrs: {
            target: '_blank',
            rel: 'nofollow noopener noreferrer'
          }
        }
      ],
      'markdown-it-attrs'
    ],
    highlight: (str, lang) => {
      const hljs = require('highlight.js')
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            '<pre class="hljs"><code>' +
            hljs.highlight(lang, str, true).value +
            '</code></pre>'
          )
        } catch (__) {}
      }
      // 言語設定がない場合、プレーンテキストとして表示する
      return (
        '<pre class="hljs"><code>' +
        hljs.highlight('plaintext', str, true).value +
        '</code></pre>'
      )
    }
  },
  manifest: {
    name: process.env.APP_TITLE,
    lang: 'ja',
    short_name: pkg.name,
    theme_color: '#ffffff',
    background_color: '#ffffff'
  },
  feed: [
    {
      path: '/atom.xml',
      async create(feed) {
        feed.options = {
          title: process.env.APP_TITLE,
          link: `${process.env.BASE_URL}/atom.xml`,
          description: "This is Nakamu's personal feed!"
        }

        const [posts, person] = await Promise.all([
          client.getEntries({
            content_type: process.env.CTF_BLOG_POST_TYPE_ID,
            order: '-fields.publishDate',
            limit: 1000
          }),
          client.getEntries({
            'sys.id': process.env.CTF_PERSON_ID
          })
        ])
        const author = person.items[0]
        posts.items.forEach(post => {
          feed.addItem({
            title: post.fields.title,
            id: post.fields.slug,
            link: `${process.env.BASE_URL}/posts/${post.fields.slug}`,
            description: post.fields.description,
            content: post.fields.description,
            date: new Date(post.fields.publishDate),
            image: post.fields.heroImage.fields.file.url
          })
        })

        feed.addCategory('Tech')
        feed.addContributor({
          name: author.fields.name,
          email: author.fields.email,
          link: process.env.BASE_URL
        })
      },
      cacheTime: 1000 * 60 * 15,
      type: 'atom1'
    }
  ],
  sitemap: {
    path: '/sitemap.xml',
    hostname: process.env.BASE_URL,
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    generate: true, // 静的ジェネレート時にも利用
    exclude: [
      '/404*' // 404ページは除く
    ],
    routes: () => {
      return generateRoutes(true)
    }
  },
  'google-analytics': {
    id: `${process.env.GOOGLE_ANALYTICS_TRACKING_ID}`,
    debug: {
      enabled:
        process.env.NODE_ENV === 'production' &&
        process.env.GOOGLE_ANALYTICS_TRACKING_ID,
      trace:
        process.env.NODE_ENV === 'production' &&
        process.env.GOOGLE_ANALYTICS_TRACKING_ID,
      sendHitTask:
        process.env.NODE_ENV === 'production' &&
        process.env.GOOGLE_ANALYTICS_TRACKING_ID
    }
  }
}
