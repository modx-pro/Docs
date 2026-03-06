---
title: Быстрый старт
---
# Быстрый старт

Минимальный сценарий, чтобы за 5-10 минут включить `mxQuickView` на странице каталога.

## 1. Установите пакет

1. Установите `mxQuickView` в `Extras -> Installer`.
2. Очистите кэш MODX.
3. Проверьте системные настройки namespace `mxquickview`.

## 2. Подключите инициализацию в шаблоне

::: code-group

```modx
[[!mxQuickView.initialize]]
```

```fenom
{'!mxQuickView.initialize'|snippet}
```

:::

## 3. Добавьте кнопку быстрого просмотра

::: code-group

```modx
<button type="button"
  data-mxqv-click
  data-mxqv-mode="modal"
  data-mxqv-action="chunk"
  data-mxqv-element="mxqv_product"
  data-mxqv-id="[[+id]]"
  data-mxqv-title="[[+pagetitle]]">
  Быстрый просмотр
</button>
```

```fenom
<button type="button"
  data-mxqv-click
  data-mxqv-mode="modal"
  data-mxqv-action="chunk"
  data-mxqv-element="mxqv_product"
  data-mxqv-id="{$id}"
  data-mxqv-title="{$pagetitle}">
  Быстрый просмотр
</button>
```

:::

## 4. Проверьте whitelist

- В `mxquickview_allowed_chunk` должен быть `mxqv_product` (или ваш чанк).
- Для быстрого просмотра обычных ресурсов добавьте `mxqv_resource`.
- Для `snippet`/`template` аналогично заполните `mxquickview_allowed_snippet` и `mxquickview_allowed_template`.

## 5. Проверьте результат

- Клик по кнопке открывает quick view.
- Контент приходит с `assets/components/mxquickview/connector.php`.
- При ошибке показывается `message` из JSON.

## Что дальше

- [Системные настройки](settings)
- [Интеграция на сайт](integration)
- [Типы рендера](types)
- [API и интерфейсы](api)
