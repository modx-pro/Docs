---
title: GeoLocation2Modal
description: Модалка подтверждения и смены города Bootstrap 5
---

# GeoLocation2Modal

Рисует модальное окно Bootstrap 5 и строку «Ваш город» под ним. Работает с сессией, CSRF и [action.php](../api-action). На странице также выставляет плейсхолдеры `gl2_*` (их видят [GeoLocation2Current](GeoLocation2Current) и Fenom).

Перед модалкой подключите [GeoLocation2Initialize](GeoLocation2Initialize) или передайте `includeAssets=1` (старый вариант, всё в одном сниппете).

## Параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `tpl` | `tpl.GeoLocation2.modal` | Чанк модалки + тулбар |
| `itemTpl` | `tpl.GeoLocation2.modal.item` | Строка города в списке |
| `modalShow` | `1` | Автопоказ при первом визите (`data-gl2-modal-show`) |
| `includeAssets` | `0` | Встроить CSS/JS в вывод этого сниппета |
| `loadBootstrap` | `0` | Bootstrap 5 CDN (с `includeAssets=1`) |
| `preferRealWhenDefault` | `1` | В вопросе показать имя из SxGeo, если сейчас город по умолчанию |
| `dismissSetsDefault` | `1` | Закрытие крестиком → город default (`data-gl2-dismiss-default`) |
| `modalId` | `geolocation2Modal` | HTML `id` модалки |
| `unknownCityLabel` | лексикон | Подпись, если город не определён |
| `defaultCityLabel` | лексикон | Подпись города по умолчанию |
| `toPlaceholder` | `0` | Вывод в плейсхолдер |

## Вызов

::: code-group

```modx
[[!GeoLocation2Initialize]]
[[!GeoLocation2Modal? &modalShow=`1`]]
[[!GeoLocation2Current]]
```

```fenom
{'!GeoLocation2Initialize' | snippet : ['loadBootstrap' => 0]}
{'!GeoLocation2Modal' | snippet : ['modalShow' => 1, 'dismissSetsDefault' => 1]}
{'!GeoLocation2Current' | snippet}
```

:::

## Что делает на странице

1. **Шаг confirm** — «Ваш город — **Москва**?» Кнопки «Да» (`action=confirm`) и «Изменить» (переход к списку).
2. **Шаг list** — поле поиска и список городов. Поиск и подгрузка идут через `action=search`, чтобы работало на закэшированных страницах. В HTML при первом рендере список тоже заполняется из БД (fallback без JS).
3. **Тулбар** под модалкой — текущий город и ссылка `.gl2-open-modal` для повторного открытия.

При `modalShow=1` и `gl2_confirmed=0` скрипт открывает модалку после загрузки.

## Фрагмент разметки

Упрощённо, из `tpl.GeoLocation2.modal`:

```html
<div class="modal fade geolocation2-modal" id="geolocation2Modal"
    data-gl2-root
    data-gl2-action-url="/assets/components/geolocation2/action.php"
    data-gl2-csrf="…"
    data-gl2-modal-show="1"
    …>
  <div class="modal-body">
    <div id="gl2-step-confirm">
      <p>… — <strong class="gl2-display-city">Москва</strong>?</p>
      <button class="btn btn-primary gl2-action-yes">Да</button>
      <button class="btn btn-outline-secondary gl2-action-change">Изменить</button>
    </div>
    <div id="gl2-step-list" class="d-none">…</div>
  </div>
</div>
<p class="geolocation2-toolbar">
  <strong class="gl2-toolbar-city">Москва</strong>
  <a href="#" class="gl2-open-modal">Изменить</a>
</p>
```

## POST в action.php

| Действие | Когда |
|----------|--------|
| `confirm` | «Да» на шаге confirm |
| `save` | Выбор города из списка |
| `dismiss` | Закрытие крестиком или backdrop |

В каждом POST нужен `csrf` из `data-gl2-csrf` и заголовок `X-Requested-With: XMLHttpRequest`.

## Чанк строки города

`tpl.GeoLocation2.modal.item`:

```html
<button type="button" class="list-group-item gl2-pick-city" data-city-id="8">
  Казань <span class="text-muted">(Kazan)</span>
</button>
```

## Legacy: `includeAssets=1`

Подключает CSS/JS прямо из Modal, без Initialize. Для новых сайтов лучше разделить Initialize и Modal.

См. [GeoLocation2Initialize](GeoLocation2Initialize), [GeoLocation2Current](GeoLocation2Current), [FAQ](../faq).
