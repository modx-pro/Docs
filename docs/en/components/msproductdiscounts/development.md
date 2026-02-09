# Development

## Changing styles

### Wrong approach

1. Add your styles below;
2. Override values in them.

### Correct approach

1. Copy the standard file;
2. Override the needed values;
3. Set the new path in system setting `ms_cdek2_frontend_css`

## Changing chunks

Which chunks to use is described in presets, similar to SendIt. To use your own chunks, set the path to your presets file in `ms_cdek2_presets_path`. Do not change preset parameters you don't understand.

### Chunk parameters

1. **suggestItemTpl** — chunk for address suggestion list item;
2. **listWrapTpl** — pickup point list wrap chunk (must contain `select[name="point"]`);
3. **listItemTpl** — pickup point list item chunk (must contain `option`);
4. **emptyTpl** — chunk when no pickup points found by postal code;
5. **statusTpl** — delivery status chunk.

:::info
To see available placeholders, use an empty value in the parameter (works only for statusTpl and listItemTpl)
:::

## Hide or change popup message

Popup texts are in lexicon files with keys:

* `ms_cdek2_error`
* `ms_cdek2_choose_pvz_error_message`

## Change map zoom on init

```js:line-numbers
document.addEventListener('mscdek:map:show', e => {
  const {object} = e.detail;
  object.mapUpdParams['zoom'] = 10;
})
```

## Disallow suggestion selection when street is not entered and door delivery is selected

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

## Change default status output to popup notification

:::warning
Remove the status output block from the page.
:::

```js:line-numbers
document.addEventListener('mscdek:status:get', e => {
  const {status, object} = e.detail;
  if (!object.statusBlock) {
    const message = `Delivery by ${status.calc_result.delivery_date_range.max} for ${status.delivery_cost}`
    object.sendit.Notify.info(message);
  }
})
```

## Show map in modal

:::warning
This example uses [Fancybox](https://fancyapps.com/fancybox/getting-started/)
:::

#### Add modal open button, initially hidden with class `.hide`

```html

<button type="button" class="hide" data-fancybox data-src="#map-modal">Select pickup point</button>
```

#### Add JS to toggle button visibility on page load and delivery method change

  :::info
  `3` in `toggleMapButton` is the ID of pickup-point delivery method
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

#### Put map block in modal

```html:line-numbers
<div id="map-modal" style="display:none;width:800px;max-width: 100%">
    <div data-mscdek-map class="hide"></div>
</div>
```

#### Add code to open modal on button click

```js:line-numbers
document.addEventListener('click', e => {
  if (e.target.closest('[data-src="#map-modal"]')) {
    Fancybox.show([{src: "#map-modal", type: "inline"}]);
  }
})
```

## Output pickup point info and confirm selection with button

:::info
Assume the page does not have

```html:line-numbers
<div class="hide" data-mscdek-list></div>
```

and instead has a hidden field

```html:line-numbers
<input type="hidden" name="point">
```

:::

#### Add pickup point info block template

```html:line-numbers
<template data-mscdek-baloon>
    <div data-pvz-details class="hide">
        <h5>Address:<br>
            <span data-mscdek-prop="address"></span>
        </h5>
        <p>Hours:<br>
            <span data-mscdek-prop="work_time"></span>
        </p>
        <button id="select-pvz-btn" type="button">Select</button>
    </div>
</template>
```

#### Add styles for map block and info block

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

#### Insert info block into map block after init

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

#### Output pickup point info

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

#### Add pickup point selection confirmation handler

```js:line-numbers
document.addEventListener('click', e => {
  if (e.target.closest('#select-pvz-btn')) {
    const addressBlock = document.querySelector('[data-pvz-details] [data-mscdek-prop="address"]');
    const pointField = document.querySelector('[name="point"]');
    pointField && (pointField.value = addressBlock.innerHTML);
    pointField && pointField.dispatchEvent(new Event('change', {bubbles: true}));

    /* SendIt.Notify.info(`Pickup: ${addressBlock.innerHTML}`); */ // uncomment to show popup with selected address
    /* Fancybox.close(); */ // uncomment to close modal after selection
  }
})
```

## Change marker for pickup points with even ID

```js:line-numbers
document.addEventListener('mscdek:marker:create', e => {
  const {marker, markerData} = e.detail;
  if (markerData.id % 2 === 0) {
    marker.querySelector('img').src = 'assets/marker.png';
  }
})
```
