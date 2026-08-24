---
title: "Форма обратной связи"
description: "Форма с настраиваемым набором полей, ключом и сообщением об успехе. Слой Pro."
---

# Форма обратной связи

Вы собираете набор полей в инспекторе (text, email, tel и др.), задаёте **Ключ формы** для обработчика и текст после отправки.

<!-- ![Форма обратной связи](/components/pagebuilder/screenshots/sections/contact_form.png) -->

::: info
Требуется PageBuilder Pro.
:::

## Зачем эта секция

- Набор полей собираете в repeater, не в коде формы
- `form_key` связывает блок с вашим обработчиком (AjaxForm, сниппет)
- Сообщение об успехе и redirect настраиваются в инспекторе

## Где применять

- **Заявка** с лендинга
- **Обратная связь** на странице контактов
- **Лид-магнит** — скачать PDF после email

## Примеры страниц

- Лендинг: [Hero](hero) → [Features](features) → [Contact form](contact_form)
- Контакты: [Контакты с картой](contact_map) → [Contact form](contact_form)

## Что заполнить

**Ключ формы** (`form_key`) должен совпадать с обработчиком на сайте (сниппет, AjaxForm). Repeater **Поля формы** — name, type, required для каждой строки.

## Похожие секции

- [CTA](cta) с одной ссылкой вместо полей
- [Контакты](contact) для tel:/mailto: без отправки формы

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `contact_form` |
| Слой | Pro |
| Категория | конверсия (`conversion`) |
| Chunk | `pagebuilderpro_contact_form` |
| Требования | pro |

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

Секция `pb-contact-form`. Отправка через `pbForm` / `pbFetch` на фронте.

## Вывод в section.data

Пример JSON после сохранения секции. Для media, video и map значения на выводе могут быть обогащены:

```json
{
  "title": "Заголовок секции",
  "intro": "Краткое вступление перед основным содержимым.",
  "form_key": "contact",
  "fields": [
    {
      "_rowId": "00000000-0000-4000-8000-000000000001",
      "name": "Иван Петров",
      "label": "Довольных клиентов",
      "type": "text",
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
{var $formKey = $form_key|default:'contact'}
{var $status = $form_status|default:'idle'}
<section class="pb-section pb-section--contact-form pb-contact-form{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="contact_form"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-contact-form__inner">
    {if $title}
      <h2 class="pb-heading pb-contact-form__title">{$title|escape}</h2>
    {/if}
    {if $intro}
      <p class="pb-contact-form__intro">{$intro|escape}</p>
    {/if}

    {if !$formit_available}
      <p class="pb-contact-form__fallback" role="status">Форма временно недоступна. Установите FormIt или ajaxForm.</p>
    {elseif $status == 'success'}
      <div class="pb-contact-form__success" role="status">
        <p>{$success_message|default:'Спасибо! Мы свяжемся с вами в ближайшее время.'|escape}</p>
      </div>
    {else}
      {if $status == 'error'}
        <div class="pb-contact-form__summary" role="alert">
          <p>Проверьте обязательные поля и попробуйте снова.</p>
        </div>
      {/if}
      <form class="pb-contact-form__form" method="post" action="">
        <input type="hidden" name="pb_form_key" value="{$formKey|escape}" />
        <input type="hidden" name="nospam" value="" tabindex="-1" autocomplete="off" aria-hidden="true" class="pb-contact-form__honeypot" />
        <div class="pb-contact-form__fields">
          {foreach $fields as $field}
            {var $fname = $field.name|default:''}
            {var $flabel = $field.label|default:$fname}
            {var $ftype = $field.type|default:'text'}
            {var $frequired = $field.required|default:0}
            {var $fvalue = $form_values[$fname]|default:''}
            {var $ferror = $form_errors[$fname]|default:''}
            <div class="pb-contact-form__field{if $ferror} pb-contact-form__field--error{/if}">
              <label class="pb-contact-form__label" for="pb-{$formKey|escape}-{$fname|escape}">
                {$flabel|escape}{if $frequired}<span class="pb-contact-form__required" aria-hidden="true">*</span>{/if}
              </label>
              {if $ftype == 'textarea'}
                <textarea
                  class="pb-contact-form__control"
                  id="pb-{$formKey|escape}-{$fname|escape}"
                  name="{$fname|escape}"
                  rows="4"
                  {if $frequired}required aria-required="true"{/if}
                  {if $ferror}aria-invalid="true"{/if}
                >{$fvalue|escape}</textarea>
              {else}
                <input
                  class="pb-contact-form__control"
                  id="pb-{$formKey|escape}-{$fname|escape}"
                  type="{if $ftype == 'email'}email{elseif $ftype == 'phone'}tel{else}text{/if}"
                  name="{$fname|escape}"
                  value="{$fvalue|escape}"
                  {if $frequired}required aria-required="true"{/if}
                  {if $ferror}aria-invalid="true"{/if}
                />
              {/if}
              {if $ferror}
                <p class="pb-contact-form__error" id="pb-{$formKey|escape}-{$fname|escape}-error">
                  {if $ferror == 'email'}Введите корректный email.{else}Поле обязательно.{/if}
                </p>
              {/if}
            </div>
          {/foreach}
        </div>
        <button class="pb-button pb-contact-form__submit" type="submit">
          {$submit_label|default:'Отправить'|escape}
        </button>
      </form>
    {/if}
  </div>
</section>
```

## JSON-определение

`PageBuilderPro/core/components/pagebuilderpro/sections/contact_form.json`

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
