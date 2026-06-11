---
title: Системные настройки
---
# Системные настройки

Все ключи с префиксом `phonespamdetect.` в namespace **phonespamdetect**.

Открыть: **Система → Системные настройки**, фильтр `phonespamdetect`.

## Настройки

| Ключ | Что делает | По умолчанию |
|------|------------|--------------|
| `phonespamdetect_phone_field` | Имя поля с телефоном в форме | `phone` |
| `phonespamdetect_block_message` | Текст, когда форму не пустили | «Не удалось отправить форму. Укажите другой номер телефона.» |
| `phonespamdetect_log_blocked` | Писать отказы в системный журнал | Да |
| `phonespamdetect_validate_enabled` | Включить проверку через libphonenumber | Да |
| `phonespamdetect_default_region` | Страна для номеров без `+` | `RU` |
| `phonespamdetect_allowed_regions` | Какие ISO-коды пропускать. Пусто = все валидные | `RU` |
| `phonespamdetect_block_invalid` | Блокировать невалидный номер | Да |

Текст блокировки показывайте в шаблоне через `[[+fi.validation_error_message]]` или `{$modx->getPlaceholder('fi.validation_error_message')}`.

## allowed_regions

Формат — ISO-коды через запятую:

```text
RU
RU,KZ,BY
US,CA
```

Пробелы и переносы строк libphonenumber переживёт, но проще писать без пробелов.

Пустая настройка снимает ограничение по стране. Невалидные номера всё равно отрежутся, если включён `phonespamdetect_block_invalid`.

## default_region и allowed_regions — в чём разница

**default_region** нужен, когда пользователь пишет номер «по-русски», без `+7`. Например `8 (999) 123-45-67` при `RU` разберётся как российский.

**allowed_regions** — белый список стран после разбора. При `RU,KZ,BY` украинский или американский валидный номер уйдёт с причиной `region_not_allowed`.

## Параметры сниппетов

| Сниппет | Параметр | По умолчанию |
|---------|----------|--------------|
| `phoneSpamBlock` | `phoneField` | из `phonespamdetect_phone_field` |
| `isSpamPhone` | `phone` | — |
| `isSpamPhone` | `placeholderPrefix` | `phonespamdetect.` |

После `isSpamPhone` доступны плейсхолдеры: `normalized`, `reason`, `valid`, `region`, `e164` (с вашим префиксом).
