---
title: Интеграция
description: Как плагин пересчитывает корзину MiniShop3 и что делать на сайте
---

# Интеграция

На обычном магазине корзину не подключают сниппетами ms3Discounts. Плагин сам пишет скидку в draft-заказ MiniShop3. Сниппеты нужны только на карточке, в каталоге и в блоке «успей купить».

## Что сделать на сайте

1. Включите `ms3discounts_enabled`.
2. Создайте активное правило в **Компоненты → Скидки**. Флаги `show_in_catalog` и `show_in_product` на корзину не влияют.
3. Оставьте чанки `msCart` / мини-корзины MiniShop3. После добавления или изменения позиции в `price` и `cost` уже цена со скидкой.
4. Если нужно показать зачёркнутую цену или сумму скидки, читайте `properties` позиции. Отдельного JS корзины в пакете нет.
5. После правки правила очистите кэш и снова измените корзину (количество, удаление, повторное добавление) либо перейдите к оформлению. Открытие статуса корзины само по себе пересчёт не запускает.

Доставку и оплату пакет не трогает. В `cart['discounts']` ничего не пишет.

## Как идёт пересчёт

Плагин слушает события MiniShop3.

| Событие | Что делает |
| --- | --- |
| `msOnAddToCart`, `msOnChangeInCart`, `msOnRemoveFromCart`, `msOnBeforeGetOrderCost` | Пересчитывает draft и сохраняет позиции |
| `msOnGetStatusCart` | Складывает `properties.discount_cost` в `status.total_discount`. Цены не считает заново |
| `msOnGetProductPrice` | Считает цену одного товара без корзины (`hasCart = false`). Условия, которым нужна корзина, цену не меняют |

Цепочка на add / change / remove / before order cost:

1. Плагин читает позиции draft-заказа.
2. База для расчёта: `properties.original_price`, иначе `price` из снимка товара MiniShop3 (`msProductData.price`), иначе текущий `price` позиции. Метод `getPrice()` пакет не вызывает.
3. Движок берёт активные правила по товару, категории и производителю. Правило без целей include действует на всю корзину.
4. Плагин пишет в позицию новые `price` и `cost` (`price × count`) и поля в `properties`.
5. Для подарка создаёт, обновляет или удаляет отдельную строку.
6. В `properties` заказа пишет `ms3discounts_hash`. Если состав корзины, пользователь, контекст, активации и ревизия правил не изменились, следующий вызов позиции не трогает. В hash входит час (`Y-m-d H`), поэтому окна по времени обновляются не чаще раза в час.

Итог заказа MiniShop3 берёт из `cost` позиций. Отдельного обработчика `msOnGetCartCost` / `msOnGetOrderCost` в пакете нет.

## Поля позиции

После пересчёта обычная строка корзины:

| Куда | Поле | Смысл |
| --- | --- | --- |
| позиция | `price` | Цена единицы со скидкой |
| позиция | `cost` | `price × count` |
| `properties` | `original_price` | Цена до скидки |
| `properties` | `old_price` | Старая цена товара, иначе `original_price` |
| `properties` | `discount_price` | Скидка на единицу |
| `properties` | `discount_cost` | Скидка на строку |
| `properties` | `discount_percent` | Процент |
| `properties` | `discounts` | Список применённых правил: `id`, `name`, `action_type`, `value`, `discount` |

Подарок: `price` и `cost` равны `0`, в `properties` стоят `ms3discounts_gift` и `discount_id`. Такие строки движок в расчёт не кладёт.

В чанке строки корзины MiniShop3:

::: code-group

```fenom
{$price}
{$cost}
{$properties.original_price}
{$properties.discount_cost}
```

```modx
[[+price]]
[[+cost]]
[[+properties.original_price]]
[[+properties.discount_cost]]
```

:::

`total_discount` в статусе корзины: сумма `properties.discount_cost` по позициям. Подарки дают `0`.

## Другой пакет

Чужой extra видит уже новые `price` и `cost` на своих событиях после add / change / remove / `msOnBeforeGetOrderCost`. Пакет, который читает только `cart['discounts']`, записей ms3Discounts там не найдёт.

Промокоды в пакет не входят. Чтобы включить правило с флагом «только после активации», вызовите сервис:

```php
$activator = $modx->services->get('ms3discounts_activator');
$activator->activateDiscount(12, 'custom');
```

Строка `$source` доходит до активатора. Вызова из конкретного пакета промокодов в этом репозитории нет.

Свои условия и действия регистрируйте на `ms3discountsOnRegisterProviders` (первый запрос к `ms3discounts_registry`). В `$scriptProperties['registry']` приходит `ProviderRegistry`.

## Расчёт из PHP

Нужен, если считаете корзину вне плагина MiniShop3. На сайте этот вызов не обязателен.

```php
$engine = $modx->services->get('ms3discounts_engine');
$factory = new \Ms3Discounts\Integration\MiniShop3\DiscountContextFactory();
$context = $factory->fromItems($items, $userId, $userGroups, $contextKey, $activations, true);
$discounts = $modx->services->get('ms3discounts_repository')->findCandidates(
    new \Ms3Discounts\Dto\CartTargets($productIds, $categoryIds, $vendorIds)
);
$result = $engine->calculateCart($context, $discounts, ['trace' => true]);
```

`$result` содержит `items` (`price`, `original_price`, `discount_cost`, `applied_discounts`), `total_discount`, `discounts`. При `trace=true` добавляется `trace`. Подарки в этот массив не входят. Их в draft пишет плагин через `CartLineWriter`.

Витрина без корзины: [сниппеты](snippets/index).
