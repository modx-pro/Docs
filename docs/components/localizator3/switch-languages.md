---
title: Переключение языков
description: Сниппеты getLanguageList и makeLocalizedUrl, чанки languages.tpl
---

# Переключение языков

Сниппет `getLanguageList` отдаёт список языков на витрине. Без сервиса `pdoFetch` сниппет не выполняется.

Чанки `languages.tpl` и `languages.dropdown.tpl` входят в пакет.

Имя `getLocales` из старых примеров Localizator для MODX 2 не регистрируется.

## Параметры getLanguageList

| Название | По умолчанию | Описание |
| --- | --- | --- |
| **outputMode** | `list` | `list` или `dropdown` |
| **showActive** | Да | Меняет только CSS пункта списка: при текущем языке к `rowClass` дописывается `activeClass`. В выпадающем списке текущий пункт выбран всегда по `is_current` |
| **activeClass** | `active` | CSS-класс активного пункта списка |
| **outerClass** | `languages` | CSS-класс обёртки |
| **rowClass** | пусто | Дополнительный CSS-класс пункта. При `showActive` у текущего языка к нему дописывается `activeClass` |
| **tpl** | `languages.tpl` / `languages.dropdown.tpl` | Чанк. Без `tpl` выбирается по `outputMode` |
| **pageId** | текущий | ID страницы для ссылки. Ссылка абсолютная (`server_protocol` + `http_host`). У стартовой страницы это корень языка |
| **sortby** | `rank` | Поле сортировки |
| **sortdir** | `ASC` | Направление |
| **where** | активные языки | Условие выборки. Свой `where` подменяет фильтр `active => 1`, а не дополняет его |

Пустой список языков ничего не печатает. В свой чанк, кроме полей листинга, можно передать `key`, `cultureKey`, `http_host`, `description`, `active`, `rank`, `id`.

## Вывод в шаблоне

::: code-group

```fenom
{'!getLanguageList' | snippet}
{'!getLanguageList' | snippet : [
  'outputMode' => 'dropdown',
  'activeClass' => 'current',
  'outerClass' => 'languages',
]}
```

```modx
[[!getLanguageList]]
[[!getLanguageList?
  &outputMode=`dropdown`
  &activeClass=`current`
  &outerClass=`languages`
]]
```

:::

## Чанк languages.tpl

```fenom
<ul class="{$outerClass}">
  {foreach $languages as $language}
    <li class="{$language.rowClass}"><a href="{$language.url}">{$language.name}</a></li>
  {/foreach}
</ul>
```

## Чанк languages.dropdown.tpl

```fenom
<select class="{$outerClass}" onchange="if(this.value) window.location.href=this.value">
  {foreach $languages as $language}
    <option value="{$language.url}"{if $language.is_current} selected{/if}>{$language.name}</option>
  {/foreach}
</select>
```

## Адрес ресурса на другом языке

Сниппет `makeLocalizedUrl` собирает URL с учётом `http_host` языка.

| Название | По умолчанию | Описание |
| --- | --- | --- |
| **id** | — | ID ресурса. Пустой id даёт пустую строку |
| **language** | текущий | Ключ языка. Нет активной строки с этим ключом: обычный `makeUrl` без host языка |
| **scheme** | `-1` | `-1` относительный, `0` полный, `1` http, `2` https |
| **fullUrl** | Нет | Полный URL с доменом. При `scheme` `-1` и `fullUrl` false домен отрезается, префикс пути из `http_host` остаётся. `fullUrl` true даёт полный URL даже при `scheme` `-1` |

::: code-group

```fenom
<a href="{'!makeLocalizedUrl' | snippet : ['id' => $id, 'language' => 'en', 'fullUrl' => true]}">{$pagetitle}</a>
```

```modx
<a href="[[!makeLocalizedUrl? &id=`[[+id]]` &language=`en` &fullUrl=`1`]]">[[+pagetitle]]</a>
```

:::
