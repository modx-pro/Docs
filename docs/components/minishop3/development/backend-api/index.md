---
title: Backend API
description: Программный интерфейс MiniShop3 для работы с сущностями магазина из PHP-кода
---

# Backend API

Раздел описывает программный интерфейс MiniShop3 для работы с сущностями магазина из PHP-кода: плагины, сниппеты, консольные скрипты, сторонние компоненты.

## Процессоры (MODX Manager)

Процессоры лежат в `core/components/minishop3/src/Processors/` и имеют namespace `MiniShop3\Processors\`. Вызывайте их **полным именем класса** — в PHP через `$modx->runProcessor()`, в connector и vueManager — в параметре `action`:

```php
$modx->runProcessor('MiniShop3\\Processors\\Gallery\\Upload', ['id' => $productId, 'file' => $path]);
```

Короткий путь `Gallery\Upload` с опцией `processors_path` не используется — передавайте полное имя класса.

## Manager API vs процессоры

| Слой | Когда использовать |
| --- | --- |
| `Controllers\Api\Manager\*` | Vue-интерфейс менеджера (заказы, клиенты, настройки) |
| `Controllers\Api\Web\*` | Витрина, SPA, мобильные клиенты |
| `MiniShop3\Processors\*` | `runProcessor()` из PHP, legacy connector, утилиты с `RunsMs3Processors` |

Примеры групп процессоров: `Gallery/*`, `Settings/Vendor/*`, `Settings/Delivery/*`, `Api/Customer/*` (Web auth из HTTP делегирует сюда), `Utilities/Import/*`, `Category/Option/*` (legacy).

Vue-CRUD настроек **не** вызывает `Processors/Settings/Vendor/*` — см. [События производителей](../events/vendor).

## Содержание

- [API товара](product) — создание, обновление, опции, изображения, категории, связи, производители
- [API заказа](order) — оформление, статусы, стоимость, адреса, позиции, журнал
- [API опций](options) — создание опций, назначение категориям, чтение и запись значений
- [API покупателя](customer) — аутентификация, регистрация, верификация, адреса, токены
