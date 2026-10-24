---
title: JavaScript API
description: getConsent, openSettings, onAllowed, stillAllowed, mountEmbeds и примеры асинхронной интеграции.
---

# JavaScript API

Глобальный объект создаётся на страницах, где подключены Assets, Banner и реестр:

```javascript
const cmp = window.web86CookieConsent;
```

## Доступные методы

| Метод | Назначение |
| --- | --- |
| `getConsent()` | Копия сохранённого решения или `null` |
| `openSettings()` | Открыть окно настроек |
| `onAllowed(category, callback, options?)` | Выполнить callback при действующем разрешении |
| `mountEmbeds(root?)` | Активировать управляемые встраивания в DOM |

Метод `getConsent()` возвращает именно **решение посетителя**. В Legacy загрузка до первого выбора **не означает** `getConsent().categories.analytics === true`.

## Открытие настроек

Используйте готовый HTML-атрибут:

```html
<button type="button" data-cookie-settings-open>Настройки cookie</button>
```

Или откройте программно после инициализации:

```javascript
window.web86CookieConsent?.openSettings();
```

## Запуск модуля после разрешения

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const cmp = window.web86CookieConsent;
  if (!cmp?.onAllowed) return;

  cmp.onAllowed('external_content', async (stillAllowed) => {
    if (!stillAllowed()) return;

    const module = await import('/assets/js/company-map.js');
    if (!stillAllowed()) return;

    await module.init(stillAllowed);
  });
});
```

Модуль `company-map.js` должен быть написан так, чтобы сам **import** не отправлял сторонние запросы. Перед сетевыми запросами и после каждого `await` проверяйте `stillAllowed()`.

## Проверка конкретного сервиса

Если установлен сервис с ключом `yandex_maps` и назначен категории `external_content`:

```javascript
const unsubscribe = window.web86CookieConsent.onAllowed(
  'external_content',
  (stillAllowed) => {
    if (!stillAllowed()) return;
    // Выполните разрешённую операцию.
  },
  { service: 'yandex_maps' }
);

// Если ожидание больше не нужно:
unsubscribe();
```

Опция `service` не вводит индивидуальные разрешения: она дополнительно проверяет включённый экземпляр, совпадение назначенной категории и актуальность состояния. Callback выполняется **не более одного раза** на регистрацию; отменить уже отправленный запрос невозможно.

## Что нельзя делать

Не сохраняйте `const allowed = getConsent()?.categories.analytics` и не используйте это значение как бессрочное разрешение. После отзыва оно может устареть. Для асинхронных задач используйте предоставленный `stillAllowed()`.

Не вызывайте внутренние функции компонентов и не считайте наличие тега SDK подтверждением сохранённого согласия.
