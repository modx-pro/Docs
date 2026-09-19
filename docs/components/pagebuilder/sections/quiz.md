---
title: "Квиз"
description: "Многошаговый квиз с режимами lead, pricing и survey. FetchIt. Слой Pro."
---

# Квиз

Многошаговый квиз: ответы, контакты, опциональный расчёт цены, письмо на email. Сниппет `PageBuilderQuiz` из шаблона не вызывайте: его вызывает FetchIt из чанка секции. `PageBuilderFetchIt` рендерит форму через Fenom.

<!-- ![Квиз](/components/pagebuilder/screenshots/sections/quiz.png) -->

::: info
Требуются PageBuilder Pro и **FetchIt**.
:::

## Зачем квиз

- Сбор лида по шагам без отдельного конструктора квизов
- Режим `pricing` с живой суммой и `price_delta` у опций
- Режим `survey` без контактного шага по умолчанию

## Что нужно заранее

1. Transport **pagebuilderpro** и capability `pro`.
2. Дополнение **FetchIt**. Без него секция показывает «Форма временно недоступна. Установите FetchIt.»
3. Получатель: поле **Notify email** в секции или системная настройка `emailsender`.

## Добавить секцию

1. Ресурс → вкладка **Секции** → **Добавить секцию**.
2. В каталоге откройте **Quiz** (категория conversion).
3. Либо вкладка **Примеры** → пресет **Quiz: расчёт кухни** (`quiz-kitchen`): mode `pricing`, три шага, контакты, `quiz_key` = `kitchen`.

После вставки пресета поля можно править. Вкладка **Примеры** видна при `pagebuilder_catalog_examples_enabled`.

Если свои подписи кнопок не заданы, фронт берёт лексикон. Следующий шаг: «Дальше» (`pagebuilder_fe_quiz_next`). Пресет `quiz-kitchen` задаёт старт «Начать подбор».

## Типичные страницы

- Лендинг кухни: [Hero](hero) → [Features](features) → [Quiz](quiz) → [FAQ](faq)
- Услуги: [Pricing](pricing_table) → [Quiz](quiz) → [Contact form](contact_form)

## Похожие секции

- [Форма обратной связи](contact_form) для одной формы без шагов
- [CTA](cta) с ссылкой вместо сбора ответов

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `quiz` |
| Слой | Pro |
| Категория | конверсия (`conversion`) |
| Chunk | `pagebuilderpro_quiz` |
| Требования | pro, FetchIt |

## Поля в редакторе

### Mode (`mode`)

Тип [select](../fields/select#vyvod-v-section-data). `lead`: шаги и контакт. `pricing`: то же плюс сумма. `survey`: шаги, контакт по умолчанию выключен. Неизвестное значение обработчик считает `lead`.

### Cover

| Поле | Тип | Назначение |
| --- | --- | --- |
| `title`, `intro` | text / textarea | Обложка |
| `cover_image` | image | Опционально |
| `start_as_panel` | yesno | Cover как первая панель wizard с кнопкой Start |
| `start_label` | text | Текст кнопки на cover |
| `base_price`, `currency_suffix` | number / text | Только при `mode = pricing` |

### Steps (`steps`)

Тип [repeater](../fields/repeater#vyvod-v-section-data). Обязательное.

| Поле | Правило |
| --- | --- |
| `title` | Обязательно |
| `type` | `single` (radio), `multi` (checkbox), `text`, `info` |
| `required` | Пустой required-шаг блокирует Далее и submit. Для `info` игнорируется |
| `options` | Для `single` / `multi`: `label`, `image`, `price_delta` (в сумму только в `pricing`) |

POST: `answer[stepIndex]` или `answer[stepIndex][]`. В POST уходят индексы опций. В письме подставляются labels.

### Contact

| Поле | Правило |
| --- | --- |
| `contact_enabled` | Если не задано: вкл. для `lead`/`pricing`, выкл. для `survey` |
| `contact_fields` | Как у `contact_form`: `name`, `label`, `type`, `required`. Имя поля: `[a-z][a-z0-9_]*` |
| `consent_text` | Текст 152-ФЗ под полями (абзац, без checkbox) |
| `success_message`, `redirect_url` | После успеха. Редирект через 800 ms |
| `quiz_key` | Обязателен. POST `pb_quiz_key`. На странице ключи уникальны |
| `notify_email` | Получатель. Пусто → `emailsender` |

Ответы посетителя в `published_json` не пишутся. В JSON секции только схема.

### Labels

`submit_label`, `prev_label`, `next_label`, `contact_title`, `total_label` перекрывают лексикон `pagebuilder:frontend`.

## Сохранить и проверить

1. **Сохранить** ресурс MODX публикует `published_json`. Handler читает published, если `publishedRevision > 0`, иначе черновик.
2. В шаблоне уже должен быть `[[!PageBuilder]]`.
3. На фронте: шаги, прогресс, в `pricing` живой итог, контакт и **Отправить**.

## Что видит посетитель

Секция `pb-quiz` с wizard-панелями. AJAX через FetchIt → [PageBuilderQuiz](../snippets/PageBuilderQuiz).

## Письмо

Тема: `PageBuilder quiz ({quiz_key})`. Тело: ключ, mode, pagetitle, ответы, в `pricing` строка Estimate, контакты. Сумма: `base_price` + `price_delta` выбранных опций.

## Fallback

| Состояние | UI |
| --- | --- |
| FetchIt не установлен | Сообщение о недоступности формы |
| Honeypot | Тихий success без письма |
| Ошибка валидации | FetchIt error + переход к панели с ошибкой |
| Нет секции с `quiz_key` | `pagebuilder_fe_quiz_not_found` |

## JSON-определение

`PageBuilderPro/core/components/pagebuilderpro/sections/quiz.json`

Пресет: `.../sections/presets/quiz-kitchen.json`

## Связанные страницы

- [Форма обратной связи](contact_form)
- [Сниппет PageBuilderQuiz](../snippets/PageBuilderQuiz)
- [Каталог секций](index)
- [PageBuilder Pro](../pro)
