# Работа с изображениями

## Встроенный Lazy-load

В комплекте с компонентом поставляется JS плагин для отложенной загрузки изображений, который реагирует на событие `scroll` html-документа. Отметить использование данного плагина можно очисткой значения системной настройки `mpc_lazyload_attr`. Плагин может не работать с некоторыми слайдерами или другими элементами, которые изначально имеют
скрытые картинки, поэтому вам нужно будет самостоятельно вызывать срабатывания плагина. Для этого можно положить скрипт в папку `assets/js/` со следующим содержимым

```js
import * as functions from './../components/migxpageconfigurator/js/web/functions.js';

document.addEventListener('DOMContentLoaded', () => {
  elem.addEventListener('some-event', () => {
    functions.lazyLoad(elem, 1);
  });
});
```

Функция `lazyLoad` принимает 3 аргумента:

1. `lazyLoadAttr` - имя атрибута который хранит реальное изображение до помещения в атрибут src, по умолчанию `data-lazy`
2. `parent` - элемент внутри которого нужно искать картинки, по умолчанию document.
3. `show` - принудительная загрузка изображений без учёта их попадания в область видимости

## Обрезка изображений

Если картинке заданы атрибуты `width` и `height`, то они будут перенесены в админку, а при парсинге будут использованы для формирования миниатюры средствами сниппета `pThumb`.
Формат миниатюры определяется системной настройкой `mpc_thumb_format`. Для картинки

```html
<img
  data-mpc-field="img"
  src="assets/project_files/images/otkrytie1.png"
  width="100"
  height="100"
  alt=""
>
```

Итоговый результат будет таким

```fenom
<img
  src="assets/components/migxpageconfigurator/images/fake-img.png"
  width="{$img_w}"
  height="{$img_h}"
  alt="{$title | notags}"
  data-lazy="{set $params = 'w='~$img_w~'&h='~$img_h~'&zc=1&ra=1&bg=&f=png'}{$img | pThumb:$params}"
>
```
