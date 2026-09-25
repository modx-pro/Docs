---
title: "Квиз"
description: "Многошаговый квиз с режимами lead, pricing и survey. FetchIt. Слой Pro."
---

# Квиз

Многошаговый квиз: ответы, контакты, опциональный расчёт цены, письмо на email. Сниппет `PageBuilderQuiz` из шаблона не вызывайте: его вызывает FetchIt из чанка секции. `PageBuilderFetchIt` рендерит форму через Fenom.

![Квиз](/components/pagebuilder/screenshots/sections/quiz.jpg)

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
| Требования | pro |
| `version` | `2` (схема секции в JSON) |
| `runtimeContext` | `true` (контекст страницы, см. [каталог](index)) |

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

Пресет: `.../sections/presets/quiz-kitchen.json`

## Шаблон chunk

Fenom chunk `pagebuilderpro_quiz`:

```fenom
{set $quizKey = $quiz_key|default:'quiz'}
{set $mode = $mode|default:'lead'}
{set $suffix = $currency_suffix|default:'₽'}
{set $contactOn = $contact_enabled_resolved|default:1}
{set $basePrice = $base_price|default:0}
{set $coverAsStep = $start_as_panel|default:0}
<section
  class="pb-section pb-section--quiz pb-quiz{if $cssClass} {$cssClass|escape}{/if}"
  data-pb-section="quiz"
  data-pb-quiz
  data-pb-quiz-mode="{$mode|escape}"
  data-pb-quiz-base="{$basePrice|escape}"
  data-pb-quiz-suffix="{$suffix|escape}"
  data-pb-quiz-contact="{if $contactOn}1{else}0{/if}"
  data-pb-quiz-cover="{if $coverAsStep}1{else}0{/if}"
  data-pb-quiz-required-msg="{$lex_step_required|escape}"
  {if $id} id="pb-{$id|escape}"{/if}
>
  <div class="pb-section__inner pb-quiz__inner">
    {if !$coverAsStep}
      {if $title}
        <h2 class="pb-heading pb-quiz__title">{$title|escape}</h2>
      {/if}
      {if $intro}
        <p class="pb-quiz__intro">{$intro|escape}</p>
      {/if}
      {if $cover_image}
        <div class="pb-quiz__cover">
            {include 'pagebuilder_partial_image' image=$cover_image alt=($title|default:'') class='pb-quiz__cover-image'}
        </div>
      {/if}
    {/if}

    {if !$fetchit_available}
      <p class="pb-quiz__fallback" role="status">{$lex_form_unavailable|escape}</p>
    {else}
      {'!PageBuilderFetchIt' | snippet : [
        'snippet' => 'PageBuilderQuiz',
        'form' => 'pagebuilderpro_quiz_form',
        'quiz_key' => $quizKey,
        'resource_id' => $resource_id|default:0,
        'successMessage' => ($success_message ?: $lex_success_default),
        'validationErrorMessage' => $lex_validation_error,
        'clearFieldsOnSuccess' => 0,
        'mode' => $mode,
        'base_price' => $basePrice,
        'currency_suffix' => $suffix,
        'contact_enabled_resolved' => $contactOn,
        'start_as_panel' => $coverAsStep,
        'title' => $title,
        'intro' => $intro,
        'cover_image' => $cover_image,
        'steps' => $steps,
        'contact_fields' => $contact_fields,
        'consent_text' => $consent_text,
        'submit_label' => $submit_label,
        'prev_label' => $prev_label,
        'next_label' => $next_label,
        'start_label' => $start_label,
        'contact_title' => $contact_title,
        'total_label' => $total_label,
        'lex_prev' => $lex_prev,
        'lex_next' => $lex_next,
        'lex_start' => $lex_start,
        'lex_submit' => $lex_submit,
        'lex_contact_title' => $lex_contact_title,
        'lex_answer_label' => $lex_answer_label,
        'lex_step_required' => $lex_step_required,
        'lex_total_prefix' => $lex_total_prefix,
        'lex_estimate_prefix' => $lex_estimate_prefix,
        'lex_field_required' => $lex_field_required,
        'lex_field_email' => $lex_field_email,
        'cssClass' => $cssClass,
        'id' => $id,
      ]}
    {/if}
  </div>
</section>
```

Fenom chunk `pagebuilderpro_quiz_form`:

```fenom
{set $quizKey = $quiz_key|default:'quiz'}
{set $mode = $mode|default:'lead'}
{set $suffix = $currency_suffix|default:'₽'}
{set $contactOn = $contact_enabled_resolved|default:1}
{set $basePrice = $base_price|default:0}
{set $prevText = $prev_label|default:$lex_prev}
{set $nextText = $next_label|default:$lex_next}
{set $submitText = $submit_label|default:$lex_submit}
{set $startText = $start_label|default:$lex_start}
{set $contactTitle = $contact_title|default:$lex_contact_title}
{set $totalPrefix = $total_label|default:($mode == 'pricing' ? $lex_estimate_prefix : $lex_total_prefix)}
{set $coverAsStep = $start_as_panel|default:0}
{set $requiredMsg = $lex_step_required|default:''}

<form class="pb-quiz__form" method="post" novalidate>
  <input type="hidden" name="pb_quiz_key" value="{$quizKey|escape}" />
  <input type="hidden" name="nospam" value="" tabindex="-1" autocomplete="off" aria-hidden="true" class="pb-quiz__honeypot pb-quiz__sr-only" />

  <div class="pb-quiz__message pb-quiz__message--success" data-success role="status"></div>
  <div class="pb-quiz__message pb-quiz__message--error" data-validation-error role="alert"></div>

  <div class="pb-quiz__progress" data-pb-quiz-progress hidden>
    <div
      class="pb-quiz__progress-track"
      role="progressbar"
      aria-valuemin="1"
      aria-valuenow="1"
      aria-valuemax="1"
      aria-labelledby="pb-{$quizKey|escape}-progress-label"
      data-pb-quiz-progress-meter
    >
      <div class="pb-quiz__progress-bar" data-pb-quiz-progress-bar style="width: 0%"></div>
    </div>
    <p class="pb-quiz__progress-label" id="pb-{$quizKey|escape}-progress-label" data-pb-quiz-progress-label></p>
  </div>

  {if $mode == 'pricing'}
    <p class="pb-quiz__total" data-pb-quiz-total aria-live="polite">
      {$totalPrefix|escape}
      <strong data-pb-quiz-total-value>{$basePrice|escape}</strong>
      <span>{$suffix|escape}</span>
    </p>
  {/if}

  <div class="pb-quiz__panels">
    {if $coverAsStep}
      <fieldset class="pb-quiz__panel pb-quiz__panel--cover" data-pb-quiz-panel="cover" data-pb-quiz-step-type="info" data-pb-quiz-required="0">
        {if $title}
          <legend class="pb-quiz__step-title" id="pb-{$quizKey|escape}-cover-title">{$title|escape}</legend>
        {else}
          <legend class="pb-quiz__sr-only" id="pb-{$quizKey|escape}-cover-title">{$startText|escape}</legend>
        {/if}
        {if $intro}
          <p class="pb-quiz__step-desc">{$intro|escape}</p>
        {/if}
        {if $cover_image}
          <div class="pb-quiz__cover">
            {include 'pagebuilder_partial_image' image=$cover_image alt=($title|default:'') class='pb-quiz__cover-image'}
          </div>
        {/if}
      </fieldset>
    {/if}

    {foreach $steps as $stepIndex => $step}
      {include 'pagebuilderpro_quiz_step'
        step=$step
        stepIndex=$stepIndex
        quizKey=$quizKey
        mode=$mode
        suffix=$suffix
        hideInitially=($coverAsStep || $stepIndex != 0)
        lex_answer_label=$lex_answer_label
        lex_step_required=$requiredMsg
      }
    {/foreach}

    {if $contactOn}
      <fieldset class="pb-quiz__panel" data-pb-quiz-panel="contact" hidden>
        <legend class="pb-quiz__step-title" id="pb-{$quizKey|escape}-contact-title">{$contactTitle|escape}</legend>
        <div class="pb-quiz__fields">
          {foreach $contact_fields as $field}
            {set $fname = $field.name|default:''}
            {set $flabel = $field.label|default:$fname}
            {set $ftype = $field.type|default:'text'}
            {set $frequired = $field.required|default:0}
            {set $fid = 'pb-' ~ $quizKey ~ '-' ~ $fname}
            {set $ferr = $fid ~ '-error'}
            <div class="pb-quiz__field" data-custom="{$fname|escape}">
              <label class="pb-quiz__label" for="{$fid|escape}">
                {$flabel|escape}{if $frequired}<span class="pb-quiz__required" aria-hidden="true">*</span>{/if}
              </label>
              {if $ftype == 'textarea'}
                <textarea
                  class="pb-quiz__control"
                  id="{$fid|escape}"
                  name="{$fname|escape}"
                  rows="3"
                  {if $frequired}required aria-required="true"{/if}
                ></textarea>
              {else}
                <input
                  class="pb-quiz__control"
                  id="{$fid|escape}"
                  type="{if $ftype == 'email'}email{elseif $ftype == 'phone'}tel{else}text{/if}"
                  name="{$fname|escape}"
                  {if $ftype == 'email'}autocomplete="email"{elseif $ftype == 'phone'}autocomplete="tel" inputmode="tel"{elseif $fname == 'name'}autocomplete="name"{/if}
                  {if $frequired}required aria-required="true"{/if}
                />
              {/if}
              <span class="pb-quiz__error" id="{$ferr|escape}" data-error="{$fname|escape}" hidden></span>
            </div>
          {/foreach}
        </div>
        {if $consent_text}
          <p class="pb-quiz__consent">{$consent_text|escape}</p>
        {/if}
      </fieldset>
    {/if}
  </div>

  <div class="pb-quiz__nav">
    <button class="pb-button pb-button--secondary pb-quiz__prev" type="button" data-pb-quiz-prev hidden>{$prevText|escape}</button>
    <button class="pb-button pb-quiz__next" type="button" data-pb-quiz-next data-pb-quiz-next-label="{$nextText|escape}" data-pb-quiz-start-label="{$startText|escape}">
      {if $coverAsStep}{$startText|escape}{else}{$nextText|escape}{/if}
    </button>
    <button class="pb-button pb-quiz__submit" type="submit" data-pb-quiz-submit hidden>{$submitText|escape}</button>
  </div>
</form>
```

Fenom chunk `pagebuilderpro_quiz_step`:

```fenom
{set $stepType = $step.type|default:'single'}
{set $stepRequired = $step.required|default:0}
{set $hidden = $hideInitially|default:($stepIndex != 0)}
{set $titleId = 'pb-' ~ $quizKey ~ '-step-' ~ $stepIndex ~ '-title'}
{set $errorId = 'pb-' ~ $quizKey ~ '-step-' ~ $stepIndex ~ '-error'}
<fieldset
  class="pb-quiz__panel{if $stepType == 'info'} pb-quiz__panel--info{/if}"
  data-pb-quiz-panel="step"
  data-pb-quiz-step="{$stepIndex}"
  data-pb-quiz-step-type="{$stepType|escape}"
  data-pb-quiz-required="{if $stepRequired && $stepType != 'info'}1{else}0{/if}"
  {if $hidden}hidden{/if}
>
  <legend class="pb-quiz__step-title" id="{$titleId|escape}">{$step.title|escape}{if $stepRequired && $stepType != 'info'}<span class="pb-quiz__required" aria-hidden="true">*</span>{/if}</legend>
  {if $step.description}
    <p class="pb-quiz__step-desc">{$step.description|escape}</p>
  {/if}

  {if $stepType == 'info'}
    {* informational block — no inputs *}
  {elseif $stepType == 'text'}
    <label class="pb-quiz__sr-only" for="pb-{$quizKey|escape}-step-{$stepIndex}">{$lex_answer_label|escape}</label>
    <textarea
      class="pb-quiz__control"
      id="pb-{$quizKey|escape}-step-{$stepIndex}"
      name="answer[{$stepIndex}]"
      rows="3"
      data-custom="step_{$stepIndex}"
      {if $stepRequired}required aria-required="true"{/if}
    ></textarea>
    <span class="pb-quiz__error" id="{$errorId|escape}" data-error="step_{$stepIndex}" hidden>{$lex_step_required|escape}</span>
  {else}
    <div class="pb-quiz__options" role="group" aria-labelledby="{$titleId|escape}" data-custom="step_{$stepIndex}">
      {foreach $step.options as $optIndex => $option}
        {include 'pagebuilderpro_quiz_option'
          option=$option
          optIndex=$optIndex
          stepIndex=$stepIndex
          stepType=$stepType
          stepRequired=$stepRequired
          mode=$mode
          suffix=$suffix
        }
      {/foreach}
    </div>
    <span class="pb-quiz__error" id="{$errorId|escape}" data-error="step_{$stepIndex}" hidden>{$lex_step_required|escape}</span>
  {/if}
</fieldset>
```

Fenom chunk `pagebuilderpro_quiz_option`:

```fenom
{set $optLabel = $option.label|default:''}
{set $optDelta = $option.price_delta|default:0}
<label class="pb-quiz__option">
  <input
    class="pb-quiz__option-input"
    type="{if $stepType == 'multi'}checkbox{else}radio{/if}"
    name="answer[{$stepIndex}]{if $stepType == 'multi'}[]{/if}"
    value="{$optIndex}"
    data-pb-quiz-delta="{$optDelta|escape}"
    {if $stepRequired && $stepType != 'multi'}required{/if}
  />
  <span class="pb-quiz__option-body">
    {if $option.image}
      {include 'pagebuilder_partial_image' image=$option.image alt=$optLabel class='pb-quiz__option-image'}
    {/if}
    <span class="pb-quiz__option-label">{$optLabel|escape}</span>
    {if $mode == 'pricing' && $optDelta != 0}
      <span class="pb-quiz__option-delta">{if $optDelta > 0}+{/if}{$optDelta|escape} {$suffix|escape}</span>
    {/if}
  </span>
</label>
```

## Связанные страницы

- [Форма обратной связи](contact_form)
- [Сниппет PageBuilderQuiz](../snippets/PageBuilderQuiz)
- [Каталог секций](index)
- [PageBuilder Pro](../pro)
