---
title: Решение проблем
---
# Решение проблем

Типичные проблемы при использовании CrawlerDetect и способы их устранения.

## Форма не блокируется ботами

**Проверьте:**

1. `crawlerDetectBlock` указан в `&preHooks` вызова FormIt.
2. Форма отправляется через FormIt (не через другой обработчик).
3. Для FetchIt — на странице, которую вызывает FetchIt, FormIt вызывается с `crawlerDetectBlock` в preHooks.
4. Для SendIt — в пресете указан `preHooks` с `crawlerDetectBlock`.

**Проверка:** отправьте форму с User-Agent бота (например, `Googlebot`) через инструменты разработчика (изменение заголовков) или через curl.

## Сниппет isCrawler всегда возвращает 0

**Возможные причины:**

1. **Кэширование** — убедитесь, что используете `[[!isCrawler]]` (без кэша). При кэше результат будет один и тот же для всех посетителей.
2. **Библиотека не загружена** — проверьте наличие `core/components/crawlerdetect/vendor/autoload.php`. При ошибке загрузки сниппет возвращает `0` (fail-open) и пишет в лог MODX.

## Сообщение при блокировке не показывается

**Проверьте:**

1. В шаблоне формы выводится `[[+fi.validation_error_message]]` (MODX) или `{$modx->getPlaceholder('fi.validation_error_message')}` (Fenom).
2. Плейсхолдер не перезаписывается другими хуками FormIt.

## Ложные срабатывания (человека блокируют)

Редко, но возможно при нестандартном User-Agent. Решение:

1. Временно отключите `crawlerDetectBlock` или проверьте логи.
2. Сообщите о проблеме (User-Agent) в [репозиторий CrawlerDetect](https://github.com/Ibochkarev/CrawlerDetect); библиотека [JayBizzle/Crawler-Detect](https://github.com/JayBizzle/Crawler-Detect) регулярно обновляется.

## Просмотр логов

**Управление** → **Системный журнал**. При включённой настройке `crawlerdetect_log_blocked` заблокированные попытки отправки форм записываются в лог.

---

## Часто задаваемые вопросы

### Нужно ли запускать composer install на сервере?

**Нет.** Зависимости уже входят в пакет. Установите CrawlerDetect через Менеджер пакетов — этого достаточно.

### Как обновить библиотеку JayBizzle/Crawler-Detect?

Обновляйте пакет CrawlerDetect через Менеджер пакетов. Новая версия дополнения содержит актуальную версию библиотеки. Отдельно обновлять библиотеку на сервере не нужно.

### Совместим ли CrawlerDetect с CAPTCHA?

Да. CrawlerDetect можно использовать вместе с reCAPTCHA или другими CAPTCHA: добавьте оба preHook в FormIt.

- **MODX:** ``&preHooks=`crawlerDetectBlock,recaptcha` ``
- **Fenom:** `'preHooks' => 'crawlerDetectBlock,recaptcha'`

CrawlerDetect сработает первым и отсечёт ботов до CAPTCHA.

### Работает ли с AjaxForm?

AjaxForm — альтернатива FormIt. CrawlerDetect интегрирован с FormIt. Если AjaxForm вызывает FormIt на сервере, добавьте `crawlerDetectBlock` в preHooks FormIt — защита будет работать.

### Работает ли с SendIt?

Да. SendIt использует FormIt; параметры задаются в пресетах. Добавьте в пресет `'preHooks' => 'crawlerDetectBlock'` — при блокировке ботом SendIt вернёт ошибку и покажет сообщение из настроек CrawlerDetect. См. [Интеграция → AJAX-форма (SendIt)](integration#ajax-форма-sendit).

### Поддерживается ли MODX 2.x?

Нет. Только MODX Revolution 3.x.

### Можно ли добавить свой User-Agent в чёрный список?

В текущей версии — нет. Используется только библиотека JayBizzle/Crawler-Detect. Расширение чёрного/белого списка — в планах на будущие версии.
