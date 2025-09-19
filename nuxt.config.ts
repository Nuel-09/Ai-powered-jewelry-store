// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  srcDir: "app/",
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    cfAccountId: process.env.CF_ACCOUNT_ID,
    cfApiToken: process.env.CF_API_TOKEN,
  },
  modules: ["@nuxt/image"],
  app: {
    head: {
      title: "Precious Moments",
      titleTemplate: "%s | Precious Moments",
      link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    },
  },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
});
