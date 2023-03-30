# Google

Получение ключей в Google

## Регистрация приложения

* Переходим [по ссылке](https://console.cloud.google.com/apis/dashboard)
* В верхней панельке нажимаем на список проектов и там в окошке создаем новое приложение

[![](https://file.modx.pro/files/9/d/b/9db60ff3af0e41b740dcf6550e8218ecs.jpg)](https://file.modx.pro/files/9/d/b/9db60ff3af0e41b740dcf6550e8218ec.png)

* Нажимаем создать приложение (**New Project**)

[![](https://file.modx.pro/files/2/4/9/249b592da7e7778faf0cb37f2d7bd3d4s.jpg)](https://file.modx.pro/files/2/4/9/249b592da7e7778faf0cb37f2d7bd3d4.png)

* Вводим название проекта

После создания проекта переходим к его настройке:

Выбираем пункт **OAuth consent screen**

[![](https://file.modx.pro/files/0/9/d/09d432200aa64aa36d842b0740d07732s.jpg)](https://file.modx.pro/files/0/9/d/09d432200aa64aa36d842b0740d07732.png)

Далее пошагово настраиваем

### Шаг 1

[![](https://file.modx.pro/files/9/1/a/91ad745e369a92749eea70026536aac2s.jpg)](https://file.modx.pro/files/9/1/a/91ad745e369a92749eea70026536aac2.png)

### Шаг 2

[![](https://file.modx.pro/files/9/d/b/9dbbc6a58085c8213dd1732e196ded07s.jpg)](https://file.modx.pro/files/9/d/b/9dbbc6a58085c8213dd1732e196ded07.png)
[![](https://file.modx.pro/files/1/5/6/156cd1d332ea222405099147d39720e7s.jpg)](https://file.modx.pro/files/1/5/6/156cd1d332ea222405099147d39720e7.png)

### Шаг 3

[![](https://file.modx.pro/files/3/1/5/315d7750d4c67a632f9dac140c1058e8s.jpg)](https://file.modx.pro/files/3/1/5/315d7750d4c67a632f9dac140c1058e8.png)

:::warning Важно
Добавленные значения должны совпадать с указанными в системных настройках компонента. По умолчанию, на данный момент, там вписаны 2 значения (их достаточно для получения имени и email адреса пользователя -  `"scope":"https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"` )
:::

[![](https://file.modx.pro/files/8/d/5/8d5fbbd35b52e9d65a28cb80ba8c8138s.jpg)](https://file.modx.pro/files/8/d/5/8d5fbbd35b52e9d65a28cb80ba8c8138.png)

После выбора необходимых значений, увидим их в списке

[![](https://file.modx.pro/files/e/e/5/ee5f51ff8f70df84164020f9e5a541d7s.jpg)](https://file.modx.pro/files/e/e/5/ee5f51ff8f70df84164020f9e5a541d7.png)

### Шаг 4

Тестовых пользователей (email адресов) можно добавить несколько, чтобы протестировать функционал до верификации вашего проекта

[![](https://file.modx.pro/files/d/0/a/d0a1bbf847a791cbfc4e38a856ffb742s.jpg)](https://file.modx.pro/files/d/0/a/d0a1bbf847a791cbfc4e38a856ffb742.png)

На пункте Summary видим все введенные данные, проверяем их еще раз и на этом настройка этого раздела завершена.

Далее переходим к получение необходимых ключей

Выбираем пункт **Credentials → Create Credentials → OAuth client ID**

[![](https://file.modx.pro/files/9/a/3/9a398e2819a6dbd8c17bfccc117909das.jpg)](https://file.modx.pro/files/9/a/3/9a398e2819a6dbd8c17bfccc117909da.png)

Выбираем Web application и указываем URL для редиректа `https://domain.com/?hauth.done=Google`

[![](https://file.modx.pro/files/5/2/5/525ce2eb65be6b9a6206074389e4249cs.jpg)](https://file.modx.pro/files/5/2/5/525ce2eb65be6b9a6206074389e4249c.png)

После нажатия на Create получим ключи

[![](https://file.modx.pro/files/a/9/2/a927c716ac2f3e88ab6bd3ccd0b93e36s.jpg)](https://file.modx.pro/files/a/9/2/a927c716ac2f3e88ab6bd3ccd0b93e36.png)

**Эти данные указываются в системных настройках вашего сайта.**

На данном шаге настройки со стороны сервиса окончены.

Можно отправлять приложение на верификацию и опубликовать его для всех (на данном этапе авторизация доступна для тестовых пользователей, для всех остальных будет предупреждение что приложение не проверено)

[![](https://file.modx.pro/files/7/7/f/77fe0def5e9eb76701ca46ea78fdf36bs.jpg)](https://file.modx.pro/files/7/7/f/77fe0def5e9eb76701ca46ea78fdf36b.png)

:::warning ВАЖНО!
Чтобы пройти верификацию, необходимо соблюдать следующие несколько пунктов

* Стиль кнопки авторизации должен быть согласно [Google Style Guide](https://developers.google.com/identity/branding-guidelines) и никак иначе, даже если это не подходит по дизайну
* Доступ к политике конфиденциальности с любой страницы сайта (особенно с главной)
* В политику конфиденциальности необходимо включить примерно следующий текст:

***"Пользуясь сервисами Google, Вы доверяете нам свою личную информацию. Сервис Google используется при Авторизации через Google. Подробнее о Политике конфиденциальности и Условиях использования сервиса Google можно почитать [здесь](https://policies.google.com/privacy?hl=ru&roistat_visit=1269441)."***
:::
