---
title: Backend API
description: Программный интерфейс MiniShop3 для работы с сущностями магазина из PHP-кода
---

# Backend API

Из PHP вызывайте товары, заказы, опции и покупателей: плагины, сниппеты, консольные скрипты, сторонние компоненты.

## Процессоры (MODX Manager)

Процессоры лежат в `core/components/minishop3/src/Processors/`, namespace `MiniShop3\Processors\`. Вызывайте **полным именем класса**. В PHP это `$modx->runProcessor()`. В connector и vueManager то же имя кладите в параметр `action`.

```php
$response = $modx->runProcessor('MiniShop3\\Processors\\Gallery\\Upload', [
    'id' => $productId,
    'file' => $path,
]);

$response->isError();
$response->getMessage();
$response->getObject();
```

Без товара (`id` = 0) `isError()` истинно, `getMessage()` возвращает «Товар не найден.», `getObject()` пуст. При успехе `isError()` ложно, `getMessage()` пуст, `getObject()` это сохранённый `msProductFile`.

Короткое имя вроде `Gallery\Upload` процессор не находит. `RunsMs3Processors` передаёт `processors_path` рядом с полным именем, не вместо него.

## Manager API vs процессоры

```mermaid
flowchart LR
  php[Сниппет или плагин] -->|runProcessor| proc[Processors]
  mgr[Vue-админка] -->|заказы и покупатели| manager[ApiManager]
  web[Витрина и SPA] -->|фронтенд| webapi[ApiWeb]
```

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
| `Api/Customer/*` | Вход, регистрация, сброс пароля, верификация email. Сюда Web API делегирует аутентификацию |
| `Settings/Vendor/*`, `Settings/Delivery/*`, `Settings/Payment/*`, `Settings/Status/*`, `Settings/Link/*` | Справочники: производители, способы доставки, способы оплаты, статусы, типы связей |
| `Utilities/Import/*` | Импорт товаров из CSV |
| `System/*`, `System/Element/*`, `System/User/*` | Служебные операции |
| `Resource/*` | Ресурсы MODX |

Исключение: Vue-CRUD настроек **не** вызывает `Processors/Settings/Vendor/*`. См. [События производителей](../events/vendor).

## Содержание

- [API товара](product): создание, обновление, опции, изображения, категории, связи, производители
- [API заказа](order): оформление, статусы, стоимость, адреса, позиции, журнал
- [API опций](options): создание опций, назначение категориям, чтение и запись значений
- [API покупателя](customer): аутентификация, регистрация, верификация, адреса, токены
