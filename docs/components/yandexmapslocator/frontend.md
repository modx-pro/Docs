---
title: Интерфейс
description: 'UI локатора YandexMapsLocator: BEM, data-yml, карта и список'
---

# Интерфейс

Фронт Free собран из Fenom-чанков, `locator.css` и ES-модулей. Внешний вид — BEM, поведение — атрибуты `data-yml-*`.

## Mobile-first

На узком экране одна колонка и табы «Список» / «Карта». С 769px шире — две колонки, табы прячутся.

Табы сидят на уровне layout, не внутри панели списка. Карту из DOM не выкидываем: в режиме списка панель карты получает `hidden`. Перед балуном JS переключает вид на «Карта».

## BEM

| Блок | Назначение |
|------|------------|
| `yml-locator` | Корень, CSS-переменные |
| `yml-search` | Форма поиска |
| `yml-store` | Карточка точки |
| `yml-balloon` | HTML внутри балуна |

Состояние держите в data-атрибутах, не в CSS-модификаторах вроде `is-active`.

## data-yml-* (контракт)

| Атрибут | Где | Назначение |
|---------|-----|------------|
| `data-yml-root` | `.yml-locator` | Корень, инициализация |
| `data-yml-view="list\|map"` | корень | Режим на мобильном |
| `data-yml-empty` | корень | Пустой список |
| `data-yml-located` | корень | Активен геофильтр после `locate()` |
| `data-yml-parents` | корень | ID родителей |
| `data-yml-search` | форма | Поиск |
| `data-yml-locate` | кнопка | «Моё местоположение» / «Все точки» |
| `data-yml-list` / `data-yml-map` | панели | Список и карта |
| `data-yml-store-id` | карточка | ID точки |
| `data-yml-lat`, `data-yml-lng` | карточка | Координаты |

Pro добавляет `data-yml-open-now` и бейджи `.yml-store__status` («Открыто» / «Закрыто»).

## AJAX Free

Поиск с формы и геолокация идут на:

```text
/assets/components/yandexmapslocator/search.php?parents=42&address=Омск,%20ул.%20Ленина,%2025&sortby=distance
```

Пример ответа:

```json
{
  "success": true,
  "data": [
    {
      "id": 15,
      "pagetitle": "Магазин на Ленина",
      "address": "Омск, ул. Ленина, 25",
      "latitude": 54.9893,
      "longitude": 73.3682,
      "phone": "+7 3812 00-00-00",
      "distance": 0.4,
      "distance_formatted": "0.4 км",
      "context_key": "web"
    }
  ],
  "meta": { "total": 1 }
}
```

Same-origin, без CORS и Bearer. Если стоит Pro и REST включён, фронт может ходить в `api.php`. При `api_enabled=No` снова `search.php`.

## JavaScript API

```javascript
const locator = new YandexMapsLocator('[data-yml-root]', { apiUrl, config, stores });

// Поиск по адресу (форма / свой UI)
locator.search({ address: 'Омск, ул. Ленина, 25' });

// Геолокация браузера → сортировка по distance
locator.locate();

// Сброс геофильтра («Все точки»)
locator.resetLocate?.();

locator.on('store:click', ({ id }) => console.log('card', id));
locator.on('marker:click', ({ id }) => console.log('marker', id));
locator.on('balloon:build', (payload) => {
  // можно дополнить HTML балуна
});
```

События JS: `store:click`, `marker:click`, `balloon:build`, `marker:options`.

После `locate()` кнопка становится «Все точки» и сбрасывает геофильтр. На мобильном после геолокации открывается вкладка «Карта».

### Открыть точку из своего кода

```javascript
const root = document.querySelector('[data-yml-root]');
const card = root.querySelector('[data-yml-store-id="15"]');
card?.querySelector('[data-yml-select]')?.click();
```

## Стилизация

Токены на `.yml-locator` (CSS-переменные `--yml-*`). Переопределяйте в теме сайта, файлы пакета не трогайте.

```css
.yml-locator {
  --yml-color-accent: #e11d48;
}
.yml-store[data-yml-active] {
  outline: 2px solid var(--yml-color-accent);
}
.yml-store__status.is-open {
  color: #15803d;
}
.yml-store__status.is-closed {
  color: #b91c1c;
}
```
