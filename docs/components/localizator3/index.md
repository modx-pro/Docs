---
title: Localizator3
description: Языковые версии без контекстов для MODX 3: поля ресурса, TV, SEO, товары MiniShop3
categories: utilities
logo: https://modstore.pro/assets/extras/localizator3/logo.png
author: modx-pro
modstore: https://modstore.pro/packages/utilities/localizator3
repository: https://github.com/modx-pro/localizator3
dependencies:
  - pdoTools
  - VueTools
compatibility:
  - modx3
  - php82
  - vue3
items: [
  { text: 'Быстрый старт', link: 'quick-start' },
  { text: 'Системные настройки', link: 'settings' },
  { text: 'Сниппет getLocalizedResources', link: 'snippet-localizator' },
  { text: 'Переключение языков', link: 'switch-languages' },
  { text: 'События', link: 'events' },
  { text: 'Формирование sitemap', link: 'sitemap-formation' },
  { text: 'Атрибут hreflang', link: 'hreflang-attribute' },
]
---

# Localizator3

Мультиязычность для MODX Revolution 3 без отдельных контекстов. Для MODX 2.x остаётся [Localizator](/components/localizator/).

## Возможности

- Языки в меню **Localizator3** (страница «Локализации»)
- Вкладка **Локализация** у ресурса и товара MiniShop3
- Автоперевод: Yandex, Google, DeepL, LibreTranslate, MyMemory или копирование без перевода
- Выборка через `getLocalizedResources` поверх pdoResources, pdoMenu, msProducts и ms3Products
- Fenom-модификаторы `locfield`, `locoptioncaption`, `locproductoptionvalue`
- SEO: `getLocalizedCanonical`, `getLocalizedSitemap`
- Индексация локализованных полей в mSearch
- Событие `OnBuildLocalizationTabs` для своих полей формы

## Системные требования

| Требование | Версия |
| --- | --- |
| MODX Revolution | 3.0+ |
| PHP | 8.2+ |
| VueTools | 1.1.2-pl+ |
| pdoTools | 2.11.3-pl или новее |
| ЧПУ | включены |

По желанию: MiniShop3, mSearch.

Жёсткие требования транспорта: только PHP и MODX.

- Если VueTools нет, резолвер пытается скачать первую запись `vuetools` у провайдера. Резолвер сам не обновляет уже стоящий VueTools ниже 1.1.2-pl.
- Резолвер скачивает первую запись `pdoTools`, если пакета нет или установленная версия старше 2.11.3-pl.
- Ошибка скачивания VueTools или pdoTools установку Localizator3 не откатывает.

Вкладка и страница «Локализации» показывают предупреждение, если сервис `vuetools` не поднялся или нет собранного `languages.min.js` / бандла вкладки. Без pdoTools сниппет `getLocalizedResources` не находит `pdoResources`.

## Зависимости

- [pdoTools](/components/pdotools/): выборка и вывод ресурсов
- [VueTools](/components/vuetools/): Vue-интерфейс вкладки и страницы «Локализации»

## Установка

### Через ModStore

1. [Подключите провайдер modstore.pro](https://modstore.pro/info/connection).
2. Установите **VueTools** 1.1.2-pl+, если его ещё нет.
3. Найдите **Localizator3** в **Управление пакетами**, скачайте и установите.
4. Очистите кэш MODX.

Пакет: [modstore.pro/packages/utilities/localizator3](https://modstore.pro/packages/utilities/localizator3).

### После установки

1. Создайте языки в меню **Localizator3** (страница «Локализации»).
2. Задайте `localizator3_default_language`. Пустой ключ заменяется первым активным языком по рангу: страница, автоперевод в менеджере, CLI `translate_resources.php`. Без настройки и без активного языка автоперевод и CLI останавливаются с ошибкой.
3. Включите нужные TV флагом «TV доступно в локализациях».
4. Заполните вкладку **Локализация** у ресурсов.
5. Списки на сайте выводите через `getLocalizedResources`.

Резолвер пишет `pdotools_fetch_class` = `ModxPro\PdoTools\FetchLocalizator` (наследник `Fetch`). Класс подключает bootstrap пространства имён Localizator3 через Composer PSR-4, поэтому `getLocalizedResources` и сниппеты pdoTools отдают локализованные поля.

[Быстрый старт](quick-start) и [Системные настройки](settings).
