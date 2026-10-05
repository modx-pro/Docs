---
title: API Composables VueTools
description: useLexicon, useModx, usePermission, useApi, usePrimeVueLocale, useTheme
---

# API Composables

Каждый composable импортируйте отдельным ключом Import Map (`@vuetools/useApi` и т.д.). Файл `index.min.js` в assets есть, ключа `@vuetools/index` в карте нет.

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

Метод `_` подставляет в строку `[[+name]]`, `{name}` и `:name`. У формы `:name` нет границы слова: вхождение внутри более длинного текста и значение с `$&` / `$'` / `$$` портят строку ([issue #67](https://github.com/modx-pro/vueTools/issues/67)). `[[+name]]` и `{name}` этой дыры не имеют.

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
| `hasPermission(key)` | `boolean` | `MODx.perm[key] === true` |
| `getSetting(key, default?)` | `*` | Значение из `MODx.config` |
| `getManagerUrl(path?)` | `string` | URL менеджера; без конфига → `/manager/` |
| `getAssetsUrl(component)` | `string` | `{assets}components/{name}/`; assets иначе `/assets/` |
| `getConnectorUrl(component)` | `string` | `{assets}components/{name}/connector.php` |
| `getContextKey()` | `string` | Контекст; иначе `web`. Без MODx → `null` у связанных проверок |
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
| `getAll()` | `object` | Ссылка на `MODx.perm` (или `{}`). Не клон: правки объекта меняют права на странице |

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

Запасной `/connectors/` без `index.php` подходит не везде. Задавайте `baseUrl` из `MODx.config.connector_url`.

### Методы

| Метод | Описание |
|-------|----------|
| `get(action, params?)` | GET: params в query через `String(value)` (массив → `"a,b"`, объект → `"[object Object]"`) |
| `post(action, params?, options?)` | POST: FormData (`key[i]` для массивов, JSON-строка для объектов), если не `{ json: true }` |
| `put(action, params?, options?)` | PUT (см. ограничение ниже) |
| `delete(action, params?)` | DELETE; третьего `options` нет (в отличие от `put`) |
| `request(action, params?, options?)` | Общий метод; `options.method`, `options.json`, заголовки |
| `buildUrl(action, params?)` | URL без запроса |

```javascript
const data = await get('security/user/getlist', { limit: 20 })
const users = data.results // список в поле results, не весь ответ целиком
await post('security/user/create', { username: 'newuser' })
```

Метод добавляет токен `HTTP_MODAUTH` в query. При `success: false` бросает ошибку с полем `data`. HTTP-статус вне 2xx: обычный `Error` без `data`.

::: warning Штатный connector и тело запроса
Ядро собирает свойства процессора из `$_GET` + `$_POST`. PHP не заполняет `$_POST` для PUT/DELETE и не разбирает `application/json` в `$_POST`.

Для стандартного connector надёжны **GET** и **POST без `{ json: true }`** (FormData). `put` / `delete` и `{ json: true }` параметры в процессор часто не доставляют. См. [issue #52](https://github.com/modx-pro/vueTools/issues/52). Передача своих `headers` может затереть `Accept` ([#63](https://github.com/modx-pro/vueTools/issues/63)).
:::

::: warning Свой роутер
`useApi` рассчитан на стандартный connector. Свой роутер: локальный `request.js`. См. [Собственный API-клиент](integration#own-api-client).
:::

## usePrimeVueLocale

Локали PrimeVue: фильтры DataTable и DatePicker.

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
| `getPrimeVueLocale(cultureKey?)` | `object` | Локаль по коду |
| `usePrimeVueLocale({ cultureKey? })` | `{ locale, getPrimeVueLocale }` | Обёртка: `locale` зафиксирован при вызове |

Цепочка кода: аргумент → `MODx.cultureKey` → `MODx.config.cultureKey` → `en`. Метка режется по `-`/`_` и приводится к нижнему регистру (`ru-RU` → `ru`). Коды: `de`, `en`, `es`, `fr`, `pl`, `ru`, `uk`. Неизвестный код → `en`. Локаль не реактивна: при смене языка без перезагрузки передайте новый `cultureKey` или пересоздайте приложение.

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

Без аргумента имя берётся из `window.VueTools.theme`, затем `trim` и нижний регистр (` MODX ` → `modx`). Пустое или неизвестное → `aura`. `getActiveTheme()` возвращает ссылку на запись реестра. Не мутируйте `theme.options`.
