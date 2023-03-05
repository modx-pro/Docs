import { defineConfig } from "vitepress";
import { getSidebar } from "vitepress-plugin-auto-sidebar";
import { enConfig } from "./en";
import { ruConfig } from "./ru";
// import { sharedConfig } from "./shared";

export default defineConfig({
    base: "/docs/",
    // ...sharedConfig,
    lastUpdated: true,
    algolia: {
        apiKey: "6a767bbcca227a92559817e2382d8938",
        indexName: "modx",
        appId: "BCE7F5SAJ2",
    },
    themeConfig: {
        socialLinks: [
            { icon: "github", link: "https://github.com/modx-pro/Docs" },
        ],
    },
    locales: {
        root: {
            label: "Russian",
            lang: "ru-RU",
            link: "/",
            ...ruConfig,
        },
        en: {
            label: "English",
            lang: "en-EN",
            link: "/en/",
            ...enConfig,
        },
    },
});
