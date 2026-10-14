---
title: Backend API
description: Программный интерфейс MiniShop3 для работы с сущностями магазина из PHP-кода
---

# Backend API

Программный интерфейс MiniShop3 для работы с сущностями магазина из PHP-кода: плагины, сниппеты, консольные скрипты, сторонние компоненты.

## Процессоры (MODX Manager)

Процессоры лежат в `core/components/minishop3/src/Processors/` и имеют namespace `MiniShop3\Processors\`. Вызывайте их **полным именем класса** — в PHP через `$modx->runProcessor()`, в connector и vueManager — в параметре `action`:

```php
$modx->runProcessor('MiniShop3\\Processors\\Gallery\\Upload', ['id' => $productId, 'file' => $path]);
```

Короткий путь вида `Gallery\Upload` с опцией `processors_path` не работает: по короткому имени MODX ищет файл с суффиксом `.class.php`, а процессоры MiniShop3 лежат без него.

## Manager API vs процессоры

| Слой | Когда использовать |
| --- | --- |
| `Controllers\Api\Manager\*` | Vue-админка (заказы, покупатели, настройки) |
| `Controllers\Api\Web\*` | Фронтенд, SPA, мобильные приложения |
| `MiniShop3\Processors\*` | `runProcessor()` из PHP, прежний connector, утилиты с `RunsMs3Processors` |

Группы процессоров:

| Группа | Что внутри |
| --- | --- |
| `Product/*`, `Product/ProductLink/*` | Товары и связи между ними |
| `Category/*` | Категории товаров |
| `Gallery/*`, `Utilities/Gallery/*` | Изображения товара и утилиты галереи |
| `Customer/*`, `Customer/Address/*` | Покупатели и их адреса |
| `Api/Customer/*` | Вход, регистрация, сброс пароля, верификация email — сюда Web API делегирует аутентификацию |
| `Settings/Vendor/*`, `Settings/Delivery/*`, `Settings/Payment/*`, `Settings/Status/*`, `Settings/Link/*` | Справочники: производители, способы доставки, способы оплаты, статусы, типы связей |
| `Utilities/Import/*` | Импорт товаров из CSV |
| `System/*`, `System/Element/*`, `System/User/*` | Служебные операции |
| `Resource/*` | Ресурсы MODX |

Исключение — Vue-CRUD настроек: он **не** вызывает `Processors/Settings/Vendor/*`, см. [События производителей](../events/vendor).

## Содержание

- [API товара](product) — создание, обновление, опции, изображения, категории, связи, производители
- [API заказа](order) — оформление, статусы, стоимость, адреса, позиции, журнал
- [API опций](options) — создание опций, назначение категориям, чтение и запись значений
- [API покупателя](customer) — аутентификация, регистрация, верификация, адреса, токены
