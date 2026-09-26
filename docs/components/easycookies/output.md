---
title: Вывод на сайте
description: Плагин EasyCookies, сниппеты EasyCookies и EasyCookiesAllowed, ссылка на настройки cookie и JS API
---

# Вывод на сайте

## Плагин

Плагин **EasyCookies** на событии `OnWebPagePrerender` выводит баннер активного профиля контекста страницы. Добавлять что-то в шаблоны не нужно.

На страницу попадают две части:

- сразу после `<head>` — сигналы Google Consent Mode, если они нужны профилю;
- перед `</head>` — стили, настройки профиля (`window.EasyCookiesConfig`) и скрипт баннера с `defer`.

Баннер выводится только на HTML-страницах: ресурсы с типом содержимого JSON, XML, CSS и подобные плагин пропускает. Отдельные страницы исключаются настройкой `easycookies.exclude_resources`, а весь автовывод выключается настройкой `easycookies.auto_inject`.

Какой профиль выводить, задаёт `easycookies.auto_inject_profile` (название или id). Пусто — активный профиль контекста страницы.

::: tip
Если в ответе нет `</head>`, вставлять баннер некуда: плагин ничего не выведет и напишет предупреждение в журнал ошибок MODX.
:::

## Сниппет EasyCookies

Если автовывод выключен или странице нужен другой профиль, вызовите сниппет в `<head>` шаблона — как можно выше, до тегов Google:

::: code-group

```modx
[[EasyCookies]]
[[EasyCookies? &profile=`Согласие на cookie`]]
```

```fenom
{'EasyCookies' | snippet}
{'EasyCookies' | snippet : ['profile' => 'Согласие на cookie']}
```

:::

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `profile` | активный профиль контекста | Название или id профиля |

Если сниппет уже вывел баннер на странице, плагин второй раз его не добавляет.

## Ссылка «Настройки cookie»

Любой элемент с атрибутом `data-cc="show-preferencesModal"` открывает окно настроек. Поставьте такую ссылку в подвал сайта, чтобы посетитель мог передумать:

```html
<a href="#" data-cc="show-preferencesModal">Настройки cookie</a>
```

![Окно настроек cookie на сайте](/components/easycookies/screenshots/site-preferences.png)

## Сниппет EasyCookiesAllowed

Встроенное видео, карту или форму с reCAPTCHA можно выводить только тем, кто разрешил нужную категорию. Выбор у каждого посетителя свой, поэтому сниппет вызывается некешированным:

::: code-group

```modx
[[!EasyCookiesAllowed?
  &category=`marketing`
  &tpl=`youtube`
  &tplElse=`youtube.stub`
]]

[[!EasyCookiesAllowed?
  &category=`analytics`
  &service=`ym`
  &tpl=`@INLINE <p>Спасибо, что помогаете нам улучшать сайт</p>`
]]

[[!EasyCookiesAllowed:is=`1`:then=`[[$map]]`:else=`[[$map.stub]]`? &category=`functionality`]]
```

```fenom
{'!EasyCookiesAllowed' | snippet : [
  'category' => 'marketing',
  'tpl' => 'youtube',
  'tplElse' => 'youtube.stub',
]}

{if ('!EasyCookiesAllowed' | snippet : ['category' => 'functionality'])}
  {'map' | chunk}
{else}
  {'map.stub' | chunk}
{/if}
```

:::

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `category` | — | `functionality`, `analytics` или `marketing`; `necessary` разрешена всегда |
| `service` | — | Id сервиса из профиля (`ym`, `ga4`, `vk`…); пусто — вся категория |
| `tpl` | — | Чанк или `@INLINE`-разметка, когда разрешено |
| `tplElse` | — | Чанк или `@INLINE`-разметка, когда нет |
| `profile` | активный профиль контекста | Название или id профиля |

Без `tpl` и `tplElse` сниппет возвращает `1` или пустую строку — для модификаторов и условий.

Как сниппет решает:

- кто ещё не ответил, у простого баннера считается согласившимся, у баннера по требованиям — нет;
- ответ на прошлую ревизию профиля не считается;
- сигнал GPC (при включённом учёте) запрещает маркетинг;
- без активного профиля разрешено всё: баннера нет, запрещать нечего.

Id сервиса — это ключ `id` в настройках профиля: первый сервис каждого типа получает id по типу (`ym`, `ga4`, `gtm`, `vk`, `meta`, `custom`), повторный — с номером (`ym-2`).

Страницу с таким вызовом баннер перезагружает, когда разрешённые категории меняются, — блок появляется или исчезает сразу.

::: warning
За кешем всей страницы на прокси или CDN сниппет не сработает: там страница одна на всех посетителей.
:::

## JS API

Скрипт баннера подключается с `defer`, поэтому `window.EasyCookies` доступен к событию `DOMContentLoaded`.

```js
EasyCookies.show() // показать баннер снова
EasyCookies.showPreferences() // открыть окно настроек
EasyCookies.accepted('analytics') // разрешена ли категория
EasyCookies.CookieConsent // сама библиотека CookieConsent
```

Например, отправить цель в Метрику, только если аналитика разрешена:

```js
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.order-button')?.addEventListener('click', () => {
    if (EasyCookies.accepted('analytics') && window.ym) {
      ym(94817263, 'reachGoal', 'order')
    }
  })
})
```

Через `EasyCookies.CookieConsent` доступен весь [API библиотеки](https://cookieconsent.orestbida.com/reference/api-reference.html): `acceptedService()`, `getUserPreferences()`, `getCookie()` и другие.
