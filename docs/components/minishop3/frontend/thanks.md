---
title: Спасибо за заказ
---
# Спасибо за заказ

Страница благодарности отображается после успешного оформления заказа. Показывает детали заказа и дальнейшие действия для покупателя.

[![](https://file.modx.pro/files/e/9/3/e936fc08c9cbf5e83cae96910ae66fd7s.jpg)](https://file.modx.pro/files/e/9/3/e936fc08c9cbf5e83cae96910ae66fd7.png)

## Структура страницы

| Компонент | Файл | Назначение |
|-----------|------|------------|
| Шаблон страницы | `elements/templates/thanks.tpl` | Разметка страницы благодарности |
| Чанк заказа | `elements/chunks/ms3_get_order.tpl` | Детали оформленного заказа |

## Шаблон страницы

**Путь:** `core/components/minishop3/elements/templates/thanks.tpl`

Шаблон наследуется от базового и содержит три секции:

### Секции страницы

| Секция | Описание |
|--------|----------|
| Заголовок успеха | Иконка, заголовок "Спасибо за заказ!", подзаголовок |
| Детали заказа | Вызов сниппета msGetOrder |
| Блок "Что дальше?" | Информация и кнопки навигации |

### Код шаблона

```fenom
{extends 'file:templates/base.tpl'}
{block 'pagecontent'}
    <div class="container my-5">
        <main>
            {* Заголовок успеха *}
            <div class="text-center mb-5">
                <div class="mb-4">
                    <svg class="text-success" width="80" height="80" fill="currentColor">
                        <use xlink:href="#icon-check"/>
                    </svg>
                </div>
                <h1 class="display-5 fw-bold text-success mb-3">Спасибо за заказ!</h1>
                <p class="lead text-muted">Ваш заказ успешно оформлен и принят в обработку</p>
            </div>

            {* Детали заказа *}
            <div class="row justify-content-center">
                <div class="col-lg-10">
                    {'!msGetOrder' | snippet : [
                        'tpl' => 'tpl.msGetOrder'
                    ]}
                </div>
            </div>

            {* Блок "Что дальше?" *}
            <div class="row justify-content-center mt-5">
                <div class="col-lg-10">
                    <div class="card border-0 bg-light">
                        <div class="card-body text-center py-4">
                            <h5 class="card-title mb-3">Что дальше?</h5>
                            <p class="card-text text-muted mb-4">
                                Мы отправили подтверждение заказа на вашу электронную почту.<br>
                                Наш менеджер свяжется с вами в ближайшее время.
                            </p>
                            <div class="d-flex gap-3 justify-content-center flex-wrap">
                                <a href="/" class="btn btn-outline-primary">
                                    На главную
                                </a>
                                <a href="/catalog/" class="btn btn-primary">
                                    Продолжить покупки
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
{/block}
```

::: warning Кэширование
Сниппет msGetOrder должен вызываться **некэшированно** (`!msGetOrder`), так как данные заказа берутся из сессии или GET-параметра.
:::

## Как работает определение заказа

После успешного оформления заказа происходит редирект на страницу благодарности с GET-параметром:

```
/thanks/?msorder=15
```

или с UUID заказа:

```
/thanks/?msorder=a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

Сниппет msGetOrder автоматически определяет заказ из GET-параметра `msorder`.

::: tip Безопасность
UUID-ссылки можно безопасно отправлять по email — они не требуют авторизации и не раскрывают порядковый номер заказа.
:::

## Детали заказа

Блок деталей заказа выводится через сниппет [msGetOrder](/components/minishop3/snippets/msgetorder) и чанк `tpl.msGetOrder`.

Отображаемая информация:

- Номер и статус заказа
- Таблица товаров с ценами
- Итоговая стоимость
- Способ доставки и оплаты
- Контактные данные и адрес
- Ссылка на оплату (если доступна)

## Ссылка на оплату

Если способ оплаты поддерживает онлайн-оплату, в блоке оплаты появится кнопка "Оплатить заказ":

```fenom
{if $payment_link?}
    <a href="{$payment_link}" class="btn btn-success">
        Оплатить заказ
    </a>
{/if}
```

Ссылка генерируется обработчиком платёжной системы через метод `getPaymentLink()`.

## Настройка редиректа

После оформления заказа покупатель перенаправляется на страницу благодарности. URL страницы задаётся в системных настройках:

| Настройка | Описание |
|-----------|----------|
| `ms3.page_id.thanks` | ID ресурса страницы "Спасибо за заказ" |

При оформлении заказа происходит редирект:

```javascript
// После успешного оформления
document.addEventListener('ms3:order:success', (e) => {
    window.location.href = e.detail.redirect;
    // redirect = /thanks/?msorder=15
});
```

## Кастомизация

### Изменение шаблона

1. Скопируйте `thanks.tpl` в свою тему
2. Измените разметку и стили
3. Назначьте шаблон ресурсу страницы благодарности

### Изменение чанка заказа

Создайте свой чанк и укажите его в вызове:

```fenom
{'!msGetOrder' | snippet : [
    'tpl' => 'tpl.myGetOrder',
    'includeThumbs' => 'small'
]}
```

### Добавление превью товаров

```fenom
{'!msGetOrder' | snippet : [
    'tpl' => 'tpl.msGetOrder',
    'includeThumbs' => 'small,medium'
]}
```

### Добавление блока рекомендаций

После блока заказа можно добавить рекомендуемые товары:

```fenom
{* После деталей заказа *}
<div class="row justify-content-center mt-5">
    <div class="col-lg-10">
        <h4 class="mb-4">Вам также может понравиться</h4>
        {'msProducts' | snippet : [
            'parents' => 0,
            'where' => ['Data.popular' => 1],
            'limit' => 4,
            'tpl' => 'tpl.msProducts.row'
        ]}
    </div>
</div>
```

## Отправка уведомлений

При успешном оформлении заказа автоматически отправляются уведомления:

| Получатель | Шаблон | Описание |
|------------|--------|----------|
| Покупатель | `tpl.msEmail.order.new` | Подтверждение заказа |
| Менеджер | `tpl.msEmail.order.manager` | Уведомление о новом заказе |

Настройка уведомлений описана в разделе [События → Уведомления](/components/minishop3/development/events/notifications).

## Адаптивная вёрстка

Страница использует Bootstrap 5 Grid:

| Экран | Ширина контента |
|-------|-----------------|
| < 992px | 100% |
| ≥ 992px | 10 колонок (~83%) |

```html
<div class="row justify-content-center">
    <div class="col-lg-10">
        {* Контент центрирован *}
    </div>
</div>
```
