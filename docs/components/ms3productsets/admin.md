---
title: Руководство по админке
---
# Руководство по админке

Страница **Подборки товаров** хранит **шаблоны** (тип + набор ID) и позволяет **массово** скопировать их в связи `ms3_product_sets` для всех товаров категории. Точечные правки — через TV на карточке товара.

Экран и поля API: [Подборки товаров (интерфейс)](interface/templates). Пошаговые сценарии: [Сценарии (flows)](interface/flows).

## Как открыть

- **Компоненты → Подборки товаров**
- URL: `?a=index&namespace=ms3productsets`
- Нужны **VueTools** и право MODX **`view`**

![Обзор страницы](/components/ms3productsets/screenshots/page-overview.png)

## Три блока на экране

### 1. Типы подборок

Справочник пяти типов, доступных в шаблонах: `buy_together`, `similar`, `popcorn`, `cart_suggestion`, `vip`.

![Типы подборок](/components/ms3productsets/screenshots/types-section.png)

Типы `auto`, `auto_sales` в шаблонах не задаются — только в вызове сниппета. Подробнее: [Типы подборок](types).

### 2. Список подборок

Таблица шаблонов: ID, название, тип, ID товаров. Кнопка **Новая подборка**, в строке — **Изменить** и **Удалить**.

![Таблица шаблонов](/components/ms3productsets/screenshots/template-list.png)

### 3. Применить подборку к категории

Выбор шаблона, дерево категорий, чекбокс **Заменить существующие подборки этого типа**, кнопки **Применить** и **Отвязать**.

![Применение](/components/ms3productsets/screenshots/apply-category.png)

## Создание шаблона

1. **Новая подборка**.
2. Заполните поля:

| Поле | Назначение |
|------|------------|
| **Название** | Имя для менеджеров. Попадает в `template_name` связей. |
| **Тип подборки** | Один из пяти типов шаблонов. |
| **ID товаров** | MultiSelect или строка через запятую. Минимум один ID. |
| **Описание** | Внутренний комментарий. |
| **Порядок** | Сортировка в списке админки. |

3. **Сохранить** → connector `save_template`.

![Форма создания](/components/ms3productsets/screenshots/template-dialog-new.png)

![Пикер товаров](/components/ms3productsets/screenshots/product-picker.png)

## Редактирование и удаление

- **Изменить** — те же поля, connector `save_template` с `id`.
- **Удалить** — ConfirmDialog, connector `delete_template`. Связи в БД не удаляются автоматически.

![Редактирование](/components/ms3productsets/screenshots/template-dialog-edit.png)

![Подтверждение удаления](/components/ms3productsets/screenshots/delete-confirm.png)

## Применение и отвязка

**Применить** (`apply_template`):

- Собирает все `msProduct` в выбранной категории и подкатегориях.
- Для каждого товара создаёт строки в `ms3_product_sets` с `template_name` = имя шаблона.
- С **`replace=true`** сначала удаляет связи того же **type** у товаров категории.

**Отвязать** (`unbind_template`):

- Удаляет связи с совпадающими **type** + **template_name** в выбранной ветке.
- TV и другие шаблоны не трогает.

## TV на карточке товара

| TV | Тип |
|----|-----|
| `ms3productsets_buy_together` | buy_together |
| `ms3productsets_similar` | similar |
| `ms3productsets_popcorn` | popcorn |
| `ms3productsets_cart_suggestion` | cart_suggestion |
| `ms3productsets_vip` | vip |

При сохранении товара плагин синхронизирует TV в `ms3_product_sets`.

## Типовый процесс

1. Массово: шаблон → **Применить** к категории.
2. Точечно: TV на одном товаре.
3. Проверка: `ms3ProductSets` с тем же `type` на витрине.

## См. также

- [Сценарии (flows)](interface/flows)
- [Системные настройки](settings)
- [Права доступа](permissions)
