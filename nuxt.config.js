const config = require('./.contentful.json')
const { createClient } = require('./plugins/contentful')
const client = createClient()

const modules = [
  ['@nuxtjs/pwa'],
  ['@nuxtjs/axios'],
  ['@nuxtjs/markdownit'],
  ['@nuxtjs/sitemap'],
  ['@nuxtjs/feed']
]
if (process.env.NODE_ENV === 'production') {
  modules.push(['@nuxtjs/google-analytics', {
    id: process.env.GOOGLE_ANALYTICS_TRACKING_ID
  }])
}

const generateRoutes = () => {
  return Promise.all([
    client.getEntries({
      'content_type': process.env.CTF_BLOG_POST_TYPE_ID
    }),
    client.getContentType(process.env.CTF_BLOG_POST_TYPE_ID)
  ])
  .then(([entries, postType]) => {
    const total = entries.items.length
    const pageCount = Math.floor((total - 1) / process.env.PAGENATE_LIMIT) + 1
    return [
      '/posts',
      ...[...Array(pageCount).keys()].map(i => '/posts/page/' + ++i),
      ...entries.items.map(entry => `/posts/${entry.fields.slug}`),
      ...postType.fields.find(field => field.id === 'tags').items.validations[0].in.map(tag => `/tags/${tag}`),
      ...postType.fields.find(field => field.id === 'category').items.validations[0].in.map(category => `/categories/${category}`)
    ]
  })
}

module.exports = {
  env: {
    CTF_SPACE_ID: config.CTF_SPACE_ID || process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: config.CTF_CDA_ACCESS_TOKEN || process.env.CTF_CDA_ACCESS_TOKEN,
    CTF_CMA_ACCESS_TOKEN: config.CTF_CMA_ACCESS_TOKEN || process.env.CTF_CMA_ACCESS_TOKEN,
    CTF_PERSON_ID: config.CTF_PERSON_ID || process.env.CTF_PERSON_ID,
    CTF_BLOG_POST_TYPE_ID: config.CTF_BLOG_POST_TYPE_ID || process.env.CTF_BLOG_POST_TYPE_ID,
    
    ALGOLIA_APPLICATION_ID: process.env.ALGOLIA_APPLICATION_ID,
    ALGOLIA_SEARCH_API_KEY: process.env.ALGOLIA_SEARCH_API_KEY,

    HTTP_SCHEMA: process.env.HTTP_SCHEMA,
    BASE_URL: process.env.BASE_URL,
    API_URL: process.env.API_URL,

    PAGENATE_LIMIT: process.env.PAGENATE_LIMIT || 20,
  },
 /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'ja',
    },
    title: 'なかむ🇭🇰エンジニアブログ | 世界を旅して暮らしたい放浪エンジニアブログ',
    titleTemplate: '%s | Nakamu🇭🇰Blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, minimum-scale=1' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: '//cdn.embedly.com/widgets/platform.js', defer: true }
    ]
  },
  transition: {
    name: 'page',
    mode: 'out-in'
  },
  plugins: [
    '~/plugins/buefy.js',
    '~/plugins/vee-validate.js',
    '~/plugins/day.js',
    { src: '~/plugins/vue-scrollto.js', ssr: false },
    { src: '~/plugins/vue-cookie-law.js', ssr: false }
  ],
  css: [
    '~/assets/style/app.scss',
    '@fortawesome/fontawesome-free-webfonts',
    '@fortawesome/fontawesome-free-webfonts/css/fa-brands.css',
    '@fortawesome/fontawesome-free-webfonts/css/fa-regular.css',
    '@fortawesome/fontawesome-free-webfonts/css/fa-solid.css',
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    // vendor: ['vee-validate'],
    /*
    ** Run ESLint on save
    */
    extend(config) {
      if (process.server && process.browser) {
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
    routes: generateRoutes,
  },
  modules: modules,
  axios: {
    baseURL: process.env.API_URL,
  },
  manifest: {
    name: 'なかむ🇭🇰エンジニアブログ | 世界を旅して暮らしたい放浪エンジニアブログ',
    lang: 'ja',
    short_name: 'N-Blog',
    theme_color: '#ffffff',
    background_color: '#ffffff'
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
            return '<div class="message ' + md.utils.escapeHtml(m[1]) + '"><div class="message-body">';
      
          } else {
            return '</div></div>\n';
          }
        }
      }],
      'markdown-it-toc'
    ]
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: process.env.BASE_URL,
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    generate: true,
    exclude: [
      '/404*',
    ],
    routes: generateRoutes
  },
  feed: [
    {
      path: '/atom.xml',
      async create (feed) {
        feed.options = {
          title: 'Nakamu🇭🇰Blog',
          link: `${process.env.BASE_URL}/atom.xml`,
          description: "This is Nakamu's personal feed!"
        }

        const posts = await client.getEntries({
          'content_type': process.env.CTF_BLOG_POST_TYPE_ID
        })

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
          name: 'Nakamu',
          email: 'yuuki.nakamura.0828@gmail.com',
          link: process.env.BASE_URL
        })
      },
      cacheTime: 1000 * 60 * 15,
      type: 'atom1'
    }
  ],
}

