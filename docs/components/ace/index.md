---
title: Ace
description: Редактор кода с подсветкой синтаксиса для менеджера MODX Revolution
author: modx-pro
repository: https://github.com/modx-pro/modx-ace
logo: https://modstore.pro/assets/extras/ace/logo.png
modstore: https://modstore.pro/packages/content/ace

items: [
  { text: 'Быстрый старт', link: 'quick-start' },
  { text: 'Системные настройки', link: 'settings' },
  { text: 'Интеграция', link: 'integration' },
  { text: 'Горячие клавиши', link: 'hotkeys' },
  { text: 'Решение проблем', link: 'troubleshooting' },
]
---
# Ace

Адаптация [Ace Editor](https://ace.c9.io/) для менеджера MODX Revolution: подсветка синтаксиса в сниппетах, плагинах, чанках, шаблонах, файлах и (опционально) в контенте ресурса.

Пакет: **1.9.10-pl**. Репозиторий: [modx-pro/modx-ace](https://github.com/modx-pro/modx-ace).

## Возможности

- **Редактор кода:** PHP, JS, HTML, CSS/SCSS/LESS, SQL, JSON, Markdown и другие режимы
- **Темы, табы, fold, невидимые символы:** настраиваются ключами `ace.*`
- **Поиск и замена** с регулярными выражениями, мультикурсоры, Emmet
- **MODX:** подсветка тегов, автодополнение (Ctrl+Space), Tab-сниппеты (`getr`, `pdoResources`, `chunk`, …)
- **TV-тип Ace** для полей с кодом
- **Черновики** (`ace.draft_restore`), превью CSS-цветов (`ace.color_preview`)
- Работает в **MODX 2.8+** и **MODX 3.x**

## Системные требования

| Требование | Версия |
| --- | --- |
| MODX Revolution | 2.8+ или 3.x |
| Браузер | современный, ES5+ |

## Установка

1. Установите пакет через **Extras → Installer** ([modstore.pro](https://modstore.pro/packages/content/ace), бесплатно)
2. Проверьте `which_element_editor = Ace` (resolver ставит при установке)
3. **Управление → Очистить кэш**

После установки: плагин **Ace**, системные настройки namespace `ace`, TV input type **Ace**.

## Быстрые ссылки

| Раздел | Описание |
| --- | --- |
| [Быстрый старт](quick-start) | Редактор для элементов и ресурсов |
| [Системные настройки](settings) | Ключи `ace.*` |
| [Интеграция](integration) | RTE vs Ace, mime, Tab-сниппеты, TV |
| [Горячие клавиши](hotkeys) | Ctrl+Alt+H и основные шорткаты |
| [Решение проблем](troubleshooting) | Fullscreen, TinyMCE, сохранение |

Тема в стиле Material: [FAQ](/faq/ace/modx-ace-material-theme).

## История

Автор первой версии: Danil Kostin. Текущая ветка поддерживается в [modx-pro/modx-ace](https://github.com/modx-pro/modx-ace).
