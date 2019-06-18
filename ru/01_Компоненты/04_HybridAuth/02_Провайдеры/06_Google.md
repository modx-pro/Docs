# Google

Получение ключей в Google

## Регистрация приложения

* Переходим [по ссылке][1]
* Нажимаем создать приложение.
* Принимаем лицинзионное соглашение и правила.
* *В некоторых случаях еще необходимо заполнить название компании приложения в **APIs & auth** &rarr; **Consent screen***
* Переходим в **APIs & auth** &rarr; **APIs** и включаем Contacts API и Google+ API

[![](https://file.modx.pro/files/1/a/2/1a23dbb7774059caba5bcf78bb30f0d0s.jpg)](https://file.modx.pro/files/1/a/2/1a23dbb7774059caba5bcf78bb30f0d0.png)

* Переходим в **APIs & auth** &rarr; **Credential**

[![](https://file.modx.pro/files/9/e/7/9e75c595a6b5f8d2d7f3cfb8712f9732s.jpg)](https://file.modx.pro/files/9/e/7/9e75c595a6b5f8d2d7f3cfb8712f9732.png)

* Создаем новое приложение нажав на **Create new Client ID**

[![](https://file.modx.pro/files/c/9/c/c9cb6dbf2bd5a79133550733f7b7426es.jpg)](https://file.modx.pro/files/c/9/c/c9cb6dbf2bd5a79133550733f7b7426e.png)

* Выбираем опцию **Web application** и заполняем поля **Authorized Javascript origins** и **Authorized redirect URI** и нажимаем создать приложение.
  * **Authorized Javascript origins** - `http://yoursite.ltd`
  * **Authorized redirect URI** - `http://yoursite.ltd/?hauth.done=Google`

[![](https://file.modx.pro/files/3/a/8/3a83a7551e1486841476e253f2519338s.jpg)](https://file.modx.pro/files/3/a/8/3a83a7551e1486841476e253f2519338.png)

* Копируем **Client ID** и **Client secret**

[![](https://file.modx.pro/files/b/c/9/bc965d7b789dcf4571c3896e77445f56s.jpg)](https://file.modx.pro/files/b/c/9/bc965d7b789dcf4571c3896e77445f56.png)

[1]: https://code.google.com/apis/console/
