---
title: Системные настройки
description: Ключи namespace reactions — набор по умолчанию, идентификация, безопасность, webhooks
---

# Системные настройки

Все ключи с префиксом `reactions_` в namespace **reactions**.

Открыть: **Система → Системные настройки**, фильтр `reactions`.

## Основные

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `reactions_default_set` | text | `updown` | Набор, если сниппет не передаёт `&set` (`updown`, `github`, `full` или свой) |
| `reactions_full_types` | text | *(пусто)* | Подмножество типов для `set=full` (имена через запятую). Пусто — все 24 |
| `reactions_identity_strategy` | text | `ip_cookie` | Стратегия идентификации: `auth_only`, `ip`, `ip_cookie`, `session` |
| `reactions_allow_multiple` | combo-boolean | Нет | Несколько типов реакций на один объект (только если набор не `exclusive`) |
| `reactions_cache_handler` | text | `modx` | Обработчик кэша: `modx` или `redis` |

### Стратегии идентификации

| Значение | Поведение |
| --- | --- |
| `auth_only` | Только авторизованные; гости получают ошибку |
| `ip` | Отпечаток по хешу IP |
| `ip_cookie` | Cookie `reactions_fid` (32 hex), срок 1 год |
| `session` | Отпечаток по ID PHP-сессии |

Авторизованный пользователь всегда идентифицируется по `user_id`, независимо от стратегии.

Пример `reactions_full_types`:

```text
like,love,fire,star,clap,rocket,heart_eyes
```

## Безопасность

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `reactions_rate_limit` | number | `10` | Максимум реакций за окно времени |
| `reactions_rate_limit_window` | number | `60` | Длина окна rate limit в секундах |
| `reactions_block_bots` | combo-boolean | Да | Отклонять реакции от известных краулеров и ботов |

## Интеграции

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `reactions_webhooks_enabled` | combo-boolean | Нет | HTTP-колбэки после изменения реакций |
| `reactions_webhook_url` | text | *(пусто)* | URL webhook (JSON, совместим с Telegram / Discord / Slack) |
| `reactions_notify_authors` | combo-boolean | Нет | Сообщение автору ресурса через `modUserMessage` |

Подробнее: [Webhooks](webhooks), [События](events).
