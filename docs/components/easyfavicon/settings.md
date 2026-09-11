---
title: Настройки компонента
description: Системные настройки EasyFavicon
---

# Настройки компонента

Пространство имён в MODX: `easyfavicon`.

| Ключ | По умолчанию | Описание |
| --- | --- | --- |
| `easyfavicon.api_key` | — | API-ключ RealFaviconGenerator, бесплатно выдаётся на [realfavicongenerator.net/api](https://realfavicongenerator.net/api/) |
| `easyfavicon.auto_inject` | `Да` | Плагин вставляет разметку перед `</head>` на каждой странице |
| `easyfavicon.auto_inject_profile` | — | Имя или id профиля для автовставки; пусто — активный |
| `easyfavicon.files_path` | `/favicon/` | Каталог файлов для новых профилей, путь от корня сайта |
| `easyfavicon.master_picture` | — | Исходное изображение для новых профилей: абсолютный URL или путь от корня сайта |
| `easyfavicon.manifest_name` | — | `name` в `site.webmanifest`; пусто — `site_name` |
| `easyfavicon.manifest_short_name` | — | `short_name` в `site.webmanifest`; пусто — `site_name` |
| `easyfavicon.timeout` | `60` | Сколько секунд ждать ответа API и скачивания набора |
| `easyfavicon.interactive_url` | `https://realfavicongenerator.net/api/favicon_generator` | Адрес интерактивного API RealFaviconGenerator |
