---
title: Переход на другую страницу
description: Редирект на страницу «Спасибо» или заказа после успешной отправки формы FetchIt
---

# Переход на другую страницу

После отправки посетителя часто ведут на отдельную страницу: «Спасибо за заявку», страницу заказа, личный кабинет. Адрес можно задать в разметке формы или вернуть из обрабатывающего сниппета.

## Адрес в разметке

Подходит для FormIt: страница «Спасибо» одна и известна заранее.

::: code-group

```modx
<form action="[[~[[*id]]]]" method="post" data-redirect="[[~15]]">
```

```fenom
<form action="{$_modx->resource.id | url}" method="post" data-redirect="{15 | url}">
```

:::

`15` — ID страницы, на которую ведёт форма.

## Адрес от сниппета

Если адрес зависит от данных — например, от номера созданного заказа, — его возвращает [свой сниппет](/components/fetchit/snippets/custom) во втором аргументе `success()`:

```php
<?php
/** @var modX $modx */
/** @var array $fields */
$FetchIt = FetchIt::service($modx);

if (empty($fields)) {
    return '';
}

// ... проверить поля и создать заявку
$orderId = 42;

return $FetchIt->success('Заявка принята', [
    'redirect' => $modx->makeUrl(15, '', ['order' => $orderId], 'full'),
]);
```

## Скрипт

Один обработчик для обоих вариантов: адрес из ответа важнее адреса из разметки.

```js
document.addEventListener('fetchit:success', ({ detail: { form, response } }) => {
  const url = response.data.redirect || form.dataset.redirect
  if (url) {
    window.location.assign(url)
  }
})
```

Уведомление об успехе на исходной странице посетитель, скорее всего, не заметит: страница сразу сменится. Если нужно, чтобы он его прочитал, отложите переход:

```js
setTimeout(() => window.location.assign(url), 1500)
```
