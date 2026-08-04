---
title: Подборки товаров
---
# Подборки товаров

Одна страница manager без вкладок: справочник типов, таблица шаблонов, блок применения к категории. Запросы идут в `assets/components/ms3productsets/connector.php`.

![Обзор](/components/ms3productsets/screenshots/page-overview.png)

## Элементы интерфейса

| Зона | Класс / элемент | Действие |
|------|-----------------|----------|
| Заголовок | `.ms3productsets-admin__header` | Название и intro |
| Типы | `.ms3productsets-admin__card-types` | Badge + описание типов |
| Список | `.ms3productsets-admin__card-templates` | DataTable, **Новая подборка** |
| Диалог | `.ms3productsets-admin-dialog` | CRUD шаблона |
| Применение | `.ms3productsets-admin__card-apply` | Select, TreeSelect, checkbox, кнопки |

![Типы](/components/ms3productsets/screenshots/types-section.png)

![Таблица](/components/ms3productsets/screenshots/template-list.png)

![Применение](/components/ms3productsets/screenshots/apply-category.png)

## Поля шаблона

| Поле | Ключ API | Обязательное |
|------|----------|--------------|
| Название | `name` | да |
| Тип | `type` | да |
| ID товаров | `related_product_ids` | да (≥1) |
| Описание | `description` | нет |
| Порядок | `sortorder` | нет |

![Форма](/components/ms3productsets/screenshots/template-dialog-new.png)

## Connector (manager)

| action | Назначение |
|--------|------------|
| `get_templates` | Список шаблонов |
| `save_template` | Создание / обновление |
| `delete_template` | Удаление по id |
| `apply_template` | Массовое применение |
| `unbind_template` | Отвязка по категории |
| `get_resource_tree` | Дерево для TreeSelect |
| `get_resources` | Список товаров для MultiSelect |

Требуется авторизованный пользователь manager.

## Типы в шаблонах

- `buy_together`
- `similar`
- `popcorn`
- `cart_suggestion`
- `vip`

`auto`, `auto_sales`, `also-bought`, `cross-sell`, `custom` — только в сниппете.

## Ограничения

- Без **VueTools** страница покажет предупреждение вместо UI.
- Право MODX **`view`** для доступа к CMP.
- Редактирование шаблона не обновляет уже применённые связи без повторного **Применить**.
