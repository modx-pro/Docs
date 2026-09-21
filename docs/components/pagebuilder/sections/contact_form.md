---
title: "Форма обратной связи"
description: "Форма с настраиваемым набором полей через FetchIt. Слой Pro."
---

# Форма обратной связи

Вы собираете набор полей в инспекторе (text, email, phone, textarea, select, radio, checkbox, date), задаёте **Ключ формы** и текст после отправки. Отправка идёт через **FetchIt** и сниппет `PageBuilderContactForm`. Из шаблона handler не вызывайте.

![Форма обратной связи](/components/pagebuilder/screenshots/sections/contact_form.jpg)

::: info
Требуются PageBuilder Pro и **FetchIt**.
:::

## Что даёт форма в PageBuilder

- Набор полей собираете в repeater, не в коде формы
- `form_key` стабильный id POST (`pb_form_key`)
- Сообщение об успехе и redirect настраиваются в инспекторе
- Персональные данные в `published_json` не пишутся

## Типичные места

- Для заявки с лендинга
- Для обратной связи на странице контактов
- Для лид-магнита: скачать PDF после email

## Примеры страниц

- Лендинг: [Hero](hero) → [Features](features) → [Contact form](contact_form)
- Контакты: [Контакты с картой](contact_map) → [Contact form](contact_form)

## form_key и поля

**Ключ формы** (`form_key`) должен быть уникален на странице, если форм несколько. Repeater **Поля формы**: name, label, type (`text`, `email`, `phone`, `textarea`, `select`, `radio`, `checkbox`, `date`), required. Для select и radio варианты пишутся по строке в поле options (`Подпись|value` или только value). Имя поля: `[a-z][a-z0-9_]*`. Обязательный checkbox пустой, пока значение не `1`, `yes`, `true` или `on`.

Получатель письма: `emailsender` или настройки почты сайта (как у handler). Без **FetchIt** секция показывает сообщение о недоступности формы.

## Похожие секции

- [Квиз](quiz) для многошагового сбора
- [CTA](cta) с одной ссылкой вместо полей
- [Контакты](contact) для tel:/mailto: без отправки формы

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `contact_form` |
| Слой | Pro |
| Категория | конверсия (`conversion`) |
| Chunk | `pagebuilderpro_contact_form` |
| Требования | pro, FetchIt |

## Поля в редакторе

Заполните поля в инспекторе секции на ресурсе. Описание типов полей: [справочник типов](../fields/types).

### Заголовок (`title`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### Вступление (`intro`)

Тип [textarea](../fields/textarea#vyvod-v-section-data). Необязательное.

### Ключ формы (`form_key`)

Тип [text](../fields/text#vyvod-v-section-data). Обязательное.

### Поля формы (`fields`)

Тип [repeater](../fields/repeater#vyvod-v-section-data). Обязательное. Повторяющиеся строки. Кнопка «Добавить» в инспекторе.

В каждой строке:

| Поле | Тип | Подпись | Обязательно |
| --- | --- | --- | --- |
| `name` | [text](../fields/text#vyvod-v-section-data) | Имя поля (name) | да |
| `label` | [text](../fields/text#vyvod-v-section-data) | Подпись | да |
| `type` | [select](../fields/select#vyvod-v-section-data) | Тип поля | да |
| `required` | [yesno](../fields/yesno#vyvod-v-section-data) | Обязательное | нет |

### Текст кнопки отправки (`submit_label`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### Сообщение об успехе (`success_message`)

Тип [textarea](../fields/textarea#vyvod-v-section-data). Необязательное.

### URL после отправки (`redirect_url`)

Тип [url](../fields/url#vyvod-v-section-data). Необязательное.

## Что видит посетитель

Секция `pb-contact-form`. AJAX через FetchIt → [PageBuilderContactForm](../snippets/PageBuilderContactForm). Honeypot `nospam`: тихий success без письма.

## Данные секции {#vyvod-v-section-data}

Пример JSON после сохранения секции (схема полей, не ответы посетителя):

```json
{
  "title": "Оставьте заявку",
  "intro": "Мы ответим в рабочее время.",
  "form_key": "contact",
  "fields": [
    {
      "_rowId": "00000000-0000-4000-8000-000000000001",
      "name": "name",
      "label": "Имя",
      "type": "text",
      "required": true
    },
    {
      "_rowId": "00000000-0000-4000-8000-000000000002",
      "name": "email",
      "label": "Email",
      "type": "email",
      "required": true
    }
  ],
  "submit_label": "Отправить",
  "success_message": "Спасибо! Мы свяжемся с вами в ближайшее время.",
  "redirect_url": "https://example.com/thanks"
}
```

## Шаблон chunk

Fenom chunk `pagebuilderpro_contact_form`:

```fenom
{set $formKey = $form_key|default:'contact'}
<section class="pb-section pb-section--contact-form pb-contact-form{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="contact_form"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-contact-form__inner">
    {if $title}
      <h2 class="pb-heading pb-contact-form__title">{$title|escape}</h2>
    {/if}
    {if $intro}
      <p class="pb-contact-form__intro">{$intro|escape}</p>
    {/if}

    {if !$fetchit_available}
      <p class="pb-contact-form__fallback" role="status">{$lex_form_unavailable|escape}</p>
    {else}
      {'!PageBuilderFetchIt' | snippet : [
        'snippet' => 'PageBuilderContactForm',
        'form' => 'pagebuilderpro_contact_form_fields',
        'form_key' => $formKey,
        'resource_id' => $resource_id|default:0,
        'successMessage' => ($success_message ?: $lex_success_default),
        'validationErrorMessage' => $lex_validation_error,
        'clearFieldsOnSuccess' => 1,
        'fields' => $fields,
        'form_csrf' => $form_csrf,
        'submit_label' => $submit_label,
        'lex_submit' => $lex_submit,
        'lex_field_required' => $lex_field_required,
        'lex_field_email' => $lex_field_email,
        'cssClass' => $cssClass,
        'id' => $id,
      ]}
    {/if}
  </div>
</section>
```

Fenom chunk `pagebuilderpro_contact_form_fields`:

```fenom
{set $formKey = $form_key|default:'contact'}
{set $submitText = $submit_label|default:$lex_submit}

<form class="pb-contact-form__form fetchit-form" method="post" novalidate>
  <input type="hidden" name="pb_form_key" value="{$formKey|escape}" />
  <input type="hidden" name="pb_csrf" value="{$form_csrf|escape}" />
  <input type="hidden" name="nospam" value="" tabindex="-1" autocomplete="off" aria-hidden="true" class="pb-contact-form__honeypot" />

  <div class="pb-contact-form__message pb-contact-form__message--success" data-success role="status"></div>
  <div class="pb-contact-form__message pb-contact-form__message--error" data-validation-error role="alert"></div>

  <div class="pb-contact-form__fields">
    {foreach $fields as $field}
      {set $fname = $field.name|default:''}
      {if $fname == ''}{continue}{/if}
      {set $flabel = $field.label|default:$fname}
      {set $ftype = $field.type|default:'text'}
      {set $frequired = $field.required|default:0}
      {set $options = $field.options_list|default:($field.options|default:[])}
      {set $fid = "pb-{$formKey|escape}-{$fname|escape}"}

      <div class="pb-contact-form__field" data-custom="{$fname|escape}">
        {if $ftype == 'checkbox'}
          <label class="pb-contact-form__check" for="{$fid}">
            <input type="checkbox" id="{$fid}" name="{$fname|escape}" value="1" {if $frequired}required aria-required="true"{/if} />
            <span>{$flabel|escape}{if $frequired}<span class="pb-contact-form__required" aria-hidden="true">*</span>{/if}</span>
          </label>
        {elseif $ftype == 'textarea'}
          <label class="pb-contact-form__label" for="{$fid}">
            {$flabel|escape}{if $frequired}<span class="pb-contact-form__required" aria-hidden="true">*</span>{/if}
          </label>
          <textarea class="pb-contact-form__control" id="{$fid}" name="{$fname|escape}" rows="4" {if $frequired}required aria-required="true"{/if}></textarea>
        {elseif $ftype == 'select'}
          <label class="pb-contact-form__label" for="{$fid}">
            {$flabel|escape}{if $frequired}<span class="pb-contact-form__required" aria-hidden="true">*</span>{/if}
          </label>
          <select class="pb-contact-form__control" id="{$fid}" name="{$fname|escape}" {if $frequired}required aria-required="true"{/if}>
            <option value="">—</option>
            {foreach $options as $option}
              {set $ovalue = $option.value|default:$option}
              {set $olabel = $option.label|default:$ovalue}
              <option value="{$ovalue|escape}">{$olabel|escape}</option>
            {/foreach}
          </select>
        {elseif $ftype == 'radio'}
          <fieldset class="pb-contact-form__fieldset">
            <legend>{$flabel|escape}{if $frequired}<span class="pb-contact-form__required" aria-hidden="true">*</span>{/if}</legend>
            {foreach $options as $option}
              {set $ovalue = $option.value|default:$option}
              {set $olabel = $option.label|default:$ovalue}
              <label class="pb-contact-form__check">
                <input type="radio" name="{$fname|escape}" value="{$ovalue|escape}" {if $frequired}required aria-required="true"{/if} />
                <span>{$olabel|escape}</span>
              </label>
            {/foreach}
          </fieldset>
        {else}
          <label class="pb-contact-form__label" for="{$fid}">
            {$flabel|escape}{if $frequired}<span class="pb-contact-form__required" aria-hidden="true">*</span>{/if}
          </label>
          <input
            class="pb-contact-form__control"
            id="{$fid}"
            type="{if $ftype == 'email'}email{elseif $ftype == 'phone'}tel{elseif $ftype == 'date'}date{else}text{/if}"
            name="{$fname|escape}"
            {if $ftype == 'email'}autocomplete="email"{elseif $ftype == 'phone'}autocomplete="tel" inputmode="tel"{elseif $fname == 'name'}autocomplete="name"{/if}
            {if $frequired}required aria-required="true"{/if}
          />
        {/if}
        <span class="pb-contact-form__error" data-error="{$fname|escape}"></span>
      </div>
    {/foreach}
  </div>

  <button class="pb-button pb-contact-form__submit" type="submit">{$submitText|escape}</button>
</form>
```

Без FetchIt чанк выводит лексикон `pagebuilder_fe_form_unavailable`.

## Связанные страницы

- [Квиз](quiz)
- [Сниппет PageBuilderContactForm](../snippets/PageBuilderContactForm)
- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
