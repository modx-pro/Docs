# ms3PromoCodeForm

Отрисовывает форму ввода промо-кода. Работает без параметров.

![Пустая форма: поле с подсказкой «Промо-код» и кнопка «Применить»](/components/ms3promocode/screenshots/snippet-form-empty.jpg)

![Применённый код: подпись «Код:», `WELCOME10`, скидка `−350 ₽` и кнопка «Отменить»](/components/ms3promocode/screenshots/snippet-form-applied.jpg)

## Параметры

| Параметр              | По умолчанию                                                  | Описание                                                          |
|-----------------------|---------------------------------------------------------------|-------------------------------------------------------------------|
| `tpl`                 | `ms3promocode_form`                                           | Имя чанка-шаблона. Поддерживает pdoTools-префиксы `@FILE` / `@INLINE` / `@TEMPLATE`. |
| `placeholder`         | лексикон `ms3promocode_frontend_placeholder`                  | Текст placeholder в поле ввода                                    |
| `apply_label`         | лексикон `ms3promocode_frontend_apply`                        | Надпись на кнопке «Применить»                                     |
| `remove_label`        | лексикон `ms3promocode_frontend_remove`                       | Надпись на кнопке «Отменить»                                      |
| `applied_label`       | лексикон `ms3promocode_frontend_applied_label`                | Префикс в блоке «применён код» (например, `Код:`)                 |
| `confirm_message`     | лексикон `ms3promocode_frontend_confirm_remove`               | Сообщение в подтверждении при снятии кода                         |
| `auto_removed_label`  | лексикон `ms3promocode_frontend_auto_removed`                 | Уведомление при автосбросе кода после изменения корзины           |

## SSR-переменные (передаются в чанк автоматически)

| Переменная             | Тип    | Описание                                                                |
|------------------------|--------|-------------------------------------------------------------------------|
| `applied`              | bool   | Применён ли сейчас код к текущей корзине                                |
| `applied_code`         | string | Код, применённый к корзине (если есть)                                  |
| `discount_amount`      | float  | Сумма скидки, число                                                     |
| `discount_formatted`   | string | Сумма с ведущим минусом (`-500 ₽`). Целые — без копеек, дробные — 2 знака после точки, разделитель тысяч — пробел. Символ и позиция валюты — из настроек `ms3_currency_symbol` (по умолчанию `₽`) и `ms3_currency_position` (`before` / `after`, по умолчанию `after`). |

В шаблоне доступны и параметры сниппета (`{$placeholder}`, `{$apply_label}`...), и SSR-переменные (`{if $applied}...{/if}`).

## Примеры

### Базовый вызов

```fenom
{'!ms3PromoCodeForm' | snippet}
```

### Свой чанк

```fenom
{'!ms3PromoCodeForm' | snippet : ['tpl' => 'my_promocode_form']}
```

### Шаблон из файла

```fenom
{'!ms3PromoCodeForm' | snippet : ['tpl' => '@FILE /path/to/my-form.tpl']}
```

### Свои подписи

```fenom
{'!ms3PromoCodeForm' | snippet : [
    'placeholder' => 'Введите ваш код',
    'apply_label' => 'Применить скидку',
    'remove_label' => 'Убрать скидку',
    'confirm_message' => 'Точно убрать скидку?',
]}
```

## Шаблон по умолчанию

Чанк `ms3promocode_form`:

```fenom
<div class="ms3pc-form"
     data-ms3-promocode="form"
     data-confirm-message="{$confirm_message}"
     data-auto-removed-label="{$auto_removed_label}">

    <div class="ms3pc-form__state" data-ms3pc-state="empty"{if $applied} hidden{/if}>
        <input type="text" class="ms3pc-form__code"
               placeholder="{$placeholder}" autocomplete="off" />
        <button type="button" class="ms3pc-form__apply">{$apply_label}</button>
    </div>

    <div class="ms3pc-form__applied" data-ms3pc-state="applied"{if !$applied} hidden{/if}>
        <div class="ms3pc-form__info">
            <span class="ms3pc-form__code-label">{$applied_label}</span>
            <span class="ms3pc-form__code-value">{$applied_code}</span>
            <span class="ms3pc-form__discount">{if $applied}{$discount_formatted}{/if}</span>
        </div>
        <button type="button" class="ms3pc-form__remove">{$remove_label}</button>
    </div>

    <div class="ms3pc-form__error" hidden></div>
</div>
```

::: warning Сохраняйте data-атрибуты
UI-слой монтируется по `[data-ms3-promocode="form"]`, состояния переключает через `data-ms3pc-state`. В своём шаблоне эти атрибуты обязательны — без них UI не заработает.
:::

Подробнее о data-атрибутах и переопределении шаблона: [Шаблон формы](../frontend/template).

## Где разместить

Вызывайте в шаблоне страницы корзины (обычно `cart`, URL вроде `/korzina/`). URL и имя шаблона — выбор магазина: серверная отрисовка работает везде, где доступен токен корзины и draft MS3.

Привычное место — рядом с итоговой суммой или над кнопкой «Оформить заказ»:

```fenom
<div class="cart-summary">
    {* итоги корзины *}
    <div class="cart-summary__total">{$total_cost}</div>

    {* поле промо-кода *}
    {'!ms3PromoCodeForm' | snippet}

    {* кнопка оформления *}
    <a href="/order/" class="btn-checkout">Оформить заказ</a>
</div>
```

::: tip
Если код уже применён к корзине на момент загрузки, блок «применён код» отрисовывается сразу на сервере — без мигания формы.
:::

## Поведение в особых ситуациях

- **Корзина пустая, кода нет.** Сниппет отрисовывает пустую форму (`applied=false`, `discount_amount=0.0`). Это штатный сценарий — ничего в журнал не пишется.
- **Исключение при получении токена или draft.** Сниппет не падает: ловит `\Throwable`, пишет в MODX error log запись `[ms3PromoCode] SSR hydration skipped: <сообщение>` уровня `WARN` и отрисовывает пустую форму.
- **Автозагрузка лексикона.** Тема `ms3promocode:default` подгружается самим сниппетом — вручную `$modx->lexicon->load(...)` вызывать не нужно.
