---
title: Видео, карты и iframe
description: CookieConsentVideo, CookieConsentMap, инертный template, постеры и AJAX.
---

# Видео, карты и iframe

Включите нужные сервисы в Manager и назначьте им **видимую** необязательную категорию. В Strict iframe не создаётся до разрешения этой категории. В Legacy действует правило первого визита без сохранённого решения.

## YouTube через CookieConsentVideo

```modx
[[!CookieConsentVideo?
    &provider=`youtube`
    &url=`https://www.youtube.com/watch?v=M7lc1UVf-VE`
    &title=`Видео о компании`
    &start=`30`
    &autoplay=`0`
    &controls=`1`
    &poster=`/assets/img/video-preview.webp`
    &aspectRatio=`16:9`
    &width=`720`
]]
```

Для вертикальных видео задайте параметру `aspectRatio` значение `9:16` и подходящую ширину. Постер рекомендуется размещать на **своём** домене: внешние изображения в заглушке компонент намеренно не загружает.

## RUTUBE и VK Видео

```modx
[[!CookieConsentVideo?
    &provider=`rutube`
    &url=`https://rutube.ru/video/7716bd3e665725c3c008ae7ab4ff02e2/`
    &title=`RUTUBE`
]]
```

Для VK Видео используйте **официальный iframe URL** `video_ext.php`, скопированный из «Поделиться → Код для встраивания». Сохраняйте параметр `hash`, если он присутствует. Обычная ссылка на страницу видео VK не принимается сниппетом.

```modx
[[!CookieConsentVideo?
    &provider=`vk_video`
    &url=`https://vkvideo.ru/video_ext.php?oid=-123456&id=789012&hd=2`
    &title=`VK Видео`
]]
```

Числа `oid`/`id` в примере — условные; замените их данными действительного разрешённого к встраиванию ролика.

## Карты через CookieConsentMap

```modx
[[!CookieConsentMap?
    &provider=`yandex_maps`
    &src=`https://yandex.ru/map-widget/v1/?ll=37.62%2C55.75&z=10`
    &title=`Как нас найти`
]]
```

```modx
[[!CookieConsentMap?
    &provider=`google_maps`
    &src=`https://www.google.com/maps/embed/v1/place?key=YOUR_MAPS_KEY&q=Moscow`
    &title=`Карта проезда`
]]
```

Замените тестовые ссылки действительными HTTPS embed URL. Сниппет проверяет поддерживаемые домены, пути и параметры; произвольные iframe URL он не выводит. Для дополнительного экземпляра карты в `provider` укажите **ключ экземпляра** соответствующего loader.

## Произвольный iframe через template

Для сложного официального HTML, который не принимает профильный сниппет, можно использовать **доверенный** код:

```html
<div data-cc-embed="youtube" data-cc-aspect-ratio="16:9">
  <template>
    <iframe src="https://www.youtube-nocookie.com/embed/M7lc1UVf-VE"
      title="Пример видео" allowfullscreen></iframe>
  </template>
</div>
```

Атрибут `data-cc-embed` содержит ключ **включённого экземпляра**. `template` должен быть прямым дочерним элементом обёртки. Компонент не проверяет и не очищает произвольный HTML внутри него — это ответственность разработчика.

Для содержимого, вставленного после AJAX:

```javascript
const root = document.getElementById('ajax-result');
// Сначала вставьте в root HTML с data-cc-embed и template.
window.web86CookieConsent?.mountEmbeds(root);
```

`mountEmbeds()` можно повторять; постоянного MutationObserver нет. Уже активные iframe, выведенные напрямую без обёртки, автоматически не блокируются.
