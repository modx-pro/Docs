# Odnoklassniki

## Получение ключей в Odnoklassniki

* [Регистрация в Одноклассниках.][1]
* [Регистрация в качестве разработчика.][2]
* [Регистрация приложения.][3]
* Заполняем поля **Название**, **Короткое имя (на латинице)**.
* Указываем **Тип приложения - External** (Внешнее приложение).
* Указываем в поле **Ссылка на приложение - адрес сайта**.
* Сохранить.

На почту придут:  

* Application ID: `123456789`.
* Публичный ключ приложения: `ABCDEFGHIJKLMNOPQ`.
* Секретный ключ приложения: `ABCDEFGHIJKLMNOPQ1234A12`.

Их необходимо указать в настройках системы в ключе **ha.keys.Odnoklassniki**

```json
{"keys":{"id":"123456789","key":"ABCDEFGHIJKLMNOPQ","secret":"ABCDEFGHIJKLMNOPQ1234A12"},"scope":"VALUABLE_ACCESS;LONG_ACCESS_TOKEN"}
```

[1]: https://ok.ru/dk?st.cmd=anonymMain&st.registration=on
[2]: https://ok.ru/devaccess
[3]: https://ok.ru/dk?st.cmd=appEditBasic
