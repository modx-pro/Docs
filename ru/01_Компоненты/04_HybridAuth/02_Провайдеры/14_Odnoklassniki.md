Получение ключей в Odnoklassniki

* [Регистрация в Одноклассниках][1]
* [Регистрация в качестве разработчика][2]
* [Регистрация приложения][3]
* Заполняем поля **Название**, **Короткое имя (на латинице)**.
* Указываем **Тип приложения - External **(Внешнее приложение).
* Указываем в поле **Ссылка на приложение - адрес сайта**.

 На почту придут:

Application ID: 123456789. 
Публичный ключ приложения: ABCDEFGHIJKLMNOPQ.
Секретный ключ приложения: ABCDEFGHIJKLMNOPQ1234A12.

* Их необходимо указать в настройках системы в ключе ha.keys.Odnoklassniki  {"id":"123456789","key":"ABCDEFGHIJKLMNOPQ","secret":"ABCDEFGHIJKLMNOPQ1234A12"}

[1]: http://www.odnoklassniki.ru/dk?st.cmd=anonymRegistrationEdit&st._aid=AnonymMain_Register_RegisterEdit
[2]: http://www.odnoklassniki.ru/devaccess
[3]: http://odnoklassniki.ru/dk?st.cmd=appEdit&st._aid=Apps_Info_MyDev_AddApp
