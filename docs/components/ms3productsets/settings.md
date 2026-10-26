---
title: Системные настройки
---
# Системные настройки

Префикс ключей: `ms3productsets.`. Пространство имён: **ms3productsets**.

**Где изменить:** **Настройки → Системные настройки**, фильтр `ms3productsets`.

![Namespace ms3productsets](/components/ms3productsets/screenshots/settings-namespace.png)

## Таблица настроек

| Настройка | Описание | По умолчанию | Рекомендации |
|-----------|----------|--------------|--------------|
| `ms3productsets.max_items` | Лимит для `get_set` без `max_items` в POST, для `window.mspsConfig.maxItems` и для `render()` без своего `max_items`. Вызов без `&max_items` берёт свойство сниппета `10`, не эту настройку. | `10` | Витринные блоки: **6–20**. Карточка товара: **6–12**. Широкие полки: до **20**. |
| `ms3productsets.cache_lifetime` | TTL кеша подборок, секунды. **`0`** отключает кеш. Кеш **`msps_get_products_by_type`** через `cacheManager`. Ключ: **`type`**, **`resource_id`**, **`category_id`**, **`set_id`**, **`limit`**, **`exclude_ids`**, поколение **`cache_generation`**. Поколение сбрасывается при save/delete шаблона, apply/unbind, sync TV и при `OnResourceDelete`. | `3600` | Рабочий сайт: **> 0** (часто 3600). Отладка или частые правки: **`0`**. При **`0`** каждый запрос пересчитывает выдачу. |
| `ms3productsets.auto_recommendation` | **`0`:** пустая ручная подборка остаётся пустой, авто-пути (`similar`, `buy_together` и др., кроме `vip`) выключены. **`1`:** авто-логика типа. `vip` настройку не читает. | `1` | **`0`:** на витрине только ручные связи (админка/TV) и **`vip_set_*`** для **`vip`**. Авто по категории и заказам выключены. |
| `ms3productsets.vip_set_1` | ID товаров для VIP при **`set_id=1`** (через запятую, например `12,34,56`). | `''` | Запасной вариант для **`type=vip`** без ручных связей. Ещё наборы: **`vip_set_2`**, **`vip_set_3`** и **`set_id`** в **`ms3ProductSets`**. |
| `ms3productsets.izitoast_include` | Подключать iziToast через **`mspsLexiconScript`**, если MS3 не отдаёт свои пути. | `1` | **`0`:** не подключать CSS/JS из ключей ниже. |
| `ms3productsets.izitoast_css` | CSS iziToast от корня `assets/`. | `components/minishop3/css/web/lib/izitoast/iziToast.min.css` | Другой путь к toast — переопределите. |
| `ms3productsets.izitoast_js` | JS iziToast от корня `assets/`. | `components/minishop3/js/web/lib/izitoast/iziToast.js` | То же для скрипта. |

## Область в менеджере MODX

В пакете все ключи в области **default** (одна группа в списке настроек).

| Группа | Ключи |
|--------|-------|
| Лимиты | `max_items` |
| Кеш | `cache_lifetime` |
| Поведение | `auto_recommendation` |
| VIP-наборы | `vip_set_1` (при необходимости `vip_set_2`, `vip_set_3`, …) |
| Toast на сайте | `izitoast_include`, `izitoast_css`, `izitoast_js` |
