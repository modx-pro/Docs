---
title: msBundles
description: Комплекты товаров miniShop3 с общей ценой, скидкой и синхронизацией в корзине
author: Ibochkarev
logo: https://modstore.pro/assets/extras/msbundles/logo.png
modstore: https://modstore.pro/packages/ecommerce/msbundles
dependencies:
  - miniShop3
  - VueTools
categories: catalog
compatibility:
  - modx3
  - php82
  - minishop3
  - vue3
items:
  - text: Начало работы
    items:
      - text: Быстрый старт
        link: quick-start
      - text: Системные настройки
        link: settings
  - text: Витрина
    items:
      - text: Вывод на сайте
        link: frontend
      - text: Сниппеты (обзор)
        link: snippets/index
      - text: Сниппет msBundles
        link: snippets/msBundles
      - text: Сниппет msBundles.initialize
        link: snippets/msBundles.initialize
      - text: Каталог комплектов
        link: catalog
  - text: Интерфейс
    items:
      - text: Обзор менеджера
        link: interface/index
      - text: Сценарии
        link: interface/flows
  - text: Для разработчика
    items:
      - text: События
        link: events
  - text: REST API
        link: api
  - text: FAQ
    link: faq
---

# msBundles

Продавайте наборы товаров miniShop3 как одно предложение. Покупатель добавляет комплект одной кнопкой — в корзину попадают все позиции. Цена и скидка считаются автоматически.

![Список комплектов в менеджере](/components/msbundles/screenshots/overview.png)

## Возможности

### Менеджер

Раздел **Компоненты → msBundles** (Vue 3 + PrimeVue через [VueTools](/components/vuetools/)). Поиск, фильтрация по активности и контексту, сортировка перетаскиванием.

В редакторе: контекст витрины, название, описание, изображение, состав. Поиск товаров ограничен контекстом. Контекст активного комплекта изменить нельзя — сначала выключите **Активен** и сохраните.

Копирование, превью «Как на витрине», проверка остатков. Права: `msbundles_view`, `msbundles_save`.

Экраны и сценарии: [Интерфейс](interface/), [Сценарии](interface/flows).

### Цены и состав

Режимы цены для строки:

| Режим | Описание |
| --- | --- |
| Оригинал | Цена товара из miniShop3 |
| Фикс | Фиксированная цена за единицу |
| Скидка % | Процент от цены товара |
| Скидка суммой | Сумма вычитается из цены |
| Бесплатно | 0 за единицу |

Позиции: обязательные и необязательные. В футере — итог и экономия. Карточка появляется на страницах всех товаров состава **в том же контексте**. Для других языков создайте отдельный комплект (Duplicate → смена контекста и состава).

### Остатки

Поведение при нехватке обязательной позиции задаёт `msbundles_stock_behavior`:

| Значение | Поведение |
| --- | --- |
| `block` | Карточка есть, кнопка неактивна |
| `message` | Карточка есть, выводится `stock_message` |
| `hide` | Карточка не выводится |

Необязательную позицию при нулевом остатке комплект пропускает. Лимит: `msbundles_max_bundle_quantity`. Подробнее: [Системные настройки](settings).

### Витрина

На карточке товара вызовите `msBundles`. В каталоге: `bundles` (ID через запятую) или `list=all`. Сниппет, REST и корзина отдают только комплекты **текущего контекста**.

В `<head>`: `msBundles.initialize`. Цена пересчитывается при смене количества.

Важны data-атрибуты (`data-msbundles`, `data-ms-bundle`, `data-msbundles-action`), не CSS-классы. Темизация через `--msbundles-*`.

Код и плейсхолдеры: [Вывод на сайте](frontend), [Сниппеты](snippets/).

![Карточка на витрине](/components/msbundles/screenshots/storefront-travel.png)

### Корзина

Комплект в корзине — несколько строк miniShop3 с общим `bundle_hash`.

Главная строка: бейдж «Комплект», количество, кнопка «Удалить комплект». Остальные: подпись «Входит в комплект…», количество заблокировано. Изменение количества у главной строки меняет остальные. Удаление любой строки убирает весь комплект.

Для обновления корзины у `msCart` укажите `selector`. В чанке: `tplMsBundlesCartInfo`.

### Для разработчика

REST-маршруты `calculate`, `add`, `remove`, `get` через роутер miniShop3. События `msOnBundle*` для кастомизации. Примеры: [REST API](api), [События](events).

## Требования

| Компонент | Назначение |
| --- | --- |
| MODX Revolution 3 | Ядро |
| miniShop3 | Корзина и API |
| VueTools | Интерфейс |
| pdoTools | Fenom-чанки |
| PHP 8.2+ | Сервер |

После установки назначьте права `msbundles_view` и `msbundles_save`.

## Навигация

| Задача | Страница |
| --- | --- |
| Установка и первый комплект | [Быстрый старт](quick-start) |
| Настройка остатков и лимитов | [Системные настройки](settings) |
| Вывод на сайте | [Вывод на сайте](frontend) |
| Страница каталога | [Каталог комплектов](catalog) |
| Параметры msBundles | [msBundles](snippets/msBundles) |
| Подключение CSS/JS | [msBundles.initialize](snippets/msBundles.initialize) |
| Интерфейс менеджера | [Интерфейс](interface/) |
| Сценарии работы | [Сценарии](interface/flows) |
| События и плагины | [События](events) |
| REST API | [REST API](api) |
| Частые ошибки | [FAQ](faq) |
