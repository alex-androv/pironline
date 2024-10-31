export default defineNuxtConfig({
  devtools: { 
    enabled: true 
  },
  devServerHandlers: [],
  modules: [
    '@nuxt/fonts', // https://fonts.nuxt.com/
    '@nuxt/image', // https://image.nuxt.com
    '@nuxtjs/color-mode', // https://color-mode.nuxtjs.org
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ], // https://pinia.vuejs.org/core-concepts
    '@pinia-plugin-persistedstate/nuxt', // https://nuxt.com/modules/pinia-plugin-persistedstate
    '@vueuse/motion/nuxt', // https://motion.vueuse.org/api/use-motion
    'dayjs-nuxt', // https://nuxt.com/modules/dayjs#basic-usage
    'nuxt-lodash', // https://lodash.com
    //'nuxt-socket-io', // https://nuxt.com/modules/socket-io
    'nuxt-svgo', // https://nuxt.com/modules/nuxt-svgo
    '@nuxt/ui', 
  ],
  build: {
    transpile: ['pinia-plugin-persistedstate'],
  },
  css: ["~/assets/styles/global.sass"],
  imports: {
    dirs: ["stores"],
  },
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storageKey: 'nuxt-color-mode'
  },
  /*io: {
    sockets: [{
      name: 'main',
      url: 'http://localhost:3000'
    }]
  },*/
  compatibilityDate: '2024-07-04'
})