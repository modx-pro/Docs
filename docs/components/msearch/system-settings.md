# Системные настройки

Все настройки компонента находятся в пространстве имён **`msearch`** и имеют префикс **`mse_`**. В админке они сгруппированы по трём областям: **Индексация**, **Поиск**, **Фронтенд**.

## Индексация (`mse_index`)

| Ключ | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `mse_index_fields` | textfield | `pagetitle:3,longtitle:2,description:2,introtext:2,content:1` | Поля `modResource` для индексации с весами. Используется `ResourceAdapter::getIndexableFields()` |
| `mse_index_fields_product` | textfield | `pagetitle:3,longtitle:2,description:2,introtext:2,article:3` | Поля для индексации товаров `msProduct` (miniShop3). Используется `MsProductAdapter::getIndexableFields()`. Поддерживает `article` из `msProductData` |
| `mse_index_min_word_length` | numberfield | `3` | Минимальная длина слова для индексации. Слова короче — игнорируются. Используется в `Indexer::extractWords()` и `Searcher::splitQuery()` |
| `mse_index_split_words` | textfield | `#\s\|[,.:;!?"'«»„"()\[\]{}<>]#u` | Регулярное выражение для разбиения текста на слова при индексации |
| `mse_use_scheduler` | combo-boolean | `0` | Использовать MODX Scheduler для отложенной фоновой индексации при сохранении ресурсов. Требует установленного компонента Scheduler |

### Формат `mse_index_fields` / `mse_index_fields_product`

Список полей через запятую, каждое поле — `имя:вес`:

```
pagetitle:3,longtitle:2,description:2,introtext:2,content:1
```

Вес влияет на ранжирование результатов: совпадение в поле с весом `3` даёт в 3 раза больший вклад в score, чем совпадение в поле с весом `1`.

Поддерживаются:
- Обычные поля `modResource` (`pagetitle`, `longtitle`, `description`, `introtext`, `content`, `alias` и т.д.).
- TV-поля с префиксом `tv_` или `tv.` (например, `tv_color:2` или `tv.tags:1`).
- Для `mse_index_fields_product` — поля `msProductData` (например, `article`).

::: warning Кэширование адаптеров
Изменение настройки требует переиндексации — старые записи в индексе сформированы по предыдущему списку полей.
:::

## Поиск (`mse_search`)

| Ключ | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `mse_search_split_words` | textfield | `#\s+#u` | Регулярное выражение для разбиения поискового запроса на слова. Обычно проще, чем при индексации (только пробелы) |
| `mse_search_exact_match_bonus` | numberfield | `10` | Дополнительный вес результата, если в `mse_intro` найдено точное вхождение всего запроса целиком |
| `mse_search_like_match_bonus` | numberfield | `3` | Дополнительный вес для результатов, найденных только через LIKE-fallback (когда слов нет в индексе) |
| `mse_search_all_words_bonus` | numberfield | `5` | Дополнительный вес, если в документе найдены **все** слова запроса (а не только часть) |
| `mse_suggest_min_query_length` | numberfield | `2` | Минимальная длина запроса для срабатывания автокомплита. Запросы короче — `/search/suggest` отвечает пустым массивом без обращения к индексу |

### Как работают бонусы

Базовый score результата — сумма `(weight_поля × count_совпадений)` по всем найденным словам. Бонусы добавляются сверху:

| Сценарий | Прибавка к score |
|----------|------------------|
| Точное вхождение полной фразы | `+exact_match_bonus` |
| Все слова запроса найдены в документе | `+all_words_bonus` |
| Документ найден только LIKE-поиском (нет в индексе) | `+like_match_bonus` |

Увеличивая `exact_match_bonus` и `all_words_bonus`, вы повышаете «качественные» результаты над частичными совпадениями. Уменьшая `like_match_bonus` — снижаете влияние LIKE-результатов на топ выдачи.

## Фронтенд (`mse_frontend`)

| Ключ | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `mse_frontend_css` | textfield | `[[++assets_url]]components/msearch/css/web/msearch.css` | URL CSS-файла, который регистрирует `mSearchForm`. Пустое значение — CSS не подключается |
| `mse_frontend_js` | textfield | `[[++assets_url]]components/msearch/js/web/msearch.js` | Зарезервировано; в текущей реализации `mSearchForm` использует жёстко прописанный layered-стек из 6 файлов (см. ниже). Настройка не подключается автоматически |

### Кастомизация CSS

Для замены стилей — скопируйте файл в свою тему и укажите путь:

```
mse_frontend_css = [[++assets_url]]templates/mytheme/css/my-msearch.css
```

### Замечание о `mse_frontend_js`

Настройка унаследована от mSearch2, где весь JS был одним файлом. После layered-архитектуры (1.2.0+) сниппет `mSearchForm` регистрирует шесть отдельных файлов жёстким кодом. Кастомизация JS-стека через эту настройку не работает.

Возможные пути расширения JS-поведения без изменения стека:
- Подписаться на хуки `msearchHooks` в своём `<script>` после загрузки наших файлов (см. [JavaScript API](/components/msearch/javascript-api)).
- Установить свой плагин и зарегистрировать дополнительные скрипты через `OnWebPagePrerender`.

Реабилитация настройки запланирована — см. [issue #6](https://github.com/biz87/mSearch/issues/6).

## Опциональные настройки (не регистрируются автоматически)

Эти настройки читаются кодом, но **не создаются** при установке пакета. При необходимости создайте их вручную через **System Settings → New Setting** в админке.

### `mse_cors_origin`

| Тип | По умолчанию | Где читается |
|-----|--------------|--------------|
| textfield | `''` (пусто) | `assets/components/msearch/api.php` |

Управляет CORS-политикой публичного API (`api.php`):

- **Пустое значение** (default) — разрешены только same-origin запросы. Это безопасный режим для типичного сайта.
- **Конкретный origin** (например, `https://my-spa.example.com`) — добавляется заголовок `Access-Control-Allow-Origin: <значение>`, разрешая cross-origin запросы только из указанного источника.

Используется при интеграции mSearch с отдельным SPA-фронтендом на другом домене.

::: warning Cookies при cross-origin
Конфигурация autocomplete (`tpl`, `limit`, `element` и т.д.) хранится в **кэше MODX** под `formId`, а не в куках, поэтому проблем с `withCredentials` обычно не возникает. Но если SPA-клиент не вызывает сниппет `mSearchForm` для регистрации конфига — он работает в headless-режиме с дефолтами. См. [Сниппет mSearchForm → Headless-режим](/components/msearch/snippets/msearchform#headless-режим).
:::

## Резюме по областям

```
Индексация
├── mse_index_fields              — поля modResource с весами
├── mse_index_fields_product      — поля msProduct с весами
├── mse_index_min_word_length     — минимальная длина слова
├── mse_index_split_words         — regex разбиения текста
└── mse_use_scheduler             — фоновая индексация через Scheduler

Поиск
├── mse_search_split_words        — regex разбиения запроса
├── mse_search_exact_match_bonus  — бонус за точную фразу
├── mse_search_like_match_bonus   — бонус за LIKE-fallback
├── mse_search_all_words_bonus    — бонус за все слова
└── mse_suggest_min_query_length  — минимум символов для автокомплита

Фронтенд
├── mse_frontend_css              — URL CSS-файла
└── mse_frontend_js               — legacy (не используется)

Опционально (создаётся вручную)
└── mse_cors_origin               — CORS origin для публичного API
```
