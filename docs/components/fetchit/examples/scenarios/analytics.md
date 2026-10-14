---
title: Цели в Метрике и Google Analytics
description: Отправка целей Яндекс Метрики, GA4, Google Tag Manager и VK Рекламы после успешной отправки формы FetchIt
---

# Цели в Метрике и Google Analytics

Цель засчитывается, когда сервер принял форму, — по событию [`fetchit:success`](/components/fetchit/frontend/events#fetchitsuccess). Клик по кнопке не подходит: он считает и формы с ошибками, и повторные нажатия.

## Имя цели в разметке

Удобнее всего держать имя цели в самой форме — тогда один скрипт обслуживает все формы сайта, а новая форма получает свою цель без правки JavaScript:

```html
<form action="…" method="post" data-goal="callback">
```

Форма без `data-goal` цель не отправляет.

## Скрипт

```js
document.addEventListener('fetchit:success', ({ detail: { form } }) => {
  const goal = form.dataset.goal
  if (!goal) {
    return
  }

  // Яндекс Метрика
  window.ym?.(12345678, 'reachGoal', goal)

  // Google Analytics 4
  window.gtag?.('event', 'generate_lead', { form_name: goal })

  // Google Tag Manager
  window.dataLayer?.push({ event: 'form_submit', form_name: goal })

  // VK Реклама (пиксель Top.Mail.Ru)
  window._tmr?.push({ type: 'reachGoal', id: 1234567, goal })
})
```

Замените номера счётчиков на свои и оставьте только те системы, которые стоят на сайте.

- Вызовы через `?.` не падают, если счётчика на странице нет: например, посетитель не дал согласия на аналитику, и баннер cookie его не загрузил. Цель тогда просто не отправится.
- `generate_lead` — [рекомендуемое событие](https://support.google.com/analytics/answer/9267735) GA4 для заявок. Имя формы уходит параметром `form_name`, по нему заявки разбиваются в отчётах.
- В Google Tag Manager событие `form_submit` ловит триггер «Специальное событие», а `form_name` читается переменной уровня данных.

## Настройка цели в Метрике

В настройках счётчика создайте цель типа «JavaScript-событие» с идентификатором из `data-goal`, например `callback`. Проверить, что цель доходит, можно, добавив к адресу страницы `?_ym_debug=1`: Метрика будет писать в консоль браузера каждую отправленную цель.

## Параметры заявки

В цель можно передать и данные формы — например, выбранный тариф. Не отправляйте в аналитику имя, телефон и e-mail: это персональные данные.

```js
document.addEventListener('fetchit:success', ({ detail: { form, formData } }) => {
  const goal = form.dataset.goal
  if (!goal) {
    return
  }

  window.ym?.(12345678, 'reachGoal', goal, {
    tariff: formData.get('tariff'),
  })
})
```
