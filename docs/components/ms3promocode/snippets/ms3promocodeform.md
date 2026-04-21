# ms3PromoCodeForm

Сниппет рендерит форму ввода промо-кода и готов к использованию «из коробки» — никаких дополнительных параметров не требуется.

## Параметры

| Параметр              | По умолчанию                                                  | Описание                                                          |
|-----------------------|---------------------------------------------------------------|-------------------------------------------------------------------|
| `tpl`                 | `ms3promocode_form`                                           | Имя чанка-шаблона. Поддерживает префиксы `@FILE` / `@INLINE`.     |
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
| `discount_formatted`   | string | Отформатированная сумма (например, `-500 ₽` с учётом валютных настроек) |

В шаблоне можно использовать все плейсхолдеры: и переданные параметры (`{$placeholder}`, `{$apply_label}`...), и SSR-переменные (`{if $applied}...{/if}`).

## Примеры

### Базовый вызов

```fenom
{'!ms3PromoCodeForm' | snippet}
```

### С кастомным шаблоном (чанк из БД)

```fenom
{'!ms3PromoCodeForm' | snippet : ['tpl' => 'my_promocode_form']}
```

### С кастомным шаблоном (файл)

```fenom
{'!ms3PromoCodeForm' | snippet : ['tpl' => '@FILE /path/to/my-form.tpl']}
```

### С кастомными подписями

```fenom
{'!ms3PromoCodeForm' | snippet : [
    'placeholder' => 'Введите ваш код',
    'apply_label' => 'Применить скидку',
    'remove_label' => 'Убрать скидку',
    'confirm_message' => 'Точно убрать скидку?',
]}
```

## Шаблон по умолчанию

Поставляется чанк `ms3promocode_form` со следующей структурой:

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
JavaScript-слой монтируется по `[data-ms3-promocode="form"]` и использует `data-ms3pc-state` для переключения состояний. При написании собственного шаблона эти атрибуты должны остаться, иначе UI работать не будет.
:::

Подробнее о доступных data-атрибутах и о том, как переопределить шаблон: [Шаблон формы](../frontend/template).

## Где разместить

Сниппет нужно вызывать в шаблоне страницы, где есть корзина — обычно это страница `/korzina/` (или другая, привязанная к шаблону `cart`).

Стандартное место — рядом с итоговой суммой или над кнопкой «Оформить заказ»:

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
В сниппет встроен SSR-hydrate: если на момент рендера страницы код уже применён к корзине, сразу будет показан блок «применён код» без переходного состояния. Никакого мигания формы при загрузке страницы.
:::
