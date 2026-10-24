---
title: Валидация
description: "Клиентская проверка полей FetchIt: средствами браузера, Zod, Valibot, yup и validator.js"
---

# Валидация

Клиентская проверка ловит ошибки до отправки, и посетитель не ждёт ответа сервера, чтобы узнать об опечатке в e-mail. Во всех примерах схема одна: обработчик [`fetchit:before`](/components/fetchit/frontend/events#fetchitbefore) проверяет поля, рисует ошибки через [`setError`](/components/fetchit/frontend/instance#seterrorname-message) и отменяет отправку `preventDefault()`.

<!--@include: ../../parts/validation.warning.md-->

- [Средствами браузера](/components/fetchit/examples/validation/native) — атрибуты `required`, `type`, `pattern`, без библиотек
- [Zod](/components/fetchit/examples/validation/zod) — самая популярная библиотека схем, в браузере — лёгкая сборка `zod/mini`
- [Valibot](/components/fetchit/examples/validation/valibot) — схема из маленьких функций, 2–3 КБ
- [yup](/components/fetchit/examples/validation/yup) — схема, если yup уже есть в проекте
- [validator.js](/components/fetchit/examples/validation/validator) — готовые проверки телефона, e-mail и других строк; дополняет любой вариант выше

FetchIt сам снимает ошибки перед каждой отправкой и с поля, которое посетитель начал править, поэтому очищать их в обработчике не нужно.
