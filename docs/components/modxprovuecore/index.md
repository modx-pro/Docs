---
title: ModxProVueCore
description: Базовый пакет Vue 3 стека для компонентов MODX 3
logo: https://modstore.pro/assets/extras/modxprovuecore/logo-lg.png
author: modx-pro
repository: https://github.com/modx-pro/modxprovuecore

items:
  - text: Интеграция
    link: integration
  - text: API Composables
    link: composables
---

# ModxProVueCore

Базовый пакет, предоставляющий **Vue 3 стек** для компонентов MODX 3.x через ES Modules Import Map.

## Назначение

ModxProVueCore решает проблему **дублирования библиотек** при использовании Vue 3 в нескольких компонентах MODX. Вместо того чтобы каждый компонент включал свою копию Vue, Pinia и PrimeVue, все они используют **общие библиотеки** из ModxProVueCore.

### Преимущества

- **Единая версия библиотек** — все компоненты используют одинаковые версии Vue, Pinia, PrimeVue
- **Меньший размер загрузки** — библиотеки загружаются один раз и кэшируются браузером
- **Изолированные стили** — PrimeVue стили не конфликтуют с ExtJS админки MODX
- **Готовые composables** — useLexicon, useApi, useModx, usePermission для работы с MODX

## Состав пакета

| Библиотека | Версия | Назначение |
|------------|--------|------------|
| Vue 3 | 3.5.x | Реактивный фреймворк |
| Pinia | 3.0.x | State management |
| PrimeVue | 4.3.x | UI компоненты |
| PrimeIcons | 7.0.x | Иконки |

### Composables (хелперы)

| Модуль | Назначение |
|--------|------------|
| `useLexicon` | Работа с лексиконами MODX |
| `useApi` | HTTP клиент для стандартного MODX API |
| `useModx` | Доступ к глобальному объекту MODx |
| `usePermission` | Проверка прав пользователя |

## Системные требования

| Требование | Версия |
|------------|--------|
| MODX Revolution | 3.0.0+ |
| PHP | 8.1+ |
| Браузер | ES Modules support (Chrome 89+, Firefox 108+, Safari 16.4+, Edge 89+) |

## Установка

### Через менеджер пакетов

1. Перейдите в **Extras → Installer**
2. Нажмите **Download Extras**
3. Найдите **ModxProVueCore** в списке
4. Нажмите **Download** и затем **Install**

::: info Автоматическая активация
После установки пакет активируется автоматически. Import Map и стили PrimeVue регистрируются на всех страницах админки MODX.
:::

## Архитектура

### Import Map

ModxProVueCore использует [Import Map](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) — стандартную технологию браузера для разрешения ES Module импортов.

Плагин `VueCoreManager` срабатывает на событие `OnManagerPageInit` и регистрирует Import Map в `<head>` страницы:

```json
{
  "imports": {
    "vue": "/assets/components/modxprovuecore/vendor/vue.min.js",
    "pinia": "/assets/components/modxprovuecore/vendor/pinia.min.js",
    "primevue": "/assets/components/modxprovuecore/vendor/primevue.min.js",
    "@modxprovuecore/useApi": "/assets/components/modxprovuecore/composables/useApi.min.js",
    "@modxprovuecore/useLexicon": "/assets/components/modxprovuecore/composables/useLexicon.min.js",
    "@modxprovuecore/useModx": "/assets/components/modxprovuecore/composables/useModx.min.js",
    "@modxprovuecore/usePermission": "/assets/components/modxprovuecore/composables/usePermission.min.js"
  }
}
```

### Как это работает

```
1. Плагин VueCoreManager (OnManagerPageInit)
   ↓
2. Регистрирует Import Map в <head> (до ES modules)
   ↓
3. Подключает CSS стили PrimeVue (изолированы .vueApp)
   ↓
4. Ваш компонент загружает ES modules
   ↓
5. Браузер разрешает импорты через Import Map
```

Когда Vue компонент выполняет `import { ref } from 'vue'`, браузер находит ключ `vue` в Import Map и загружает файл по указанному пути.

## Изоляция стилей

PrimeVue стили изолированы с помощью CSS префикса `.vueApp`. Это предотвращает конфликты с ExtJS стилями админки MODX.

Все контейнеры Vue виджетов **должны** иметь класс `vueApp`:

```html
<!-- В ExtJS панели или HTML -->
<div id="my-vue-app" class="vueApp"></div>
```

::: warning Важно
Без класса `vueApp` стили PrimeVue не применятся к вашим компонентам.
:::

## Компоненты, использующие ModxProVueCore

- **[MiniShop3](/components/minishop3/)** — современный интернет-магазин для MODX 3

## Для разработчиков

Если вы разрабатываете компонент MODX и хотите использовать Vue 3 + PrimeVue:

- [Интеграция в компонент](integration) — пошаговое руководство
- [API Composables](composables) — документация хелперов

## Поддержка

- GitHub Issues: [modx-pro/modxprovuecore](https://github.com/modx-pro/modxprovuecore/issues)
