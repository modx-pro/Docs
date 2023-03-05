# mspPayAnyWay

Для того, чтобы принимать оплату через [«PayAnyWay»][1] вам необходимо сначала [зарегистрировать][2] магазин в этой системе.

## Регистрация «PayAnyWay»

* Указать название организации
* Указать сайт
* Указать Инн
* Заполнить персональные данные

[![](https://file.modx.pro/files/c/8/1/c81185ad9ef991d8289befd1ef20d5bds.jpg)](https://file.modx.pro/files/c/8/1/c81185ad9ef991d8289befd1ef20d5bd.png)

## Проверка документов «PayAnyWay»

Прежде чем принимать платежи через «PayAnyWay» необходимо дождаться проверки документов.

[![](https://file.modx.pro/files/3/e/4/3e4069ad047ae816f5a94f5ec684673as.jpg)](https://file.modx.pro/files/3/e/4/3e4069ad047ae816f5a94f5ec684673a.png)

## Настройка «PayAnyWay»

После того как ваши данные прошли проверку,
В настройках магазина вам нужно указать следующие параметры:

* Псевдоним магазина
* Pay URL - адрес обработчика, в виде <http://sitename.ru/assets/components/minishop2/payment/msppayanyway.php>
* HTTP метод отправки параметров - POST
* Код проверки целостности данных, должен совпадать с кодом в настройках компонента
* Подпись формы оплаты обязательна - ДА
* Можно переопределять настройки в url - ДА

[![](https://file.modx.pro/files/9/1/b/91b5172962968e93527b54835ae38a08s.jpg)](https://file.modx.pro/files/9/1/b/91b5172962968e93527b54835ae38a08.png)

## Настройка MODX

В MODX вам нужно настроить следующие параметры (находятся в разделе «PayAnyWay» пространства имен minishop2):

* MNT_ID - Идентификатор магазина в системе MONETA.RU
* MNT_FAIL_URL - страницу ошибки оплаты
* MNT_SUCCESS_URL - страницу успешной оплаты
* MNT_RETURN_URL - страницу отмены оплаты
* MNT_DATAINTEGRITY_CODE  - код проверки целостности данных, совпадает с настройкой магазина

[![](https://file.modx.pro/files/f/e/e/fee4bc7b66cee4f447d61918fc5ef59as.jpg)](https://file.modx.pro/files/f/e/e/fee4bc7b66cee4f447d61918fc5ef59a.png)

Также не забудьте включить новый метод оплаты и назначить его в вариантах доставки.

[![](https://file.modx.pro/files/4/a/d/4ad42314fde2d20a682fec4cc1037357s.jpg)](https://file.modx.pro/files/4/a/d/4ad42314fde2d20a682fec4cc1037357.png)

[1]: https://payanyway.ru/info/w/ru/public/welcome.htm "Оплачивать услуги с «PayAnyWay» просто и удобно."
[2]: https://payanyway.ru/partnerRegistration.htm "Регистрация магазина в системе «PayAnyWay»"
