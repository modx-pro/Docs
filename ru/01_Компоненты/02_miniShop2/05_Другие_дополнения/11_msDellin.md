# msDellin

Компонент реализует расчет стоимости доставки через Транспортную компанию ООО «Деловые линии».

## Настройка компонента

[![](https://file.modx.pro/files/e/7/a/e7a27881b153667a76904f96fbe1aad3s.jpg)](https://file.modx.pro/files/e/7/a/e7a27881b153667a76904f96fbe1aad3.png)

* Объем товара по умолчанию - объем товара [miniShop2][1] для которого не задан размер
* Разделитель размера товара - символ разделитель в поле `size` [miniShop2][1]
* Поправочный коэф-т - возможно ввести некую корректировку объема ( объем = объем * коэф-т )
* Единицы измерения размера товара - доступны `мм` и `см`

* Id города отправителя груза - Код КЛАДР города отправки ( [получить можно тут][2] )
* Ключ kladr-api - для доступа к сервису [kladr-api][3]
* Токен kladr-api - для доступа к сервису [kladr-api][3]

## Основные настройки

### В miniShop2 :: Настройки :: Варианты доставки

* Активировать вариант доставки
* Назначить необходимые варианты оплаты

[![](https://file.modx.pro/files/6/4/f/64f4837253d6a20655b2bbf778b2f5bes.jpg)](https://file.modx.pro/files/6/4/f/64f4837253d6a20655b2bbf778b2f5be.png)

#### Настройки системы :: miniShop2

* Класс обработчик заказа - `msdlOrderHandler`
* Класс обработчик корзины - `msdlCartHandler`

[![](https://file.modx.pro/files/4/c/7/4c7e98868eb59337c0ca1b55b06bd7aes.jpg)](https://file.modx.pro/files/4/c/7/4c7e98868eb59337c0ca1b55b06bd7ae.png)

## Сниппет msOrderDellin

Практически близнец сниппета [msOrder][4]. Параметры:

* tplOuter - Обёртка для вывода результатов работы сниппета
* tplPayment - Чанк для оформления метода оплаты
* tplDelivery - Чанк для оформления способа доставки
* tplEmpty - Чанк, который выводится при отсутствии результатов
* tplSuccess - Чанк с сообщением об успешной работе сниппета
* front_js - Скрипт фронтенда

## Чанк tpl.msOrder.dellin.outer

Стандартный чанк вывода + вывод инфо о доставке

[![](https://file.modx.pro/files/b/a/8/ba8c960dac69591ceb0e6ae5dd62a96as.jpg)](https://file.modx.pro/files/b/a/8/ba8c960dac69591ceb0e6ae5dd62a96a.png)

## Чанк tpl.msOrder.dellin.outer.dadata

Чанк вывода для совместной работы с дополнением [msDadata][5]. Облегчает ввод данных пользователя.

[![](https://file.modx.pro/files/7/d/b/7db9d87ce4173c39df29dd1a17ccb9cbs.jpg)](https://file.modx.pro/files/7/d/b/7db9d87ce4173c39df29dd1a17ccb9cb.png)

## Необходимо:

Для правильного расчета стоимости доставки товара

* Каждому товару задать размер
* Каждому товару задать вес

## Благодарность

[Александру Рахимову][6] за помощь в создании компонента

[1]: /ru/01_Компоненты/02_miniShop2/
[2]: http://dev.dellin.ru/cms/
[3]: http://kladr-api.ru/
[4]: /ru/01_Компоненты/02_miniShop2/02_Сниппеты/03_msOrder.md
[5]: /ru/01_Компоненты/02_miniShop2/05_Другие_дополнения/08_msDaData.md
[6]: https://store.simpledream.ru/packages/?package|createdby=180
