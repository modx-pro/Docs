---
title: Интерфейс
description: 'Интерфейс локатора YandexMapsLocator: BEM, data-yml, карта и список'
---

# Интерфейс

Интерфейс Free: Fenom-чанки, `locator.css` и модули JS. Вид: BEM. Поведение: атрибуты `data-yml-*`.

## Колонки и табы

На узком экране одна колонка и табы «Список» / «Карта». С 769px шире две колонки, табы прячутся.

Табы стоят в общей разметке, не внутри панели списка. Карту из HTML не удаляем: в режиме списка панель карты получает `hidden`. Перед балуном скрипт переключает вид на «Карта».

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
| `data-yml-config` | JSON в корне | Конфиг карты. Без него свой `outer` не стартует |
| `data-yml-stores` | JSON в корне | Стартовый список точек |
| `data-yml-view="list\|map"` | корень | Режим на мобильном |
| `data-yml-view-tab` | табы | Переключение «Список» / «Карта» |
| `data-yml-empty` | корень | Пустой список |
| `data-yml-located` | корень | Активен геофильтр после `locate()` |
| `data-yml-parents` | корень | ID родителей |
| `data-yml-search` | форма | Поиск |
| `data-yml-submit` | кнопка формы | Отправка поиска |
| `data-yml-error` | форма | Текст ошибки поиска |
| `data-yml-locate` | кнопка | «Моё местоположение» / «Все точки» |
| `data-yml-list` / `data-yml-map` | панели | Список и карта |
| `data-yml-panel="list\|map"` | панели | Тот же смысл для JS |
| `data-yml-store-id` | карточка | ID точки |
| `data-yml-select` | кнопка карточки | Открыть точку на карте |
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

Запрос с той же страницы, без CORS и Bearer. Локатор на странице идёт в REST `api.php` только если стоят Pro, `api_enabled=Да` и пустой `api_token`. Если токен задан, `api_enabled=No` или Pro нет, страница остаётся на `search.php`. Bearer в HTML не попадает.

Если в запросе есть `address`, `search.php` тратит и бакет list (`api_list_rate_limit`, 120/мин), и бакет geocode (`api_geocode_rate_limit`, 30/мин).

Ошибки `search.php` (не REST):

| Код | Когда |
|-----|-------|
| `parents_required` | пустой `parents` |
| `where_not_allowed` | передан `where` |
| `invalid_param` | `include`, `fields` или `route` |
| `invalid_context` | неизвестный или запрещённый контекст |
| `method_not_allowed` | не GET |

## JavaScript API

Класс: `window.YandexMapsLocator`.

```javascript
const locator = new YandexMapsLocator('[data-yml-root]', { apiUrl, config, stores });

locator.search({ address: 'Омск, ул. Ленина, 25' });
locator.locate();
locator.clearLocation();
locator.showStore(15);
locator.setStores(stores);
locator.setCenter(54.98, 73.36);
locator.getStores();

locator.on('store:click', ({ id }) => console.log('card', id));
locator.on('marker:click', ({ id }) => console.log('marker', id));
locator.on('balloon:build', (payload) => {});
locator.on('search:start', (params) => {});
locator.on('search:complete', (data) => {});
locator.on('error', ({ message }) => {});
```

События JS: `store:click`, `marker:click`, `balloon:build`, `marker:options`, `search:start`, `search:complete`, `error`. Pro на `search:start` дописывает `filters=working_now`.

После `locate()` кнопка становится «Все точки» и сбрасывает геофильтр. На мобильном после геолокации открывается вкладка «Карта».

### Открыть точку из своего кода

```javascript
const root = document.querySelector('[data-yml-root]');
const card = root.querySelector('[data-yml-store-id="15"]');
card?.querySelector('[data-yml-select]')?.click();
```

## Стилизация

Токены на `.yml-locator` (CSS-переменные `--yml-*`). Переопределяйте в теме сайта, файлы пакета не трогайте. JS ставит `data-yml-active` на карточку и классы `is-open` / `is-closed` на `.yml-store__status`.

```css
.yml-locator {
  --yml-color-accent: #e11d48;
}
```
