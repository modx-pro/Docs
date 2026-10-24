# Шаблон формы

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
| `data-auto-reload`               | `true` / `false`        | Перезагружать страницу после применения или снятия кода. По умолчанию `true`.|

## Перезагрузка страницы после действия

По умолчанию после `apply` или `remove` форма делает `window.location.reload()`: цены позиций в HTML корзины уже сформированы сервером и после применения скидки должны обновиться.

Если корзина обновляется через AJAX без перезагрузки страницы — отключите автоперезагрузку:

```html
<div class="ms3pc-form" data-ms3-promocode="form" data-auto-reload="false">
    ...
</div>
```

Тогда ваш код сам реагирует на `ms3promocode:applied` / `ms3promocode:removed` и обновляет DOM (см. [JS API](js-api)).

## Свой шаблон

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
| `discount_amount`      | float  | Сумма скидки (числом, без знака и символа валюты) |
| `discount_formatted`   | string | Отформатированная сумма с ведущим знаком минуса (`-500 ₽`). Знак «−» добавляет сам сниппет; в своём чанке подставляйте `{$discount_formatted}` без дополнительного минуса. Символ и позиция валюты — из системных настроек `ms3_currency_symbol` (по умолчанию `₽`) и `ms3_currency_position` (`before` / `after`, по умолчанию `after`) |
| `placeholder`          | string | Текст placeholder из параметров сниппета          |
| `apply_label`          | string | Надпись на кнопке «Применить»                     |
| `remove_label`         | string | Надпись на кнопке «Отменить»                      |
| `applied_label`        | string | Префикс «Код:» в блоке «применён»                 |
| `confirm_message`      | string | Текст подтверждения при снятии                    |
| `auto_removed_label`   | string | Префикс уведомления автосброса                    |

В параметре `tpl` допустимы pdoTools-префиксы — например, `@FILE path/to/my_form.tpl` или `@INLINE <вёрстка>`, не только имя чанка из БД.

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
В этом случае нет серверной отрисовки состояния — блок «применён» при загрузке не покажется. UI-слой переключится на `applied` только после ответа `GET /api/v1/promo/current`; на медленной сети это даёт заметное мигание формы.

Чтобы избежать мигания, используйте сниппет `ms3PromoCodeForm`: он отрисовывает нужное состояние сразу на сервере.
:::

### Отключить автомонтаж полностью

Если нужно самому контролировать момент монтажа или полностью отключить готовый UI — поставьте глобальный флаг **до** загрузки `ms3promocode.js`:

```html
<script>window.ms3PromoCodeAutoMountUI = false;</script>
<script src=".../ms3promocode.js"></script>
```

С этим флагом не запускается ни авто-поиск форм в DOM, ни подписка на `ms3:cart:updated` для динамически добавляемых блоков — вызывайте `window.ms3PromoCode` сами.

### Динамически добавленные формы

Если `[data-ms3-promocode="form"]` появляется в DOM после загрузки страницы, UI подхватывает его автоматически — через `MutationObserver` и слушателя `ms3:cart:updated`. Специально монтировать форму не нужно.

### CSS-классы блока ошибок

Контейнер `.ms3pc-form__error` получает модификатор `.is-error` (красный тон) или `.is-notice` (голубой, info-тон) — в зависимости от типа сообщения. Опирайтесь на эти классы в своих стилях, иначе ошибки и уведомления будут выглядеть одинаково.

### Блокировка во время запроса

На время запроса `apply` / `remove` UI ставит `disabled` на `.ms3pc-form__apply`, `.ms3pc-form__remove` и `.ms3pc-form__code`. В своих стилях учитывайте `[disabled]`.

## Папка переопределений для фронтенд-ассетов

Любой фронтенд-ассет, который плагин подключает на `OnLoadWebDocument`, можно заменить своим файлом в **специальной папке**:

```
assets/components/ms3promocode-overrides/
```

Примеры:

| Заменяемый файл                                                                | Куда положить переопределение                                                     |
|--------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| `assets/components/ms3promocode/css/web/ms3promocode.css`                       | `assets/components/ms3promocode-overrides/css/web/ms3promocode.css`               |
| `assets/components/ms3promocode/js/web/ui/PromoCodeUI.js`                       | `assets/components/ms3promocode-overrides/js/web/ui/PromoCodeUI.js`               |
| `assets/components/ms3promocode/js/web/ms3promocode.headless.js`                | `assets/components/ms3promocode-overrides/js/web/ms3promocode.headless.js`        |

При подключении ассетов плагин сначала ищет файл в папке переопределений и подставляет его, иначе берёт оригинал. Административный Vue-бандл этот механизм не покрывает: `vue-dist/ms3promocode.min.js` подключается напрямую контроллером админки.

Все три ассета подключаются только при активном пресете. Если в [`ms3promocode.frontend_assets_preset`](../settings#ms3promocode.frontend_assets_preset) выбрано `core` — CSS и `PromoCodeUI.js` не загружаются, вместе с ними и ваши переопределения. При `none` на страницу не попадает ни один ассет пакета — подключайте их в шаблоне сами.

::: tip
Применимо для:
- Своих стилей формы под дизайн сайта (своя `ms3promocode.css`).
- Наследования UI-логики (своя `PromoCodeUI.js` с дополнительными методами).
- Полной замены headless-ядра — редкий случай, нужен только при интеграции со своим API.

При обновлении пакета переопределения не затрагиваются.
:::

## Стили

Базовый `ms3promocode.css` минимален, без зависимостей от bootstrap/tailwind. Классы — по БЭМ, с префиксом `.ms3pc-form__*`. Чтобы изменить оформление, переопределите стили в своём шаблоне:

```css
.ms3pc-form__apply {
    background: var(--my-primary-color);
    color: white;
}
```

Или подмените файл целиком через папку переопределений.
