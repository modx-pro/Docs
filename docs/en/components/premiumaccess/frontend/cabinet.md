---
title: Личный кабинет
description: 'Страница «Мои доступы» — PremiumAccessCabinet, статусы и продление'
---
<!-- TODO: translate from docs/components/premiumaccess/frontend/cabinet.md -->

# Личный кабинет

Страница, где покупатель видит **свои доступы**: что активно, что истекло, что отозвано.

## Минимальная настройка {#минимальная-настройка}

1. Создайте ресурс «Мои доступы» (например `/cabinet/access/`).
2. Ограничьте шаблон **только для авторизованных** (гостя перенаправьте на login).
3. В content:

::: code-group

```fenom
{'!PremiumAccessCabinet' | snippet}
```

```modx
[[!PremiumAccessCabinet]]
```

:::

Очистите кэш MODX.

## Сниппеты кабинета

| Сниппет | Зачем |
| --- | --- |
| [PremiumAccessCabinet](../snippets/PremiumAccessCabinet) | Полный список (до 20 строк) |
| [PremiumAccessSubscription](../snippets/PremiumAccessSubscription) | Тот же список короче — sidebar или пагинация |
| [PremiumAccessRenew](../snippets/PremiumAccessRenew) | Кнопка «Продлить» (повторная покупка в miniShop3) |
| [PremiumAccessPromoRedeem](../snippets/PremiumAccessPromoRedeem) | Форма «Ввести промокод» |

Вызовы **некэшируемые** (`[[!...]]` / `{'!...' | snippet}`).

### Страница целиком

Список, промокод и продление для тарифа с ID `1`:

::: code-group

```fenom
<h1>Мои доступы</h1>
{'!PremiumAccessCabinet' | snippet}

<h2>Продлить</h2>
<p>Показывайте, когда доступ истёк или скоро истечёт.</p>
{'!PremiumAccessRenew' | snippet : ['productId' => 1]}

<h2>Промокод</h2>
{'!PremiumAccessPromoRedeem' | snippet}
```

```modx
<h1>Мои доступы</h1>
[[!PremiumAccessCabinet]]

<h2>Продлить</h2>
[[!PremiumAccessRenew? &productId=`1`]]

<h2>Промокод</h2>
[[!PremiumAccessPromoRedeem]]
```

:::

### Виджет в боковой колонке

Последние 5 доступов + ссылка на полный кабинет:

::: code-group

```fenom
<aside class="sidebar">
  <h3>Мои подписки</h3>
  {'!PremiumAccessSubscription' | snippet : ['limit' => 5]}
  <p><a href="/cabinet/access/">Все доступы →</a></p>
</aside>
```

```modx
<aside class="sidebar">
  <h3>Мои подписки</h3>
  [[!PremiumAccessSubscription? &limit=`5`]]
  <p><a href="/cabinet/access/">Все доступы →</a></p>
</aside>
```

:::

Вторая страница списка (по 20 строк): параметры `offset` = 20 и `limit` = 20.

### «Продлить» только у истёкших строк {#prodlenie-istekshie}

Скопируйте chunk **`paCabinetItem`** и добавьте кнопку по `productId` из плейсхолдера строки.

::: code-group

```fenom
{* файл chunk, если рендерите через Fenom *}
<li class="pa-cabinet__item pa-cabinet__item--{$status}">
  <strong>{$productName}</strong>
  <span class="pa-cabinet__status">{$statusLabel}</span>
  <span class="pa-cabinet__meta">
    {$grantedAt}{if $expiresAt} · {$expiresAt}{/if}
  </span>
  {if $status == 'expired'}
    {'!PremiumAccessRenew' | snippet : ['productId' => $productId]}
  {/if}
</li>
```

```modx
<li class="pa-cabinet__item pa-cabinet__item--[[+status]]">
  <strong>[[+productName]]</strong>
  <span class="pa-cabinet__status">[[+statusLabel]]</span>
  <span class="pa-cabinet__meta">[[+grantedAt]][[+expiresAt:notempty=` · [[+expiresAt]]`]]</span>
  [[+status:is=`expired`:then=`
    [[!PremiumAccessRenew? &productId=`[[+productId]]`]]
  `]]
</li>
```

:::

Сниппет Renew **не проверяет** срок — показывайте кнопку осмысленно. Сервер проверит при переходе в корзину: [Когда продление доступно](../integration#когда-доступно-продление).

### Своя вёрстка

Скопируйте chunks **`paCabinet`**, **`paCabinetItem`**, **`paCabinetEmpty`**. Плейсхолдеры строки: `productName`, `status`, `statusLabel`, `grantedAt`, `expiresAt`, `productId`. Стили: [CSS и чанки](../frontend).

## Статусы в списке

| Что видит пользователь | Когда |
| --- | --- |
| **Активен** | Доступ действует |
| **Истёк** | Срок вышел |
| **Отозван** | Закрыли в менеджере или по отмене заказа |

CSS: `.pa-cabinet__item--active`, `--expired`, `--revoked`.

## Продление и email

Автосписания с карты **нет** — пользователь снова оформляет заказ в miniShop3.

Email-напоминание перед истечением: [Уведомления](../integration#уведомления-и-cron-истечения).

## Свой интерфейс (Vue, React) {#свой-интерфейс-vue-react}

Список без чанков:

```text
GET {assets_url}components/premiumaccess/connector.php?action=web/cabinet/list
```

Ответ: `{ success, items: [...] }` — название тарифа, статус, даты.

Ссылка на оформление для кнопки «Продлить»:

```javascript
const res = await fetch(
  '/assets/components/premiumaccess/connector.php?action=web/access/renew-link&product_id=1',
  { credentials: 'include' }
);
const data = await res.json();
if (data.success && data.object?.renewUrl) {
  window.location.href = data.object.renewUrl;
}
```

Подробнее: [PremiumAccessRenew](../snippets/PremiumAccessRenew#запрос-renew-link), [Connector API](../development/api).

## Гость

Кабинет пустой или с текстом «войдите на сайт». Страницу закройте для гостей через ACL шаблона.

## См. также

- [PremiumAccessCabinet](../snippets/PremiumAccessCabinet)
- [Доступы в менеджере](../interface/accesses-and-clients)
- [Покупка через MS3](../integration)
