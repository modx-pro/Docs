# API Composables

Готовые composable для работы с MODX из Vue-компонентов. Каждый импортируется из своего ключа Import Map.

## useLexicon

Лексиконы MODX.

```javascript
import { useLexicon } from '@vuetools/useLexicon'

const { _, has, getByPrefix } = useLexicon()
```

| Метод | Возвращает | Описание |
|-------|------------|----------|
| `_(key, params?)` | `string` | Значение лексикона; если ключа нет — сам `key` |
| `has(key)` | `boolean` | Есть ли ключ |
| `getByPrefix(prefix)` | `object` | Все ключи, начинающиеся с `prefix` |

В `params` подставляются места вида `[[+name]]`, `{name}` и `:name`.

```javascript
_('my_component_title')                       // "Мой компонент"
_('my_component_welcome', { name: 'Иван' })   // из "Привет, {name}!" → "Привет, Иван!"
```

Лексиконы читаются из `window.MODx.lang`. Топики загрузите в контроллере:

```php
public function getLanguageTopics()
{
    return ['mycomponent:default'];
}
```

## useModx

Доступ к объекту `window.MODx`.

```javascript
import { useModx } from '@vuetools/useModx'

const { config, siteId, isManager, getSetting } = useModx()
```

| Свойство / метод | Тип | Описание |
|------------------|-----|----------|
| `config` | `ComputedRef<object>` | `MODx.config` |
| `user` | `ComputedRef<object>` | `MODx.user` |
| `siteId` | `ComputedRef<string>` | Токен авторизации `MODx.siteId` |
| `hasPermission(key)` | `boolean` | Есть ли право `key` |
| `getSetting(key, default?)` | `*` | Значение из `MODx.config` |
| `getManagerUrl(path?)` | `string` | URL панели управления |
| `getAssetsUrl(component)` | `string` | URL папки assets компонента |
| `getConnectorUrl(component)` | `string` | URL коннектора компонента |
| `getContextKey()` | `string` | Ключ текущего контекста |
| `isManager()` | `boolean` | Выполняется ли код в панели управления |
| `fireEvent(name, data?)` | `void` | Вызвать событие ExtJS `MODx` |

`config`, `user` и `siteId` — вычисляемые ссылки Vue: в шаблоне обращайтесь как `config.assets_url`, в коде — `config.value.assets_url`.

## usePermission

Проверка прав пользователя. Права берутся из `window.MODx.perm`.

```javascript
import { usePermission } from '@vuetools/usePermission'

const { can, canAny, canAll } = usePermission()
```

| Метод | Возвращает | Описание |
|-------|------------|----------|
| `can(key)` | `boolean` | Есть ли право `key` |
| `canAny(keys)` | `boolean` | Есть ли хотя бы одно из прав |
| `canAll(keys)` | `boolean` | Есть ли все права |
| `getAll()` | `object` | Все права пользователя |

```javascript
const { can } = usePermission()
const canEdit = computed(() => can('my_component_edit'))
```

Есть готовые проверки частых прав MODX: `canCreateResource()`, `canEditResource()`, `canViewUsers()`, `canClearCache()` и другие — все вызываются без аргументов.

## useApi

HTTP-клиент к стандартному connector API MODX (`?action=processor/path`).

```javascript
import { useApi } from '@vuetools/useApi'

const { get, post, put, delete: del } = useApi()
```

| Метод | Описание |
|-------|----------|
| `get(action, params?)` | GET-запрос |
| `post(action, params?, options?)` | POST-запрос |
| `put(action, params?, options?)` | PUT-запрос |
| `delete(action, params?)` | DELETE-запрос |
| `buildUrl(action, params?)` | Собрать URL без запроса |

```javascript
const users = await get('security/user/getlist', { limit: 20 })
await post('security/user/create', { username: 'newuser' })
```

По умолчанию POST и PUT отправляют `FormData`. Для тела JSON передайте `{ json: true }` третьим аргументом. Токен авторизации `HTTP_MODAUTH` (из `MODx.siteId`) добавляется автоматически. При ответе `success: false` метод бросает ошибку с полем `data`.

::: warning Свой роутер
`useApi` рассчитан на стандартный connector MODX. Если у компонента свой роутер, заведите локальный `request.js` — см. [Собственный API-клиент](integration#own-api-client).
:::

## usePrimeVueLocale

Локали PrimeVue: подписи фильтров DataTable, кнопки и заголовки DatePicker/Calendar.

```javascript
import { getPrimeVueLocale } from '@vuetools/usePrimeVueLocale'
import { PrimeVue } from 'primevue'
import { getActiveTheme } from '@vuetools/useTheme'

app.use(PrimeVue, { ...getActiveTheme(), locale: getPrimeVueLocale() })
```

| Функция | Возвращает | Описание |
|---------|------------|----------|
| `getPrimeVueLocale(cultureKey?)` | `object` | Локаль по коду; без аргумента — по `MODx.cultureKey` |

Коды: `de`, `en`, `es`, `fr`, `pl`, `ru`, `uk`. Неизвестный код даёт английскую локаль. Локаль не реактивна: при смене языка без перезагрузки страницы передайте новый `cultureKey` или пересоздайте приложение.

## useTheme

Активная тема оформления. Полностью — на странице [Тема](theme).

```javascript
import { getActiveTheme } from '@vuetools/useTheme'
import { PrimeVue } from 'primevue'

app.use(PrimeVue, getActiveTheme())
```

| Функция | Возвращает | Описание |
|---------|------------|----------|
| `getActiveTheme(name?)` | `{ theme }` | Настройки темы для `app.use(PrimeVue, …)` |
| `getThemeName(name?)` | `string` | Имя активной темы (`aura` или `modx`) |

Без аргумента тема берётся из настройки `vuetools.theme` (значение отдаётся через `window.VueTools`), неизвестное значение → `aura`.
