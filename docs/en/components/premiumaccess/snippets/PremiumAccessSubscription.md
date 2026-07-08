---
title: Сниппет PremiumAccessSubscription
description: Список доступов пользователя с пагинацией — виджет и боковая колонка
---
<!-- TODO: translate from docs/components/premiumaccess/snippets/PremiumAccessSubscription.md -->

# Сниппет PremiumAccessSubscription

Тот же список, что [PremiumAccessCabinet](PremiumAccessCabinet), с параметрами **`limit`** и **`offset`** — для sidebar, виджета на главной или второй страницы списка.

## Вызов

::: code-group

```fenom
{'!PremiumAccessSubscription' | snippet : ['limit' => 5]}
```

```modx
[[!PremiumAccessSubscription? &limit=`5`]]
```

:::

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `limit` | `20` | Сколько строк показать |
| `offset` | `0` | С какой строки начать |

## Примеры

### Виджет в sidebar

::: code-group

```fenom
<aside>
  <h3>Мои подписки</h3>
  {'!PremiumAccessSubscription' | snippet : ['limit' => 5]}
  <a href="/cabinet/access/">Все доступы →</a>
</aside>
```

```modx
[[!PremiumAccessSubscription? &limit=`5`]]
```

:::

### Вторая страница списка

Ресурс `/cabinet/access/page-2/`:

::: code-group

```fenom
{'!PremiumAccessSubscription' | snippet : ['offset' => 20, 'limit' => 20]}
```

```modx
[[!PremiumAccessSubscription? &offset=`20` &limit=`20`]]
```

:::

### На главной для авторизованных

::: code-group

```fenom
{if $_modx->isAuthenticated()}
  {'!PremiumAccessSubscription' | snippet : ['limit' => 3]}
{/if}
```

```modx
[[!PremiumAccessSubscription? &limit=`3`]]
```

:::

Chunks те же, что у Cabinet: `paCabinet`, `paCabinetItem`, `paCabinetEmpty`.

JSON без HTML: `web/cabinet/list` — [Connector API](../development/api).

## См. также

- [PremiumAccessCabinet](PremiumAccessCabinet)
- [Личный кабинет](../frontend/cabinet)
