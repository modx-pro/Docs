---
title: isCrawler
---
# Сниппет isCrawler

Определяет, бот ли посетитель. Без `&userAgent` библиотека склеивает заголовки JayBizzle: `HTTP_USER_AGENT`, `HTTP_FROM`, `HTTP_SEC_CH_UA` и остальные из её списка.

**Возвращает:** `"1"` (бот) или `"0"` (не бот).

Вызывайте без кэша: `[[!isCrawler]]` (MODX) или `$modx->runSnippet('isCrawler', [])` (Fenom). Иначе результат общий для всех посетителей.

## Параметры

| Параметр | Описание | По умолчанию |
|----------|----------|--------------|
| **userAgent** | Явная строка. Пусто: заголовки JayBizzle из запроса | — |
| **placeholderPrefix** | Префикс плейсхолдера для имени обнаруженного бота | `crawlerdetect.` |

При обнаружении бота в плейсхолдер `crawlerdetect.matches` (или с вашим префиксом) записывается имя бота, например `Googlebot`. Нужно для отладки.

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
