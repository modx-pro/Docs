---
title: Системные настройки
---
# Системные настройки

Настройки компонента имеют namespace `sendex` и префикс ключей `sendex_`.

**Где изменить:** **Управление → Системные настройки** — отфильтруйте по namespace `sendex`.

При обновлении пакета существующие значения настроек **не перезаписываются** (transport создаёт ключи только при первой установке).

## Настройки из пакета

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `sendex_export_fields` | textfield | `email` | Поля CSV-экспорта подписчиков через запятую: `id`, `user_id`, `email`, `username`, `fullname`, `phone`, `mobilephone` |
| `sendex_hide_export_button` | combo-boolean | `Нет` | Скрыть кнопку экспорта в менеджере |
| `sendex_confirm_email` | combo-boolean | `Да` | Гостям требуется подтверждение подписки по email |
| `sendex_confirm_rate_limit` | textfield | `0` | Минимальный интервал (секунды) между письмами подтверждения на один email; `0` — без ограничения |
| `sendex_csrf_protect` | combo-boolean | `Нет` | CSRF-токен для POST-форм подписки и отписки на сайте |

### Подтверждение email

При `sendex_confirm_email = Да` гость получает письмо со ссылкой активации (чанк `tpl.Sendex.activate`). Ссылка действует **30 минут** (зашито в коде сниппета).

При `sendex_confirm_email = Нет` email сохраняется сразу без подтверждения. Опечатки и спам-подписки сложнее отловить — включайте только если это осознанный компромисс.

### CSRF

При `sendex_csrf_protect = Да` формы получают скрытое поле `sendex_csrf` с токеном сессии. Проверка только для POST-запросов `subscribe` и `unsubscribe`.

## Настройки, которых нет в transport

Эти ключи код читает через `getOption`, но пакет их **не создаёт**. Добавьте вручную при необходимости.

| Ключ | По умолчанию в коде | Описание |
| --- | --- | --- |
| `sendex_queue_limit` | `100` | Максимум писем за один запуск cron (`core/components/sendex/cron/send.php`) |
| `sendex_core_path` | `{core_path}components/sendex/` | Путь к ядру компонента |
| `sendex_assets_url` | `{assets_url}components/sendex/` | URL assets компонента |

## Связанные настройки MODX

Sendex использует системные настройки MODX для резервных заголовков писем:

- `emailsender` — From, если в рассылке не указан `email_from`
- `site_name` — имя отправителя, если не указан `email_from_name`

## Параметры сниппета vs системные настройки

Некоторые параметры сниппета переопределяют системные настройки на уровне вызова:

| Параметр сниппета | Системная настройка |
| --- | --- |
| `&confirmEmail` | `sendex_confirm_email` |
| `&confirmRateLimit` | `sendex_confirm_rate_limit` |
| `&csrfProtect` | `sendex_csrf_protect` |

Пример переопределения CSRF для одной формы:

::: code-group

```fenom
{'!Sendex' | snippet : ['id' => 1, 'csrfProtect' => 1]}
```

```modx
[[!Sendex? &id=`1` &csrfProtect=`1`]]
```

:::

Подробнее: [Сниппет Sendex](snippets/sendex).
