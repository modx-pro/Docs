# MODX 3 и модификации

## MODX 3 и MiniShop3

Один и тот же пакет устанавливается на MODX 2.8 и MODX 3. Сниппет сам определяет магазин по пространствам имён. Если установлен только MiniShop3, msCatalyst читает таблицы `ms3_*`, поле производителя `vendor_id` и товары с `class_key` `MiniShop3\Model\msProduct`. Если установлены оба магазина, msCatalyst работает с miniShop2.

Параметры, синтаксис фасетов, чанки и адреса на обеих версиях одинаковые. Сниппет вывода карточек в MiniShop3 тоже называется `msProducts`.

Отличия:

- мост к SeoFilter работает только на MODX 2. На MODX 3 используйте `&seo=`native``, см. [SEO](seo);
- Localizator на MODX 3 выходит пакетом `localizator3`, msCatalyst поддерживает его, см. [Мультиязычность](multilingual#localizator).

::: warning
MiniShop3 пока в бета-версии. Если после его обновления фильтр перестал работать, напишите в обсуждении компонента и укажите версию MiniShop3.
:::

## Модификации

При установленном msOptionsPrice2 (miniShop2) или ms3Variants (MiniShop3) индекс подхватывает цены и опции модификаций.

```modx
[[!msCatalyst?
  &parents=`5`
  &facets=`vendor, msop:price|range, option:size, option:color`
]]
```

- `msop:price|range` на miniShop2 и `variant:price|range` на MiniShop3 строят диапазон цен модификаций.
- Опции модификаций сливаются с опциями товара в `option:*`.
- Товар проходит фильтр цены, если хотя бы одна модификация попадает в диапазон.

Синхронизация пишет модификации в те же компоненты, см. [Синхронизация](interface/sync#modifikacii-kategorii-i-kartinki). Экспорт выгружает их отдельными строками, если включить «Модификации отдельными строками».
