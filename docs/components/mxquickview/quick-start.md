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

```fenom
{'!mxQuickView.initialize'|snippet}
```

```modx
[[!mxQuickView.initialize]]
```

:::

## 3. Добавьте кнопку быстрого просмотра в карточке

::: code-group

```html [Fenom]
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

```html [MODX]
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

:::

## 4. Проверьте whitelist

В настройке `mxquickview_allowed_chunk` должен быть разрешён `mxqv_product` (или ваш кастомный чанк).

## 5. Проверьте результат

- Клик по кнопке открывает модалку.
- Контент приходит с `assets/components/mxquickview/connector.php`.
- При ошибке в модалке показывается `message` из JSON.

## Что дальше

- [Системные настройки](settings)
- [Типы рендера](types)
- [Интеграция на сайт](integration)
- [API и интерфейсы](api)
