// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    cfAccountId: process.env.CF_ACCOUNT_ID,
    cfApiToken: process.env.CF_API_TOKEN
  },
  modules: ['@nuxt/image'],
  app: {
    head: {
      title: 'Precious Moments',
      titleTemplate: '%s | Precious Moments'
    }
  },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});