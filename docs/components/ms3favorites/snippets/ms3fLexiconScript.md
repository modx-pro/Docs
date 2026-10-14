---
title: ms3fLexiconScript
---
# Сниппет ms3fLexiconScript

Добавляет на страницу inline-скрипт с лексиконом и конфигом для фронтенда. В `window.ms3fLexicon` и `window.ms3fConfig` попадают язык сайта, `maxItems`, `storageType`, `connectorUrl`, `siteUrl` и др.

**По умолчанию** конфиг выводит плагин **ms3fFrontend** при включённой настройке [ms3favorites.register_global_config](../settings). Сниппет в шаблоне **не обязателен**.

Подключайте сниппет **вручную**, если `register_global_config = Нет`, плагин отключён или нужны свои `cultureKey` / `resource_type` до загрузки страницы. В этом случае выводите **до** `favorites.js`.

Лексикон и конфиг собирает PHP-хелпер. Чанк `tplMs3fLexiconScript` в пакете есть, но в выводе не участвует.

## Параметры

| Параметр | Описание | По умолчанию |
|----------|----------|--------------|
| **cultureKey** | Язык лексикона (`ru, en`) | из контекста или `cultureKey` |
| **resource_type** | Тип ресурсов по умолчанию | `products` |

`maxItems` и `storageType` берутся из системных настроек `ms3favorites.max_items`, `ms3favorites.storage_type`.

При **register_global_config = Да** (по умолчанию) сниппет в шаблоне не нужен: конфиг выводит плагин. Без лексикона (ни плагином, ни сниппетом) JS использует запасные русские фразы.

## Использование

::: code-group

```fenom
{'ms3fLexiconScript' | snippet}
```

```modx
[[!ms3fLexiconScript]]
```

:::

Для мультиязычного сайта подключение лексикона обязательно.

## Ключи в window.ms3fLexicon

| Ключ | Описание |
|------|----------|
| `empty` | Пустой список |
| `added` | Добавлено в избранное |
| `removed` | Удалено из избранного |
| `list_cleared` | Список очищен |
| `added_resource`, `removed_resource` | Добавление/удаление страницы с её названием |
| `add_tooltip` | Подсказка добавления |
| `remove_tooltip` | Подсказка удаления |
| `list_default`, `list_gifts`, `list_plans` | Названия списков |
| `select_list` | Выбор списка |
| `share_title`, `share_copy_link`, `share_success` | Шаринг |
| `share_login_required` | Шаринг требует входа |
| `copy_to_my_list` | Кнопка «Скопировать в мой список» |
| `add_to_cart`, `add_selected` | Корзина |
| `select_all`, `select_item` | Выбор чекбоксов |
| `cart_success`, `cart_error` | Результат добавления в корзину |
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
| `siteUrl` | Базовый URL сайта из `site_url` (для шаринга и запасного URL) |
| `commentsEnabled` | Включены ли заметки к элементам |
| `iziToastBaseUrl` | Базовый URL каталога vendor iziToast (для ленивой загрузки CSS/JS) |

Ключи `mfilterContainer`, `refreshEvents`, `mfilterMutationFallback` сниппет не выставляет. Колбэки `onAdd`, `onRemove`, `notify`, `showToast` задаёт автор темы до загрузки `favorites.js`. См. [Подключение на сайте](../frontend) и [Интеграцию](../integration).
