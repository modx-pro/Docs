---
title: Сниппет msCurrency
description: Переключатель валют на витрине MiniShop3
---

# Сниппет msCurrency

Выводит переключатель активных валют. При смене валюты JS отправляет POST на `web/currency/set`, плагин обновляет плейсхолдеры `msc.*`.

## Параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `tpl` | `tpl.msCurrency` | Чанк переключателя. Пустая строка — отладочная таблица плейсхолдеров |
| `frontendCss` | — | Свой CSS только для этого вызова. Иначе берётся `mscurrency_frontend_css` |
| `frontendJs` | — | Свой JS только для этого вызова. Иначе берётся `mscurrency_frontend_js` |

CSS/JS по умолчанию подключает плагин `mscurrency_frontend` из настроек `mscurrency_frontend_css` / `mscurrency_frontend_js`.

## Переопределение CSS/JS в вызове

Если на одной странице нужны другие файлы, передайте пути в параметрах сниппета:

::: code-group

```fenom
{'!msCurrency' | snippet : [
  'tpl' => 'tpl.msCurrency',
  'frontendCss' => 'assets/custom/msc.css',
  'frontendJs' => 'assets/custom/msc.js'
]}
```

```modx
[[!msCurrency?
  &tpl=`tpl.msCurrency`
  &frontendCss=`assets/custom/msc.css`
  &frontendJs=`assets/custom/msc.js`
]]
```

:::

## В чанке tpl.msCurrency

Сниппет передаёт массив `currencies` и плейсхолдер `msc.currencies`:

| Поле строки | Описание |
|-------------|----------|
| `id` | ID валюты |
| `code` | ISO-код |
| `name` | Название |
| `val` | Эффективный курс |
| `selected` | `true` для текущей валюты |

## Вызов

::: code-group

```fenom
{'!msCurrency' | snippet : ['tpl' => 'tpl.msCurrency']}
```

```modx
[[!msCurrency? &tpl=`tpl.msCurrency`]]
```

:::

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
