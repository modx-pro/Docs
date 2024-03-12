---
title: ajaxLogin
description: Авторизация пользователей через ajax
logo: https://modstore.pro/assets/extras/ajaxlogin/logo-lg.png
author: modx-pro
modstore: https://modstore.pro/packages/users/ajaxlogin
repository: https://github.com/modx-pro/ajaxLogin
---

# ajaxLogin

Оригинальный компонент разработан Маратом Марабаром. Передан сообществу MODX 13 июня 2023 года.

## Основной функционал

- Авторизация
- Регистрация
- Восстановление пароля

Все действия происходят в модальном окне, по умолчанию Bootstrap 5.

## Зависимости

- [Login](https://docs.modx.com/current/en/extras/login/login) (обязательно)
- [pdoTools](/components/pdotools/) (по желанию, для использования Fenom)

## Сниппет ajaxLogin

| Имя                      | По умолчанию                  | Описание                                                                                                                      |
|--------------------------|-------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| **activationEmailTpl**   | `ajaxLoginActivateEmailTpl`   | Чанк письма для подтверждения Email, сниппет Register                                                                         |
| **activationResourceId** |                               | ID ресурса, куда будет перенаправлен пользователь для подтверждения и активации своей почты при регистрации, сниппет Register |
| **emailTpl**             | `ajaxLoginForgotPassEmailTpl` | Чанк письма с информацией о дальнейших действиях при сбросе пароля, сниппет ForgotPassword                                    |
| **errTpl**               | `ajaxLoginErrTpl`             | Шаблон вывода ошибки для сниппетов Login и ForgotPassword                                                                     |
| **frontendCss**          |                               | Путь до файла со стилями                                                                                                      |
| **frontendJs**           |                               | Путь до файла со скриптом                                                                                                     |
| **loginTpl**             | `ajaxLoginFormTpl`            | Чанк с формой авторизации для сниппета Login                                                                                  |
| **logoutResourceId**     |                               | ID ресурса, куда пользователь будет перенаправлен при выходе. Если пусто, то текущий ресурс                                   |
| **registerTpl**          | `ajaxLoginRegisterFormTpl`    | Чанк с формой регистрации для сниппета Register                                                                               |
| **resetResourceId**      |                               | ID ресурса, куда будет перенаправлен пользователь для сброса пароля по ссылке из почты                                        |
| **sentTpl**              | `ajaxLoginForgotPassSentTpl`  | Чанк с сообщением, после заказа сброса пароля                                                                                 |
| **tpl**                  | `ajaxLoginForgotFormTpl`      | Чанк с формой восстановления пароля для сниппета ForgotPassword                                                               |
| **tplAjax**              | `ajaxLoginTpl`                | Чанк, разделённый на две части сепаратором. Та или иная часть выводится согласно статуса пользователя — авторизован или нет   |
| **tplModal**             | `ajaxLoginModalTpl`           | Чанк оформления модального окна                                                                                               |
| **tplType**              | `embedded`                    | Значение указывает сниппетам Login и ForgotPassword где находится форма. **Не рекомендую менять этот параметр**               |
| **submittedResourceId**  |                               | Перенаправит пользователя после регистрации на указанный ресурс                                                               |

## Примеры

- Пример кода, которого вполне достаточно для работы этого компонента:

::: code-group

```modx
[[!ajaxLogin?
  &resetResourceId=`87`
  &emailSubject=`Заказан сброс пароля`
  &usergroups=`Users::Member`
  &activationEmailSubject=`Спасибо за регистрацию!`
  &activationResourceId=`84`
  &successMsg=`На указанный Email мы отправили ссылку, по которой нужно перейти для подтверждения почты.`
]]
```

```fenom
{'!ajaxLogin' | snippet : [
  'resetResourceId' => 10,
  'emailSubject' => 'Заказан сброс пароля',
  'usergroups' => 'Users::Member',
  'activationEmailSubject' => 'Спасибо за регистрацию!',
  'activationResourceId' => 84,
  'successMsg' => 'На указанный Email мы отправили ссылку, по которой нужно перейти для подтверждения почты.',
]}
```

:::
