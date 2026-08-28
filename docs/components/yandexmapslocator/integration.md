---
title: Точки и TV
description: Ресурсы-точки YandexMapsLocator, TV, геокод в менеджере, чанки
---

# Точки и TV

Точка на карте — **опубликованный** ресурс MODX. Контейнер задаёте параметром `parents` у сниппета.

## TV Free

При установке создаётся категория **YandexMapsLocator** и TV:

| TV | Тип | Назначение |
|----|-----|------------|
| `yandexmaps_address` | text | Адрес |
| `yandexmaps_latitude` | text | Широта |
| `yandexmaps_longitude` | text | Долгота |
| `yandexmaps_phone` | text | Телефон |
| `yandexmaps_email` | text | Email |
| `yandexmaps_working_hours` | textarea | Часы работы (текст или JSON для Pro) |
| `yandexmaps_category` | text | Категория |
| `yandexmaps_balloon_image` | image | Картинка в балуне |
| `yandexmaps_marker_icon` | image | Иконка маркера на карте |

Имена меняются через `yandexmapslocator_tv_*`: [настройки](settings).

## TV Pro

| TV | Тип | Назначение |
|----|-----|------------|
| `ms3_product_id` | number | ID ресурса товара MiniShop3 для фильтра `minishop_product` |

См. [MiniShop3](pro/minishop3).

## Геокод в менеджере

Плагин Free на `OnDocFormRender` добавляет кнопку: берёт адрес из TV и подставляет координаты. Нужен `yandexmapslocator_api_key`.

## Чанки Free

| Чанк | Назначение |
|------|------------|
| `yandexmapslocator.outer` | Обёртка локатора |
| `yandexmapslocator.search` | Форма поиска |
| `yandexmapslocator.store` | Карточка точки |
| `yandexmapslocator.empty` | Пустой результат |
| `yandexmapslocator.error` | Ошибка |

Pro своих чанков не возит. UI и `data-yml-*`: [Интерфейс](frontend).

## Часы работы

Обычный текст в `yandexmaps_working_hours` виден в карточке.

Для «открыто сейчас» и бейджей Pro нужен **JSON** и верный `yandexmapslocator_timezone`. Иначе для `working_now` точка закрыта. Подробнее: [Открыто сейчас](pro/working-now).
