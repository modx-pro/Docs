---
title: pdoTools
description: Быстрая выборка страниц и пользователей сайта
logo: https://modstore.pro/assets/extras/pdotools/logo-lg.jpg
author: sergant210
modstore: https://modstore.pro/packages/utilities/pdotools
modx: https://extras.modx.com/package/pdotools
repository: https://github.com/modx-pro/pdoTools

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

pdoTools — это набор удобных сниппетов для повседневной работы + небольшая библиотека, которая делает их очень быстрыми.

Благодаря использованию общей библиотеки, все сниппеты pdoTools обладают единым минимальным функционалом:

- Все запросы в БД работают через PDO. Объекты xPDO не создаются, только если они действительно не нужны.
- Предварительная обработка простых плейсхолдеров в чанках. Парсер MODX разбирается только со сложными вызовами.
- Правильная сортировка, подготовка, обработка и вывод ТВ параметров.
- Код чанков можно указывать прямо при вызове сниппета, загружать обычным образом или из статичных файлов.
- «Быстрые плейсхолдеры» в чанках, которые заменяют фильтры типа «isempty» и оборачивают значения в теги только если те не пусты.
- Ведение подробного журнала работы сниппета с отметками времени, для отладки.

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
- **Встроенный шаблонизатор [Fenom](https://github.com/fenom-template/fenom/tree/master/docs/ru) в версии 2.0**
