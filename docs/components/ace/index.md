---
title: Ace
description: Редактор кода с подсветкой синтаксиса для менеджера MODX Revolution
categories: content
author: modx-pro
repository: https://github.com/modx-pro/modx-ace
logo: https://modstore.pro/assets/extras/ace/logo.png
modstore: https://modstore.pro/packages/content/ace

compatibility:
  - modx2
  - modx3
items: [
  { text: 'Быстрый старт', link: 'quick-start' },
  { text: 'Системные настройки', link: 'settings' },
  { text: 'Интеграция', link: 'integration' },
  { text: 'Горячие клавиши', link: 'hotkeys' },
  { text: 'Решение проблем', link: 'troubleshooting' },
]
---
# Ace

[Ace Editor](https://ace.c9.io/) в менеджере MODX Revolution: подсветка синтаксиса в сниппетах, плагинах, чанках, шаблонах, файлах и (опционально) в контенте ресурса.

Пакет: **1.9.11-pl**. Репозиторий: [modx-pro/modx-ace](https://github.com/modx-pro/modx-ace).

## Возможности

- **Редактор кода:** PHP, JS, HTML, CSS/SCSS/LESS, SQL, JSON, Markdown и другие режимы
- **Темы, табы, fold, невидимые символы:** ключи `ace.*`
- **Поиск и замена** с регулярными выражениями, мультикурсоры, Emmet
- **MODX:** подсветка тегов, автодополнение (Ctrl+Space, Ctrl+Shift+Space, Alt+Space), Tab-сниппеты (`getr`, `pdoResources`, `chunk`, …)
- **Тип ввода Ace** для полей с кодом
- **Черновики** (`ace.draft_restore`), превью CSS-цветов (`ace.color_preview`)

## Системные требования

| Требование | Версия |
| --- | --- |
| MODX Revolution | 2 или 3 |

## Установка

1. Установите пакет через **Extras → Installer** ([modstore.pro](https://modstore.pro/packages/content/ace), бесплатно)
2. Проверьте `which_element_editor = Ace`. Resolver ставит это значение при установке и при каждом обновлении
3. **Управление → Очистить кэш**

После установки: плагин **Ace**, системные настройки namespace `ace`, тип ввода **Ace**.

## Быстрые ссылки

| Раздел | Описание |
| --- | --- |
| [Быстрый старт](quick-start) | Редактор для элементов и ресурсов |
| [Системные настройки](settings) | Ключи `ace.*` |
| [Интеграция](integration) | RTE vs Ace, mime, Tab-сниппеты, TV |
| [Горячие клавиши](hotkeys) | Ctrl+Alt+H и основные сочетания |
| [Решение проблем](troubleshooting) | Fullscreen, TinyMCE, сохранение |

Тема в стиле Material: [FAQ](/faq/ace/modx-ace-material-theme).

## История

Автор первой версии: Danil Kostin.
