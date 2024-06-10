import { defineConfig } from "vitepress"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "User JS and CSS",
  description: "Chrome extension",
  head: [["link", { rel: "icon", href: "/favicon.png" }]],
  themeConfig: {
    logo: "/logo.svg",
    socialLinks: [
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15"><path fill="currentColor" d="M2.503 1.907A7.472 7.472 0 0 1 7.5 0a7.498 7.498 0 0 1 6.635 4H7.5a3.501 3.501 0 0 0-3.23 2.149z"/><path fill="currentColor" d="M1.745 2.69a7.503 7.503 0 0 0 3.41 11.937l2.812-3.658a3.501 3.501 0 0 1-3.88-2.685a.502.502 0 0 1-.049-.092z"/><path fill="currentColor" d="M6.215 14.89a7.5 7.5 0 0 0 8.357-9.895A.503.503 0 0 1 14.5 5H9.95A3.49 3.49 0 0 1 11 7.5a3.487 3.487 0 0 1-.953 2.405z"/><path fill="currentColor" d="M5 7.5a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0"/></svg>',
        },
        link: "https://chromewebstore.google.com/detail/user-javascript-and-css/nbhcbdghjpllgmfilhnhkllmkecfmpld",
      },
    ],
    search: {
      provider: "local",
    },
    outline: "deep",
  },
  cleanUrls: true,
  locales: {
    root: {
      label: "English",
      lang: "en",
      themeConfig: {
        nav: [
          { text: "Guide", link: "/rules" },
          { text: "About", link: "/about" },
        ],

        sidebar: [
          {
            text: "Guide",
            items: [
              { text: "Rules", link: "/rules" },
              { text: "Modules", link: "/modules" },
              { text: "Storage", link: "/storage" },
            ],
          },
          { text: "About", link: "/about" },
        ],
      },
    },
    ru: {
      label: "Русский",
      lang: "ru",
      themeConfig: {
        nav: [
          { text: "Руководство", link: "/ru/rules" },
          { text: "О расширении", link: "/ru/about" },
        ],

        sidebar: [
          {
            text: "Руководство",
            items: [
              { text: "Правила", link: "/ru/rules" },
              { text: "Модули", link: "/ru/modules" },
              { text: "Хранилище", link: "/ru/storage" },
            ],
          },
          { text: "О расширении", link: "/ru/about" },
        ],
        outlineTitle: "Содержание",
      },
    },
  },
})
