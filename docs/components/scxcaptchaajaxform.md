---
title: scxcaptchaAjaxForm
description: Неблокирующая числовая CAPTCHA (5 цифр) для AjaxForm и FormIt. Простая для человека, сложнее для ботов.
logo: https://sait-modx.by/assets/images/components/scxcaptchaajaxform/logo_captha.png
author: sait-modx.by
---

# scxcaptchaAjaxForm

Неблокирующая числовая CAPTCHA (5 цифр) для **AjaxForm** и **FormIt**.  
Простая для человека, сложнее для ботов. Все имена и классы имеют префикс `scx_`.

**Документация:** [/extras/scxcaptchaajaxform/](/extras/scxcaptchaajaxform/)

## Быстрый старт

```modx
[[!ScxCaptchaAjaxForm]]
```
AjaxForm
```modx
[[!AjaxForm?
  &snippet=`FormIt`
  &form=`tpl.AjaxForm.example`
  &hooks=`ScxCaptchaAjaxFormHook,email`
  &validate=`name:required,email:required:email,scx_code:required`
]]
```
FormIt
```modx
[[!FormIt?
  &hooks=`ScxCaptchaAjaxFormHook,email`
  &validate=`name:required,email:required:email,scx_code:required`
]]

[[!ScxCaptchaAjaxForm]]
```
## Требования
MODX Revolution 2.8+ или 3.x

PHP 7.2+ (рекомендуется 7.4)

GD + TrueType (для TTF-шрифта)

## Ключевые особенности
Некэшируемый вызов сниппета.

Поддержка ассетов: head (по умолчанию), inline, none.

Валидация через хук ScxCaptchaAjaxFormHook.

Поля формы: scx_hp, scx_ts, scx_code, scx_token.

Параметры сниппета
Параметр	По умолчанию	Описание
ttl	1200	Время жизни токена (сек.)
includeAssets	head	Как подключать CSS/JS: head, inline, none
render	1	Возвращать HTML капчи (1) или только ассеты (0)

## Отладка
Добавьте &debug=1 к URL captcha.php?...&debug=1 — выведет служебные данные.
Если видите Bad token, проверьте: некэшируемый вызов, один хост/поддомен, корректное подключение ассетов, наличие скрытого af_action у AjaxForm.
