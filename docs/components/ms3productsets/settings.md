---
title: Системные настройки
---
# Системные настройки

Все настройки имеют префикс `ms3productsets.` и находятся в пространстве имён **ms3productsets**.

**Где изменить:** **Настройки → Системные настройки** — фильтр по пространству имён `ms3productsets`.

![Namespace ms3productsets](/components/ms3productsets/screenshots/settings-namespace.png)

## Таблица настроек

| Настройка | Описание | По умолчанию | Рекомендации |
|-----------|----------|--------------|--------------|
| `ms3productsets.max_items` | Лимит товаров в подборке по умолчанию | `10` | Обычно **6–20** для витринных блоков. В вызове сниппета параметр **`max_items`** переопределяет значение. Учитывается в сниппете, connector **`get_set`** и **`mspsLexiconScript`**. |
| `ms3productsets.cache_lifetime` | TTL кеша подборок (секунды). **`0`** — кеш отключён. Ключ: **`type`**, **`resource_id`**, **`category_id`**, **`set_id`**, **`limit`**, **`exclude_ids`**, поколение **`cache_generation`**. Сброс поколения при save/delete шаблона, apply/unbind, sync TV | `3600` | Продакшен: **> 0** (часто 3600). Для отладки — **`0`**. Кешируется результат **`msps_get_products_by_type`** через `cacheManager`. |
| `ms3productsets.auto_recommendation` | При **`0`** при пустой ручной подборке возвращать пустой результат, **не** включать авто (`similar`, `buy_together` и т.д.). При **`1`** — текущее поведение (fallback на авто-логику типа) | `1` | **`0`** — на витрине только ручные связи (админка/TV) и fallback **`vip_set_*`** для типа **`vip`**. Авто по категории и заказам отключены. |
| `ms3productsets.vip_set_1` | ID товаров для VIP-набора при **`set_id=1`** (строка через запятую, например `12,34,56`) | `''` | Fallback для **`type=vip`**, если нет ручных связей. Несколько наборов: добавьте **`vip_set_2`**, **`vip_set_3`** и укажите **`set_id`** в вызове **`ms3ProductSets`**. |
| `ms3productsets.izitoast_include` | Подключать iziToast через **`mspsLexiconScript`** (если MS3 не отдаёт свои пути) | `1` | **`0`** — не подключать CSS/JS toast из настроек ниже |
| `ms3productsets.izitoast_css` | Путь к CSS iziToast от корня `assets/` | `components/minishop3/css/web/lib/izitoast/iziToast.min.css` | Переопределите, если toast лежит в другом месте |
| `ms3productsets.izitoast_js` | Путь к JS iziToast от корня `assets/` | `components/minishop3/js/web/lib/izitoast/iziToast.js` | То же для скрипта |

## Область в менеджере MODX

В транспортном пакете все ключи относятся к области **default** (одна группа в списке системных настроек). Логически настройки можно разделить так:

| Группа | Ключи |
|--------|-------|
| Лимиты | `max_items` |
| Кеш | `cache_lifetime` |
| Поведение | `auto_recommendation` |
| VIP-наборы | `vip_set_1` (при необходимости — `vip_set_2`, `vip_set_3`, …) |
| Toast на фронте | `izitoast_include`, `izitoast_css`, `izitoast_js` |

## Рекомендации

- **`max_items`:** для карточки товара и похожих блоков чаще **6–12**, для широких полок — до **20**.
- **`cache_lifetime`:** согласуйте с частотой правок подборок и нагрузкой. При **`0`** каждый запрос пересчитывает выдачу.
- **`auto_recommendation`:** **`0`**, если на сайте должны отображаться только явно заданные связи и VIP из настроек.
- **Несколько VIP-наборов:** создайте системные настройки **`ms3productsets.vip_set_2`** и т.д. по тому же шаблону, что **`vip_set_1`**, и передавайте **`&set_id`** в сниппете.
