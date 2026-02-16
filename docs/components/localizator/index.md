---
title: Localizator
description: Языковые версии и сателлиты без контекстов — автоперевод полей ресурса и лексиконов, SEO
author: modx-pro
modstore: https://modstore.pro/packages/utilities/localizator
repository: https://github.com/modx-pro/localizator

items: [
  { text: 'Быстрый старт', link: 'quick-start' },
  { text: 'Системные настройки', link: 'settings' },
  { text: 'Сниппет Localizator', link: 'snippet-localizator' },
  { text: 'Переключение языков', link: 'switch-languages' },
  { text: 'События', link: 'events' },
  { text: 'Формирование sitemap', link: 'sitemap-formation' },
  { text: 'Импорт в локализации', link: 'import-in-localization' },
  { text: 'seoTemplates', link: 'seotemplates' },
  { text: 'Атрибут hreflang', link: 'hreflang-attribute' },
]
---
# Localizator

Компонент для создания языковых версий и сателлитов без контекстов: автоматический перевод полей ресурса (включая доп. поля и SEO), автоперевод лексиконов. Работа через псевдоконтексты «локализации» (например site.ru/ и site.ru/en/).

## Возможности

- **Языковые версии без контекстов** — псевдоконтексты «локализации», один сайт с несколькими языками
- **Таб «Локализатор» у ресурса** — стандартные поля, SEO и доп. поля; кнопка перевода на другие языки
- **Автоперевод** — Yandex, Google, DeepL или копирование без перевода
- **Интеграция с pdoTools** — вывод переведённых ресурсов через pdoResources, pdoMenu и др. (через системную настройку `pdoFetch.class`)
- **mFilter2** — обработчик для фильтрации по локализации
- **События** — хуки на сохранение/удаление локализаций и языков, построение табов

## Системные требования

| Требование | Описание |
|------------|----------|
| MODX Revolution | 2.x |
| PHP | 7.4+ |
| pdoTools | установлен |
| MIGX | установлен |
| ЧПУ (friendly URLs) | включены |

## Зависимости

- **[pdoTools](/components/pdotools/)** — для выборки и вывода ресурсов (pdoResources, pdoMenu и др.)
- **MIGX** — для работы с мультиполями в локализациях

## Установка

### Через ModStore

1. [Подключите репозиторий ModStore](https://modstore.pro/info/connection)
2. Перейдите в **Extras → Installer** и нажмите **Download Extras**
3. Убедитесь, что установлены **pdoTools** и **MIGX**
4. Найдите **Localizator** в списке и нажмите **Download**, затем **Install**
5. **Управление → Очистить кэш**

Пакет доступен в каталоге [modstore.pro](https://modstore.pro/).

### После установки

Настройте `pdoFetch.class` для работы сниппетов pdoTools с локализациями, создайте языки в админке и заполните таб «Локализатор» у ресурсов.

Подробнее: [Быстрый старт](quick-start) и [Системные настройки](settings).
