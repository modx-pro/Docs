# mspUP

Для того, чтобы принимать оплату через «UnitPay» вам необходимо сначала [зарегистрировать][1] магазин в этой системе.

## Регистрация «UnitPay»

* Указать название проекта
* Указать описание проекта
* Указать URL проекта

[![](https://file.modx.pro/files/5/d/a/5da7c948fae95e76c29bbc336258bc27s.jpg)](https://file.modx.pro/files/5/d/a/5da7c948fae95e76c29bbc336258bc27.png)

* Разместите на Вашем сервере файл с проверочным кодом

[![](https://file.modx.pro/files/6/0/4/604aa8e2c3523673d7a1ea87040155e5s.jpg)](https://file.modx.pro/files/6/0/4/604aa8e2c3523673d7a1ea87040155e5.png)

## Настройка «UnitPay»

В настройках магазина вам нужно указать следующие параметры:

* url скрипта обработки платежей - <http://вашСайт.ru/assets/components/minishop2/payment/mspup.php>
* Fail URL - страницу ошибки оплаты
* Success URL - страницу успешной оплаты

[![](https://file.modx.pro/files/4/a/8/4a80c539ccc64e18212c77ea89dba9f9s.jpg)](https://file.modx.pro/files/4/a/8/4a80c539ccc64e18212c77ea89dba9f9.png)

## Настройка MODX

В MODX вам нужно настроить следующие параметры (находятся в разделе «UnitPay» пространства имен minishop2):

* **ID вашего проекта.** — идентификатор магазина, узнать его можно в личном кабинете
* **Секретный ключ** — секретный ключ, в настройках магазина
* **Публичный ключ** — публичный ключ, в настройках магазина

[![](https://file.modx.pro/files/8/7/e/87ee43d5b40c092e173edaf8f1bf9623s.jpg)](https://file.modx.pro/files/8/7/e/87ee43d5b40c092e173edaf8f1bf9623.png)

Также не забудьте включить новый метод оплаты и назначить его в вариантах доставки.

[![](https://file.modx.pro/files/5/d/c/5dc4b8e7a7385edfffc8cb1a622e538fs.jpg)](https://file.modx.pro/files/5/d/c/5dc4b8e7a7385edfffc8cb1a622e538f.png)

[1]: https://unitpay.ru/ "Регистрация магазина в сиситеме «UnitPay»"
