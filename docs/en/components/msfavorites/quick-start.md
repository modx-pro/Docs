# Quick start

Requires MODX **2.3** or higher and PHP **5.4** or higher.

## Features

- Works with **any object types**. Object type is set in the `type` attribute.
- Works with **any users**. For logged-in users the identifier is user id; for guests, session id.

Anonymous users' favorites are flagged with `anon`.

## Installation

- [Add our repository](https://modstore.com)
- Install **pdoTools** — library for DB and output; required by many components
- Install **msFavorites**

You can see a demo at [msfavorites.vgrish.ru](http://msfavorites.vgrish.ru) and test on [our hosting](https://modhost.pro); these extras can be selected when creating a site.

[![](https://file.modx.pro/files/e/c/0/ec042ee4f64328e2b2b4078965b9419ds.jpg)](https://file.modx.pro/files/e/c/0/ec042ee4f64328e2b2b4078965b9419d.png)

## Connecting

You can use msFavorites anywhere on the page. Call snippet `msFavorites.initialize` once and add the markup to the elements you need.

[example](http://msfavorites.vgrish.ru#ex-connect)

```modx
[[!msFavorites.initialize]]

<a class="msfavorites"
  data-click
  data-data-list="default"
  data-data-type="resource"
  data-data-key="9"
>
  <span class="msfavorites-text-add">add</span>
  <span class="msfavorites-text-remove">remove</span>
  <br>
  star: <span class="msfavorites-total-user">0</span>
  <br>
  total: <span class="msfavorites-total">0</span>
</a>
```
