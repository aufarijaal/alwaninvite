import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Alwan Invite Help",
  description:
    "Everything you need to know about creating and sharing your digital wedding invitation.",
  base: "/docs/",
  outDir: "../public/docs",

  locales: {
    root: {
      label: "English",
      lang: "en",
      themeConfig: {
        nav: [
          { text: "Home", link: "/" },
          { text: "Go to App →", link: "https://alwaninvite.my.id" },
        ],
        sidebar: [
          {
            text: "Guide",
            items: [
              { text: "Getting Started", link: "/" },
              { text: "Creating an Invitation", link: "/creating-invitation" },
              { text: "Managing Invitations", link: "/managing-invitations" },
              { text: "Guests & Wishes", link: "/guests-wishes" },
              { text: "Media Library", link: "/media-library" },
              { text: "Sharing Your Invitation", link: "/sharing" },
            ],
          },
        ],
      },
    },
    id: {
      label: "Bahasa Indonesia",
      lang: "id",
      link: "/id/",
      themeConfig: {
        nav: [
          { text: "Beranda", link: "/id/" },
          { text: "Buka Aplikasi →", link: "https://alwaninvite.my.id" },
        ],
        sidebar: [
          {
            text: "Panduan",
            items: [
              { text: "Memulai", link: "/id/" },
              { text: "Membuat Undangan", link: "/id/creating-invitation" },
              { text: "Mengelola Undangan", link: "/id/managing-invitations" },
              { text: "Tamu & Ucapan", link: "/id/guests-wishes" },
              { text: "Perpustakaan Media", link: "/id/media-library" },
              { text: "Berbagi Undangan", link: "/id/sharing" },
            ],
          },
        ],
      },
    },
  },

  themeConfig: {
    footer: {
      message:
        'Need help? Email us at <a href="mailto:alwanstudio@gmail.com">alwanstudio@gmail.com</a>',
    },
    search: {
      provider: "local",
    },
  },
});
