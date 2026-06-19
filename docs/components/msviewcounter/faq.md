---
title: FAQ
description: Частые вопросы по msViewCounter — установка, просмотры, online, режимы
---

# FAQ

## Общие

### Работает ли с MiniShop2?

Нет. Только **MiniShop3** и MODX 3.

### Нужен ли composer install на сервере?

Нет. Transport-пакет содержит нужные файлы. Для установки через MODX composer на сервере не нужен.

### Нужен ли CrawlerDetect?

Нет. Без [CrawlerDetect](https://modstore.pro/packages/other/crawlerdetect) работает встроенный fallback по `User-Agent`. С CrawlerDetect фильтрация точнее.

### Чем msViewCounter отличается от TV «просмотры»?

Компонент ведёт агрегат в БД, считает active-сессии с heartbeat, фильтрует ботов, поддерживает режимы `boost`/`fake`, дедупликацию по сессии и готовый UI. Обычный TV не даёт live-online и batch-очистку сессий.

## Установка

### Блок не выводится

Проверьте:

1. Сниппет `msViewCounter` установлен.
2. В вызове передан **`pid`** > 0.
3. Чанк из **`tpl`** существует.
4. Кэш MODX очищен.
5. Вызов **некэшированный** (`[[!...]]`).

### CSS не подключается

1. На странице есть вызов `[[!msViewCounter]]`.
2. В HTML есть `/assets/components/msviewcounter/css/viewcounter.css`.
3. Файл существует в `assets/components/msviewcounter/css/`.
4. Кэш MODX очищен.

Сниппет сам регистрирует CSS при выводе счётчика.

## Просмотры и online

### Просмотры не растут

1. Ресурс — **`msProduct`** или страница товара MiniShop3.
2. Плагин **`msViewCounterTrack`** включён и на **`OnLoadWebDocument`**.
3. Режим не **`fake`**.
4. **`dedup_session`** — refresh в той же сессии не увеличивает total (это ожидаемо).
5. **`block_bots`** не отфильтровал ваш `User-Agent` (отключите временно для проверки).

### Online равен 0

1. **`msviewcounter_show_online`** включён.
2. Режим не **`fake`**.
3. **`viewcounter.js`** подключился на странице товара.
4. Connector доступен: `assets/components/msviewcounter/connector.php`.
5. **`online_ttl`** > **`heartbeat_interval`**.

### Почему в fake не подключается viewcounter.js?

Режим **`fake`** не пишет active-сессии в БД. Heartbeat нужен только **`real`** и **`boost`**.

### В fake у нескольких товаров одинаковый online

1. **`fake_online_min`** < **`fake_online_max`**.
2. После смены **`fake_salt`** значения пересчитываются.
3. Очистите кэш MODX.

Компонент распределяет fake-online по ID товара и salt.

## Тексты и локализация

### Как изменить «Этот товар просмотрели…»?

Измените записи лексикона **`msviewcounter`**:

- `msviewcounter_total_text`
- `msviewcounter_online_text`
- `msviewcounter_view_word_1` / `_2` / `_5`
- `msviewcounter_person_word_1` / `_2` / `_5`

## Удаление пакета

### Что будет при uninstall?

Системные настройки удаляются. Таблицы **`msviewcounter_totals`** и **`msviewcounter_active`** **сохраняются**, чтобы не потерять статистику.

## См. также

- [Быстрый старт](quick-start)
- [Интеграция](integration)
- [Системные настройки](settings)
