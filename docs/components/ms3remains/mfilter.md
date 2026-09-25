---
title: mFilter
description: Фильтр каталога по наличию через проекцию msProductData.stock
---

# mFilter + ms3Remains

Своего типа фильтра в пакете нет. Каталог и [mFilter](/components/mfilter/) читают сумму остатков из проекции `msProductData.stock`. Включите `ms3remains_sync_product_stock` (по умолчанию включена) и при необходимости нажмите **Перестроить** в [настройках проекции](projections).

Документация mFilter для MiniShop3: [интеграция MiniShop3](/components/mfilter/integration/minishop3).

Примеры JSON и JS ниже: контракт mFilter и MiniShop3, не этого пакета. Сверяйте их с документацией этих компонентов.

## Фильтр «только в наличии»

В наборе фильтров добавьте числовой фильтр по полю `Data.stock` с нижней границей `1`.

```json
{
    "stock": {
        "type": "number",
        "source": "resource",
        "field": "Data.stock",
        "label": "Наличие"
    }
}
```

В форме (или через JS) задайте минимум `1`. Пустой максимум оставляет верхнюю границу открытой.

### Булев фильтр

Тот же эффект без ползунка:

```json
{
    "instock": {
        "type": "boolean",
        "source": "custom",
        "label": "В наличии",
        "condition": "Data.stock > 0"
    }
}
```

Условие опирается на проекцию ms3Remains (`stock`), не на `Data.count`.

### Кнопка «Только в наличии»

Вне формы: через [внешние фильтры](/components/mfilter/cookbook/external-filters) и [JS API](/components/mfilter/development/js-api). Ключ должен совпадать с ключом в наборе.

Числовой фильтр `stock`:

```html
<button type="button" data-in-stock>Только в наличии</button>
```

```js
document.querySelector('[data-in-stock]')?.addEventListener('click', () => {
  mfilterGet().setFilter('stock', { min: 1, max: '' });
});
```

Булев фильтр `instock`:

```js
document.querySelector('[data-in-stock]')?.addEventListener('click', () => {
  mfilterGet().setFilter('instock', 1);
});
```

## Неотслеживаемые товары

Товар без сохранённых строк в `ms3remains_remains` в проекцию не попадает. В выдаче «в наличии» его не будет, пока вы не сохраните остаток на вкладке (хотя бы `0` для «нет в наличии» или положительное число).

После массового импорта или смены опций пересоберите проекцию: [Проекция остатков](projections#массовое-перестроение).

## Карточки MiniShop3 после AJAX

После подмены списка mFilter снова вызовите frontend MiniShop3:

```js
document.addEventListener('mfilter:contentLoaded', function () {
  window.ms3?.refresh?.();
});
```

Подробнее: [Frontend JavaScript MiniShop3](/components/minishop3/development/frontend-js).

## Что не делает компонент

Собственный тип фильтра mFilter с переписыванием счётчиков опций по комбинациям остатков не поставляется. Для точного остатка комбинации на карточке товара используйте сниппет [`ms3Remains`](snippets/ms3Remains) с `&return=`options``.
