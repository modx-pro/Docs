---
title: Cookbook полей модели
description: Секции, sort_order, visible list и связь с page-fields в Vue-менеджере
---

# Cookbook полей модели

Поля модели настраивают **отображение** колонок, которые уже есть в БД. Новую колонку создают через [extra fields](/components/minishop3/manager/extra-fields/cookbook).

Справочник: [Поля модели](/components/minishop3/interface/utilities/model-fields).

<!-- ![Утилита «Поля модели»: секции и список полей](/components/minishop3/screenshots/mgr-model-fields.png) -->

## Цель

Вы группируете поля по секциям, задаёте xtype и ширину, скрываете технические колонки. Vue-форма заказа и других сущностей читает **visible**-список с сервера.

## Модели

| model (короткое имя) | Форма в менеджере |
| --- | --- |
| `msOrder` | Карточка заказа |
| `msOrderAddress` | Адрес в заказе |
| `msOrderProduct` | Позиция заказа |
| `msVendor` | Производитель |
| `msProductData` | Данные товара (часть полей) |

## Visible list vs полный CRUD

| Запрос | Назначение |
| --- | --- |
| `GET /api/mgr/model-fields/visible/{model}` | Поля для Vue-формы (только `visible`) |
| `GET /api/mgr/model-fields?model={model}` | Полный список в утилите «Поля модели» |
| `PUT /api/mgr/model-fields/{id}` | Метаданные одного поля |
| `PUT /api/mgr/model-fields/ranks` | Порядок полей (drag-and-drop) |

Карточка заказа вызывает `visible/msOrder` и `visible/msOrderAddress` при загрузке.

## Кейс: секция «Дополнительно» на заказе

1. **Утилиты → Поля модели** → модель **msOrder**.
2. Создайте секцию:
   - ключ `extra_info`
   - название «Дополнительно»
   - `sort_order` по необходимости
3. Откройте поле (например `comment`) → укажите секцию **Дополнительно**, `visible = true`, ширину 12.
4. Перетащите секции и поля для нужного порядка.

Порядок секций: `PUT /api/mgr/model-fields/sections/ranks`. Порядок полей: `PUT /api/mgr/model-fields/ranks`.

::: info Сортировка секций
Если drag-and-drop секций не сохраняется, см. [issue #611](https://github.com/modx-pro/MiniShop3/issues/611).
:::

## Кейс: скрыть техническое поле

1. Найдите поле в списке (например `token` или `properties`).
2. Снимите **Видимость** или перенесите в секцию, которую не показываете на форме.
3. Убедитесь, что поле не попало в `GET .../visible/msOrder`.

## Связь с page-fields

| Система | Таблица | API | Область |
| --- | --- | --- | --- |
| Model fields | `ms3_model_fields` | `/api/mgr/model-fields/*` | Модели MS3 (заказ, vendor, …) |
| Page fields | `ms3_product_fields` | `/api/mgr/config/page-fields/product_data` | Только вкладка «Данные» товара |

Extra field на `msProductData` создаёт колонку **и** строку в `ms3_product_fields`. Дальше раскладку вкладки правят в [Поля товара](/components/minishop3/interface/utilities/product-fields), не дублируя запись в model fields.

## API appendix

### Секции

```http
GET /api/mgr/model-fields/sections/{model}
POST /api/mgr/model-fields/sections
PUT /api/mgr/model-fields/sections/{id}
PUT /api/mgr/model-fields/sections/ranks
DELETE /api/mgr/model-fields/sections/{id}
```

### Visible fields

```http
GET /api/mgr/model-fields/visible/msOrder
```

### Combo для xtype combo

```http
GET /api/mgr/model-fields/combo-options/{model}/{field_name}
```

Запись во все эндпойнты: `mssetting_save`.

## Troubleshooting

| Симптом | Действие |
| --- | --- |
| 403 | Политики MS3, см. [issue #613](https://github.com/modx-pro/MiniShop3/issues/613) |
| Поле не на форме | `visible = false` или поле не в `visible`-ответе |
| Путаница с extra fields | Extra создаёт колонку. Model fields только UI. См. [#214](https://github.com/modx-pro/MiniShop3/issues/214) |
| Изменения не видны | Обновите страницу карточки |

См. [Cookbook менеджера](/components/minishop3/manager/).
