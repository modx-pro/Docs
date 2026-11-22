---
title: Сниппеты
---
# Сниппеты mxQuickView

Один сниппет:

- [mxQuickView.initialize](/components/mxquickview/snippets/mxquickview-initialize) — CSS/JS и HTML встроенной модалки. Параметры `debug` и `loadingText` не в свойствах transport, но работают в вызове.

## Плейсхолдеры чанков поставки

Чанки `mxqv_product` и `mxqv_resource` отрисовываются типом `chunk` и уходят в тот же контейнер, который готовит сниппет. Оба написаны на Fenom.

### `mxqv_product`

| Плейсхолдер | Источник |
| --- | --- |
| `{$id}` | ID ресурса |
| `{$pagetitle}` | поле ресурса |
| `{$article}` | артикул из `msProductData`, если MiniShop3 установлен |
| `{$description}` | описание товара |
| `{$price}` | цена |
| `{$old_price}` | старая цена |
| `{$thumb}` | превью из `msProductData`; если пусто, подставляется `[[++assets_url]]components/minishop3/img/web/ms3_small.png` |
| `{$assets_url}` | системная настройка `assets_url` |
| `{$has_variants}` | `true` или `false` |
| `{$variants_html}` | HTML выбора варианта от `msProductVariants` |
| `{$variants_json}` | JSON вариантов: `id`, `sku`, `price`, `old_price`, `count`, `file_id`, `options` |

Для ресурса, который не `msProduct`, `has_variants` равна `false`, `variants_html` пустая, `variants_json` равен `[]`. JSON в атрибуте экранируется фильтром `escape:'html'`.

### `mxqv_resource`

| Плейсхолдер | Источник |
| --- | --- |
| `{$id}` | ID ресурса |
| `{$pagetitle}` | заголовок |
| `{$introtext}` | аннотация |
| `{$content}` | содержимое ресурса |

::: tip
Строки в чанках поставки зашиты по-русски: «Арт. » в `mxqv_product`, «В корзину» и «Подробнее» в обоих чанках. Лексикон их не покрывает, свои чанки переводите сами.
:::
