---
title: Language switching
description: getLanguageList and makeLocalizedUrl snippets, languages.tpl chunks
---

# Language switching

The `getLanguageList` snippet outputs the language list on the front end. Without the `pdoFetch` service the snippet does not run.

Chunks `languages.tpl` and `languages.dropdown.tpl` ship with the package.

The name `getLocales` from older Localizator (MODX 2) examples is not registered.

## getLanguageList parameters

| Name | Default | Description |
| --- | --- | --- |
| **outputMode** | `list` | `list` or `dropdown` |
| **showActive** | Yes | Affects list item CSS only: for the current language `activeClass` is appended to `rowClass`. In the dropdown the current item is always selected via `is_current` |
| **activeClass** | `active` | CSS class for the active list item |
| **outerClass** | `languages` | Wrapper CSS class |
| **rowClass** | empty | Extra CSS class for an item. With `showActive`, `activeClass` is appended for the current language |
| **tpl** | `languages.tpl` / `languages.dropdown.tpl` | Chunk. Without `tpl`, chosen by `outputMode` |
| **pageId** | current | Page ID for the link. Absolute URL (`server_protocol` + `http_host`). For the site start page this is the language root |
| **sortby** | `rank` | Sort field |
| **sortdir** | `ASC` | Sort direction |
| **where** | active languages | Selection filter. A custom `where` replaces `active => 1`, it does not merge with it |

An empty language list prints nothing. In a custom chunk you can also use `key`, `cultureKey`, `http_host`, `description`, `active`, `rank`, `id`.

## Template output

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

## languages.tpl chunk

```fenom
<ul class="{$outerClass}">
  {foreach $languages as $language}
    <li class="{$language.rowClass}"><a href="{$language.url}">{$language.name}</a></li>
  {/foreach}
</ul>
```

## languages.dropdown.tpl chunk

```fenom
<select class="{$outerClass}" onchange="if(this.value) window.location.href=this.value">
  {foreach $languages as $language}
    <option value="{$language.url}"{if $language.is_current} selected{/if}>{$language.name}</option>
  {/foreach}
</select>
```

## Resource URL in another language

The `makeLocalizedUrl` snippet builds a URL using the language `http_host`.

| Name | Default | Description |
| --- | --- | --- |
| **id** | — | Resource ID. Empty id returns an empty string |
| **language** | current | Language key. No active row with that key: plain `makeUrl` without the language host |
| **scheme** | `-1` | `-1` relative, `0` absolute, `1` http, `2` https |
| **fullUrl** | No | Full URL with domain. With `scheme` `-1` and `fullUrl` false the domain is stripped; the path prefix from `http_host` remains. `fullUrl` true keeps a full URL even with `scheme` `-1` |

::: code-group

```fenom
<a href="{'!makeLocalizedUrl' | snippet : ['id' => $id, 'language' => 'en', 'fullUrl' => true]}">{$pagetitle}</a>
```

```modx
<a href="[[!makeLocalizedUrl? &id=`[[+id]]` &language=`en` &fullUrl=`1`]]">[[+pagetitle]]</a>
```

:::
