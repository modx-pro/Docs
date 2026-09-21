---
title: VueTools
description: Базовый пакет Vue 3 стека для компонентов MODX 3
logo: https://modstore.pro/assets/extras/vuetools/logo.png
author: modx-pro
repository: https://github.com/modx-pro/vuetools

compatibility:
  - modx3
  - php81
  - vue3
items:
  - text: Интеграция
    link: integration
  - text: Тема
    link: theme
  - text: API Composables
    link: composables
---

# VueTools

Базовый пакет: даёт компонентам MODX 3.x общий стек Vue 3 (Vue, Pinia, PrimeVue) через ES Modules Import Map. Несколько компонентов используют одни и те же библиотеки, а не копируют их в свою сборку.

## Что решает

Без общего пакета каждый компонент включает свою копию Vue, Pinia и PrimeVue. VueTools отдаёт их один раз на всю панель управления.

- Единая версия библиотек у всех компонентов.
- Библиотеки загружаются один раз и кэшируются браузером.
- Стили PrimeVue изолированы от ExtJS панели MODX.
- Готовые composable для работы с MODX: `useLexicon`, `useApi`, `useModx`, `usePermission`, `usePrimeVueLocale`, `useTheme`.
- Единая тема оформления, переключаемая одной системной настройкой (с версии 1.2.0).

## Состав пакета

| Библиотека | Версия | Назначение |
|------------|--------|------------|
| Vue 3 | 3.5.x | Реактивный фреймворк |
| Pinia | 3.0.x | Управление состоянием |
| PrimeVue | 4.5.x | UI-компоненты, темы `Aura` и `Modx` |
| PrimeIcons | 7.0.x | Иконки |

| Composable | Назначение |
|--------|------------|
| `useLexicon` | Лексиконы MODX |
| `useApi` | HTTP-клиент к стандартному connector API MODX |
| `useModx` | Доступ к объекту `window.MODx` |
| `usePermission` | Проверка прав пользователя |
| `usePrimeVueLocale` | Локали PrimeVue для DataTable, DatePicker, Calendar |
| `useTheme` | Активная тема из настройки `vuetools.theme` |

## Требования

| Требование | Версия |
|------------|--------|
| MODX Revolution | 3.0.0+ |
| PHP | 8.1+ |
| Браузер | ES Modules (Chrome 89+, Firefox 108+, Safari 16.4+, Edge 89+) |

## Установка

1. Откройте **Приложения → Установщик**.
2. Нажмите **Загрузить дополнения**.
3. Найдите **VueTools** и нажмите **Загрузить**, затем **Установить**.

После установки пакет активируется сам: Import Map, стили PrimeVue и клиентская настройка темы регистрируются на всех страницах панели управления.

## Как работает Import Map

Плагин `VueCoreManager` срабатывает на событие `OnManagerPageBeforeRender` и вставляет в начало `<head>` два блока: Import Map и клиентскую настройку темы `window.VueTools`.

```json
{
  "imports": {
    "vue": "/assets/components/vuetools/vendor/vue.min.js",
    "pinia": "/assets/components/vuetools/vendor/pinia.min.js",
    "primevue": "/assets/components/vuetools/vendor/primevue.min.js",
    "vuetools": "/assets/components/vuetools/vendor/primevue.min.js",
    "vuetools/theme": "/assets/components/vuetools/vendor/primevue.min.js",
    "@vuetools/useApi": "/assets/components/vuetools/composables/useApi.min.js",
    "@vuetools/useLexicon": "/assets/components/vuetools/composables/useLexicon.min.js",
    "@vuetools/useModx": "/assets/components/vuetools/composables/useModx.min.js",
    "@vuetools/usePermission": "/assets/components/vuetools/composables/usePermission.min.js",
    "@vuetools/usePrimeVueLocale": "/assets/components/vuetools/composables/usePrimeVueLocale.min.js",
    "@vuetools/useTheme": "/assets/components/vuetools/composables/useTheme.min.js"
  }
}
```

Когда модуль компонента выполняет `import { ref } from 'vue'`, браузер находит ключ `vue` в Import Map и загружает файл по указанному пути. Каждый URL несёт параметр `?v=` по времени изменения файла — после обновления пакета браузер берёт свежую сборку, а не старую из кэша.

Ключ `vuetools/theme` ведёт на ту же сборку, что `primevue`, и служит признаком версии с поддержкой темы: по нему компонент отличает VueTools 1.2.0+ от более старого (см. [Тема](theme)).

## Изоляция стилей

Стили PrimeVue изолированы префиксом `.vueApp`, чтобы не конфликтовать со стилями ExtJS. Контейнер каждого Vue-виджета должен иметь класс `vueApp`:

```html
<div id="my-vue-app" class="vueApp"></div>
```

::: warning
Без класса `vueApp` стили PrimeVue к виджету не применятся.
:::

::: info Прежнее название
Ранее пакет назывался **ModxProVueCore** и был переименован в **VueTools**.
:::

## Дальше

- [Интеграция в компонент](integration) — пошагово: Vite, загрузка модулей, entry point.
- [Тема](theme) — переключение и подключение темы оформления.
- [API Composables](composables) — справочник хелперов.

## Поддержка

GitHub Issues: [modx-pro/vuetools](https://github.com/modx-pro/vuetools/issues)
