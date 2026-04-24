---
title: Подключение на сайте
---

# Подключение на сайте

Сниппеты выводятся в **чанке формы заказа** (например `tpl.msOrder`) или эквиваленте. Используйте **некэшированный** вызов, иначе скрипты не попадут на страницу при необходимости.

## Коннектор витрины

**URL:** `assets/components/mxdadata/connector-web.php` (в сниппетах подставляется абсолютный URL от `[[++assets_url]]`).

Переопределение: параметр сниппета **`connectorUrl`**.

Разрешённые действия (см. исходник коннектора): в т.ч. `Suggest/Address`, `Suggest/Party`, `Suggest/Name`, `Suggest/Email`, `Suggest/Bank`, `Party/FindById`, `Geolocate/Address`, `Tools/Version`.

## Имена полей формы MiniShop3 {#имена-полей-формы-minishop3}

`name` в форме должны совпадать с ожиданиями сниппетов и модели **msOrder.Address** (и полей Party для ИНН).

### Адрес (модель Address)

| `name` (форма) | Поле модели | Описание | Автозаполнение |
|----------------|------------|----------|----------------|
| `address_first_name` | first_name | Имя | — |
| `address_last_name` | last_name | Фамилия | — |
| `address_phone` | phone | Телефон | — |
| `address_email` | email | Email | — |
| `address_text_address` | text_address | Адрес (основное поле для подсказок) | Да |
| `address` | text_address | То же, альтернативное имя | Да |
| `address_fias_id` | fias_id | Код ФИАС (часто скрытое) | Да |
| `address_city` | city | Город | Да |
| `address_region` | region | Регион | Да |
| `address_index` | index | Почтовый индекс | Да |
| `address_street` | street | Улица | Да |
| `address_building` | building | Дом | Да |
| `address_room` | room | Квартира / офис | Да |

### Реквизиты юрлица (Party, ИНН)

| `name` (форма) | Описание | Автозаполнение |
|----------------|----------|----------------|
| `address_inn` | ИНН | Да (ввод) |
| `inn` | ИНН, альтернатива | Да |
| `address_company_name` | Наименование организации | Да |
| `company_name` | Альтернативное имя | Да |
| `address_kpp` | КПП | Да |
| `kpp` | Альтернатива | Да |
| `address_ogrn` | ОГРН | Да |
| `ogrn` | Альтернатива | Да |
| `address_legal_address` | Юридический адрес | Да |
| `legal_address` | Альтернатива | Да |

## Порядок с msRussianPost {#порядок-с-msrussianpost}

Для корректного пересчёта [доставки Почтой России](/components/msrussianpost/) после выбора подсказки:

1. Поля адреса и **подсказки mxDadata** (`mxDadataAddressSuggest` и при необходимости Party) — **выше** по разметке
2. Затем **msrpLexiconScript** → **msRussianPost** → чанки виджета Почты

После обновления адреса срабатывает кастомное событие **`mxdadata:order-address-updated`** — `russianpost.js` подписан на него и вызывает пересчёт, если выбрана доставка Почты России (хук `ms3Hooks.afterAddOrder` в ряде сценариев после `order/set` не вызывается).

## Демо чанка {#демо-чанка}

В пакете есть чанк **`tpl.mxdadata.msOrder`**: внизу — блок **«Демо mxDadata»** в `<details>`. В нём — поля Party (`#mxdadata-demo-inn` и реквизиты), контейнер **`#mxdadata-demo-universal`** для `mxDadataForm` (конфиг из чанка вроде **`chunk.mxdadata.demoFormSug`** через `suggestionsChunk`), плюс поле адреса для `mxDadataAddressSuggest`. В конце чанка вызываются три сниппета: `mxDadataAddressSuggest`, `mxDadataPartySuggest` (с `innInput` на демо-ИНН), `mxDadataForm`.

**Показ демо** в штатном чанке — **только если корзина не пуста** (ветка в шаблоне на непустую корзину). На экране «пустая корзина» демо **намеренно** не выводится: не подключаются скрипты и запросы к DaData.

Проверить все три сниппета на одной странице без товаров в корзине можно через тестовый шаблон в составе пакета (`mxdadata_test.tpl`, универсальная форма с префиксом `id` вроде `mxdadata_test_…` и явным `suggestions` / `suggestionsChunk`), либо вручную вставив сниппет с непустым `suggestions` / `suggestionsChunk` (без конфига в браузере будет пустой массив подсказок).

## Стили

Общие стили подсказок: `assets/components/mxdadata/css/web/suggest.css` (подключается хелпером вместе со сниппетами).

## Fenom

При **auto_escape** выводите сниппеты как **сырой HTML** (`|raw` / `{raw …}`), чтобы не экранировались `<script>`.

Примеры синтаксиса MODX и Fenom — в [сниппетах](snippets/) и в [mxDadataForm](snippets/mxDadataForm).
