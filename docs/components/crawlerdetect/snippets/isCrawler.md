---
title: isCrawler
---
# Сниппет isCrawler

Определяет, является ли текущий посетитель ботом (веб-краулером) по заголовку User-Agent. Используется для условного вывода контента или счётчиков.

**Возвращает:** `"1"` (бот) или `"0"` (не бот).

**Важно:** вызывайте без кэша — `[[!isCrawler]]` (MODX) или через `$modx->runSnippet('isCrawler', [])` (Fenom). Иначе результат будет закэширован и не будет соответствовать текущему посетителю.

## Параметры

| Параметр | Описание | По умолчанию |
|----------|----------|--------------|
| **userAgent** | Строка User-Agent для проверки (если пусто — из текущего запроса) | — |
| **placeholderPrefix** | Префикс плейсхолдера для имени обнаруженного бота | `crawlerdetect.` |

При обнаружении бота, в плейсхолдер `crawlerdetect.matches` (или с вашим префиксом) записывается имя бота (например, `Googlebot`) — полезно для отладки.

## Примеры

### Показать виджет только людям

::: code-group

```modx
[[!isCrawler:eq=`0`:then=`[[$chatWidget]]`]]
```

```fenom
{if $modx->runSnippet('isCrawler', []) == '0'}
  {$modx->getChunk('chatWidget')}
{/if}
```

:::

### Не подключать аналитику ботам

::: code-group

```modx
[[!isCrawler:eq=`0`:then=`[[$googleAnalytics]]`]]
```

```fenom
{if $modx->runSnippet('isCrawler', []) == '0'}
  {$modx->getChunk('googleAnalytics')}
{/if}
```

:::

### Разный контент для бота и человека

::: code-group

```modx
[[!isCrawler:eq=`0`:then=`[[$fullContent]]`:else=`[[$liteContent]]`]]
```

```fenom
{set $isBot = $modx->runSnippet('isCrawler', [])}
{if $isBot == '0'}
  {$modx->getChunk('fullContent')}
{else}
  {$modx->getChunk('liteContent')}
{/if}
```

:::

### Отладка: какой бот обнаружен

::: code-group

```modx
[[!isCrawler]]
[[+crawlerdetect.matches]]
```

```fenom
{$modx->runSnippet('isCrawler', [])}
{if $modx->getPlaceholder('crawlerdetect.matches')}
  Бот: {$modx->getPlaceholder('crawlerdetect.matches')}
{/if}
```

:::
