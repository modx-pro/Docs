# Development

## Changing styles

### Wrong approach

1. Include your styles after the default ones;
2. Override values in your styles.

### Right approach

1. Copy the default file;
2. Override only what you need;
3. Set the new path in system setting `ms_cdek2_frontend_css`.

## Changing chunks

Which chunks to use is defined in presets (similar to SendIt). To use your own chunks, set the path to your preset file in `ms_cdek2_presets_path`. Do not change preset parameters you do not understand.

### Chunk parameters

1. **suggestItemTpl** — chunk for address suggestion list items;
2. **listWrapTpl** — wrapper chunk for pickup point list (must contain `select[name="point"]`);
3. **listItemTpl** — chunk for pickup list item (must output `option`);
4. **emptyTpl** — chunk when no pickup points found for the postal code;
5. **statusTpl** — delivery status chunk.

:::info
To see available placeholders, use an empty value for the parameter (works only for statusTpl and listItemTpl).
:::

## Hide or change toast messages

Toast texts are in lexicon files with keys:

* `ms_cdek2_error`
* `ms_cdek2_choose_pvz_error_message`

## Change map zoom on init

```js:line-numbers
document.addEventListener('mscdek:map:show', e => {
  const {object} = e.detail;
  object.mapUpdParams['zoom'] = 10;
})
```

## Block suggestion selection when street is empty and door delivery is selected

```js:line-numbers
document.addEventListener('mscdek:address:select:suggestion', e => {
  const {location, object} = e.detail;
  const selectedDelivery = document.querySelector('[name="delivery"]:checked');
  if (!location.data.street && selectedDelivery.value === object.config.deliveriesByType.door) {
    e.preventDefault();
    object.sendit.Notify.error('Enter street');
  }
})
```

## Show status as toast instead of default block

:::warning
Remove the status output block from the page.
:::

```js:line-numbers
document.addEventListener('mscdek:status:get', e => {
  const {status, object} = e.detail;
  if (!object.statusBlock) {
    const message = `Delivery by ${status.calc_result.delivery_date_range.max}, ${status.delivery_cost} rub.`
    object.sendit.Notify.info(message);
  }
})
```

## Show map in modal

:::warning
This example uses [Fancybox](https://fancyapps.com/fancybox/getting-started/)
:::

#### Add a button to open the modal (hidden by default with class `.hide`)

```html

<button type="button" class="hide" data-fancybox data-src="#map-modal">Select pickup point</button>
```

#### Add JS to show/hide the button on load and when delivery method changes

  :::info
  `3` in `toggleMapButton` is the ID of the pickup delivery method.
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

#### Put the map block inside the modal

```html:line-numbers
<div id="map-modal" style="display:none;width:800px;max-width: 100%">
    <div data-mscdek-map class="hide"></div>
</div>
```

#### Open modal on button click

```js:line-numbers
document.addEventListener('click', e => {
  if (e.target.closest('[data-src="#map-modal"]')) {
    Fancybox.defaults.dragToClose = false; // so user can pan the map
    Fancybox.show([{src: "#map-modal", type: "inline"}]);
  }
})
```

## Extra pickup info and confirm selection with button

:::info
This assumes the page has no block

```html:line-numbers
<div class="hide" data-mscdek-list></div>
```

and instead uses a hidden field

```html:line-numbers
<input type="hidden" name="point">
```

:::

#### Add template for pickup details block

```html:line-numbers
<template data-mscdek-baloon>
    <div data-pvz-details class="hide">
        <h5>Address:<br>
            <span data-mscdek-prop="address"></span>
        </h5>
        <p>Working hours:<br>
            <span data-mscdek-prop="work_time"></span>
        </p>
        <button id="select-pvz-btn" type="button">Select</button>
    </div>
</template>
```

#### Add styles for map and details block

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

#### Insert details block into map block after init

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

#### Show pickup details

```js:line-numbers
const showBaloon = (markerData) => {
  const baloon = document.querySelector('[data-pvz-details]');
  if (baloon) {
    const addressBlock = baloon.querySelector('[data-mscdek-prop="address"]');
    const workTimeBlock = baloon.querySelector('[data-mscdek-prop="work_time"]');
    const btn = baloon.querySelector('#select-pvz-btn');
    btn.setAttribute('data-pvz-code', markerData.code);
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

#### Handle pickup selection confirm

```js:line-numbers
document.addEventListener('click', e => {
  if (e.target.closest('#select-pvz-btn')) {
    const pointField = document.querySelector('[name="point"]');
    const pvzCode = e.target.closest('#select-pvz-btn').dataset.pvzCode;
    const msCdekList = window.mscdek.container.getModule('list');
    const result = await msCdekList.pointsStore.get(msCdekList.indexField.value);
    const selectedPoint = result.data.points.find(point => point.code === pvzCode);
    pointField && (pointField.value = selectedPoint[msCdekList.config.pointValueFieldName] ?? selectedPoint.location[msCdekList.config.pointValueFieldName]);
    pointField && pointField.dispatchEvent(new Event('change', {bubbles: true}));

    // uncomment to show toast with selected pickup address
    /*
    const message = `Pickup: ${selectedPoint.location.address} (${selectedPoint.distance} km.)`
    SendIt.Notify.info(message);
    */

    /* Fancybox.close(); */ // uncomment to close modal after selection
  }
})
```

## Different marker for pickup with even ID

```js:line-numbers
document.addEventListener('mscdek:marker:create', e => {
  const {marker, markerData} = e.detail;
  if (markerData.id % 2 === 0) {
    marker.querySelector('img').src = 'assets/marker.png';
  }
})
```
