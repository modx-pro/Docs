# Разработка

## Изменение стилей

### Неправильный вариант:

1. Подключить свои стили ниже;
2. Переопределить значения в них.

### Правильный вариант:

1. Скопировать стандартный файл;
2. Переопределить нужные значения;
3. Указать новый путь в системной настройке `ms_cdek2_frontend_css`

## Изменение чанков

То какие чанки использовать описано в пресетах, аналогичных тем, что использует SendIt.
Чтобы указать свои чанки нужно в системной настройке `ms_cdek2_presets_path` указать путь к своему файлу пресетов.
При этом менять параметры пресетов, назначение которых вы не понимаете, менять не стоит.

### Параметры чанков

1. **suggestItemTpl** - чанк элемента списка подсказов ввода адреса;
2. **listWrapTpl** - чанк-обёртка списка ПВЗ (обязательно должен содержать `select[name="point"]`);
3. **listItemTpl** - чанка элемента списка ПВЗ (обязательно должен быть `option`);
4. **emptyTpl** - чанк который будет использован если ПВЗ не будут найдены по почтовому индексу;
5. **statusTpl** - чанк статуса доставки.

:::info
Чтобы узнать список доступных плейсхолдеров укажите пустое значение в параметре ( работает только для statusTpl и listItemTpl)
:::

## Скрыть или изменить всплывающее сообщение

Тексты всплывающих сообщений хранятся в файлах словарей и имеют следующие ключи:

* `ms_cdek2_error`
* `ms_cdek2_choose_pvz_error_message`

## Изменить масштаб карты при инициализации

```js:line-numbers
document.addEventListener('mscdek:map:show', e => {
  const {object} = e.detail; 
  object.mapUpdParams['zoom'] = 10;
})
```

## Запретить выбор подсказки, если не введена улица и выбрана доставка до двери

```js:line-numbers
document.addEventListener('mscdek:address:select:suggestion', e => {
  const {location, object} = e.detail;
  const selectedDelivery = document.querySelector('[name="delivery"]:checked'); 
  if (!location.data.street && selectedDelivery.value === object.config.deliveriesByType.door) {
    e.preventDefault();
    object.sendit.Notify.error('Введите улицу');
  }
})
```

## Изменить стандартный вывод статуса на вплывающее уведомление

:::warning
Удалите со страницы блок вывода статуса.
:::

```js:line-numbers
document.addEventListener('mscdek:status:get', e => {
  const {status, object} = e.detail; 
  if (!object.statusBlock) {
    const message = `Доставим до ${status.calc_result.delivery_date_range.max} за ${status.delivery_cost} руб.`
    object.sendit.Notify.info(message);
  }
})
```

## Показывать карту в модальном окне

:::warning
В примере используется библиотека [Fancybox](https://fancyapps.com/fancybox/getting-started/)
:::

#### Добавим кнопку открытия модального окна, которая изначально скрыта с помощью класса `.hide`

```html

<button type="button" class="hide" data-fancybox data-src="#map-modal">Выбрать ПВЗ</button>
```

#### Добавим JS, который будет менять видимость кнопки при загрузке страницы и смене способа доставки
  :::info
  `3` в функции `toggleMapButton` это ID способа доставки до ПВЗ
  :::

```js:line-numbers
const toggleMapButton = () => {
  const btn = document.querySelector('[data-src="#map-modal"]');
  const delivery = document.querySelector('[name=delivery]:checked');
  if (Number(delivery.value) === 3) {
    btn.classList.remove('hide');
  } else {
    btn.classList.add('hide');
  }
}

document.addEventListener('DOMContentLoaded', e => {
  toggleMapButton();
})

document.addEventListener('change', e => {
  if (e.target.name === 'delivery') {
    toggleMapButton();
  }
})
```

#### Поместим блок вывода карты в модальное окно

```html:line-numbers
<div id="map-modal" style="display:none;width:800px;max-width: 100%">
    <div data-mscdek-map class="hide"></div>
</div>
```

#### Добавим код для открытия модального окна при клике на нашу кнопку

```js:line-numbers
document.addEventListener('click', e => {
  if (e.target.closest('[data-src="#map-modal"]')) {
    Fancybox.show([{src: "#map-modal", type: "inline"}]);
  }
})
```

## Вывод дополнительной информации о ПВЗ и подтверждение выбора кнопкой
:::info
Предполагается что на странице отсутствует блок 
```html:line-numbers
<div class="hide" data-mscdek-list></div>
```
а вместо него выведено скрытое поле
```html:line-numbers
<input type="hidden" name="point">
```
:::
#### Добавим шаблон блока дополнительной информации о ПВЗ

```html:line-numbers
<template data-mscdek-baloon>
    <div data-pvz-details class="hide">
        <h5>Адрес:<br>
            <span data-mscdek-prop="address"></span>
        </h5>
        <p>Время работы:<br>
            <span data-mscdek-prop="work_time"></span>
        </p>
        <button id="select-pvz-btn" type="button">Выбрать</button>
    </div>
</template>
```

#### Добавим стили для блока с картой и для блока дополнительной информации

```css:line-numbers
[data-mscdek-map] {
    position: relative;
}

[data-pvz-details]:not(.hide) {
    flex-direction: column;
    display: flex;
    align-items: start;
    justify-content: center;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background: rgba(0, 0, 0, .7);
    width: 40%;
    padding: 30px;
    color: white;
}
```

#### Поместим блок с дополнительной информацией в блок с картой после её инициализации
```js:line-numbers
document.addEventListener('mscdek:map:init', e => {
  const {mapBlock} = e.detail;

  if (!mapBlock.querySelector('[data-pvz-details]')) {
    const baloonTemplate = document.querySelector('[data-mscdek-baloon]');
    mapBlock.insertAdjacentHTML('beforeend', baloonTemplate.innerHTML);
    baloonTemplate.innerHTML = '';
  }
})
```

#### Выводим дополнительную информацию о ПВЗ
```js:line-numbers
const showBaloon = (markerData) => {
  const baloon = document.querySelector('[data-pvz-details]');
  if (baloon) {
    const addressBlock = baloon.querySelector('[data-mscdek-prop="address"]');
    const workTimeBlock = baloon.querySelector('[data-mscdek-prop="work_time"]');
    addressBlock.innerHTML = markerData.location.address;
    workTimeBlock.innerHTML = markerData.work_time;

    baloon.classList.remove('hide');
    return true;
  }
  return false;
}

document.addEventListener('mscdek:map:choose', e => {
  const {markerData, object} = e.detail;  
  showBaloon(markerData.properties)
})
```

#### Добавляем обработчик подтверждения выбора ПВЗ
```js:line-numbers
document.addEventListener('click', e => {
  if (e.target.closest('#select-pvz-btn')) {
    const addressBlock = document.querySelector('[data-pvz-details] [data-mscdek-prop="address"]');
    const pointField = document.querySelector('[name="point"]');
    pointField && (pointField.value = addressBlock.innerHTML);
    pointField && pointField.dispatchEvent(new Event('change', {bubbles: true}));

    /* SendIt.Notify.info(`ПВЗ: ${addressBlock.innerHTML}`); */ // раскомментируйте для показа всплывающего уведомления с адресом выбранного ПВЗ
    /* Fancybox.close(); */ // раскоментируйте, если хотите чтобы модальное окно закрывалось после выбора
  }  
})
```

## Изменить маркер для ПВЗ с чётным ID
```js:line-numbers
document.addEventListener('mscdek:marker:create', e => {
  const {marker, markerData} = e.detail;  
  if (markerData.id % 2 === 0) {
    marker.querySelector('img').src = 'assets/marker.png';
  }
})
```
