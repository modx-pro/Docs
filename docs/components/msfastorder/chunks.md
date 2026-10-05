---
title: Чанки
description: Чанки msfo_* — кнопка, письма, эталоны формы и успеха
---

# Чанки msFastOrder

При установке пакета создаются чанки с префиксом **`msfo_`**.

## Обзор

| Чанк | Используется в рантайме | Назначение |
|------|-------------------------|------------|
| `msfo_button` | **Да** | Кнопка «Купить в 1 клик» (сниппет `msFastOrder`, `tplBtn`) |
| `msfo_email_manager` | **Да** (MAIL) | Письмо менеджеру |
| `msfo_email_customer` | **Да** (MAIL) | Письмо покупателю, если указан email |
| `msfo_modal` | Нет | Эталон оболочки модалки |
| `msfo_form` | Нет | Эталон разметки формы |
| `msfo_success` | Нет | Эталон экрана успеха |

```mermaid
flowchart LR
  subgraph runtime [Рантайм]
    BTN[msfo_button]
    EM1[msfo_email_manager]
    EM2[msfo_email_customer]
  end
  subgraph js [JavaScript msfo.js]
    FORM[renderForm]
    OK[renderSuccess]
  end
  subgraph ref [Эталоны в пакете]
    F[msfo_form]
    S[msfo_success]
    M[msfo_modal]
  end
  BTN --> FORM
  FORM --> OK
  F -.->|не подставляются| FORM
  S -.->|не подставляются| OK
```

::: warning Форма и success в модалке
По умолчанию HTML формы и экрана успеха **не** берётся из чанков `msfo_form` / `msfo_success` на сервере. Их собирает JavaScript (`renderForm`, `renderSuccess` в `msfo.js`). Изменение только чанка **не изменит** модалку — см. [Подключение на сайте](/components/msfastorder/frontend#форма-в-модалке-важно).
:::

## msfo_button

Плейсхолдеры при вызове из сниппета:

| Плейсхолдер | Описание |
|-------------|----------|
| `product_id` | ID товара |
| `primary` | Если true — класс `msfo-trigger--primary` |

Текст кнопки — лексикон `msfastorder_button_text`.

Свой чанк кнопки (`tplBtn`):

::: code-group

```fenom
{'!msFastOrder' | snippet : ['tplBtn' => 'my_fast_btn']}
```

```modx
[[!msFastOrder? &tplBtn=`my_fast_btn`]]
```

:::

Пример разметки чанка `my_fast_btn`:

::: code-group

```fenom
<button type="button" class="msfo-trigger" data-msfo-trigger data-msfo-product-id="{$product_id}">
  {$_modx->lexicon('msfastorder_button_text')}
</button>
```

```modx
<button type="button" class="msfo-trigger" data-msfo-trigger data-msfo-product-id="[[+product_id]]">
  [[%msfastorder_button_text]]
</button>
```

:::

## msfo_form (эталон)

Плейсхолдеры для серверной отрисовки или как образец полей:

`product_id`, `pagetitle`, `price`, `old_price`, `thumb`, `count`, `options`, `phone_mask`.

Поля POST при отправке: `product_id`, `count`, `options` (JSON), `receiver`, `phone`, `email`, `city`, `comment`.

## msfo_success (эталон)

Образец кнопки оплаты:

::: code-group

```fenom
{if $payment_link}
  <a href="{$payment_link}" class="msfo-btn msfo-btn--primary">
    {$_modx->lexicon('msfastorder_pay_button')}
  </a>
{/if}
```

```modx
[[+payment_link:notempty=`
  <a href="[[+payment_link]]" class="msfo-btn msfo-btn--primary">[[%msfastorder_pay_button]]</a>
`]]
```

:::

В рантайме аналогичную разметку создаёт `FormHandler.renderSuccess()` (чанк на сервере по умолчанию не подставляется).

## Письма

| Чанк | Когда отправляется |
|------|-------------------|
| `msfo_email_manager` | Только режим **MAIL** |
| `msfo_email_customer` | Режим **MAIL**, если указан email клиента |

В режиме **MS** письма через эти чанки **не** уходят. Почта заказов — настройки MiniShop3.

Если письма не доходят, проверьте почту MODX (SMTP) — [FAQ](/components/msfastorder/faq#режим-mail--письмо-не-приходит).

## Кастомизация

| Задача | Подход |
|--------|--------|
| Своя кнопка | Чанк `tplBtn` или HTML с `data-msfo-trigger` |
| Своя форма в модалке | Событие `msfo:modal:loaded`, эталон `msfo_form` — [Подключение на сайте](/components/msfastorder/frontend#форма-в-модалке-важно) |
| Доработка после загрузки | Событие `msfo:modal:loaded` |
| Свой success | Правка `renderSuccess()` или событие `msfo:order:success` |

Лексикон: `core/components/msfastorder/lexicon/ru/default.inc.php` (и `en`).
