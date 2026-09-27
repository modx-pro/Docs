---
title: Быстрый старт
---
# Быстрый старт

Включите `mxQuickView` на странице каталога.

## 1. Установите пакет

1. Установите `mxQuickView` в `Extras -> Installer`.
2. Очистите кэш MODX.
3. Проверьте системные настройки namespace `mxquickview` (белый список, при Fenom-чанках — pdoTools 3.x).

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

## 4. Проверьте белый список

- В `mxquickview_allowed_chunk` должен быть `mxqv_product` (или ваш чанк).
- Для обычных ресурсов добавьте `mxqv_resource`.
- Для `snippet`/`template` заполните `mxquickview_allowed_snippet` и `mxquickview_allowed_template`.

## 5. Проверьте результат

- Клик по кнопке открывает quick view.
- Контент приходит с `assets/components/mxquickview/connector.php`.
- При ошибке показывается `message` из JSON.

## Что дальше

- [Системные настройки](/components/mxquickview/settings)
- [Интеграция на сайт](/components/mxquickview/integration)
- [Типы рендера](/components/mxquickview/types)
- [API и интерфейсы](/components/mxquickview/api)
