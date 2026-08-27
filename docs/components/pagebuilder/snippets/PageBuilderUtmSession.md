---
title: PageBuilderUtmSession
description: Сохранение UTM-параметров в сессию для правил видимости секций
---

# Сниппет PageBuilderUtmSession

Записывает UTM-параметры из query string в `$_SESSION['utm']`. Нужен для правил видимости секций (`settings.utm` в JSON документа).

## Назначение

Сохранить метки кампании при первом заходе, чтобы [PageBuilder](PageBuilder) показал или скрыл секции по UTM в том же запросе и на следующих страницах сессии.

## Когда вызывать

Плагин PageBuilder уже захватывает UTM на `OnHandleRequest` в контексте `web`. Сниппет нужен, если:

- плагин отключён на части шаблонов;
- сессия стартует позже события плагина;
- вы хотите явный вызов в layout.

Разместите **до** `PageBuilder` в общем chunk шапки или base layout.

## Параметры

Сниппет без properties. Вызов без аргументов.

## Вызов

::: code-group

```modx
[[!PageBuilderUtmSession]]
```

```fenom
{'!PageBuilderUtmSession' | snippet}
```

:::

## Что сохраняется

| Query | Сессия |
| --- | --- |
| `?utm_source=google` | `$_SESSION['utm']['source'] = 'google'` |
| `?utm_campaign=sale` | `$_SESSION['utm']['campaign'] = 'sale'` |

Ключи нормализуются в lowercase. Пустые значения игнорируются.

Реестр параметров и значения по умолчанию задаются на вкладке **UTM** панели управления. Правила **видимости** секций настраиваются в инспекторе ресурса, не там.

## Плейсхолдеры в полях

В url и button секций доступен <code v-pre>{{utm:key}}</code> (подстановка при рендере). См. [Панель управления → UTM](../cmp#utm).

## См. также

- [PageBuilderUtmUrl](PageBuilderUtmUrl)
- [PageBuilder](PageBuilder)
