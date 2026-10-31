---
title: msCatalyst
description: Фасетный фильтр, поиск и синхронизация каталога для miniShop2 и MiniShop3
categories: [catalog, import-export]
logo: https://modstore.pro/assets/extras/mscatalyst/logo.png
author: denius-dev

compatibility:
  - modx2
  - modx3
  - minishop2
  - minishop3
  - php72
items: [
  { text: 'Быстрый старт', link: 'quick-start' },
  { text: 'Обновление с msFacets', link: 'upgrade' },
  {
    text: 'Сниппеты',
    items: [
      { text: 'msCatalyst', link: 'snippets/mscatalyst' },
      { text: 'msCatalystSearch', link: 'snippets/mscatalystsearch' },
      { text: 'Служебные сниппеты', link: 'snippets/service' },
    ],
  },
  {
    text: 'Страница в админке',
    items: [
      { text: 'Обзор вкладок', link: 'interface/' },
      { text: 'Синхронизация', link: 'interface/sync' },
      { text: 'Экспорт', link: 'interface/export' },
    ],
  },
  { text: 'Мультиязычность', link: 'multilingual' },
  { text: 'Фронтенд', link: 'frontend' },
  { text: 'SEO', link: 'seo' },
  { text: 'Посадочные страницы', link: 'landings' },
  { text: 'Переход с SeoFilter', link: 'seofilter' },
  { text: 'Системные настройки и кэш', link: 'settings' },
  { text: 'MODX 3 и модификации', link: 'modx3' },
  { text: 'Решение проблем', link: 'troubleshooting' },
  { text: 'История версий', link: 'changelog' },
]
---
# msCatalyst

msCatalyst выводит каталог miniShop2 и MiniShop3 фасетным фильтром с поиском и держит этот каталог в актуальном виде. Один сниппет рисует панель фильтров, счётчики, сортировку, поиск, постраничность и карточки товаров. Синхронизация загружает и обновляет товары из CSV и XLSX, любого JSON или XML API, Google Таблиц и 1С.

Без JavaScript фильтр работает как обычная GET-форма. С JavaScript страница обновляется через AJAX, а адрес в браузере меняется вместе с фильтрами.

Демо: [`chelnysite.ru`](https://chelnysite.ru/), каталог на 100 000 товаров на виртуальном хостинге. Английская версия того же каталога на Localizator: [`chelnysite.ru/en/`](https://chelnysite.ru/en/). Страница компонента в админке открыта без входа в менеджер: [`chelnysite.ru/admin-demo`](https://chelnysite.ru/admin-demo).

## Возможности

- Фасеты по производителю, разделу, полям товара, TV, опциям и полям ресурса. Цены и опции модификаций msOptionsPrice2 и ms3Variants.
- Диапазоны «от и до» с ползунком для цены, веса и любых числовых полей.
- Счётчик у каждого варианта. Выбор внутри группы не обнуляет соседние варианты этой группы.
- Поиск со словоформами, транслитом, опечатками, весами полей и синонимами. Режимы: внутри каталога, отдельная страница, выпадающий список.
- Каждый переход по фильтрам и страницам пишется в историю браузера, кнопка «Назад» возвращает к прошлой выдаче.
- Скорость на 100 000 товаров: выдача и все счётчики пересчитываются за 10–40 мс на сервере.
- SEO: title, H1 и description с выбранными фильтрами приходят в HTML при первой загрузке, ЧПУ фильтров, карта сайта.
- Посадочные страницы со своими адресами, текстами и склонениями по шести падежам в обоих числах. SeoFilter не нужен, в том числе на MODX 3, а настроенный SeoFilter msCatalyst переносит к себе.
- Синхронизация по профилям: анализ источника, сопоставление полей и каталогов, утверждённая схема, план изменений с предохранителями, откат запуска.
- Экспорт товаров, категорий, производителей и опций в CSV, XLSX, JSON и XML.
- Многоязычный каталог с Localizator, localizator3 или Babel.
- Страница в админке без ExtJS: проверка поиска, синонимы, настройки, индекс, наборы фильтров, посадочные, синхронизация, экспорт и переводы.

## Требования

- MODX 2.8 с miniShop2 или MODX 3 с MiniShop3. miniShop2 на MODX 3 не ставится, для MODX 3 авторы выпускают MiniShop3.
- pdoTools.
- PHP 7.2 или новее. MODX 3.2 сам требует PHP 8.1.

Без магазина или pdoTools установщик остановится и напишет причину в журнал ошибок.

Проверенные связки:

- MODX 2.8.8, miniShop2 3.0.7 и 4.4.2, pdoTools 2.13.3, PHP 7.4;
- MODX 3.2.0, MiniShop3 1.14.1-beta2, pdoTools 3.0.3, PHP 8.4.

## Установка

1. Подключите провайдер modstore.pro в «Пакеты → Установщик» и установите msCatalyst.
2. Установщик создаст категорию msCatalyst: сниппеты `msCatalyst`, `msCatalystSearch`, `msCatalystSitemap`, `msCatalystLandings`, `msCatalystReindex`, `msCatalystSeoFilter`, `msCatalystSync`, `msCatalystDemoAdmin`, плагин, десять чанков, системные настройки, таблицы синхронизации и посадочных страниц.
3. Вызовите сниппет в шаблоне каталога, как описано в разделе [Быстрый старт](quick-start).

Лицензия: одна покупка на один сайт.
