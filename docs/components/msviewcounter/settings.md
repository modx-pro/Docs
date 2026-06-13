---
title: Системные настройки
description: Ключи msviewcounter_* — режимы, online, boost, fake, боты
---

# Системные настройки

Все ключи в пространстве имён **`msviewcounter`**. Области: **msviewcounter_main**, **msviewcounter_boost**, **msviewcounter_fake**.

**Система → Системные настройки** → фильтр `msviewcounter`.

## Основные (msviewcounter_main)

| Ключ | По умолчанию | Описание |
|------|--------------|----------|
| `msviewcounter_mode` | `real` | Режим: `real`, `boost` или `fake` |
| `msviewcounter_show_total` | Да | Показывать строку «Этот товар просмотрели…» |
| `msviewcounter_show_online` | Да | Показывать строку «Сейчас смотрят…» |
| `msviewcounter_online_ttl` | `120` | Сколько секунд посетитель считается active |
| `msviewcounter_heartbeat_interval` | `30` | Интервал heartbeat-запросов (сек) |
| `msviewcounter_cleanup_interval` | `300` | Интервал очистки устаревших active-сессий (сек) |
| `msviewcounter_cleanup_batch_limit` | `1000` | Максимум строк за одно удаление в `msviewcounter_active` |
| `msviewcounter_dedup_session` | Да | Не увеличивать total повторно в той же сессии |
| `msviewcounter_block_bots` | Да | Исключать ботов из записи статистики |

### msviewcounter_mode

| Значение | Поведение |
|----------|-----------|
| `real` | Реальные просмотры и active-сессии в БД, на витрине — без преобразований |
| `boost` | Запись в БД как в `real`, на витрине — формулы с base, multiplier и дневным jitter |
| `fake` | Синтетические числа по hash(pid + salt), **без записи в БД** и **без heartbeat JS** |

Подробное описание каждого режима, формулы и примеры: [Интеграция — режимы работы](integration#режимы-работы).

### online_ttl и heartbeat_interval

`online_ttl` должен быть **больше** `heartbeat_interval`, иначе сессия успеет «протухнуть» между ping-запросами. Рекомендуемое соотношение: TTL в 3–4 раза больше интервала (по умолчанию 120 / 30).

## Boost (msviewcounter_boost)

Используются при `msviewcounter_mode = boost`. Raw-данные берутся из БД (как в `real`), на витрине применяются формулы — см. [Интеграция — boost](integration#boost--реальные-данные-усиленный-вывод).

| Ключ | По умолчанию | Описание |
|------|--------------|----------|
| `msviewcounter_boost_total_base` | `0` | Минимум total в выводе |
| `msviewcounter_boost_total_multiplier` | `1` | Множитель реального total |
| `msviewcounter_boost_total_jitter_max` | `0` | Максимальный стабильный дневной разброс total |
| `msviewcounter_boost_online_base` | `1` | Минимум online в выводе |
| `msviewcounter_boost_online_jitter_max` | `2` | Максимальный стабильный дневной разброс online |

## Fake (msviewcounter_fake)

Используются при `msviewcounter_mode = fake`. Числа считаются детерминированно по ID товара и salt — см. [Интеграция — fake](integration#fake--синтетика-без-бд).

| Ключ | По умолчанию | Описание |
|------|--------------|----------|
| `msviewcounter_fake_total_min` | `50` | Минимум синтетических просмотров |
| `msviewcounter_fake_total_max` | `500` | Максимум синтетических просмотров |
| `msviewcounter_fake_online_min` | `1` | Минимум синтетического online |
| `msviewcounter_fake_online_max` | `8` | Максимум синтетического online |
| `msviewcounter_fake_salt` | `msviewcounter` | Соль для стабильных значений по ID товара |

Значения привязаны к ID товара и salt: обновление страницы не меняет числа. Смена `fake_salt` пересчитывает все fake-значения.

## Рекомендуемые профили

**Честная статистика на рабочем магазине**

- `msviewcounter_mode` = `real`
- `show_total` и `show_online` = Да
- `dedup_session` = Да, `block_bots` = Да

**Новый магазин без истории**

- `msviewcounter_mode` = `fake`
- Настроить диапазоны `fake_total_*` и `fake_online_*`

**Реальные данные с минимальной базой**

- `msviewcounter_mode` = `boost`
- `boost_total_base` > 0 и/или `boost_online_base` ≥ 1
- Небольшой `boost_online_jitter_max`, например `2`

**Только просмотры, без online**

- `show_total` = Да, `show_online` = Нет
- Heartbeat JS не подключается

## Лексикон текстов

Тексты «Этот товар просмотрели…» и «Сейчас смотрят…» берутся из лексикона `msviewcounter`:

| Ключ | Назначение |
|------|------------|
| `msviewcounter_total_text` | Шаблон строки total |
| `msviewcounter_online_text` | Шаблон строки online |
| `msviewcounter_view_word_*` | Склонение «раз / раза / раз» |
| `msviewcounter_person_word_*` | Склонение «человек / человека / человек» |

## См. также

- [Быстрый старт](quick-start)
- [Интеграция](integration)
- [FAQ](faq)
