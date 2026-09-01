---
title: Быстрый старт
description: Установка PageBuilder, права, вкладка «Секции» и первый вывод на сайте
---
# Быстрый старт

## 1. Установите зависимости и пакет

| Требование | Версия |
| --- | --- |
| MODX Revolution | 3.0.3+ |
| PHP | 8.2+ |
| VueTools | 1.1.2+ |
| pdoTools | 3.0+ |
| PageBuilder (Free) | 1.0.1-beta |
| PageBuilder Pro | 1.0.1-beta, требует `pagebuilder` ≥ 1.0.1 |

Пакеты **PageBuilder** (Free) и **PageBuilder Pro** ставятся из [modstore.pro](https://modstore.pro/extras/). Без провайдера установка падает с `Package provider not found`.

1. [Подключите ModStore](https://modstore.pro/info/connection).
2. Установите **VueTools** и **pdoTools**, если их ещё нет на сайте.
3. **Extras → Installer → Download Extras** — найдите **PageBuilder** (Free) или **PageBuilder Pro** → **Download** → **Install**.
4. **Настройки → Очистить кэш**. В списке пакетов должен появиться namespace `pagebuilder`.

::: tip Pro
Достаточно установить **PageBuilder Pro**: ядро Free (`pagebuilder`) MODX подтянет сам. Отдельно Free ставить не нужно.
:::

Пакеты в каталоге: [modstore.pro](https://modstore.pro/).

## 2. Выдайте права

В **Пользователи → Группы пользователей** добавьте политике редактора:

- `pagebuilder_view`
- `pagebuilder_save`

Для управления типами секций в панели управления: `pagebuilder_manage_types`.

## 3. Включите вкладку «Секции»

По умолчанию вкладка выключена. В **Системные настройки** → namespace `pagebuilder`:

| Ключ | Значение |
| --- | --- |
| `pagebuilder_resource_tab_enabled` | `1` |
| `pagebuilder_resource_tab_parents` | пусто = все ресурсы, или ID родителей через запятую |

Позицию вкладки задаёт `pagebuilder_resource_tab_index` (`0` первая, `-1` последняя).

![Вкладка «Секции» на ресурсе](/components/pagebuilder/screenshots/mgr-sections-tab.png)

Подробнее: [Системные настройки](settings#вкладки-на-форме-ресурса).

## 4. Подключите вывод в шаблон

В шаблон страницы или в поле content ресурса:

::: code-group

```modx
[[!PageBuilder]]
```

```fenom
{'!PageBuilder' | snippet}
```

:::

Сниппет рендерит **опубликованные** секции текущего ресурса. Черновик на сайте не показывается.

## 5. Соберите страницу в менеджере

<!-- ![Каталог секций](/components/pagebuilder/screenshots/mgr-section-catalog.png) -->

<!-- ![Инспектор секции](/components/pagebuilder/screenshots/mgr-section-inspector.png) -->

1. Откройте ресурс → вкладка **Секции**.
2. Добавьте секцию (например Hero), заполните поля.
3. Нажмите **Сохранить** (черновик).
4. Нажмите **Опубликовать**. Та же раскладка появится на сайте.

При `pagebuilder_fake_enabled = 1` в инспекторе появляется кнопка **Fake**: заполняет поля демо-данными для быстрой проверки вёрстки.

<!-- ![Превью черновика](/components/pagebuilder/screenshots/mgr-section-preview.png) -->

Превью черновика без публикации: кнопка **Preview** во вкладке (токен через `preview.php`).

## 6. Проверка на фронте

<!-- ![Страница с секциями на сайте](/components/pagebuilder/screenshots/fe-page-sections.png) -->

Откройте ресурс на сайте. Должен появиться HTML секций. По умолчанию подключается `pagebuilder-sections.css` (настройка `pagebuilder_load_frontend_css`).

Если блок пустой:

- секции не опубликованы
- у сниппета нет прав на ресурс
- в шаблоне закэширован вызов без `!`. Используйте `[[!PageBuilder]]`

## Дальше

- [Настройки превью и Collections](settings)
- [Параметры сниппета PageBuilder](snippets/PageBuilder)
- [Кастомизация CSS и Fenom](frontend)
- [События и Pro](integration)
