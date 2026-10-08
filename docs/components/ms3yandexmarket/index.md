---
title: ms3YandexMarket
description: Файл YML для Яндекс Маркета или RSS для Google из товаров MiniShop3
author: Ibochkarev
dependencies: miniShop3
categories: import-export
repository: https://github.com/Ibochkarev/ms3YandexMarket
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
      { text: 'Маршруты менеджера', link: 'api' },
    ],
  },
]
---

# ms3YandexMarket

Компонент пишет файл из товаров MiniShop3: YML для Яндекс Маркета или RSS 2.0 для Google. Площадка забирает файл по URL. Кабинет и Partner API компонент не вызывает. В менеджере пункт **Яндекс Маркет**.

## Требования

| Требование | Версия |
| --- | --- |
| MODX Revolution | 3+ |
| PHP | 8.2+, расширения json, dom, xmlwriter |
| MiniShop3 | 1.13+ |
| VueTools | 1.2+ (Vue 3.5, Pinia 3, PrimeVue 4) |

По желанию: pdoTools для Fenom, [ms3Variants](/components/ms3variants/), [ms3Remains](/components/ms3remains/), Scheduler 1.9.

Версии MiniShop3, VueTools и Scheduler указаны в README пакета. Сборка их не проверяет. MiniShop2 и MODX 2 не поддерживаются.

## Установка

<!-- MEDIA: screenshot-admin | must | Установка transport-пакета ms3YandexMarket через «Управление пакетами» после загрузки zip | На тестовом стенде MODX 3: «Управление пакетами» → установить собранный zip, дождаться успеха, очистить кэш сайта -->

Соберите пакет из репозитория и поставьте zip через управление пакетами. После установки очистите `core/cache`.

```bash
pnpm --dir vueManager install && pnpm --dir vueManager build
composer install
php _build/build.php
```

Если коннектор отвечает `Requested processor not found`, в `core/config/ms3.routes.d/manager/` нет `50-ms3yandexmarket.php` или MiniShop3 его не читает.

Дальше: [первый прайс-лист](/components/ms3yandexmarket/quick-start).
