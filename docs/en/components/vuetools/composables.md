# API Composables

Ready composables for MODX work from Vue components. Each is imported from its own Import Map key.

## useLexicon

MODX lexicons.

```javascript
import { useLexicon } from '@vuetools/useLexicon'

const { _, has, getByPrefix } = useLexicon()
```

| Method | Returns | Description |
|--------|---------|-------------|
| `_(key, params?)` | `string` | Lexicon value; falls back to `key` if missing |
| `has(key)` | `boolean` | Whether the key exists |
| `getByPrefix(prefix)` | `object` | All keys starting with `prefix` |

`params` fills placeholders written as `[[+name]]`, `{name}` and `:name`.

```javascript
_('my_component_title')                      // "My component"
_('my_component_welcome', { name: 'John' })  // from "Hello, {name}!" → "Hello, John!"
```

Lexicons are read from `window.MODx.lang`. Load topics in the controller:

```php
public function getLanguageTopics()
{
    return ['mycomponent:default'];
}
```

## useModx

Access to `window.MODx`.

```javascript
import { useModx } from '@vuetools/useModx'

const { config, siteId, isManager, getSetting } = useModx()
```

| Property / method | Type | Description |
|-------------------|------|-------------|
| `config` | `ComputedRef<object>` | `MODx.config` |
| `user` | `ComputedRef<object>` | `MODx.user` |
| `siteId` | `ComputedRef<string>` | Auth token `MODx.siteId` |
| `hasPermission(key)` | `boolean` | Whether the user has permission `key` |
| `getSetting(key, default?)` | `*` | Value from `MODx.config` |
| `getManagerUrl(path?)` | `string` | Manager URL |
| `getAssetsUrl(component)` | `string` | Component assets URL |
| `getConnectorUrl(component)` | `string` | Component connector URL |
| `getContextKey()` | `string` | Current context key |
| `isManager()` | `boolean` | Whether the code runs in the manager |
| `fireEvent(name, data?)` | `void` | Fire an ExtJS `MODx` event |

`config`, `user` and `siteId` are Vue computed refs: use `config.assets_url` in a template, `config.value.assets_url` in code.

## usePermission

User permission checks. Permissions come from `window.MODx.perm`.

```javascript
import { usePermission } from '@vuetools/usePermission'

const { can, canAny, canAll } = usePermission()
```

| Method | Returns | Description |
|--------|---------|-------------|
| `can(key)` | `boolean` | Whether the user has permission `key` |
| `canAny(keys)` | `boolean` | Whether the user has any of the permissions |
| `canAll(keys)` | `boolean` | Whether the user has all permissions |
| `getAll()` | `object` | All user permissions |

```javascript
const { can } = usePermission()
const canEdit = computed(() => can('my_component_edit'))
```

Shortcuts for common MODX permissions exist too: `canCreateResource()`, `canEditResource()`, `canViewUsers()`, `canClearCache()` and others — all called without arguments.

## useApi

HTTP client for the standard MODX connector API (`?action=processor/path`).

```javascript
import { useApi } from '@vuetools/useApi'

const { get, post, put, delete: del } = useApi()
```

| Method | Description |
|--------|-------------|
| `get(action, params?)` | GET request |
| `post(action, params?, options?)` | POST request |
| `put(action, params?, options?)` | PUT request |
| `delete(action, params?)` | DELETE request |
| `buildUrl(action, params?)` | Build a URL without sending |

```javascript
const users = await get('security/user/getlist', { limit: 20 })
await post('security/user/create', { username: 'newuser' })
```

POST and PUT send `FormData` by default. For a JSON body pass `{ json: true }` as the third argument. The `HTTP_MODAUTH` token (from `MODx.siteId`) is added automatically. On a `success: false` response the method throws an error carrying a `data` field.

::: warning Custom router
`useApi` targets the standard MODX connector. If your component has its own router, add a local `request.js` — see [Custom API client](integration#own-api-client).
:::

## usePrimeVueLocale

PrimeVue locales: DataTable filter labels, DatePicker/Calendar buttons and headers.

```javascript
import { getPrimeVueLocale } from '@vuetools/usePrimeVueLocale'
import { PrimeVue } from 'primevue'
import { getActiveTheme } from '@vuetools/useTheme'

app.use(PrimeVue, { ...getActiveTheme(), locale: getPrimeVueLocale() })
```

| Function | Returns | Description |
|----------|---------|-------------|
| `getPrimeVueLocale(cultureKey?)` | `object` | Locale by code; without an argument — by `MODx.cultureKey` |

Codes: `de`, `en`, `es`, `fr`, `pl`, `ru`, `uk`. An unknown code yields the English locale. The locale is not reactive: to change language without a page reload, pass a new `cultureKey` or recreate the app.

## useTheme

The active theme. Full page: [Theme](theme).

```javascript
import { getActiveTheme } from '@vuetools/useTheme'
import { PrimeVue } from 'primevue'

app.use(PrimeVue, getActiveTheme())
```

| Function | Returns | Description |
|----------|---------|-------------|
| `getActiveTheme(name?)` | `{ theme }` | Theme config for `app.use(PrimeVue, …)` |
| `getThemeName(name?)` | `string` | Active theme name (`aura` or `modx`) |

Without an argument the theme comes from the `vuetools.theme` setting (delivered via `window.VueTools`); an unknown value falls back to `aura`.
