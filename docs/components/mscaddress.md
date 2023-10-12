---
title: mscAddress
description: Пользовательские адреса для личного кабинета и страницы оформления заказа
logo: https://modstore.pro/assets/extras/mscaddress/logo-md.png
author: modx-pro
modstore: https://modstore.pro/packages/integration/mscaddress
repository: https://github.com/modx-pro/mscAddress

dependencies: miniShop2
---

# mscAddress

Пользовательские адреса для личного кабинета и страницы оформления заказа.
Компонент доступен только для **авторизованных пользователей** вашего сайта.

## Как использовать

В чанке **tpl.msOrder**, внутри формы добавить вывод адресов

::: code-group

```modx
<form class="form-horizontal ms2_form" id="msOrder" method="post">
    <div class="row">
        <div class="col-md-6">
            [[!mscAddress?
                &tpl=`tpl.mscaSelect`
            ]]
        </div>
    </div>
...
</form>
```

```fenom
<form class="form-horizontal ms2_form" id="msOrder" method="post">
    <div class="row">
        <div class="col-md-6">
            {$_modx->runSnippet('!mscAddress', [
                'tpl' => 'tpl.mscaSelect',
            ])}
        </div>
    </div>
...
</form>
```
:::

При изменении селекта на странице оформления заказа в соответствующие поля будут подгружаться данные заполненных адресов


На нужной странице личного кабинета добавить вызов сниппета, для управления адресами:

::: code-group

```modx
[[!mscAddress]]
```

```fenom
{'!mscAddress'|snippet}
```
:::

В случае, если в личном кабинете у вас не появилась кнопка добавления адреса проверьте чанк **tpl.mscaAddresses**, скорей всего у вас не хватает css стилей для отображения кнопки.


## Параметры mscAddress

| Имя                      | По умолчанию            | Описание                                                                                                                  |
|--------------------------|-------------------------|---------------------------------------------------------------------------------------------------------------------------|
| **tpl**                  | `tpl.mscaAddresses`     | чанк оформления списка адресов                                                                                            |
| **tplForm**              | `tpl.mscaForm`          | чанк оформления формы редактирования адресов                                                                              |


Чанк **tpl.mscaSelect** используется для вывода выбора адреса на странице оформления заказа


## Системные настройки

| Имя                          | По умолчанию                 | Описание                                                                                                                  |
|------------------------------|------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| **msca_address_handler**     | `mscaAddressHandler`         | Имя класса, который реализует логику работы с адресами.                                                                   |
| **msca_requires**            | `city,street,building`       | Обязательные поля для добавления адреса                                                                                   |
| **msca_frontend_css**        | `[[+cssUrl]]web/default.css` | Путь к файлу со стилями                                                                                                   |
| **msca_frontend_js**         | `[[+jsUrl]]web/default.js`   | Путь к файлу со скриптами                                                                                                 |
