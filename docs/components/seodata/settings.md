# Настройки

Системные настройки лежат в пространстве имён `seodata`: **Настройки → Системные настройки**.

| Ключ | Назначение |
| --- | --- |
| `seodata.use_rte` | Текстовый редактор менеджера в поле шаблона контента |
| `seodata.product_where` | JSON-фильтр товаров при индексации, например `{"Data.discontinued":0}` |
| `seodata.index_chunk` | Сколько категорий обрабатывает один шаг индексации в панели |
| `seodata.keep_filled_on_empty` | При приоритете «компонент» не затирать поле ресурса, если шаблон вернул пустую строку |
| `seodata.fallback_empty_resource` | При приоритете «ресурс» подставлять шаблон, если штатное поле пустое |
| `seodata.always_append_page` | При `?page=N` дописывать шаблон номера страницы к title, pagetitle и description |
| `seodata.include_zero_price_in_count` | Включать товары с нулевой ценой в `{$count}` |
| `seodata.debug` | Писать в журнал ошибок строки `[SeoData debug]` |
| `seodata.morpher_token` | Токен [ws3.morpher.ru](https://www.morpher.ru/ws3/) для кнопок генерации словоформ |

Обновление пакета эти значения не перезаписывает.

## Отладка

Если правило не срабатывает на сайте:

1. Включите `seodata.debug`.
2. Очистите кэш MODX.
3. Откройте страницу на витрине.
4. Откройте **Отчёты → Журнал ошибок**.

Строки SeoData начинаются с `[SeoData debug]`:

| Метка | Что означает |
| --- | --- |
| `plugin:OnLoadWebDocument` | Плагин сработал на этой странице |
| `resolve:personal` / `resolve:common` | Какое правило выбрано |
| `process:rule` | Шаблоны H1, title, description и content этого правила |
| `process:output` | Текст после Fenom и приоритета данных |
| `plugin:apply` | Поля записаны в ресурс |
| `plugin:skip` / `process:no-rule` | Правило не подошло, ресурс не менялся |
| `placeholders:fields` | Какие свои поля прочитаны |
| `placeholders:words` | Сколько словоформ загружено |
| `resolve:wrong-class` | Строка правила загрузилась не как шаблон SeoData. Обновите пакет: установщик переименует старую колонку `class_key` в `resource_class` |

Сохранения из панели тоже попадают в журнал: `mgr:template-update` с полями `active` и `resource_class`.

После проверки выключите `seodata.debug`, иначе журнал растёт на каждый просмотр страницы.
