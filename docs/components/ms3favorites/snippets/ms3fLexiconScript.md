---
title: ms3fLexiconScript
---
# Сниппет ms3fLexiconScript

Добавляет на страницу inline-скрипт с лексиконом и конфигом для фронтенда. В `window.ms3fLexicon` и `window.ms3fConfig` подставляются язык сайта, `maxItems`, `storageType`, `connectorUrl`, `siteUrl` и др.

**По умолчанию** конфиг выводит плагин **ms3fFrontend** при включённой настройке [ms3favorites.register_global_config](settings) — сниппет в шаблоне **не обязателен**.

Подключайте сниппет **вручную**, если `register_global_config = Нет`, плагин отключён или нужны кастомные `cultureKey` / `resource_type` до загрузки страницы. В этом случае выводите **до** `favorites.js`.

Использует Fenom-чанк **tplMs3fLexiconScript**.

## Параметры

| Параметр | Описание | По умолчанию |
|----------|----------|--------------|
| **cultureKey** | Язык лексикона (`ru, en`) | из контекста или `cultureKey` |
| **resource_type** | Тип ресурсов по умолчанию | `products` |

maxItems и storageType берутся из системных настроек `ms3favorites.max_items`, `ms3favorites.storage_type`.

При **register_global_config = Да** (по умолчанию) сниппет в шаблоне не нужен — конфиг выводит плагин. Без лексикона (ни плагином, ни сниппетом) JS использует запасные русские фразы.

## Использование

::: code-group

```fenom
{'ms3fLexiconScript' | snippet}
```

```modx
[[!ms3fLexiconScript]]
```

:::

Если не подключать, `favorites.js` будет использовать запасные русские фразы. Для мультиязычного сайта подключение лексикона обязательно.

## Ключи в window.ms3fLexicon

| Ключ | Описание |
|------|----------|
| `empty` | Пустой список |
| `added` | Добавлено в избранное |
| `removed` | Удалено из избранного |
| `add_tooltip` | Подсказка добавления |
| `remove_tooltip` | Подсказка удаления |
| `list_default`, `list_gifts`, `list_plans` | Названия списков |
| `share_title`, `share_copy_link`, `share_success` | Шаринг |
| `add_to_cart`, `add_selected` | Корзина |
| `comment_placeholder`, `comment_updated` | Заметки |

## Ключи в window.ms3fConfig

| Ключ | Описание |
|------|----------|
| `maxItems` | Макс. количество в списке |
| `storageType` | `localStorage` или `cookie` |
| `cultureKey` | Язык |
| `maxLists` | Макс. количество списков |
| `resourceType` | Тип ресурсов |
| `connectorUrl` | URL коннектора (с учётом поддиректории сайта) |
| `siteUrl` | Базовый URL сайта из `site_url` (для шаринга и fallback URL) |
| `commentsEnabled` | Включены ли заметки к элементам |
| `iziToastBaseUrl` | Базовый URL каталога vendor iziToast (для ленивой загрузки CSS/JS) |
| `mfilterContainer` | Кастомный селектор контейнера mFilter для MutationObserver (опционально) |
| `refreshEvents` | Дополнительные DOM-события для вызова `refresh()` после AJAX (массив строк) |
| `mfilterMutationFallback` | Включить fallback MutationObserver (по умолчанию `true`; `false` — отключить) |
