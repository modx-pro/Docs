---
title: Сниппет PremiumAccessPromoRedeem
description: Форма активации промокода на витрине
---

# Сниппет PremiumAccessPromoRedeem

Форма **«Ввести промокод»**. После активации пользователь получает доступ к тарифу, указанному при создании кода.

Промокоды: **Компоненты → PremiumAccess → Промокоды**.

## Вызов

::: code-group

```fenom
{'!PremiumAccessPromoRedeem' | snippet}
```

```modx
[[!PremiumAccessPromoRedeem]]
```

:::

Пользователь должен **войти на сайт**. Гостю сниппет покажет просьбу авторизоваться.

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `tpl` | `paPromoRedeemForm` | Свой chunk формы |

## Примеры

### Рядом с кабинетом

::: code-group

```fenom
{'!PremiumAccessCabinet' | snippet}
<h2>Есть промокод?</h2>
{'!PremiumAccessPromoRedeem' | snippet}
```

```modx
[[!PremiumAccessCabinet]]
<h2>Есть промокод?</h2>
[[!PremiumAccessPromoRedeem]]
```

:::

### Отдельная страница

::: code-group

```fenom
{if $_modx->isAuthenticated()}
  {'!PremiumAccessPromoRedeem' | snippet}
{else}
  <p><a href="/login/">Войдите</a>, чтобы активировать код.</p>
{/if}
```

```modx
[[!PremiumAccessPromoRedeem]]
```

:::

### Свой chunk формы

::: code-group

```fenom
{'!PremiumAccessPromoRedeem' | snippet : ['tpl' => 'myPromoForm']}
```

```modx
[[!PremiumAccessPromoRedeem? &tpl=`myPromoForm`]]
```

:::

## Если код не сработал

| Сообщение | Причина |
| --- | --- |
| Код не найден | Опечатка или истёк срок |
| Лимит исчерпан | Код использовали максимальное число раз |
| Уже активирован | Этот пользователь уже вводил этот код |
| Слишком много попыток | Подождите минуту |

Создание промокода: [Доступы и промокоды](../interface/accesses-and-clients#промокоды).

## См. также

- [Интеграция — промокоды](../integration#промокоды)
- [Личный кабинет](../frontend/cabinet)
- [FAQ](../faq)
