---
title: Сниппет msCurrency
description: Переключатель валют на витрине MiniShop3 — ссылки, select, компактный вид
---

# Сниппет msCurrency

Выводит переключатель активных валют. При смене валюты JS отправляет POST на `web/currency/set`, плагин обновляет плейсхолдеры `msc.*`.

## Параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `tpl` | `tpl.msCurrency` | Чанк: `tpl.msCurrency` (ссылки), `tpl.msCurrencySelect` (`<select>`), `tpl.msCurrencyCompact` (компакт). Пустая строка — отладочная таблица плейсхолдеров |
| `compact` | — | `1` — то же, что `tpl.msCurrencyCompact` (если `tpl` не переопределён) |

CSS и JS переключателя подключает плагин `mscurrency_frontend` из системных настроек `mscurrency_frontend_css` и `mscurrency_frontend_js`. Пути меняют в **Системные настройки → mscurrency**, а не в вызове сниппета.

## Варианты вывода

### Ссылки (по умолчанию)

::: code-group

```fenom
{'!msCurrency' | snippet : ['tpl' => 'tpl.msCurrency']}
```

```modx
[[!msCurrency? &tpl=`tpl.msCurrency`]]
```

:::

### Выпадающий список

::: code-group

```fenom
{'!msCurrency' | snippet : ['tpl' => 'tpl.msCurrencySelect']}
```

```modx
[[!msCurrency? &tpl=`tpl.msCurrencySelect`]]
```

:::

### Компактный вид

Код ↔ символ в шапке без перезагрузки layout; состояние компактного вида в `sessionStorage`:

::: code-group

```fenom
{'!msCurrency' | snippet : ['compact' => 1]}
```

```modx
[[!msCurrency? &compact=`1`]]
```

:::

## AJAX-переключение

При **`mscurrency_ajax_switch=1`** смена валюты обновляет `[data-msc-price]` на странице без reload. На карточке и в каталоге используйте `msCurrencyPrice` с **`pid > 0`**.

При выключенном AJAX или ошибке запроса — полная перезагрузка страницы (fallback).

Подробнее: [Интеграция — AJAX](../integration#ajax-переключение).

## В чанке tpl.msCurrency

Сниппет передаёт массив `currencies` и плейсхолдер `msc.currencies`:

| Поле строки | Описание |
|-------------|----------|
| `id` | ID валюты |
| `code` | ISO-код |
| `name` | Название |
| `val` | Эффективный курс |
| `selected` | `true` для текущей валюты |
| `compact_label` | Подпись для компактного вида (символ или код) |

## Отладка плейсхолдеров

::: code-group

```fenom
{'!msCurrency' | snippet : ['tpl' => '']}
```

```modx
[[!msCurrency? &tpl=``]]
```

:::

Выводит таблицу текущих значений `msc.*` / `msmc.*`.

## См. также

- [msCurrencyPrice](msCurrencyPrice)
- [Интеграция](../integration#переключатель-валют)
- [Системные настройки](../settings#витрина)
