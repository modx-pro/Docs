---
title: ms3fLexiconScript
---
# Сниппет ms3fLexiconScript

Добавляет на страницу скрипт с лексиконом и конфигом для фронтенда. В `window.ms3fLexicon` и `window.ms3fConfig` подставляются язык сайта, `maxItems`, `storageType`, `connectorUrl` и др.

Подключать **до** скрипта `favorites.js`, чтобы JS использовал правильные строки и лимит.

## Параметры

| Параметр | Описание | По умолчанию |
|----------|----------|--------------|
| **cultureKey** | Язык лексикона (`ru, en`) | из контекста или `cultureKey` |
| **resource_type** | Тип ресурсов по умолчанию | `products` |

maxItems и storageType берутся из системных настроек `ms3favorites.max_items`, `ms3favorites.storage_type`.

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
| `connectorUrl` | URL коннектора |
| `commentsEnabled` | Включены ли заметки к элементам |
