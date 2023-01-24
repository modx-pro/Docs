# mspPayPal

## Начало работы

Компонент mspPayPal - является модулем оплаты для компонента интернет-магазина minishop2.

Для того, чтобы принимать оплату с помощью PayPal необходимо сначала подать заявку на [регистрацию в системе][1].


## Системные требования

- PHP 7.0+
- MODX Revolution 2.4+
- MiniShop2 3.0+

## Настройка mspPayPal

_**Важно! Для проверки механизма платежей пользуйтесь только тестовым окружением.**_



Для успешной работы с платежной системой вам понадобится логин и пароль, выданные после регистрации. 
- Для начала необходимо зайти в [панель управления][2].
- Выбрать пункт Manage API credentials  (Откроется страница для настройки)
- Выберите пункт Request an API signature
- Далее вам выдаст 3 скрытых значения, нажмите на SHOW и скопируйте все данные.  Они понадобятся для настройки интернет-магазина


## Установка и настройка пакета в MODX

Компонент доступен в маркетплейсе компонентов modstore.pro. Если репозиторий modstore.pro у вас еще не подключен - [добавьте его в свой MODX][3].

Следующий шаг заполнение системных настроек. Мы рекомендуем начать с тестовых данных (песочница)
**Тестовые параметры**
- ms2_payment_paypal_api_url `https://api-3t.sandbox.paypal.com/nvp`
- ms2_payment_paypal_checkout_url `https://www.sandbox.paypal.com/webscr?cmd=_express-checkout&useraction=commit&token=`

**Рабочие параметры**
- ms2_payment_paypal_api_url `https://api-3t.paypal.com/nvp`
- ms2_payment_paypal_checkout_url `https://www.paypal.com/webscr?cmd=_express-checkout&token=`


Затем нужно включить метод оплаты в настройках miniShop2 и добавить его к необходимому методу доставки.

Если у вас уже действующий магазин на MODX и MiniShop2 - настройка на этом закончена. 


[1]: https://www.paypal.com/
[2]: https://www.paypal.com/businessmanage/credentials/apiAccess
[3]: https://modstore.pro/info/connection
