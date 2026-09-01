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

Resolver Pro создаёт (если ещё нет):

| TV | Тип | Назначение |
|----|-----|------------|
| `yandexmaps_timezone` | text | IANA-таймзона точки (`Europe/Moscow`, `Asia/Omsk`). Пусто — сеть `yandexmapslocator_timezone` |
| `ms3_product_id` | number | Один ID товара MiniShop3 (legacy) |
| `ms3_product_ids` | text | Несколько ID: `25,26` или JSON `[25,26]`. Если заполнено, важнее `ms3_product_id` |
| `yandexmaps_amenities` | text | Теги удобств через запятую (`wifi,card,parking`) |
| `yandexmaps_brand` | text | Бренд для фильтра `brand` |

К шаблону TV сами не привязываются. Назначьте их шаблону точек, как остальные TV локатора.

См. [MiniShop3](pro/minishop3), [Открыто сейчас](pro/working-now).

## Геокод в менеджере

Плагин Free на `OnDocFormRender` добавляет кнопку «Получить координаты» под полем адреса: берёт адрес из TV и подставляет координаты. Нужен `yandexmapslocator_api_key`.

Pro добавляет «Проверить расписание» под TV часов: JSON через formatter, статус «открыто сейчас», ближайшее открытие/закрытие.

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

Для «открыто сейчас» и бейджей Pro нужен **JSON** и верный часовой пояс (TV точки или `yandexmapslocator_timezone`). Иначе для `working_now` точка закрыта. Подробнее: [Открыто сейчас](pro/working-now).
