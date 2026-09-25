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

Сниппет и плагин PageBuilder на `OnHandleRequest` вызывают один и тот же захват (`UtmSessionCapture`). Сессию сами не стартуют: если `session_status()` не `PHP_SESSION_ACTIVE`, запись в `$_SESSION['utm']` не выполняется (без ошибки в выводе).

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

Обрабатываются скалярные ключи из `$_GET` текущего запроса. Префикс `utm_` снимается, имя приводится к lowercase. Допустимы и короткие имена без префикса (например `?campaign=launch` → `$_SESSION['utm']['campaign']`). Ключ должен совпадать с `^[a-z][a-z0-9_]*$`, иначе пара отбрасывается. Пустые значения игнорируются.

| Query | Сессия |
| --- | --- |
| `?utm_source=google` | `$_SESSION['utm']['source'] = 'google'` |
| `?utm_campaign=sale` | `$_SESSION['utm']['campaign'] = 'sale'` |
| `?campaign=launch` | `$_SESSION['utm']['campaign'] = 'launch'` |

Реестр параметров и значения по умолчанию задаются на вкладке **UTM** панели управления. Правила **видимости** секций настраиваются в диалоге **Видимость** инспектора (`pagebuilder_inspector_visibility_enabled`), не на вкладке UTM.

## Плейсхолдеры в полях

В url и button секций доступен <code v-pre>{{utm:key}}</code> (подстановка при рендере). См. [Панель управления → UTM](../cmp#utm).

## См. также

- [PageBuilderUtmUrl](PageBuilderUtmUrl)
- [PageBuilder](PageBuilder)
