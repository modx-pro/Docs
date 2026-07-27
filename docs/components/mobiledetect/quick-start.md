---
title: Быстрый старт
---
# Быстрый старт

За 5 минут: разный контент для desktop и mobile на одной странице.

## Шаг 1. Установка

1. Установите **MobileDetect** через **Extras → Installer** (см. [обзор](index#установка))
2. Проверьте, что плагин **MobileDetect** активен и `md_disable_plugin = Нет`
3. Очистите кэш MODX

## Шаг 2. Выберите способ вывода

| У вас есть pdoTools + Fenom | HTML-шаблон без Fenom |
| --- | --- |
| Fenom-блоки (шаг 3a) | HTML-теги (шаг 3b) |

## Шаг 3a. Fenom-блоки (рекомендуется)

В шаблоне или чанке, который парсит pdoTools через Fenom:

::: code-group

```fenom
{mobile}
  <p>Контент для телефона и планшета</p>
{/mobile}

{desktop}
  <p>Контент для desktop</p>
{/desktop}
```

```modx
[[!pdoPage?
  &element=`tplContent`
]]
```

:::

Блок `{mobile}` показывается при типе `mobile` **или** `tablet`. Для телефона без планшета используйте `{phone}` ([Интеграция](integration#fenom-блоки)).

## Шаг 3b. HTML-теги

В теле ресурса или шаблоне:

```html
<standard>
  <p>Контент для desktop</p>
</standard>
<mobile>
  <p>Контент для телефона</p>
</mobile>
```

Плагин на `OnWebPagePrerender` удалит лишние блоки перед отдачей страницы. Имена тегов настраиваются ключами `md_standard_node`, `md_mobile_node`, `md_tablet_node`.

::: warning
MODX-теги и сниппеты внутри HTML-блоков парсятся **до** фильтрации. Для условного вызова тяжёлых сниппетов используйте Fenom ([Интеграция](integration#способы-вывода)).
:::

## Шаг 4. Проверка

1. Откройте страницу с разметкой
2. На desktop виден блок `standard` / `{desktop}`
3. В эмуляторе mobile или с телефона — блок `mobile` / `{mobile}`
4. Принудительный режим: добавьте `?browser=mobile` к URL (имя параметра — `md_force_browser_variable`, по умолчанию `browser`)

## Шаг 5. Переключатель версий (опционально)

В пакете есть чанк **tplMobileDetectSwitch** — ссылки Desktop / Tablet / Mobile / Auto:

::: code-group

```fenom
{$modx->getChunk('tplMobileDetectSwitch')}
```

```modx
[[$tplMobileDetectSwitch]]
```

:::

## Чеклист

- [ ] Плагин **MobileDetect** включён
- [ ] Контент меняется на desktop и mobile
- [ ] `?browser=mobile` и `?browser=detect` работают
- [ ] Плейсхолдер `[[+mobiledetect.device]]` заполнен (`standard`, `tablet` или `mobile`)

## Что дальше

- [Системные настройки](settings) — cookie, планшеты как desktop, имена GET-параметров
- [Интеграция](integration) — модификатор Fenom, сниппет, PHP API
- [Сниппет MobileDetect](snippets/mobiledetect) — вызов без Fenom
