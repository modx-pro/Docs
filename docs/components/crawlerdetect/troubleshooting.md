---
title: Решение проблем
---
# Решение проблем

## Форма не блокируется ботами

1. `crawlerDetectBlock` указан в `&preHooks` вызова FormIt.
2. Форма отправляется через FormIt, а не через другой обработчик.
3. Для FetchIt: на странице, которую вызывает FetchIt, в FormIt есть `crawlerDetectBlock` в preHooks.
4. Для SendIt: в пресете есть `preHooks` с `crawlerDetectBlock`.

Проверка: отправьте форму с User-Agent бота (например `Googlebot`) через инструменты разработчика или curl.

## Сниппет isCrawler всегда возвращает 0

1. **Кэш.** Вызывайте `[[!isCrawler]]` без кэша. С кэшем результат один на всех посетителей.
2. **Нет `vendor/autoload.php`.** Сервис создаётся, `isCrawler()` возвращает «не бот», в журнал ничего не пишется.
3. **Исключение `services->get`.** В журнал пишется ERROR, `isCrawler` возвращает `0`. PreHook `crawlerDetectBlock` в этом случае **пропускает** отправку формы.

## Сообщение при блокировке не показывается

1. В шаблоне формы есть `[[+fi.validation_error_message]]` (MODX) или `{$modx->getPlaceholder('fi.validation_error_message')}` (Fenom).
2. Другие хуки FormIt не перезаписывают этот плейсхолдер.

## Ложные срабатывания (человека блокируют)

Ложные срабатывания часто вызываются нестандартным User-Agent.

1. Временно отключите `crawlerDetectBlock` или проверьте логи.
2. Пришлите User-Agent в [репозиторий CrawlerDetect](https://github.com/Ibochkarev/CrawlerDetect). Библиотека [JayBizzle/Crawler-Detect](https://github.com/JayBizzle/Crawler-Detect) обновляется.

## Просмотр логов

**Управление** → **Системный журнал**. При включённой настройке `crawlerdetect_log_blocked` заблокированные попытки попадают в лог. Строка: `HTTP_USER_AGENT` не длиннее 200 символов. Заголовки `HTTP_FROM` и `HTTP_SEC_CH_UA` в журнал не пишутся.
