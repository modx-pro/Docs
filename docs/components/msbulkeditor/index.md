---
title: msBulkEditor
description: Массовое редактирование товаров MiniShop3 в менеджере MODX 3
author: ibochkarev
dependencies: [miniShop3, VueTools]
categories: minishop3

items: [
  {
    text: 'Начало работы',
    link: 'quick-start',
    items: [
      { text: 'Быстрый старт', link: 'quick-start' },
      { text: 'Возможности', link: 'features' },
      { text: 'Системные настройки', link: 'settings' },
    ],
  },
  {
    text: 'Интерфейс',
    link: 'interface/',
    items: [
      { text: 'Обзор вкладок', link: 'interface/' },
      { text: 'Пошаговые сценарии', link: 'interface/flows' },
      { text: 'Сетка товаров', link: 'interface/products-grid' },
      { text: 'Быстрые действия', link: 'interface/quick-actions' },
      { text: 'Товар и цены', link: 'interface/product-and-prices' },
      { text: 'Опции MiniShop3', link: 'interface/options' },
      { text: 'TV-параметры', link: 'interface/tv-parameters' },
      { text: 'Настройка колонок', link: 'interface/column-settings' },
      { text: 'Редактирование в списке', link: 'interface/inline-editing' },
      { text: 'Предпросмотр и применение', link: 'interface/preview-and-apply' },
      { text: 'История и откат', link: 'interface/history' },
      { text: 'Пресеты', link: 'interface/presets' },
      { text: 'Импорт и экспорт', link: 'interface/import-export' },
      { text: 'Мастер привязки', link: 'interface/binding-wizard' },
      { text: 'Поля ресурса', link: 'interface/resource-fields' },
    ],
  },
  {
    text: 'Для разработчика',
    link: 'events',
    items: [
      { text: 'События MODX', link: 'events' },
    ],
  },
  { text: 'FAQ', link: 'faq' },
]
---

# msBulkEditor

**msBulkEditor** помогает менять товары [MiniShop3](/components/minishop3/) пачками прямо в менеджере [MODX 3](https://modx.com/). Вы отбираете товары, смотрите таблицу «было / станет», применяете правки и при ошибке откатываете операцию.

Работает с товарами MiniShop3 (`msProduct`). Обычные ресурсы MODX (не товары) панель не меняет.

С чего начать: [Быстрый старт](quick-start).

![Главный экран msBulkEditor](/components/msbulkeditor/screenshots/overview.png)

## Кому подходит

| Роль | Что делать в docs |
| --- | --- |
| Менеджер каталога | [Быстрый старт](quick-start), [сценарии](interface/flows), [FAQ](faq) |
| Администратор MODX | [Установка](#установка), [настройки и права](settings) |
| Разработчик | [События MODX](events) |

## Что вы можете сделать

- снизить или поднять цены у категории, перенести старую цену в `old_price`
- обновить остатки из Excel
- массово опубликовать, скрыть или пометить товары
- поправить TV и опции MiniShop3 у выборки
- сменить производителя, шаблон, родителя, SEO-поля
- сохранить частую операцию как **пресет** и запускать её снова
- откатить ошибочную акцию целиком или по отдельным товарам

Полный список: [Возможности](features).

## Как это работает (коротко)

```mermaid
flowchart LR
  A[Отбор товаров] --> B[Настройка операции]
  B --> C[Предпросмотр]
  C --> D[Применить]
  D --> E[История / откат]
```

1. Отбираете товары (галочки или экспертный режим по фильтру).
2. Запускаете операцию, быстрое действие или пресет.
3. Смотрите предпросмотр и при необходимости снимаете лишние строки.
4. Нажимаете **Применить** и ждёте прогресс.
5. Проверяете результат. Ошибка? Вкладка **История** → **Откат**.

Подробный разбор экрана: [Интерфейс](interface/).

## Быстрые ссылки

| Задача | Страница |
| --- | --- |
| Установить и сделать первую скидку | [Быстрый старт](quick-start) |
| Что умеет панель | [Возможности](features) |
| Сценарии со скриншотами | [Пошаговые сценарии](interface/flows) |
| Фильтры и выбор товаров | [Сетка товаров](interface/products-grid) |
| Предпросмотр и запись | [Предпросмотр и применение](interface/preview-and-apply) |
| Отменить операцию | [История](interface/history) |
| Excel / CSV | [Импорт и экспорт](interface/import-export) |
| Права и лимиты | [Системные настройки](settings) |
| Не открывается панель | [FAQ](faq) |

## Системные требования

| Требование | Версия |
| --- | --- |
| MODX Revolution | 3.0+ |
| PHP | 8.2+ |
| MiniShop3 | 1.0+ |
| VueTools (`modxpro-vue-core`) | 1.0+ |

### Обязательные зависимости

- **[MiniShop3](/components/minishop3/)**: товары, цены, остатки, опции
- **[VueTools](https://modstore.pro/)**: интерфейс панели. Без него экран не загрузится

### По желанию

- **[ms3Variants](/components/ms3variants/)**: правки вариантов товара
- **[Scheduler](/components/scheduler/)**: автоочистка журнала операций
- **OpenSpout** (идёт в vendor пакета): файлы XLSX

## Установка

1. [Подключите репозиторий ModStore](https://modstore.pro/info/connection), если ставите из каталога.
2. **Extras → Installer → Download Extras** → **msBulkEditor** → **Download** → **Install**.
3. Проверьте, что стоят **MiniShop3** и **VueTools**.
4. Выдайте менеджерам права (минимум `msbulkeditor_view` и `msbulkeditor_edit`). Таблица: [Настройки](settings#права-доступа).
5. **Настройки → Очистить кэш**.

После установки в менеджере появляются меню **Пакеты → msBulkEditor**, права `msbulkeditor_*` и настройки области `msbulkeditor`.

## Словарь

| Как в интерфейсе | Что это значит |
| --- | --- |
| **Предпросмотр** | Показать «было / станет» без записи в базу |
| **Применить** | Записать изменения пачками (по умолчанию по 50 товаров) |
| **Экспертный режим** | Операция на всех товарах по фильтру, не только на отмеченных |
| **Пресет** | Сохранённая настройка операции под именем (для повторного запуска) |
| **Мастер привязки** | Диалог, если у части товаров нет нужного TV или опции |
| **fieldType** | Внутренний код типа операции (`price`, `tv`, …). В UI вы видите русские названия |

Дальше: [Быстрый старт](quick-start) или [обзор вкладок](interface/).
