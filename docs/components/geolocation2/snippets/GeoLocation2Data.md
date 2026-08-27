---
title: GeoLocation2Data
description: Контакты и адрес из gl_data для города или объекта
---

# GeoLocation2Data

Выводит строки таблицы `gl_data`: email, телефон, адрес, картинка, alt-имя, JSON в `properties`. Данные задаются во вкладке **Данные** менеджера GeoLocation2.

## Параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `tpl` | `tpl.GeoLocation2.data.item` | Чанк одной записи |
| `sortby` | `id` | `id`, `class`, `identifier`, `name_alt`, `resource`, `email`, `default` |
| `sortdir` | `DESC` | `ASC` / `DESC` |
| `limit` | `0` | Лимит; `0` — без лимита |
| `class` | *(пусто)* | `GlCountry`, `GlRegion`, `GlCity` |
| `identifier` | *(пусто)* | ID объекта в таблице класса |
| `onlyDefault` | `0` | Только `default=1` |
| `forCurrent` | `0` | Записи для текущего города из сессии |
| `liveUpdate` | как `forCurrent` | Обёртка `[data-gl2-data-live]` + обновление через API |
| `outputSeparator` | перевод строки | Между строками |
| `toPlaceholder` | *(пусто)* | Плейсхолдер вместо вывода |

## Режимы

### Все записи (как в менеджере)

::: code-group

```modx
[[!GeoLocation2Data? &limit=`0` &sortby=`id` &sortdir=`DESC`]]
```

```fenom
{'!GeoLocation2Data' | snippet : ['limit' => 0]}
```

:::

Вывод — строки `<tr>` чанка `tpl.GeoLocation2.data.item` (удобно внутри `<table>`).

### Текущий город (`forCurrent=1`)

Берёт `gl2_current_id` из той же сессии, что [GeoLocation2Modal](GeoLocation2Modal).

::: code-group

```modx
[[!GeoLocation2Data? &forCurrent=`1` &tpl=`tpl.GeoLocation2.data.current`]]
```

```fenom
{'!GeoLocation2Data' | snippet : [
  'forCurrent' => 1,
  'tpl' => 'tpl.GeoLocation2.data.current'
]}
```

:::

### Фильтр по городу

Контакты только для Москвы (`GlCity`, id=1):

::: code-group

```modx
[[!GeoLocation2Data? &class=`GlCity` &identifier=`1`]]
```

```fenom
{'!GeoLocation2Data' | snippet : ['class' => 'GlCity', 'identifier' => 1]}
```

:::

## Пример вывода

**Карточка** `tpl.GeoLocation2.data.current`:

```html
<div class="gl2-data-current gl2-qa-box" data-gl2-data-id="3">
  <dl class="gl2-qa-kv">
    <dt>Класс / ID локации</dt>
    <dd>GlCity · 1 (Москва, офис)</dd>
    <dt>Email / телефон</dt>
    <dd>info@example.ru · +7 (495) 000-00-00</dd>
    <dt>Адрес</dt>
    <dd>ул. Пример, 1</dd>
    …
  </dl>
</div>
```

**Строка таблицы** `tpl.GeoLocation2.data.item`:

```html
<tr class="gl2-data-row" data-gl2-data-id="3" data-gl2-data-class="GlCity" data-gl2-data-identifier="1">
  <td>3</td>
  <td>GlCity</td>
  <td>1</td>
  <td>Москва, офис</td>
  …
</tr>
```

Дополнительные плейсхолдеры: `default_label` (`Да`/`Нет`), `default_pill_class`, `image_display`, `properties_json`.

## Live-обновление

При `forCurrent=1` по умолчанию `liveUpdate=1`. Блок оборачивается:

```html
<div data-gl2-data-live data-gl2-data-tpl="tpl.GeoLocation2.data.current">
  … HTML карточки …
</div>
```

После смены города в модалке `modal.js` вызывает `GET action=data` и подменяет innerHTML без перезагрузки.

Отключить:

::: code-group

```modx
[[!GeoLocation2Data? &forCurrent=`1` &liveUpdate=`0`]]
```

```fenom
{'!GeoLocation2Data' | snippet : ['forCurrent' => 1, 'liveUpdate' => 0]}
```

:::

## Типовая вёрстка

::: code-group

```modx
<table class="table">
  <thead><tr><th>ID</th><th>Email</th><th>Телефон</th></tr></thead>
  <tbody>
    [[!GeoLocation2Data? &class=`GlCity` &identifier=`[[+city_id]]`]]
  </tbody>
</table>
```

```fenom
<table class="table">
  <tbody>
    {'!GeoLocation2Data' | snippet : ['forCurrent' => 1]}
  </tbody>
</table>
```

:::

См. [Web API → action=data](../api-action), [GeoLocation2Modal](GeoLocation2Modal).
