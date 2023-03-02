import { defineConfig } from "vitepress";
import { getSidebar } from "vitepress-plugin-auto-sidebar";
import { enConfig } from "./en";
import { ruConfig } from "./ru";
// import { sharedConfig } from "./shared";

export default defineConfig({
    base: "/docs/",
    // ...sharedConfig,
    lastUpdated: true,
    lastUpdatedText: "Update Date",
    themeConfig: {
        sidebar: getSidebar({
            contentRoot: "/docs",
            collapsible: true,
            collapsed: true,
        }),
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
