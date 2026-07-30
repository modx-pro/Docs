---
title: Системные настройки
---
# Системные настройки

Настройки компонента имеют namespace `mobiledetect` и area `md_main`.

**Где изменить:** **Управление → Системные настройки** — отфильтруйте по namespace `mobiledetect`.

При обновлении пакета существующие значения **не перезаписываются** (transport создаёт ключи только при первой установке).

## Плагин

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `md_disable_plugin` | combo-boolean | `Нет` | Отключить плагин MobileDetect |

При `Да` не работают HTML-теги, Fenom-блоки, плейсхолдер `mobiledetect.device` и cookie.

## Cookie и режим планшета

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `md_use_cookie` | combo-boolean | `Да` | Запоминать выбранный режим в cookie |
| `md_tablet_is_standard` | combo-boolean | `Нет` | Считать планшеты desktop: для HTML-тегов выводить контент `<standard>` |

Cookie использует имя из `md_force_browser_variable` (по умолчанию `browser`). Запись пропускается в CLI и после отправки заголовков ответа.

## GET-параметры принудительного режима

| Ключ | По умолчанию | Описание |
| --- | --- | --- |
| `md_force_browser_variable` | `browser` | Имя GET-параметра |
| `md_force_browser_standard` | `standard` | Значение для desktop |
| `md_force_browser_tablet` | `tablet` | Значение для tablet |
| `md_force_browser_mobile` | `mobile` | Значение для mobile |
| `md_force_browser_detect` | `detect` | Сброс cookie и автоопределение |

Пример URL при настройках по умолчанию:

```
https://example.com/page?browser=mobile
https://example.com/page?browser=detect
```

## HTML-теги

| Ключ | По умолчанию | Описание |
| --- | --- | --- |
| `md_standard_node` | `standard` | Тег контента для desktop |
| `md_tablet_node` | `tablet` | Тег контента для tablet |
| `md_mobile_node` | `mobile` | Тег контента для mobile |

Плагин ищет пары `<tag>...</tag>` в HTML вывода страницы на `OnWebPagePrerender`.

## Связанные разделы

- [Интеграция](integration) — как настройки влияют на Fenom и HTML-теги
- [Быстрый старт](quick-start) — первый запуск
- [Решение проблем](troubleshooting) — cookie и кэш
