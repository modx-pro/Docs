---
title: msBundles.initialize
description: Подключение CSS и JS msBundles на витрине
---

# msBundles.initialize

Подключает ассеты витрины по порядку: `msbundles.css`, `msbundles-helpers.js`, `msbundles-cart.js`, `msbundles.js`. Перед скриптами выводит `window.msbundlesConfig` и `window.msbundlesLexicon`.

Параметров нет. Вызывайте в `<head>` на страницах с карточками комплектов и корзиной. Без него кнопки добавления и стили не работают.

## Пример

::: code-group

```fenom
{'!msBundles.initialize' | snippet}
```

```modx
[[!msBundles.initialize]]
```

:::

## Конфиг

| Ключ | По умолчанию | Назначение |
| --- | --- | --- |
| `autoBind` | `true` | Автопривязка обработчиков после загрузки |
| `apiBaseUrl` | `''` | Префикс API, если роутер miniShop3 не на дефолтном пути |
| `maxBundleQuantity` | из настройки | Лимит поля «Комплектов» |
| `calculateDebounceMs` | `350` | Пауза перед пересчётом цены при вводе количества |
| `confirmRemoveBundle` | `false` | Диалог перед «Удалить комплект». По умолчанию без диалога, как у товара miniShop3 |

Свой конфиг задайте до вызова сниппета. Сниппет объединит его через `Object.assign`:

```html
<script>window.msbundlesConfig = { confirmRemoveBundle: true };</script>
```

Разбор корзины, data-атрибутов и темы: [Вывод на сайте](/components/msbundles/frontend#подключение-css-и-js). Карточки: [msBundles](msBundles).
