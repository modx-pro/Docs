# Отключаем все элементы управления на карте

В этом кейсе мы рассмотрим, как с карты, вызывающейся через сниппет, удалить все элементы управления, которые выводятся по-умолчанию.
Для этого мы воспользуемся jQuery триггером ymOnLoadMap, который появился с версии 1.2.0.

## Шаг 1

Вызываем сниппет так, как нам это необходимо.

## Шаг 2

Где-нибудь в коде, после того, как подключили jQuery, пишем код:

```js
$(document).ready(function () {
  $(document).on('ymOnLoadMap', function (e, ym2, map) {
    map.controls
      .remove('fullscreenControl') // полный экран
      .remove('geolocationControl') // моя геопозиция
      .remove('rulerControl') // линейка
      .remove('trafficControl') // пробки
      .remove('searchControl') // поиск
      .remove('typeSelector') // слои
      .remove('zoomControl') // масштаб
    ;
  });
});
```

_Узнать названия всех доступных элементов управления [можно в документации][1]._

Таким образом мы, после загрузки карты, выполняем свой JS код, не прибегая к правкам исходного `default.js`.

[1]: https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/control.Manager-docpage/#method_detail__add-param-control
