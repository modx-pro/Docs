---
title: CMX
description: Редактор кода на CodeMirror 6 с автодополнением MODX, проверкой кода и историей версий
categories: content
author: vitos88
repository: https://github.com/vitos88/Cmx
logo: https://raw.githubusercontent.com/vitos88/Cmx/main/image/logo.png
modstore: https://modstore.pro/packages/content/cmx

compatibility:
  - modx3
items: [
  { text: 'Быстрый старт', link: 'quick-start' },
  { text: 'Системные настройки', link: 'settings' },
  { text: 'Интеграция', link: 'integration' },
  { text: 'Горячие клавиши', link: 'hotkeys' },
  { text: 'Решение проблем', link: 'troubleshooting' },
]
---
# CMX

[CodeMirror 6](https://codemirror.net/) в менеджере MODX Revolution 3: редактор для сниппетов, плагинов, чанков, шаблонов, файлов, ресурсов без RTE, буфера кэша resource/data и TV.

Пакет: **1.0.0-pl**. Репозиторий: [vitos88/Cmx](https://github.com/vitos88/Cmx).

## Возможности

- **Редактор кода:** PHP, HTML, CSS/SCSS/Less, JavaScript, JSON, SQL, XML/SVG, Markdown, Fenom и Twig
- **Интеграция с MODX:** семантическая подсветка тегов, автодополнение элементов и параметров, переход к элементу, подсказки при наведении
- **Инструменты:** поиск и замена, мультикурсоры, Emmet, форматирование, палитры команд и элементов, медиа-браузер
- **Оформление:** 12 тем, раскладки Standard, Sublime и Vim, настройка шрифта, переноса строк и отступов
- **Проверка:** PHP в браузере и через `php -l`, CSS, Fenom и MODX-теги
- **Безопасность изменений:** локальные черновики с diff и история версий с просмотром, сравнением и экспортом
- **Дополнительно:** тип ввода CMX для TV и виджет CMX Scratchpad

Весь JavaScript редактора входит в пакет. Внешние CDN для CodeMirror, языковых режимов и тем не используются.

## Системные требования

| Требование | Версия |
| --- | --- |
| MODX Revolution | 3.x |
| PHP | 8.0+ |
| PHP CLI | Необязателен, только для серверной проверки `php -l` |

## Установка

1. Скачайте `cmx-1.0.0-pl.transport.zip` из [релиза v1.0.0](https://github.com/vitos88/Cmx/releases/tag/v1.0.0) или установите Пакет через установщик [modstore.pro](https://modstore.pro/packages/content/cmx)
2. Установите пакет через **Пакеты → Управление пакетами**
3. Проверьте `which_element_editor = cmx`
4. Обновите страницу редактирования элемента

Установщик регистрирует плагин **CMX**, создаёт таблицу `cmx_revision`, добавляет 50 настроек namespace `cmx`, тип ввода **cmx** и виджет **CMX Scratchpad**.

## Быстрые ссылки

| Раздел | Описание |
| --- | --- |
| [Быстрый старт](quick-start) | Установка, элементы, ресурсы и первая проверка |
| [Системные настройки](settings) | Все 50 ключей `cmx.*` и значения по умолчанию |
| [Интеграция](integration) | Формы, RTE, MIME, автодополнение, TV, черновики и история |
| [Горячие клавиши](hotkeys) | Основные сочетания Windows/Linux и macOS |
| [Решение проблем](troubleshooting) | Редактор, подсказки, TV, PHP lint, черновики и история |

## Лицензия

GNU General Public License v2.0 или, по вашему выбору, любая более поздняя версия.
