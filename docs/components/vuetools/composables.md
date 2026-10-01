# API Composables

Импортируйте каждый composable из своего ключа Import Map.

## useLexicon

```javascript
import { useLexicon } from '@vuetools/useLexicon'

const { _, has, getByPrefix } = useLexicon()
```

Свой словарь перекрывает `window.MODx.lang`:

```javascript
const { _ } = useLexicon({ lexicon: { my_key: 'Значение' } })
```

| Метод | Возвращает | Описание |
|-------|------------|----------|
| `_(key, params?)` | `string` | Значение лексикона. Если ключа нет: сам `key` |
| `has(key)` | `boolean` | Есть ли ключ в `options.lexicon` или `MODx.lang` |
| `getByPrefix(prefix)` | `object` | Все ключи с данным префиксом |
| `load(topics)` | `Promise<void>` | **Не реализован**: пишет предупреждение в консоль, топики не грузит |

Метод `_` подставляет в строку `[[+name]]`, `{name}` и `:name`.

```javascript
_('my_component_title')                       // "Мой компонент"
_('my_component_welcome', { name: 'Иван' })   // из "Привет, {name}!" → "Привет, Иван!"
```

Топики загружайте в контроллере:

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
| `isManager()` | `boolean` | Код выполняется в панели управления |
| `fireEvent(name, data?)` | `void` | Вызывает `MODx.fireEvent`, если это функция. Иначе ничего не делает |

`config`, `user` и `siteId`: computed. В шаблоне: `config.assets_url`. В `<script>`: `config.value.assets_url`.

## usePermission

Права из `window.MODx.perm`. Сравнение строгое: значение должно быть `=== true`.

```javascript
import { usePermission } from '@vuetools/usePermission'

const { can, canAny, canAll } = usePermission()
```

| Метод | Возвращает | Описание |
|-------|------------|----------|
| `can(key)` | `boolean` | Есть ли право `key` |
| `canAny(keys)` | `boolean` | Хотя бы одно из прав |
| `canAll(keys)` | `boolean` | Все права |
| `getAll()` | `object` | Копия `MODx.perm` |

### Готовые проверки → ключ MODX

| Метод | Ключ `MODx.perm` |
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

HTTP-клиент к стандартному connector MODX (`?action=processor/path`).

```javascript
import { useApi } from '@vuetools/useApi'

const { get, post, put, delete: del, request, buildUrl } = useApi()
```

### Опции конструктора

| Опция | По умолчанию | Описание |
|-------|--------------|----------|
| `baseUrl` | `MODx.config.connector_url`, иначе `/connectors/` | Базовый URL коннектора |
| `authToken` | `MODx.siteId` | Токен для `HTTP_MODAUTH` |

Запасной `/connectors/` без `index.php` годится не на всех установках. Опирайтесь на `MODx.config.connector_url`.

### Методы

| Метод | Описание |
|-------|----------|
| `get(action, params?)` | GET: параметры в query |
| `post(action, params?, options?)` | POST: тело `FormData`, если не `{ json: true }` |
| `put(action, params?, options?)` | PUT (см. ограничение ниже) |
| `delete(action, params?)` | DELETE (см. ограничение ниже) |
| `request(action, params?, options?)` | Общий метод; `options.method`, `options.json`, заголовки |
| `buildUrl(action, params?)` | URL без запроса |

```javascript
const data = await get('security/user/getlist', { limit: 20 })
const users = data.results // список в поле results, не весь ответ целиком
await post('security/user/create', { username: 'newuser' })
```

Метод добавляет токен `HTTP_MODAUTH` в query. При `success: false` бросает ошибку с полем `data`.

::: warning Штатный connector и тело запроса
Ядро собирает свойства процессора из `$_GET` + `$_POST`. PHP не заполняет `$_POST` для PUT/DELETE и не разбирает `application/json` в `$_POST`.

Для стандартного connector надёжны **GET** и **POST без `{ json: true }`** (FormData). `put` / `delete` и `{ json: true }` параметры в процессор часто не доставляют. См. [issue #52](https://github.com/modx-pro/vueTools/issues/52).
:::

::: warning Свой роутер
`useApi` рассчитан на стандартный connector. Свой роутер: локальный `request.js`. См. [Собственный API-клиент](integration#own-api-client).
:::

## usePrimeVueLocale

Локали PrimeVue: фильтры DataTable, DatePicker/Calendar.

```javascript
import { getPrimeVueLocale, usePrimeVueLocale } from '@vuetools/usePrimeVueLocale'
import { PrimeVue } from 'primevue'
import { getActiveTheme } from '@vuetools/useTheme'

app.use(PrimeVue, { ...getActiveTheme(), locale: getPrimeVueLocale() })

// или
const { locale } = usePrimeVueLocale() // то же, что getPrimeVueLocale() на момент вызова
```

| Функция | Возвращает | Описание |
|---------|------------|----------|
| `getPrimeVueLocale(cultureKey?)` | `object` | Локаль по коду; без аргумента: `MODx.cultureKey` |
| `usePrimeVueLocale({ cultureKey? })` | `{ locale, getPrimeVueLocale }` | Обёртка: `locale` зафиксирован при вызове |

Коды: `de`, `en`, `es`, `fr`, `pl`, `ru`, `uk`. Неизвестный код → английская локаль. Локаль не реактивна: при смене языка без перезагрузки передайте новый `cultureKey` или пересоздайте приложение.

## useTheme

Подробнее: [Тема](theme).

```javascript
import { getActiveTheme, getThemeName, useTheme } from '@vuetools/useTheme'
import { PrimeVue } from 'primevue'

app.use(PrimeVue, getActiveTheme())
```

| Функция | Возвращает | Описание |
|---------|------------|----------|
| `getActiveTheme(name?)` | `{ theme }` | Фрагмент для `app.use(PrimeVue, …)` |
| `getThemeName(name?)` | `string` | `aura` или `modx` |
| `useTheme({ name? })` | `{ theme }` | То же, что `getActiveTheme(name)` |

Без аргумента функция берёт имя из `window.VueTools.theme`. Неизвестное → `aura`.
