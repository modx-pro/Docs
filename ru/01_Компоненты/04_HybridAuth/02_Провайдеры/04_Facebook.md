Получение ключей в Facebook

##Регистрация приложения

* Переходим по ссылке https://developers.facebook.com/apps
* Нажимаем создать приложение.
* Заполняем поля 
Display Name b Namespace

Заполняем и вводим капчу

Сохраняем приложение и переходим в режим редактирования.
Изменяем следующие настройки:
* App Domains - xarieyle.com
* Sandbox Mode - Off
* Site URL - http://xarieyle.com/


ID	Facebook
 Protocol	OAuth 2
 IDp URL	http://www.facebook.com/
 Keys registeration	https://developers.facebook.com/apps
 Dev documentation	http://developers.facebook.com/
 Based on	Facebook PHP SDK  https://github.com/facebook/php-sdk	
 Since	HybridAuth 1.0.1
 Wrapper	./Hybrid/Providers/Facebook.php
Callback URL	http://mywebsite.com/path_to_hybridauth/?hauth.done=Facebook