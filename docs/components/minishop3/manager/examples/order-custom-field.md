---
title: Поле «Комментарий менеджера» в заказе
description: End-to-end — extra field на заказе и сохранение из Vue-формы менеджера
---

# Поле «Комментарий менеджера» в заказе

Добавьте текстовое extra field к заказу и увидите его в карточке **Extras → MiniShop3 → Заказы**.

## Цель

Менеджер вводит внутренний комментарий к заказу. Значение хранится в колонке `ms3_orders` и сохраняется через `PUT /api/mgr/orders/{id}`.

## Что понадобится

- MiniShop3 1.13.x
- Право `mssetting_save` (создание extra field)
- Право `msorder_list` (чтение карточки)
- Право `msorder_save` (сохранение заказа)

## Шаг 1. Создайте extra field

1. Откройте **Extras → MiniShop3 → Утилиты → Дополнительные поля**.
2. В фильтре **Класс модели** выберите **msOrder (Заказы)**.
3. Нажмите **Создать поле** и заполните:

| Параметр | Значение |
| --- | --- |
| Ключ | `manager_comment` |
| Название | Комментарий менеджера |
| xtype | `textfield` |
| dbtype | `varchar` |
| precision | `500` |
| phptype | `string` |
| Активно | да |

Сохраните форму. Пакет создаст миграцию и добавит колонку в таблицу заказов.

<!-- ![Утилита «Дополнительные поля»](/components/minishop3/screenshots/mgr-extra-fields.png) -->

::: tip Класс в БД
В UI класс сохраняется как `MiniShop3\Model\msOrder`. В API создания укажите то же значение в поле `class`.
:::

## Шаг 2. Проверьте API

```http
GET /api/mgr/extra-fields?class=MiniShop3\Model\msOrder
```

В списке должно быть поле `manager_comment` с `"active": true` и `"column_exists": true`.

## Шаг 3. Откройте заказ в менеджере

1. **Extras → MiniShop3 → Заказы** → выберите заказ.
2. На вкладке с данными заказа найдите секцию **Дополнительные поля заказа**.
3. Введите текст в **Комментарий менеджера**.
4. Сохраните карточку.

<!-- ![Секция дополнительных полей на карточке заказа](/components/minishop3/screenshots/mgr-order-extra-field.png) -->

Vue-форма отправляет значение на верхнем уровне тела запроса:

```json
{
  "manager_comment": "Позвонить перед доставкой"
}
```

## Шаг 4. Проверьте сохранение

Перезагрузите карточку или запросите заказ:

```http
GET /api/mgr/orders/{id}
```

В ответе должно быть `"manager_comment": "Позвонить перед доставкой"`.

## Отличие от полей модели

Extra field **создаёт колонку** в БД. [Поля модели](/components/minishop3/manager/model-fields/cookbook) только меняют отображение уже существующих колонок (секции, xtype, `visible`). Для нового текста на заказе берите extra fields.

## API appendix

| Метод | Путь | Права |
| --- | --- | --- |
| GET | `/api/mgr/extra-fields?class=MiniShop3\Model\msOrder` | `mssetting_save` |
| POST | `/api/mgr/extra-fields` | `mssetting_save` |
| PUT | `/api/mgr/orders/{id}` | `msorder_save` |
| GET | `/api/mgr/orders/{id}` | `msorder_list` |

**POST /api/mgr/extra-fields** (фрагмент):

```json
{
  "class": "MiniShop3\\Model\\msOrder",
  "key": "manager_comment",
  "label": "Комментарий менеджера",
  "xtype": "textfield",
  "dbtype": "varchar",
  "precision": "500",
  "phptype": "string",
  "null": true,
  "active": true
}
```

## Troubleshooting

| Симптом | Что проверить |
| --- | --- |
| 403 на extra-fields | Политика `mssetting_save` у пользователя |
| Секция в заказе пустая | `active = 1` в `ms3_extra_fields`, ключ без опечаток |
| Поле есть в утилите, но не в заказе | Колонка `class` в `ms3_extra_fields`. Форма запрашивает `GET ...?class=msOrder`, в БД часто `MiniShop3\Model\msOrder`. Сверьте в DevTools |
| Ошибка после создания | Лог MODX: миграция Phinx, права на `core/components/minishop3/migrations` |
| Две системы полей путают | См. [issue #214](https://github.com/modx-pro/MiniShop3/issues/214) и [cookbook полей модели](/components/minishop3/manager/model-fields/cookbook) |

См. также: [Cookbook extra fields](/components/minishop3/manager/extra-fields/cookbook), [Заказы](/components/minishop3/interface/orders).
