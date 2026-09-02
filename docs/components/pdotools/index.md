---
title: pdoTools
description: Быстрая выборка страниц и пользователей сайта
logo: https://modstore.pro/assets/extras/pdotools/logo-lg.jpg
author: sergant210
modstore: https://modstore.pro/packages/utilities/pdotools
modx: https://extras.modx.com/package/pdotools
repository:
  - https://github.com/modx-pro/pdoTools
  - https://github.com/modx-pro/pdoTools3

items: [
  {
    text: 'Сниппеты',
    items: [
      { text: 'pdoResources', link: 'snippets/pdoresources' },
      { text: 'pdoMenu', link: 'snippets/pdomenu' },
      { text: 'pdoPage', link: 'snippets/pdopage' },
      { text: 'pdoCrumbs', link: 'snippets/pdocrumbs' },
      { text: 'pdoUsers', link: 'snippets/pdousers' },
      { text: 'pdoSitemap', link: 'snippets/pdositemap' },
      { text: 'pdoNeighbors', link: 'snippets/pdoneighbors' },
      { text: 'pdoField', link: 'snippets/pdofield' },
      { text: 'pdoTitle', link: 'snippets/pdotitle' },
      { text: 'pdoArchive', link: 'snippets/pdoarchive' },
    ],
  },
  {
    text: 'Классы',
    link: 'classes/',
    items: [
      { text: 'pdoTools', link: 'classes/pdotools' },
      { text: 'pdoFetch', link: 'classes/pdofetch' },
      { text: 'pdoParser', link: 'classes/pdoparser' },
    ],
  },
  { text: 'Общие параметры', link: 'general-properties' },
  { text: 'Файловые элементы', link: 'file-elements' },
  { text: 'Парсер', link: 'parser' },
]
---
# pdoTools

pdoTools — набор сниппетов для повседневной работы и небольшая библиотека, которая делает их быстрыми.

::: tip Линия MODX 3
**pdoTools 3.x** (актуально: [3.1.0-pl](https://github.com/modx-pro/pdoTools3/releases/tag/v3.1.0-pl)) требует **MODX Revolution 3** и **PHP 8.1+**. Исходники: [modx-pro/pdoTools3](https://github.com/modx-pro/pdoTools3). Для MODX 2 берите [pdoTools 2.x](https://github.com/modx-pro/pdoTools).
:::

Благодаря общей библиотеке у всех сниппетов pdoTools один минимальный набор возможностей:

- Все запросы в БД работают через PDO. Объекты xPDO не создаются, только если они действительно не нужны.
- Предварительная обработка простых плейсхолдеров в чанках. Парсер MODX разбирается только со сложными вызовами.
- Правильная сортировка, подготовка, обработка и вывод ТВ параметров.
- Код чанков можно указывать прямо при вызове сниппета, загружать обычным образом или из статичных файлов.
- «Быстрые плейсхолдеры» в чанках, которые заменяют фильтры типа «isempty» и оборачивают значения в теги только если те не пусты.
- Подробный лог работы сниппета с отметками времени (`&showLog`). В 3.x лог в плейсхолдере: [общие параметры](general-properties#showlog).

Все запросы строятся на xPDO, выборка производится через PDO для экономии ресурсов и скорости.

В состав входят:

- [pdoResources](/components/pdotools/snippets/pdoresources) — Очень быстрая замена для getResources, совместимая по параметрам.
- [pdoMenu](/components/pdotools/snippets/pdomenu) — Замена для Wayfinder, строит меню.
- [pdoUsers](/components/pdotools/snippets/pdousers) — Выборка и вывод пользователей сайта, с фильтрацией по ролям и группам.
- [pdoCrumbs](/components/pdotools/snippets/pdocrumbs) — Хлебные крошки, замена BreadCrumb.
- [pdoSitemap](/components/pdotools/snippets/pdositemap) — Быстрая генерация карты сайта, замена GoogleSiteMap.
- [pdoNeighbors](/components/pdotools/snippets/pdoneighbors) — Вывод ссылок на соседние документы.
- [pdoField](/components/pdotools/snippets/pdofield) — Вывод любого поля документа, замена getResourceField и UltimateParent.
- [pdoPage](/components/pdotools/snippets/pdopage) — Постраничный вывод результатов, замена getPage.

## Основные возможности

- Любые выборки, из любых таблиц с любыми условиями и джоинами.
- Учет времени на каждую операцию, подробный лог для выявления узких мест.
- Полная совместимость с getPage для постраничного вывода результатов.
- Самый быстрый процессинг чанков, быстрее только вообще без них.
- Встроенный шаблонизатор [Fenom](/components/pdotools/parser).

## Что нового в 3.1.0 (MODX 3)

::: tip Доступно в pdoTools 3.1.0+ (MODX 3)
Нужен пакет [3.1.0-pl](https://github.com/modx-pro/pdoTools3/releases/tag/v3.1.0-pl) (или новее) на MODX 3.
:::

- Флаги строки в чанках: `isFirst`, `isLast`, `isActive` (pdoMenu, pdoPage, pdoCrumbs); у меню ещё `hasChildren` / `hasChilds`, `isHere`, `isStart`, `isCategory`, `isInner`; у страниц `isSkip`; у крошек `isHome`. Уже заданные чанки `tpl*` по-прежнему работают.
- pdoMenu: `[[+children]]` в **&tplInner**.
- Fenom: приведения `boolval`, `doubleval`, `floatval`, `intval`, `strval`. `array_merge` разрешён по умолчанию.
- Ключ `pdotools_cache_path` для каталога кэша (по умолчанию `{core_path}cache/pdotools`).
- pdoPage: свойства вызова сниппета доступны как плейсхолдеры в шаблонах пагинации.
- pdoFetch: доп. категории через MiniShop3 (`msCategoryMember`). Отключение: **&disableMS3**=`1`. miniShop2 и `&disableMS2` убраны.
- Ошибки Fenom называют чанк или ресурс и дают фрагмент исходника (ключ кэша по-прежнему хеш контента).
- Ключи кэша результатов сниппета учитывают текущий контекст.
