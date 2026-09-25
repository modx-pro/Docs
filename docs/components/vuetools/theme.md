---
title: Тема VueTools
description: Переключение и подключение темы оформления PrimeVue
---

# Тема

Тему оформления PrimeVue задаёт одна системная настройка `vuetools.theme` — сразу для всех компонентов, которые её поддерживают. С версии 1.2.0.

## Переключить тему

Настройка **Система → Системные настройки → `vuetools.theme`**.

| Значение | Тема |
|----------|------|
| `aura` | `Aura` — стандартная тема PrimeVue (по умолчанию) |
| `modx` | `Modx` — вид панели управления MODX Revolution 3 |

После смены значения тема меняется у всех компонентов, которые читают её через `getActiveTheme()` — без их пересборки.

## Подключить в компоненте

Передайте `getActiveTheme()` в `app.use(PrimeVue, …)`:

```javascript
import { PrimeVue } from 'primevue'
import { getActiveTheme } from '@vuetools/useTheme'

app.use(PrimeVue, getActiveTheme())
```

С локалью:

```javascript
import { getPrimeVueLocale } from '@vuetools/usePrimeVueLocale'

app.use(PrimeVue, { ...getActiveTheme(), locale: getPrimeVueLocale() })
```

`getActiveTheme()` читает значение из `window.VueTools.theme` (его вставляет плагин `VueCoreManager` рядом с Import Map) и возвращает `{ theme }` для активной темы. Неизвестное значение настройки даёт `Aura`.

Не задавайте тему вручную (`{ theme: { preset: Aura } }`) — компонент с жёстко прописанной темой не будет переключаться настройкой.

## Требование версии {#version}

`getActiveTheme()` и ключ `@vuetools/useTheme` появились в VueTools 1.2.0. На более старом пакете этого ключа в Import Map нет, и модуль компонента упадёт на импорте — в консоли будет ошибка разрешения модуля, а виджет не появится.

Признак версии с темой — ключ `vuetools/theme` в Import Map. Проверку зависимости (см. [Проверка наличия VueTools](integration#vuetools-check)) для темизированного компонента расширьте этим ключом:

```javascript
hasVueCore = mapContent.imports
    && mapContent.imports.vue
    && mapContent.imports['vuetools/theme'];
```

Тогда на старом пакете читатель увидит понятное сообщение «обновите VueTools», а не ошибку в консоли. В тексте сообщения укажите минимальную версию — VueTools 1.2.0.

## Существующие компоненты

Обновление VueTools само по себе вид не меняет: по умолчанию активна `Aura`. Компонент, который задаёт тему по-старому (`Aura` или `ModxManagerTheme` в коде), продолжает работать и не следует за переключением настройки, пока его не переведут на `getActiveTheme()`.

## Своя тема

Тему-пресет можно расширить на основе `Modx` без копирования:

```javascript
import { definePreset, Modx } from 'primevue'

const MyPreset = definePreset(Modx, {
  semantic: { primary: { 500: '#1a3a5c' } }
})
```

Новые темы регистрируются в реестре внутри VueTools, а компоненты продолжают вызывать `getActiveTheme()` — их код не меняется.
