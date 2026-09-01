---
title: Сниппет PremiumAccessCabinet
description: Личный кабинет доступов пользователя на витрине
---
<!-- TODO: translate from docs/components/premiumaccess/snippets/PremiumAccessCabinet.md -->

# Сниппет PremiumAccessCabinet

Список **всех доступов** текущего пользователя: активные, истёкшие, отозванные. Параметров нет.

Длинный список с пагинацией — [PremiumAccessSubscription](PremiumAccessSubscription).

## Вызов

::: code-group

```fenom
{'!PremiumAccessCabinet' | snippet}
```

```modx
[[!PremiumAccessCabinet]]
```

:::

Страница только для **авторизованных**.

## Примеры

### Только кабинет

См. выше.

### Кабинет + промокод + продление

::: code-group

```fenom
{'!PremiumAccessCabinet' | snippet}
{'!PremiumAccessPromoRedeem' | snippet}
{'!PremiumAccessRenew' | snippet : ['productId' => 1]}
```

```modx
[[!PremiumAccessCabinet]]
[[!PremiumAccessPromoRedeem]]
[[!PremiumAccessRenew? &productId=`1`]]
```

:::

Полная вёрстка страницы: [Личный кабинет](../frontend/cabinet).

## Что выводится

| Ситуация | Результат |
| --- | --- |
| Есть доступы | Список `paCabinetItem` |
| Доступов нет | `paCabinetEmpty` |
| Гость | Пусто или «войдите на сайт» |

Статусы: **Активен**, **Истёк**, **Отозван**.

## Своя вёрстка

Скопируйте **`paCabinet`**, **`paCabinetItem`**, **`paCabinetEmpty`**.

Плейсхолдеры строки:

| Плейсхолдер | Описание |
| --- | --- |
| `productName` | Название тарифа |
| `productId` | ID тарифа (для Renew) |
| `status` / `statusLabel` | Код и подпись статуса |
| `grantedAt` / `expiresAt` | Даты выдачи и окончания |

Кнопка «Продлить» только у истёкших — фрагмент для своего **`paCabinetItem`**:

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

Полная разметка строки: [Личный кабинет](../frontend/cabinet#prodlenie-istekshie).

Стили: [CSS и чанки](../frontend).

JSON без чанков: `web/cabinet/list` — [Connector API](../development/api).

## См. также

- [PremiumAccessSubscription](PremiumAccessSubscription)
- [PremiumAccessRenew](PremiumAccessRenew)
- [Интеграция — личный кабинет](../integration#личный-кабинет)
