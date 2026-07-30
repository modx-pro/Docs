---
title: MobileDetect
---
# Сниппет MobileDetect

Сравнивает текущий тип устройства с параметром `&input` и возвращает `1` (совпадает) или `0` (не совпадает).

**Важно:** вызывайте **некэшированным** — `[[!MobileDetect]]`. При кэше результат будет один для всех посетителей.

## Параметры

| Параметр | Описание | По умолчанию |
| --- | --- | --- |
| `&input` | Ожидаемый тип: `standard`, `tablet`, `mobile` | `mobile` |

Типы соответствуют значениям `getDeviceType()` сервиса MobileDetect.

## Примеры

### Mobile

::: code-group

```modx
[[!MobileDetect:is=`1`:then=`
  <p>Контент для mobile</p>
`:else=``:input=`mobile`]]
```

```fenom
{if $modx->runSnippet('MobileDetect', ['input' => 'mobile']) == 1}
  <p>Контент для mobile</p>
{/if}
```

:::

### Tablet

::: code-group

```modx
[[!MobileDetect:is=`1`:then=`
  <p>Контент для tablet</p>
`:else=``:input=`tablet`]]
```

```fenom
{if $modx->runSnippet('MobileDetect', ['input' => 'tablet']) == 1}
  <p>Контент для tablet</p>
{/if}
```

:::

### Desktop (standard)

::: code-group

```modx
[[!MobileDetect:is=`1`:then=`
  <p>Контент для desktop</p>
`:else=``:input=`standard`]]
```

```fenom
{if $modx->runSnippet('MobileDetect', ['input' => 'standard']) == 1}
  <p>Контент для desktop</p>
{/if}
```

:::

### Ветвление mobile / desktop

::: code-group

```modx
[[!MobileDetect:is=`1`:then=`
  [[$mobileHeader]]
`:else=`
  [[$desktopHeader]]
`:input=`mobile`]]
```

```fenom
{if $modx->runSnippet('MobileDetect', ['input' => 'mobile']) == 1}
  {$modx->getChunk('mobileHeader')}
{else}
  {$modx->getChunk('desktopHeader')}
{/if}
```

:::

## Как работает

1. Сниппет загружает сервис `MobileDetect`
2. Читает GET-параметр принудительного режима (`md_force_browser_variable`)
3. Вызывает `resolveDevice()` — cookie, GET или User-Agent
4. Сравнивает `$input` с текущим типом (без учёта регистра)
5. Возвращает `(int) совпадение`

Плейсхолдер `[[+mobiledetect.device]]` выставляет плагин, не сниппет.

## Связанные разделы

- [Интеграция](../integration) — Fenom и HTML-теги
- [Системные настройки](../settings) — GET-параметры и cookie
- [Решение проблем](../troubleshooting) — кэширование
