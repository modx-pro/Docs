---
title: Несколько форм на странице
description: Разные формы FetchIt на одной странице — свои обработчики, цели и поведение после отправки
---

# Несколько форм на странице

Обратный звонок в шапке, подписка в подвале, заявка в модальном окне — на одной странице бывает несколько форм. FetchIt обслуживает их независимо, но у скриптов есть общие точки, о которых стоит помнить.

## Вызовы сниппета

Каждая форма — отдельный вызов FetchIt со своим чанком и своими параметрами FormIt:

::: code-group

```modx
[[!FetchIt?
  &form=`callback.tpl`
  &hooks=`email`
  &emailSubject=`Обратный звонок`
  &validate=`phone:required`
]]

[[!FetchIt?
  &form=`subscribe.tpl`
  &hooks=`FormItSaveForm`
  &validate=`email:required:email`
]]
```

```fenom
{'!FetchIt' | snippet : [
  'form' => 'callback.tpl',
  'hooks' => 'email',
  'emailSubject' => 'Обратный звонок',
  'validate' => 'phone:required',
]}

{'!FetchIt' | snippet : [
  'form' => 'subscribe.tpl',
  'hooks' => 'FormItSaveForm',
  'validate' => 'email:required:email',
]}
```

:::

Сниппет запоминает параметры каждого вызова отдельно, поэтому письмо обратного звонка не уйдёт при подписке.

## Как отличать формы в скриптах

События FetchIt приходят на `document` от всех форм сразу. Какая форма их прислала — видно по `detail.form`. Дайте формам `id` или data-атрибут:

```html
<form id="callback" action="…" method="post">…</form>
<form id="subscribe" action="…" method="post">…</form>
```

```js
document.addEventListener('fetchit:success', ({ detail: { form } }) => {
  switch (form.id) {
    case 'callback':
      form.closest('dialog')?.close()
      break

    case 'subscribe':
      form.querySelector('[type="submit"]').textContent = 'Вы подписаны'
      break
  }
})
```

Для поведения, общего для многих форм, удобнее data-атрибуты, как в примерах с [целями аналитики](/components/fetchit/examples/scenarios/analytics) и [переходом на другую страницу](/components/fetchit/examples/scenarios/redirect): одна строка в разметке вместо новой ветки в `switch`.

## FetchIt.Message — один на всех

[`FetchIt.Message`](/components/fetchit/frontend/class#fetchitmessage) глобальный: его хуки вызываются для всех форм и не знают, какая из них отправлена. Отменить уведомление из события тоже нельзя — хуки срабатывают раньше событий.

Если одной форме уведомления нужны, а другой нет — например, подписке хватает ответа в `[data-success]` под полем, — показывайте уведомления из событий, где форма известна. Встроенные уведомления для этого можно создать вручную:

```html
<form id="subscribe" action="…" method="post" data-notify="off">…</form>
```

```js
document.addEventListener('DOMContentLoaded', () => {
  const notifier = FetchIt.createNotifier({ closeLabel: 'Закрыть' })
  const wants = (form) => form.dataset.notify !== 'off'

  document.addEventListener('fetchit:success', ({ detail: { form, response } }) => {
    if (wants(form)) {
      notifier.success(response.message)
    }
  })

  document.addEventListener('fetchit:error', ({ detail: { form, response } }) => {
    if (response && wants(form)) {
      notifier.error(response.message)
    }
  })
})
```

Для этого выключите настройку `fetchit.frontend.default.notifier` и не задавайте `FetchIt.Message`, иначе уведомления покажутся дважды. Когда запрос не дошёл до сервера, `response` равен `null`: текст ошибки FetchIt тогда покажет в `[data-validation-error]` формы.

## Одинаковые формы

Если одна и та же форма выводится на странице дважды — скажем, заявка в начале и в конце лендинга, — `id` полей в чанке повторятся, и `<label for="…">` будут указывать на первую форму. Для таких чанков заворачивайте поля в `<label>`, как в примерах этой документации, и не задавайте им `id`.
