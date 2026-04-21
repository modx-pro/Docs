# Системные настройки

Все настройки находятся в пространстве имён `ms3promocode` (Система → Настройки → namespace `ms3promocode`).

## Полный список

| Настройка                              | По умолчанию | Описание                                                         |
|----------------------------------------|--------------|------------------------------------------------------------------|
| `ms3promocode.frontend_assets_preset`  | `core_ui`    | Пресет загружаемых JS/CSS на фронтенде (см. ниже).               |
| `ms3promocode.cancel_statuses`         | (пусто)      | CSV ID статусов заказа, при переходе в которые откатывается применение кода. |
| `ms3promocode.lock_statuses`           | (пусто)      | CSV ID статусов заказа, в которых вкладка «Промо-код» заблокирована для редактирования. |

## Подробно

### `ms3promocode.frontend_assets_preset`

Управляет автоматической регистрацией JS/CSS на страницах сайта (через событие `OnLoadWebDocument`).

| Значение  | Что подключается                                                       |
|-----------|------------------------------------------------------------------------|
| `core_ui` | Headless-ядро + UI-слой + CSS. Готовая форма «из коробки».             |
| `core`    | Только headless-ядро. Для собственных SPA-интеграций.                  |
| `none`    | Ничего. Шаблон сам подключает нужные файлы.                            |

::: tip
Для большинства магазинов подходит `core_ui` — форма работает без дополнительной настройки. `core` нужен, если у вас собственный JS-фронтенд (Vue/React/Svelte) и вы пишете свой UI поверх API. `none` — для полного контроля над загрузкой ассетов.
:::

### `ms3promocode.cancel_statuses`

Когда заказ переходит в один из перечисленных здесь статусов, плагин:

- Помечает запись в `ms3_promo_code_usages` как cancelled (ставит `cancelled_at`).
- Декрементирует счётчик `used_count` у соответствующего промо-кода.

При обратном переходе из этих статусов в любой другой — действие откатывается:

- `cancelled_at` снимается.
- `used_count` инкрементируется.

Формат — CSV ID статусов:

```
5,6,12
```

Если настройка пуста — ролбэк не происходит, использования не отменяются.

### `ms3promocode.lock_statuses`

Когда заказ находится в одном из перечисленных статусов, вкладка «Промо-код» в карточке заказа:

- Не позволяет применить новый код.
- Не позволяет снять применённый код.
- Показывает уведомление «Текущий статус заказа не позволяет менять промо-код.»

Формат — CSV ID статусов:

```
4,5
```

Это полезно для статусов «Доставлен», «Оплачен», «Отменён» — когда состав/сумма заказа считается финальной.

## Системные настройки MS3, которые используются

Помимо собственных, ms3PromoCode читает несколько настроек MiniShop3:

| Настройка                  | Где используется                                       |
|----------------------------|--------------------------------------------------------|
| `ms3_currency_symbol`      | Форматирование сумм скидки в формах и сообщениях ошибок|
| `ms3_currency_position`    | Префикс/постфикс символа валюты (`before`/`after`)     |

## Примеры

### Минимальная конфигурация (магазин «из коробки»)

```
ms3promocode.frontend_assets_preset = core_ui
ms3promocode.cancel_statuses = 5
ms3promocode.lock_statuses = 4,5
```

### Headless-проект (свой JS поверх API)

```
ms3promocode.frontend_assets_preset = core
```

UI-слой (готовая форма) не загружается, доступен только глобальный `window.ms3PromoCode`.

### Полный контроль над загрузкой ассетов

```
ms3promocode.frontend_assets_preset = none
```

В шаблоне страницы корзины подключите скрипты вручную:

```html
<link rel="stylesheet" href="/assets/components/ms3promocode/css/web/ms3promocode.css">
<script src="/assets/components/ms3promocode/js/web/core/ApiClient.js"></script>
<script src="/assets/components/ms3promocode/js/web/core/PromoCodeAPI.js"></script>
<script src="/assets/components/ms3promocode/js/web/ms3promocode.headless.js"></script>
<script src="/assets/components/ms3promocode/js/web/ui/PromoCodeUI.js"></script>
<script src="/assets/components/ms3promocode/js/web/ms3promocode.js"></script>
```
