import { resolve } from 'path'
import abcConfig from './abc.config'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  srcDir: 'src/',
  server: {
    host: abcConfig.host,
    port: abcConfig.port
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Mybit - Web3 identities for you and your community.',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,height=device-height,initial-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { hid: 'description', name: 'description', content: 'Mybit is a blockchain-based, decentralized and open sourced account system. It is the first account system with broad compatibility and complete ownership and control by users. Mybit can be used as a cryptocurrency collection account, as a domain name, or as an account for accessing general Internet services.' },
      { hid: 'keyword', name: 'keywords', content: 'domain, domain name, blockchain domain, nervos, ckb, Mybit, domain name registration, purchase domain name, website domain, domain name service, domain name hosting, timyang, Mybit, domain investment, DNS, buy domain name' },
      // The Open Graph protocol
      { hid: 'og:description', property: 'og:description', content: 'Mybit is a blockchain-based, decentralized and open sourced account system. It is the first account system with broad compatibility and complete ownership and control by users. Mybit can be used as a cryptocurrency collection account, as a domain name, or as an account for accessing general Internet services.' },
      { hid: 'og:title', property: 'og:title', content: 'Mybit - Web3 identities for you and your community.' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Mybit - Web3 identities for you and your community.' },
      { hid: 'og:type', property: 'og:type', content: 'article' },
      { hid: 'og:url', property: 'og:url', content: 'https://did.id/' },
      { hid: 'og:image', property: 'og:image', content: `https://${abcConfig.hostname}/images/seo-thumbnail-image.png` },
      // Twitter
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:site', name: 'twitter:site', content: 'Mybit - Web3 identities for you and your community.' },
      { hid: 'twitter:title', name: 'twitter:title', content: 'Mybit - Web3 identities for you and your community.' },
      { hid: 'twitter:description', name: 'twitter:description', content: 'Mybit is a blockchain-based, decentralized and open sourced account system. It is the first account system with broad compatibility and complete ownership and control by users. Mybit can be used as a cryptocurrency collection account, as a domain name, or as an account for accessing general Internet services.' },
      { hid: 'twitter:image', name: 'twitter:image', content: `https://${abcConfig.hostname}/images/seo-thumbnail-image.png` },
      { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: 'Mybit - Web3 identities for you and your community.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [{
      src: 'https://lf1-cdn-tos.bytegoofy.com/obj/iconpark/svg_15353_41.8c4938c03c232d45c4a8c5af1812e298.js',
      async: true
    }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/init.scss',
    '~/assets/index.scss'
  ],

  // Customize the progress-bar color
  loading: { color: '#00aadd' },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vuex-persistedstate.ts',
    '~/plugins/i18n',
    '~/plugins/services.ts',
    '~/plugins/alert.ts',
    '~/plugins/toast.ts',
    '~/plugins/wallet-sdk.ts',
    '~/plugins/url-query-parser.ts'
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    ['@nuxtjs/google-gtag', {
      id: abcConfig.googleAnalyticsId,
      debug: !abcConfig.isProd
    }]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://sentry.nuxtjs.org/
    '@nuxtjs/sentry'
  ],

  sentry: {
    disabled: true,
    dsn: abcConfig.sentryDsn,
    config: {
      autoSessionTracking: false
    }
  },

  // disable prefetching globally
  router: {
    prefetchLinks: false
  },

  render: {
    // prevent preload, improve first time performance
    resourceHints: false,
    // https://nuxtjs.org/guides/directory-structure/static
    // https://www.npmjs.com/package/serve-static
    static: {
      maxAge: 7 * 24 * 60 * 60 * 1000 // This will cause a 7-day cache inside the static/ directory, so if there is an emergency image change scenario, you will need to change the file name.
    }
  },

  alias: {
    'bn.js': resolve(__dirname, './node_modules/bn.js/lib/bn.js')
  },

  // The build Property: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-build
  build: {
    extractCSS: true,
    babel: {
      presets ({ isServer }, [preset, options]) {
        let targets
        // Keep default target in server side
        if (isServer) {
          targets = { node: 'current' }
        }
        // Custom target in client side
        else {
          // Compile to ES5 for better compatibility in production
          if (abcConfig.isProd) {
            targets = { ie: 11 }
          }
          // Compile to ESNext for easier debugging in development
          else {
            targets = { chrome: 100 }
          }
        }
        options.targets = targets
      }
    }
  }
}
