---
title: VueTools API Composables
description: useLexicon, useModx, usePermission, useApi, usePrimeVueLocale, useTheme
---

# API Composables

Import each composable from its Import Map key (`@vuetools/useApi`, etc.). `index.min.js` exists in assets; there is no `@vuetools/index` key in the map.

## useLexicon

```javascript
import { useLexicon } from '@vuetools/useLexicon'

const { _, has, getByPrefix } = useLexicon()
```

Your dictionary overrides `window.MODx.lang`:

```javascript
const { _ } = useLexicon({ lexicon: { my_key: 'Value' } })
```

| Method | Returns | Description |
|--------|---------|-------------|
| `_(key, params?)` | `string` | Lexicon value. Missing key: returns `key` |
| `has(key)` | `boolean` | Key in `options.lexicon` or `MODx.lang` |
| `getByPrefix(prefix)` | `object` | All keys with the prefix |
| `load(topics)` | `Promise<void>` | **Not implemented**: logs a console warning, does not load topics |

`_` replaces `[[+name]]`, `{name}`, and `:name`. The `:name` form has no word boundary: matches inside longer text and values with `$&` / `$'` / `$$` break the string ([issue #67](https://github.com/modx-pro/vueTools/issues/67)). `[[+name]]` and `{name}` do not have this gap.

```javascript
_('my_component_title')                       // "My component"
_('my_component_welcome', { name: 'John' })   // from "Hello, {name}!" → "Hello, John!"
```

Load topics in the controller:

```php
public function getLanguageTopics()
{
    return ['mycomponent:default'];
}
```

## useModx

```javascript
import { useModx } from '@vuetools/useModx'

const { config, siteId, isManager, getSetting } = useModx()
```

| Property / method | Type | Description |
|-------------------|------|-------------|
| `config` | `ComputedRef<object>` | `MODx.config` |
| `user` | `ComputedRef<object>` | `MODx.user` |
| `siteId` | `ComputedRef<string>` | Auth token `MODx.siteId` |
| `hasPermission(key)` | `boolean` | `MODx.perm[key] === true` |
| `getSetting(key, default?)` | `*` | Value from `MODx.config` |
| `getManagerUrl(path?)` | `string` | Manager URL; without config → `/manager/` |
| `getAssetsUrl(component)` | `string` | `{assets}components/{name}/`; otherwise `/assets/` |
| `getConnectorUrl(component)` | `string` | `{assets}components/{name}/connector.php` |
| `getContextKey()` | `string` | Context; otherwise `web`. Without MODx → `null` on related checks |
| `isManager()` | `boolean` | Code runs in the manager |
| `fireEvent(name, data?)` | `void` | Calls `MODx.fireEvent` if it is a function. Otherwise no-op |

`config`, `user`, and `siteId` are computed. In template: `config.assets_url`. In `<script>`: `config.value.assets_url`.

## usePermission

Permissions from `window.MODx.perm`. Strict check: value must be `=== true`.

```javascript
import { usePermission } from '@vuetools/usePermission'

const { can, canAny, canAll } = usePermission()
```

| Method | Returns | Description |
|--------|---------|-------------|
| `can(key)` | `boolean` | Permission `key` present |
| `canAny(keys)` | `boolean` | Any of the permissions |
| `canAll(keys)` | `boolean` | All permissions |
| `getAll()` | `object` | Reference to `MODx.perm` (or `{}`). Not a clone: mutating it changes page permissions |

### Shortcuts → MODX key

| Method | `MODx.perm` key |
|-------|------------------|
| `canCreateResource()` | `new_document` |
| `canEditResource()` | `edit_document` |
| `canDeleteResource()` | `delete_document` |
| `canPublishResource()` | `publish_document` |
| `canUnpublishResource()` | `unpublish_document` |
| `canViewUsers()` | `view_user` |
| `canEditUsers()` | `edit_user` |
| `canDeleteUsers()` | `delete_user` |
| `canViewElements()` | `view_element` |
| `canEditElements()` | `edit_element` |
| `canDeleteElements()` | `delete_element` |
| `canViewSystemSettings()` | `settings` |
| `canFlushSessions()` | `flush_sessions` |
| `canClearCache()` | `empty_cache` |
| `canViewFiles()` | `file_view` |
| `canUploadFiles()` | `file_upload` |
| `canDeleteFiles()` | `file_remove` |
| `canInstallPackages()` | `packages` |

```javascript
const { can, canClearCache } = usePermission()
const canEdit = computed(() => can('my_component_edit'))
```

## useApi

HTTP client for the standard MODX connector (`?action=processor/path`).

```javascript
import { useApi } from '@vuetools/useApi'

const { get, post, put, delete: del, request, buildUrl } = useApi()
```

### Constructor options

| Option | Default | Description |
|--------|---------|-------------|
| `baseUrl` | `MODx.config.connector_url`, else `/connectors/` | Connector base URL |
| `authToken` | `MODx.siteId` | Token for `HTTP_MODAUTH` |

Fallback `/connectors/` without `index.php` does not fit every site. Set `baseUrl` from `MODx.config.connector_url`.

### Methods

| Method | Description |
|--------|-------------|
| `get(action, params?)` | GET: params in query via `String(value)` (array → `"a,b"`, object → `"[object Object]"`) |
| `post(action, params?, options?)` | POST: FormData (`key[i]` for arrays, JSON string for objects) unless `{ json: true }` |
| `put(action, params?, options?)` | PUT (see limitation below) |
| `delete(action, params?)` | DELETE; no third `options` (unlike `put`) |
| `request(action, params?, options?)` | Generic; `options.method`, `options.json`, headers |
| `buildUrl(action, params?)` | URL without sending |

```javascript
const data = await get('security/user/getlist', { limit: 20 })
const users = data.results // list in results, not the full response
await post('security/user/create', { username: 'newuser' })
```

Adds `HTTP_MODAUTH` to the query. On `success: false` throws with `data`. HTTP status outside 2xx: plain `Error` without `data`.

::: warning Stock connector and request body
Core builds processor properties from `$_GET` + `$_POST`. PHP does not fill `$_POST` for PUT/DELETE or parse `application/json` into `$_POST`.

For the standard connector, **GET** and **POST without `{ json: true }`** (FormData) are reliable. `put` / `delete` and `{ json: true }` often do not reach the processor. See [issue #52](https://github.com/modx-pro/vueTools/issues/52). Custom `headers` may overwrite `Accept` ([#63](https://github.com/modx-pro/vueTools/issues/63)).
:::

::: warning Custom router
`useApi` targets the standard connector. Custom router: local `request.js`. See [Custom API client](integration#own-api-client).
:::

## usePrimeVueLocale

PrimeVue locales: DataTable filters and DatePicker.

```javascript
import { getPrimeVueLocale, usePrimeVueLocale } from '@vuetools/usePrimeVueLocale'
import { PrimeVue } from 'primevue'
import { getActiveTheme } from '@vuetools/useTheme'

app.use(PrimeVue, { ...getActiveTheme(), locale: getPrimeVueLocale() })

// or
const { locale } = usePrimeVueLocale() // same as getPrimeVueLocale() at call time
```

| Function | Returns | Description |
|----------|---------|-------------|
| `getPrimeVueLocale(cultureKey?)` | `object` | Locale by code |
| `usePrimeVueLocale({ cultureKey? })` | `{ locale, getPrimeVueLocale }` | Wrapper: `locale` fixed at call time |

Code chain: argument → `MODx.cultureKey` → `MODx.config.cultureKey` → `en`. Tag split on `-`/`_` and lowercased (`ru-RU` → `ru`). Codes: `de`, `en`, `es`, `fr`, `pl`, `ru`, `uk`. Unknown → `en`. Locale is not reactive: on language change without reload pass a new `cultureKey` or recreate the app.

## useTheme

More: [Theme](theme).

```javascript
import { getActiveTheme, getThemeName, useTheme } from '@vuetools/useTheme'
import { PrimeVue } from 'primevue'

app.use(PrimeVue, getActiveTheme())
```

| Function | Returns | Description |
|----------|---------|-------------|
| `getActiveTheme(name?)` | `{ theme }` | Fragment for `app.use(PrimeVue, …)` |
| `getThemeName(name?)` | `string` | `aura` or `modx` |
| `useTheme({ name? })` | `{ theme }` | Same as `getActiveTheme(name)` |

Without an argument, name comes from `window.VueTools.theme`, then `trim` and lowercase (` MODX ` → `modx`). Empty or unknown → `aura`. `getActiveTheme()` returns a reference to the registry entry. Do not mutate `theme.options`.
