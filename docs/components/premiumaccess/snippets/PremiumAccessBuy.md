---
title: Сниппет PremiumAccessBuy
description: Кнопка покупки доступа — добавление связанного товара miniShop3 в корзину
---

# Сниппет PremiumAccessBuy

Кнопка **«Купить доступ»** — добавляет товар miniShop3 в корзину. У тарифа должен быть указан **ID товара MS3**, иначе кнопка не появится.

Chunk: **`paBuyButton`**. В стандартном закрытом блоке (`paLockedCta`) форма уже есть в `[[+buyForm]]` — отдельный вызов нужен, если собираете шаблон сами.

## Основные вызовы

**Paywall-страница** — тариф из правила:

::: code-group

```fenom
{'!PremiumAccessBuy' | snippet : ['resourceId' => $_modx->resource.id]}
```

```modx
[[!PremiumAccessBuy? &resourceId=`[[*id]]`]]
```

:::

**Лендинг** — ID тарифа из **Компоненты → PremiumAccess → Продукты**:

::: code-group

```fenom
{'!PremiumAccessBuy' | snippet : ['productId' => 1]}
```

```modx
[[!PremiumAccessBuy? &productId=`1`]]
```

:::

**Товар MS3 напрямую** (без привязки к тарифу PremiumAccess):

::: code-group

```fenom
{'!PremiumAccessBuy' | snippet : ['msProductId' => 160]}
```

```modx
[[!PremiumAccessBuy? &msProductId=`160`]]
```

:::

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `resourceId` | — | ID страницы; тариф из правила |
| `productId` | — | ID тарифа |
| `msProductId` | — | ID товара MS3 |
| `buyLabel` | из lexicon | Текст на кнопке |
| `redirect` | `checkout` | После добавления: `checkout`, `cart`, `product` |
| `tpl` | `paBuyButton` | Свой chunk формы |

Приоритет: `msProductId` → `productId` → `resourceId`.

## Дополнительные примеры

Свой текст кнопки:

::: code-group

```fenom
{'!PremiumAccessBuy' | snippet : [
  'resourceId' => $_modx->resource.id,
  'buyLabel' => 'Получить доступ за 990 ₽'
]}
```

```modx
[[!PremiumAccessBuy?
  &resourceId=`[[*id]]`
  &buyLabel=`Получить доступ за 990 ₽`
]]
```

:::

Сначала в корзину, не на оформление:

::: code-group

```fenom
{'!PremiumAccessBuy' | snippet : ['productId' => 1, 'redirect' => 'cart']}
```

```modx
[[!PremiumAccessBuy? &productId=`1` &redirect=`cart`]]
```

:::

Свой chunk закрытого CTA — если убрали `[[+buyForm]]`:

::: code-group

```fenom
{* в Fenom-версии chunk paLockedCta *}
{'!PremiumAccessBuy' | snippet : ['productId' => $productId]}
```

```modx
[[!PremiumAccessBuy? &productId=`[[+productId]]`]]
```

:::

## Требования

- Плагин **miniShop3** включён (`ms3.js` на витрине подключается автоматически).
- Настройки MS3: `ms3_cart_page_id`, `ms3_order_page_id`.
- Покупатель авторизован — доступ привязывается к пользователю заказа.

После оплаты доступ выдаёт **`premiumaccess_order_access`**. Схема: [Интеграция — покупка](../integration#как-происходит-покупка-доступа).

## См. также

- [PremiumAccessRenew](PremiumAccessRenew)
- [Сниппеты — примеры](index#примеры-по-задачам)
- [FAQ](../faq)
