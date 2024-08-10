// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-08-09',
  devtools: { enabled: true },
  ssr: true,
  css: ['~/assets/scss/main.scss'],
  modules: [
      '@pinia/nuxt'
  ],
  runtimeConfig: {
    app: {},
    public: {
      host: process.env.NUXT_APP_API
    }
  }
})
