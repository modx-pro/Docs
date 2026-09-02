---
title: YandexMapsLocator
description: 'Локатор точек на Яндекс.Картах для MODX 3. Free: карта и поиск. Pro: «открыто сейчас», MiniShop3, CSV и REST'
author: Ibochkarev
logo: https://modstore.pro/assets/extras/yandexmapslocator/logo.png
modstore: https://modstore.pro/packages/utilities/yandexmapslocator
categories: utilities
items: [
  {
    text: 'Начало работы',
    link: 'quick-start',
    items: [
      { text: 'Быстрый старт', link: 'quick-start' },
      { text: 'Free и Pro', link: 'free-vs-pro' },
      { text: 'Системные настройки', link: 'settings' },
    ],
  },
  {
    text: 'Интеграция на сайте',
    link: 'integration',
    items: [
      { text: 'Точки и TV', link: 'integration' },
      { text: 'Интерфейс', link: 'frontend' },
      { text: 'Контексты MODX', link: 'contexts' },
      { text: 'Сниппет YandexMapsLocator', link: 'snippets/YandexMapsLocator' },
    ],
  },
  {
    text: 'Pro',
    link: 'pro/',
    items: [
      { text: 'Что даёт Pro', link: 'pro/' },
      { text: 'Открыто сейчас', link: 'pro/working-now' },
      { text: 'MiniShop3', link: 'pro/minishop3' },
      { text: 'CSV в менеджере', link: 'pro/manager' },
      { text: 'REST API v1', link: 'pro/api' },
      { text: 'Безопасность API', link: 'pro/api-security' },
    ],
  },
  {
    text: 'Для разработчика',
    link: 'events',
    items: [
      { text: 'События', link: 'events' },
      { text: 'Extension API', link: 'extension-api' },
    ],
  },
  { text: 'FAQ', link: 'faq' },
]
---

# YandexMapsLocator

Локатор точек сети на [Яндекс.Картах](https://developer.tech.yandex.ru/) для MODX Revolution 3. Точка = опубликованный ресурс с TV: адрес, координаты, телефон, часы работы. На сайте вы получаете список, карту, поиск по адресу, геолокацию и сортировку по расстоянию.

Два пакета, одна документация. **Free** — ядро локатора. **Pro** ставится поверх Free и расширяет тот же UI, плюс CSV в менеджере и REST. Свой сниппет и чанки Pro не дублирует.

## Free и Pro

| | Free | Pro |
|---|------|-----|
| Карта, список, поиск, геолокация | да | да |
| Категории, `return=chunks/data/json` | да | да |
| `search.php` (AJAX на том же сайте) | да | fallback, если REST выключен |
| Фильтр «открыто сейчас», бейджи, TZ на точке | - | да |
| Фильтры amenity / brand | - | да |
| MiniShop3: карта «где забрать товар» | - | да |
| CSV, bulk geocode в CMP | - | да |
| REST API v1 (`locations`, `geocode`, `meta`) | - | да |

Подробнее: [Free и Pro](free-vs-pro).

## Возможности Free

- Точки как ресурсы MODX, TV ставятся при установке
- Сниппет `YandexMapsLocator`: список, карта, форма поиска
- Геолокация («Моё местоположение» / «Все точки»), маршрут
- Кластеризация маркеров, свои иконки и картинка в балуне
- Фильтр по категории, сортировка по `distance`
- Режимы `return`: HTML, плейсхолдеры, JSON
- Кнопка «Получить координаты» в форме ресурса
- Extension API для сторонних extras и для Pro
- Multi-context: параметр `context`, allowlist в настройках

## Что даёт Pro

На том же локаторе:

- фильтр `working_now`, бейджи «Открыто» / «Закрыто», кнопка «Только открытые»
- поля `is_open_now`, `status_hint`, `closes_at`, `next_open_at`, `working_hours_schedule`
- часовой пояс на точке (`yandexmaps_timezone`) или сеть `yandexmapslocator_timezone`
- фильтры `amenity` / `brand`
- на карточке товара MiniShop3 только точки с этим товаром (`productId` + `ms3_product_ids` / `ms3_product_id`)

В менеджере: CSV, bulk geocode, превью расписания.

Для Nuxt, Next и других клиентов: REST v1 (`locations`, `geocode`, `meta`) с CORS и Bearer.

Разделы: [Что даёт Pro](pro/).

## Системные требования

| Требование | Версия |
|------------|--------|
| MODX Revolution | 3.0+ |
| PHP | 8.2-8.4 |
| MySQL / MariaDB | InnoDB |
| [pdoTools](/components/pdotools/) | chunks на Fenom |
| API-ключ [Яндекс.Карт](https://developer.tech.yandex.ru/) | JS API и HTTP Геокодер |

Pro 1.1.0-pl2 требует Free ≥ 1.0.0-pl7 (`yandexmapslocator >=1.0.0-pl7 <2.0.0`). Матрица: [Free и Pro](free-vs-pro).

## Установка

### Free

1. [Подключите репозиторий ModStore](https://modstore.pro/info/connection).
2. **Extras → Installer** → **YandexMapsLocator** → **Download** → **Install**.
3. Укажите `yandexmapslocator_api_key`.
4. Создайте контейнер и дочерние ресурсы-точки, заполните TV.
5. Вставьте сниппет: [Быстрый старт](quick-start).

Пакет: [modstore.pro](https://modstore.pro/packages/utilities/yandexmapslocator).

### Pro

1. Установите Free.
2. Установите **YandexMapsLocatorPro**.
3. Задайте `yandexmapslocator_timezone` под сеть (для «открыто сейчас»).
4. При необходимости: `api_token`, CORS, CSV в **Компоненты → YandexMapsLocator Pro**.

Пакет Pro: [modstore.pro](https://modstore.pro/packages/utilities/yandexmapslocatorpro).

## Быстрые ссылки

| Раздел | Описание |
|--------|----------|
| [Быстрый старт](quick-start) | Ключ, точки, сниппет |
| [Free и Pro](free-vs-pro) | Матрица возможностей |
| [Сниппет](snippets/YandexMapsLocator) | Параметры и примеры |
| [Pro](pro/) | REST, CSV, MiniShop3, «открыто сейчас» |
| [FAQ](faq) | Типовые ошибки |
