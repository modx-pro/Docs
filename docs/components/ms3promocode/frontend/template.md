# Шаблон формы

Документация о шаблоне формы покупателя — какие data-атрибуты использует UI-слой, как переопределить чанк, как заменить отдельные ассеты.

## Базовый шаблон

Чанк `ms3promocode_form` поставляется по умолчанию:

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

## Обязательные data-атрибуты

UI-слой ([PromoCodeUI.js](https://github.com/biz87/ms3PromoCode/blob/main/assets/components/ms3promocode/js/web/ui/PromoCodeUI.js)) монтируется через CSS-селекторы — структура должна сохраняться.

| Атрибут / селектор                | Назначение                                                            |
|-----------------------------------|-----------------------------------------------------------------------|
| `[data-ms3-promocode="form"]`     | Корневой элемент формы. UI-слой автомонтируется на каждый такой блок. |
| `[data-ms3pc-state="empty"]`      | Контейнер «нет применённого кода» — поле ввода + кнопка «Применить»   |
| `[data-ms3pc-state="applied"]`    | Контейнер «код применён» — информация + кнопка «Отменить»             |
| `.ms3pc-form__code`               | `<input>` для ввода кода                                              |
| `.ms3pc-form__apply`              | Кнопка «Применить»                                                    |
| `.ms3pc-form__remove`             | Кнопка «Отменить»                                                     |
| `.ms3pc-form__code-value`         | Куда выводится текст кода после применения                            |
| `.ms3pc-form__discount`           | Куда выводится отформатированная сумма скидки                         |
| `.ms3pc-form__error`              | Контейнер для сообщений об ошибках / уведомлений                      |

## Опциональные data-атрибуты на корневом элементе

| Атрибут                          | Значения                | Описание                                                       |
|----------------------------------|-------------------------|----------------------------------------------------------------|
| `data-confirm-remove`            | `true` / `false`        | Запрашивать подтверждение при снятии кода. По умолчанию `true`.|
| `data-confirm-message`           | строка                  | Текст подтверждения при снятии                                 |
| `data-confirm-ok`                | строка                  | Текст кнопки подтверждения                                     |
| `data-confirm-cancel`            | строка                  | Текст кнопки отмены                                            |
| `data-auto-removed-label`        | строка                  | Префикс уведомления при автосбросе                             |
| `data-error-timeout`             | мс (число)              | Через сколько прятать сообщение об ошибке. По умолчанию `8000`. |
| `data-ms3pc-auto-reload`         | `true` / `false`        | Перезагружать страницу после apply/remove. По умолчанию `true`.|

## Перезагрузка страницы после действия

По умолчанию после успешного `apply` или `remove` форма делает `window.location.reload()`. Это нужно потому, что:

- Цены позиций в HTML корзины уже отрендерены сервером — после применения скидки они должны обновиться.
- Самый надёжный способ для любого шаблона — перезагрузка.

Для AJAX-карт, где DOM обновляется без перезагрузки, отключите автоперезагрузку:

```html
<div class="ms3pc-form" data-ms3-promocode="form" data-ms3pc-auto-reload="false">
    ...
</div>
```

В этом случае ваш JS должен сам отреагировать на событие `ms3promocode:applied` или `ms3promocode:removed` и обновить DOM (см. [JS API](js-api)).

## Кастомный шаблон

### Через свой чанк

1. Создайте чанк, например `my_promo_form`.
2. Используйте его в сниппете:

```fenom
{'!ms3PromoCodeForm' | snippet : ['tpl' => 'my_promo_form']}
```

В шаблоне доступны переменные:

| Переменная             | Тип    | Описание                                          |
|------------------------|--------|---------------------------------------------------|
| `applied`              | bool   | Применён ли сейчас код                            |
| `applied_code`         | string | Сам применённый код                               |
| `discount_amount`      | float  | Сумма скидки                                      |
| `discount_formatted`   | string | Отформатированная сумма (`-500 ₽`)                |
| `placeholder`          | string | Текст placeholder из параметров сниппета          |
| `apply_label`          | string | Надпись на кнопке «Применить»                     |
| `remove_label`         | string | Надпись на кнопке «Отменить»                      |
| `applied_label`        | string | Префикс «Код:» в блоке «применён»                 |
| `confirm_message`      | string | Текст подтверждения при снятии                    |
| `auto_removed_label`   | string | Префикс уведомления автосброса                    |

### Через собственный HTML без сниппета

Можно добавить блок прямо в шаблон страницы — UI-слой подхватит:

```html
<div class="my-promo-form" data-ms3-promocode="form">
    <div data-ms3pc-state="empty">
        <input class="ms3pc-form__code" placeholder="Промо-код" />
        <button class="ms3pc-form__apply">Применить</button>
    </div>
    <div data-ms3pc-state="applied" hidden>
        <span>Применён код: <b class="ms3pc-form__code-value"></b></span>
        <span class="ms3pc-form__discount"></span>
        <button class="ms3pc-form__remove">Отменить</button>
    </div>
    <div class="ms3pc-form__error" hidden></div>
</div>
```

::: warning
В этом случае нет SSR-hydration — состояние «применён» не будет показано при загрузке. JS-слой увидит активный код и переключится на `applied` через ~100 мс после `DOMContentLoaded`. Это даст лёгкое мигание формы.

Чтобы избежать мигания — используйте сниппет `ms3PromoCodeForm`, он рендерит правильное состояние сразу на сервере.
:::

## Override-папка для ассетов

Любой файл из пакета можно переопределить, поместив свою версию по тому же пути в **специальной папке**:

```
assets/components/ms3promocode-overrides/
```

Примеры:

| Заменяемый файл                                                                | Куда положить override                                                            |
|--------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| `assets/components/ms3promocode/css/web/ms3promocode.css`                       | `assets/components/ms3promocode-overrides/css/web/ms3promocode.css`               |
| `assets/components/ms3promocode/js/web/ui/PromoCodeUI.js`                       | `assets/components/ms3promocode-overrides/js/web/ui/PromoCodeUI.js`               |
| `assets/components/ms3promocode/js/web/ms3promocode.headless.js`                | `assets/components/ms3promocode-overrides/js/web/ms3promocode.headless.js`        |

Плагин при регистрации ассетов на странице (событие `OnLoadWebDocument`) сначала проверяет наличие файла в overrides-папке и подключает его, иначе — оригинал.

::: tip
Это удобно для:
- Кастомных стилей формы под ваш дизайн (своя `ms3promocode.css`).
- Наследования UI-логики (своя `PromoCodeUI.js` с дополнительными методами).
- Полной замены headless-ядра (редкий случай, нужен только для интеграций со строго custom API).

При обновлении пакета overrides не затрагиваются.
:::

## Стили

Базовый CSS файла `ms3promocode.css` минимален — без зависимостей от bootstrap/tailwind. Использует BEM-нейминг с префиксом `.ms3pc-form__*`. Для тонкой настройки переопределите стили в своём шаблоне:

```css
.ms3pc-form__apply {
    background: var(--my-primary-color);
    color: white;
}
```

Или подмените файл целиком через override-папку.
