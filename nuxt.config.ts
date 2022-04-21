import type { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  target: 'server',

  build: {
    extractCSS: true,
    // publicPath: process.env.PUBLIC_PATH != undefined ? process.env.PUBLIC_PATH : '/_nuxt/',
  },

  head: {
    titleTemplate: '%s - comicify',
    title: 'comicify',
    htmlAttrs: {
      lang: 'fr',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify', '@nuxtjs/date-fns'],

  modules: ['@nuxtjs/axios', '@nuxtjs/toast'],

  components: ['~/components'],

  plugins: ['~/plugins/axios.js'],

  css: ['@fortawesome/fontawesome-free/css/all.css', '@fontsource/montserrat/index.css'],

  publicRuntimeConfig: {
    browserBaseURL: process.env.API_URL,
    apiSecret: process.env.API_PUBLIC,
  },

  privateRuntimeConfig: {
    browserBaseURL: process.env.API_URL,
    apiSecret: process.env.API_PUBLIC,
  },

  router: {
    base: process.env.ROUTER_BASE !== undefined ? process.env.ROUTER_BASE : '/',
  },

  dateFns: {
    locales: ['fr'],
    defaultLocale: 'fr',
  },
  vuetify: {
    icons: {
      iconfont: 'fa',
      values: {},
    },
    defaultAssets: false,
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      options: {},
      default: false,
      disable: false,
      themes: {
        light: {
          primary: '#035397',
          accent: '#9A9AFF',
          secondary: '#000091',
          info: '#2C63C1',
          warning: '#FBAE3C',
          error: '#e10600',
          success: '#008941',
          neutral: '#f4f5fa',
          bg: '#FFFFFF',
        },
        dark: {
          primary: '#5089C6',
          accent: '#5770BE',
          secondary: '#00006D',
          info: '#4A8CF0',
          warning: '#FFB866',
          error: '#ff3333',
          success: '#00eb5e',
          neutral: '#1d1f20',
          bg: '#181a1b',
        },
      },
    },
  },
}
export default config
