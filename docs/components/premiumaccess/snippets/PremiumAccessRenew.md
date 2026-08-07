---
title: Сниппет PremiumAccessRenew
description: Кнопка продления доступа через miniShop3
---

# Сниппет PremiumAccessRenew

Кнопка **«Продлить»** — повторная покупка в miniShop3. **Автосписания с карты нет.**

Сниппет **не проверяет** срок. Показывайте кнопку, когда доступ **истёк** или **скоро истечёт**. Условия на сервере: [Когда продление доступно](../integration#когда-доступно-продление).

Chunk: **`paRenewButton`** (как `paBuyButton`, другой текст).

## Основные вызовы

**В кабинете** — по ID тарифа:

::: code-group

```fenom
{'!PremiumAccessRenew' | snippet : ['productId' => 1]}
```

```modx
[[!PremiumAccessRenew? &productId=`1`]]
```

:::

**На paywall-странице** — тариф из правила:

::: code-group

```fenom
{'!PremiumAccessRenew' | snippet : ['resourceId' => $_modx->resource.id]}
```

```modx
[[!PremiumAccessRenew? &resourceId=`[[*id]]`]]
```

:::

## Параметры

Как у [PremiumAccessBuy](PremiumAccessBuy): `productId`, `resourceId`, `msProductId`, `redirect`, `tpl`.

## Дополнительные примеры

По ID товара MS3:

::: code-group

```fenom
{'!PremiumAccessRenew' | snippet : ['msProductId' => 160]}
```

```modx
[[!PremiumAccessRenew? &msProductId=`160`]]
```

:::

В корзину, не на оформление:

::: code-group

```fenom
{'!PremiumAccessRenew' | snippet : ['productId' => 1, 'redirect' => 'cart']}
```

```modx
[[!PremiumAccessRenew? &productId=`1` &redirect=`cart`]]
```

:::

В строке кабинета (свой `paCabinetItem`) — только для статуса «Истёк»:

::: code-group

```fenom
{if $status == 'expired'}
  {'!PremiumAccessRenew' | snippet : ['productId' => $productId]}
{/if}
```

```modx
[[+status:is=`expired`:then=`
  [[!PremiumAccessRenew? &productId=`[[+productId]]`]]
`]]
```

:::

Полная разметка `paCabinetItem`: [Личный кабинет](../frontend/cabinet#prodlenie-istekshie).

## Свой интерфейс без сниппета {#запрос-renew-link}

GET (пользователь авторизован):

```text
GET {assets_url}components/premiumaccess/connector.php
  ?action=web/access/renew-link
  &product_id=1
```

Успех:

```json
{
  "success": true,
  "object": {
    "renewUrl": "https://example.com/checkout"
  }
}
```

Отказ — «Продление недоступно» (гость, рано продлевать, нет товара MS3).

Пример fetch: [Личный кабинет](../frontend/cabinet#свой-интерфейс-vue-react).

## См. также

- [PremiumAccessBuy](PremiumAccessBuy)
- [Личный кабинет](../frontend/cabinet)
- [Уведомления](../integration#уведомления-и-cron-истечения)
