---
title: Системные настройки
---
# Системные настройки

Ключи: `crawlerdetect_*`. Пространство имён **crawlerdetect**. Точка в `crawlerdetect.` есть только у плейсхолдера `placeholderPrefix`. У системных настроек её нет.

Путь: **Система → Системные настройки**, фильтр по пространству имён `crawlerdetect`.

## Таблица настроек

| Настройка | Описание | По умолчанию |
|-----------|----------|--------------|
| `crawlerdetect_block_message` | Текст при блокировке формы ботом | «Не удалось отправить форму. Попробуйте позже.» |
| `crawlerdetect_log_blocked` | Логировать заблокированные отправки в системный журнал MODX | Да |

Сообщение пишется в `[[+fi.validation_error_message]]` и в ошибку FormIt с ключом `crawlerdetect` (`$hook->addError`). Если ключа `crawlerdetect_log_blocked` нет в БД, хук не пишет лог (запасной вариант `false`, issue [#2](https://github.com/Ibochkarev/CrawlerDetect/issues/2)).

## Свойства сниппета isCrawler

| Свойство | Описание | По умолчанию |
|----------|----------|--------------|
| **userAgent** | Строка для проверки. Пусто: заголовки JayBizzle (`HTTP_USER_AGENT`, `HTTP_FROM`, `HTTP_SEC_CH_UA` и др.) | — |
| **placeholderPrefix** | Префикс плейсхолдера для имени обнаруженного бота | `crawlerdetect.` |

Плейсхолдер `crawlerdetect.matches` (или с вашим префиксом) получает имя бота. Нужен для отладки.
