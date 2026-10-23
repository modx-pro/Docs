---
title: ms3YandexMarket
description: Файл YML для Яндекс Маркета или RSS для Google из товаров MiniShop3
author: Ibochkarev
logo: https://modstore.pro/assets/extras/ms3yandexmarket/logo.png
modstore: https://modstore.pro/packages/ecommerce/ms3yandexmarket
dependencies: miniShop3
categories: import-export
compatibility:
  - modx3
  - php82
  - minishop3
  - vue3
items: [
  {
    text: 'Начало работы',
    items: [
      { text: 'Первый прайс-лист', link: 'quick-start' },
      { text: 'Экраны менеджера', link: 'manager' },
      { text: 'Действия', link: 'actions' },
      { text: 'Состав файла', link: 'feeds' },
    ],
  },
  {
    text: 'Состав прайса',
    items: [
      { text: 'Поля файла', link: 'fields' },
      { text: 'Параметры прайса', link: 'pricelist' },
      { text: 'Категории и фильтры', link: 'categories' },
      { text: 'Варианты и остатки', link: 'variants' },
      { text: 'Источники значений', link: 'sources' },
    ],
  },
  {
    text: 'Запись файла',
    items: [
      { text: 'Генерация', link: 'generation' },
      { text: 'Журнал и диагностика', link: 'logs' },
      { text: 'Настройки и права', link: 'settings' },
    ],
  },
  {
    text: 'Интеграция',
    items: [
      { text: 'События', link: 'events' },
    ],
  },
]
---

# ms3YandexMarket

Компонент пишет файл из товаров MiniShop3: YML для Яндекс Маркета или RSS 2.0 для Google. Адрес файла вы задаёте в карточке прайса, площадка скачивает его сама. В менеджере пункт меню называется **Яндекс Маркет**.

## Требования

| Требование | Версия |
| --- | --- |
| MODX Revolution | 3+ |
| PHP | 8.2+, расширения json, dom, xmlwriter |
| MiniShop3 | 1.13+ |
| VueTools | 1.2+ (Vue 3.5, Pinia 3, PrimeVue 4) |

По желанию: [ms3Variants](/components/ms3variants/), [ms3Remains](/components/ms3remains/), Scheduler 1.9.

## Установка

Платный пакет ставят из каталога modstore.pro. В исходниках этой ветки флаг `encrypt` выключен, сборщик его не читает.

1. Установите **MiniShop3** и **VueTools** 1.2+.
2. Добавьте провайдер **modstore.pro** (**Система → Управление пакетами → Провайдеры**). URL `https://modstore.pro/extras/`, email и API-ключ возьмите в личном кабинете [modstore.pro](https://modstore.pro).
3. Установите пакет **ms3YandexMarket** через **Управление пакетами**. В **Show Details** выберите провайдер **modstore.pro**.
4. **Очистите кэш** MODX.

Установщик копирует маршруты в `core/config/ms3.routes.d/manager/50-ms3yandexmarket.php`. Каталог `core/config/` должен быть доступен на запись.

Если коннектор отвечает `Route not found`, этого файла нет или MiniShop3 не смог его подключить. В журнале MODX ищите строку `[MiniShop3 Router] Failed to load routes file`.

Дальше: [первый прайс-лист](/components/ms3yandexmarket/quick-start).
