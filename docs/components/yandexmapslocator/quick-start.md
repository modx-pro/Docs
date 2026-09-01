---
title: Быстрый старт
description: 'Установка YandexMapsLocator: ключ Яндекс.Карт, точки, сниппет'
---

# Быстрый старт

## 1. API-ключ Яндекс.Карт

Без ключа карта и серверный геокодер не работают. Один ключ в `yandexmapslocator_api_key`:

| Куда | Зачем |
|------|--------|
| Браузер (`api-maps.yandex.ru/2.1`) | Карта и маркеры |
| Сервер (`geocode-maps.yandex.ru`) | Поиск по адресу, геолокация, кнопка в mgr, REST geocode (Pro) |

1. Войдите в [Кабинет разработчика](https://developer.tech.yandex.ru/) с Яндекс ID.
2. Подключите **JavaScript API и HTTP Геокодер**.
3. Скопируйте ключ (активация до ~15 минут).
4. **Система → Настройки системы → yandexmapslocator** → `yandexmapslocator_api_key`.

В кабинете ограничьте ключ по HTTP Referer (домены сайта) и по IP для серверного геокодера. Не кладите ключ в чанки и Git.

## 2. Контейнер и точки

1. Создайте ресурс-контейнер (например, «Магазины»).
2. Добавьте дочерние **опубликованные** ресурсы: каждая точка = один ресурс.
3. Заполните TV (категория «YandexMapsLocator»): адрес, координаты, телефон и т.д.
4. Или укажите адрес и нажмите «Получить координаты» в форме ресурса (плагин Free).

Имена TV и переименование: [Точки и TV](integration).

## 3. Сниппет на странице

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => 123,
    'radius' => 50,
    'sortby' => 'distance'
]}
```

```modx
[[!YandexMapsLocator?
    &parents=`123`
    &radius=`50`
    &sortby=`distance`
]]
```

:::

Нужен [pdoTools](/components/pdotools/) (чанки на Fenom). Вызов **некэшированный**.

Чанки по умолчанию: `yandexmapslocator.outer`, `.search`, `.store`, `.empty`, `.error`.

Параметры: [YandexMapsLocator](snippets/YandexMapsLocator).

Другие частые вызовы:

::: code-group

```fenom
{* Категория *}
{'!YandexMapsLocator' | snippet : [
    'parents' => 123,
    'category' => 'аптека',
    'filters' => 'category'
]}

{* Открытые сейчас — нужен Pro *}
{'!YandexMapsLocator' | snippet : [
    'parents' => 123,
    'filters' => 'working_now'
]}
```

```modx
[[!YandexMapsLocator?
    &parents=`123`
    &category=`аптека`
    &filters=`category`
]]

[[!YandexMapsLocator?
    &parents=`123`
    &filters=`working_now`
]]
```

:::

## 4. Проверка

1. Откройте страницу: видны форма поиска, список и карта.
2. Введите адрес → «Найти».
3. «Моё местоположение» → сортировка по distance, кнопка сменяется на «Все точки».
4. На мобильном: табы «Список» / «Карта».

## 5. Pro (опционально)

После установки Pro:

1. Задайте `yandexmapslocator_timezone` (омская сеть: `Asia/Omsk`) и при необходимости TV `yandexmaps_timezone` на точках.
2. Для REST: `yandexmapslocator_api_token` и `api_cors_origins` на production.
3. CSV и bulk geocode: **Компоненты → YandexMapsLocator Pro**.

Pro ≥ 1.1.0-pl2, Free ≥ 1.0.0-pl7. См. [Free и Pro](free-vs-pro), [Что даёт Pro](pro/).
