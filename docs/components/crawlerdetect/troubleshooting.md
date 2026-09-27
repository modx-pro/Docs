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

Бывает при нестандартном User-Agent.

1. Временно отключите `crawlerDetectBlock` или проверьте логи.
2. Пришлите User-Agent в [репозиторий CrawlerDetect](https://github.com/Ibochkarev/CrawlerDetect). Библиотека [JayBizzle/Crawler-Detect](https://github.com/JayBizzle/Crawler-Detect) обновляется.

## Просмотр логов

**Управление** → **Системный журнал**. При включённой настройке `crawlerdetect_log_blocked` заблокированные попытки попадают в лог. Строка: `HTTP_USER_AGENT` не длиннее 200 символов. Заголовки `HTTP_FROM` и `HTTP_SEC_CH_UA` в журнал не пишутся.

## Часто задаваемые вопросы

### Нужно ли запускать composer install на сервере?

**Нет.** Зависимости уже в пакете. Установите CrawlerDetect через Менеджер пакетов.

### Как обновить библиотеку JayBizzle/Crawler-Detect?

Обновляйте пакет CrawlerDetect через Менеджер пакетов. В новой версии пакета уже новая библиотека. Отдельно на сервере её не обновляйте. В lockfile этой поставки стоит **jaybizzle/crawler-detect v1.3.11**.

### Совместим ли CrawlerDetect с CAPTCHA?

**Да.** Добавьте оба preHook в FormIt: CrawlerDetect и reCAPTCHA или другую CAPTCHA.

- **MODX:** ``&preHooks=`crawlerDetectBlock,recaptcha` ``
- **Fenom:** `'preHooks' => 'crawlerDetectBlock,recaptcha'`

CrawlerDetect стоит первым в списке и отсечёт ботов до CAPTCHA.

### Работает ли с AjaxForm?

AjaxForm это альтернатива FormIt. CrawlerDetect работает через FormIt. Если AjaxForm вызывает FormIt на сервере, добавьте `crawlerDetectBlock` в preHooks FormIt.

### Работает ли с SendIt?

**Да.** SendIt использует FormIt. Параметры задаются в пресетах. Добавьте в пресет `'preHooks' => 'crawlerDetectBlock'`. При блокировке ботом SendIt вернёт ошибку и покажет сообщение из настроек CrawlerDetect. См. [Интеграция → AJAX-форма (SendIt)](/components/crawlerdetect/integration#ajax-форма-sendit).

### Поддерживается ли MODX 2.x?

**Нет.** Только MODX Revolution 3.x.

### Можно ли добавить свой User-Agent в чёрный список?

**Нет.** Список задаёт библиотека JayBizzle/Crawler-Detect. Своего чёрного или белого списка в пакете нет.
