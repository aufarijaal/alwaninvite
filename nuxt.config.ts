import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxtjs/supabase",
    "@vueuse/nuxt",
    "@nuxtjs/i18n",
  ],
  app: {
    head: {
      title: "Alwan Invite",
      meta: [
        {
          name: "description",
          content:
            "Create beautiful digital invitations easily with Alwan Invite.",
        },
      ],
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      onesignalAppId: process.env.ONESIGNAL_APP_ID,
    },
  },
  supabase: {
    redirectOptions: {
      login: "/auth/signin",
      callback: "/auth/callback",
      include: undefined,
      exclude: ["/", "/invite/**"],
      cookieRedirect: false,
    },
  },
  fonts: {
    families: [
      { name: "Inter", provider: "google" },
      { name: "Google Sans", provider: "google" },
    ],
  },
  i18n: {
    defaultLocale: "en",
    lazy: true,
    langDir: "locales",
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "id", name: "Indonesia", file: "id.json" },
    ],
    strategy: "no_prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },
  ssr: true,
  vite: {
    server: {
      allowedHosts: [
        "alwaninvite.my.id",
        "localhost",
        "174b-114-10-121-158.ngrok-free.app",
      ],
    },
  },
});
