---
title: Решение проблем
---
# Решение проблем

## Форма пропускает явно кривые номера

Сначала пройдитесь по базовому:

- в `&preHooks` есть `phoneSpamBlock`
- форма реально идёт через FormIt, а не через свой обработчик
- имя поля совпадает с `phonespamdetect_phone_field` или с `phoneField`
- `phonespamdetect_validate_enabled` и `phonespamdetect_block_invalid` включены

Для FetchIt: на странице, куда уходит AJAX, FormIt должен вызываться с `phoneSpamBlock`.

Для SendIt: в пресете в `preHooks` должен быть `phoneSpamBlock`.

## Проходит номер из другой страны

- загляните в `phonespamdetect_allowed_regions` — лишний код или пустая строка (пустая = любая страна)
- в настройках ISO (`RU`, `KZ`), не телефонный код (`+7`)

## Нормальный номер не проходит

Часто дело в `default_region`: человек набрал `8 999 ...` без `+`, а регион в настройках не тот. Или страны нет в `allowed_regions`. Иногда libphonenumber жёстче, чем кажется на глаз.

Включите `phonespamdetect_log_blocked`, отправьте форму ещё раз, смотрите **Управление → Системный журнал** — там будет поле, номер и `reason`.

## Сообщение об ошибке не видно

В шаблоне должен быть `[[+fi.validation_error_message]]` или Fenom-аналог. Проверьте, что другой хук не затирает плейсхолдер. На AJAX — что клиент вообще показывает ошибки FormIt.

## isSpamPhone всегда 0

- не передали `phone`
- выключен `phonespamdetect_validate_enabled`
- не поднялась библиотека — есть ли `core/components/phonespamdetect/vendor/autoload.php`? При сбое сниппет не блокирует (fail-open) и пишет в лог

## Логи

**Управление → Системный журнал** при включённом `phonespamdetect_log_blocked`: поле, нормализованный номер, причина.

---

## FAQ

### Нужен composer install?

Нет. Библиотека уже в пакете.

### Номера куда-то уходят в интернет?

Нет, всё на сервере через `giggsey/libphonenumber-for-php`.

### Несколько стран в allowed_regions?

Да: `RU,KZ,BY` и т.д.

### Пустой allowed_regions?

Любой валидный номер. По стране не режем, по формату — да.

### RU и +7 — это одно и то же?

Нет. В настройках пишите ISO: `RU`, `KZ`, `BY`. `+7` — это код линии, не настройка дополнения.

### CAPTCHA?

Добавьте в preHooks рядом с `phoneSpamBlock`. С CrawlerDetect обычно так: `crawlerDetectBlock,phoneSpamBlock,recaptcha`.

### AjaxForm?

PhoneSpamDetect заточен под FormIt. Если AjaxForm на бэкенде всё равно зовёт FormIt — добавьте `phoneSpamBlock` туда.

### SendIt?

Да. В пресете `'preHooks' => 'phoneSpamBlock'`. Подробнее в [разделе про SendIt](integration#sendit).

### MODX 2?

Нет, только 3.x.

### База спамеров, HLR, внешний скоринг?

В этой версии нет. Только libphonenumber: формат, страна, E.164.
