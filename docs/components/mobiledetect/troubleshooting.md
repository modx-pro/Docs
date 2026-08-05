---
title: Решение проблем
---
# Решение проблем

Типичные проблемы MobileDetect и способы устранения.

## Контент не меняется между desktop и mobile

**Проверьте:**

1. Плагин **MobileDetect** включён, `md_disable_plugin = Нет`
2. Для HTML-тегов — разметка `<standard>`, `<mobile>` в **выводе страницы** (после парсинга MODX), событие `OnWebPagePrerender` срабатывает
3. Для Fenom — установлен **pdoTools**, шаблон парсится через Fenom (`pdoToolsOnFenomInit`)
4. Cookie с прошлым режимом: откройте `?browser=detect` или очистите cookie `browser`

## Fenom-блоки всегда пустые

**Возможные причины:**

1. **Нет pdoTools** — блоки `{mobile}`, `{desktop}` регистрируются только на `pdoToolsOnFenomInit`
2. **Плагин отключён** — `md_disable_plugin = Да`
3. **Статический кэш Fenom** — убедитесь, что pdoTools парсит шаблон на каждый запрос или тип устройства учитывается в ключе кэша
4. **Неверный блок** — `{mobile}` не показывается на desktop; `{desktop}` не показывается на телефоне

## Desktop site в мобильном браузере

Chrome и Safari могут отправлять desktop User-Agent. MobileDetect смотрит на UA и заголовки: результат будет `standard`.

Решение: принудительный режим `?browser=mobile` или переключатель `tplMobileDetectSwitch`.

## Cookie режима не сохраняется

Cookie не пишется:

- в CLI (cron, консольные скрипты);
- после отправки заголовков ответа (`headers_sent()`);
- при `md_use_cookie = Нет`.

Проверьте настройки cookie MODX: `session_cookie_path`, `session_cookie_domain`, `session_cookie_secure`.

## Сниппет всегда возвращает одно значение

1. Вызывайте **некэшированным**: `[[!MobileDetect]]`, не `[[MobileDetect]]`
2. Параметр `&input` должен совпадать с текущим типом: `standard`, `tablet`, `mobile`
3. Cookie мог зафиксировать другой режим — сбросьте через `?browser=detect`

## HTML-теги: сниппет внутри блока всё равно выполняется

Ожидаемое поведение. Плагин фильтрует HTML **после** парсинга MODX. Сниппеты в скрытых блоках уже отработали.

Используйте Fenom-модификатор `{if 'mobile' | mobiledetect}` или Fenom-блоки.

## Обновление с 2.0.x на 2.1.0-pl

| Изменение | Действие |
| --- | --- |
| PHP 8.2+ | Обновите PHP на хостинге |
| Класс детектора | `Detection\MobileDetect` вместо `\Mobile_Detect` |
| API сервиса | `resolveDevice()`, `getDeviceType()`, `isMobile()`, `isTablet()`, `isDesktop()` |
| Fenom | Исправлены блоки и утечка памяти при повторной регистрации |

Кастомный код с `$md->getDetector()` обновите под [mobiledetectlib 4.x](https://github.com/serbanghita/Mobile-Detect).

## Версия на modstore vs документация

На [modstore.pro](https://modstore.pro/packages/utilities/mobiledetect) может быть опубликована **2.0.2-pl**, а документация описывает **2.1.0-pl** из [GitHub](https://github.com/modx-pro/MobileDetect). Фичи 2.1.0 (модификатор Fenom, `tplMobileDetectSwitch`, PHP API) доступны после установки актуального transport.

## Часто задаваемые вопросы

### Нужен ли composer install на сервере?

**Нет.** `vendor/` входит в transport-пакет.

### Работает ли с MODX 2.8?

Да. Transport собирается для MODX 2.8+ и 3.x.

### Нужен ли отдельный контекст `mobile`?

Нет. MobileDetect фильтрует контент на странице, без редиректа и без второго контекста.

### Можно ли отключить только HTML-теги, оставив Fenom?

Отдельной настройки нет. При `md_disable_plugin = Да` отключается весь плагин. HTML-теги просто не используйте в разметке.

## Связанные разделы

- [Быстрый старт](quick-start)
- [Интеграция](integration)
- [Системные настройки](settings)
