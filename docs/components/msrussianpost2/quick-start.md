---
title: Быстрый старт
---
# Быстрый старт

Пошаговое подключение расчёта доставки Почтой России к оформлению заказа MiniShop3.

## Установка

### Требования

| Требование | Версия |
|------------|--------|
| MODX Revolution | 3.0.3+ |
| PHP | 8.2+ |
| MiniShop3 | актуальная версия |
| VueTools | по желанию: для раздела **Extras → Почта России** в панели управления MODX |

### Через Менеджер пакетов

1. Откройте **Extras → Installer**
2. Найдите пакет **msRussianPost2** в каталоге [ModStore](https://modstore.pro/) (**Download Extras**) или загрузите архив транспортного пакета вручную, если пакет собран локально
3. Нажмите **Установить**
4. **Настройки → Очистить кэш**

Чтобы пакеты из ModStore отображались в установщике, [подключите репозиторий ModStore](https://modstore.pro/info/connection) в настройках MODX.

После установки появятся:

- **15** системных настроек (фильтр в **Настройки → Системные настройки**: `msrussianpost2`)
- пункт меню **Extras → Почта России**
- сниппеты `msRussianPost2` и `msrpLexiconScript`
- чанки `tplRussianPostStatus` и `tplRussianPostMethods`
- плагин **msRussianPost2 Autoload** на событие **`OnMODXInit`** (ранняя загрузка класса доставки для MiniShop3)
- плагин **msRussianPost2 Delivery** на событие **`msOnGetDeliveryCost`**
- плагин **msRussianPost2 Order tariff** на события **`msOnSubmitOrder`**, **`msOnBeforeCreateOrder`**, **`msOnCreateOrder`** — переносит выбранный код тарифа в свойства заказа для отображения в карточке заказа в менеджере MiniShop3

**Проверка:** откройте **Extras → Почта России**. Если видны табы «Тестовый расчёт», «Журнал запросов», «Справочник объектов» — админка компонента доступна. Если показано предупреждение про **VueTools**, установите пакет VueTools через установщик (для витрины и виджета на чекауте VueTools не обязателен).

При **обновлении** пакета системные настройки сохраняются, сниппеты, чанки и плагины подтягиваются до версии из пакета. После обновления очистите кэш (**Настройки** или **Управление** → **Очистить кэш**, либо кнопка на странице **Extras → Почта России**).

## Шаг 1: Способ доставки в MiniShop3

1. **Extras → MiniShop3 → Настройки → Доставки** → создайте доставку (например «Почта России»).
2. Поля:
   - **price**: `0` (стоимость считает обработчик)
   - **class**: `msrussianpost2\Delivery\RussianPostDelivery`
   - **validation_rules** (пример): `{"index": "required|digits:6", "city": "required", "first_name": "required", "last_name": "required", "phone": "required"}`
3. Сохраните и **запомните числовой ID** доставки.

![MiniShop3 — настройка способа доставки Почта России](/components/msrussianpost2/screenshots/minishop3-delivery-russianpost.png)

![MiniShop3 — настройка способа доставки Почта России](/components/msrussianpost2/screenshots/minishop3-delivery-russianpost-2.png)

## Шаг 2: Системные настройки

**Настройки → Системные настройки**, фильтр: `msrussianpost2`.

Минимум:

| Ключ | Действие |
|------|----------|
| `msrussianpost2_delivery_id` | Укажите ID из шага 1 (несколько ID — через запятую). Пусто: в JS подставляются все доставки с классом `msrussianpost2\Delivery\RussianPostDelivery` (**auto**). Если таких нет — виджет может показываться при любой доставке (**any**). Для рабочего сайта задайте ID явно |
| `msrussianpost2_sender_index` | Индекс отправителя, 6 цифр (например индекс вашего склада) |

Остальные параметры — [Системные настройки](settings).

Быстрый переход из панели управления MODX: **Extras → Почта России → Системные настройки** (если реализовано в пакете).

## Шаг 3: Виджет в чанке заказа

Вставьте блок **внутрь формы** оформления заказа (обычно чанк `tpl.msOrder`), **после** выбора доставки. Нужна **одна** обёртка с классом `msrp__wrapper` или атрибутом `data-msrp-widget` — по ней скрипт показывает и скрывает блок при смене доставки.

**Порядок:** сначала лексикон для JS, затем сниппет (он подключает CSS и `russianpost.js` и выставляет `window.msRussianPost2Config`), затем чанки статуса и методов.

::: tip Подсказки адреса и индекс (msDadata2)
Чтобы покупатель выбирал адрес из подсказок DaData и в заказ попадал индекс, установите **msDadata2** и выведите **`[[!msDadata2AddressSuggest]]`** (или Fenom-эквивалент) **выше** блока с `msrpLexiconScript` / `msRussianPost2`. Порядок вывода и событие **`msdadata2:order-address-updated`** — в разделе [Подключение на сайте → msDadata2](frontend#msdadata2).
:::

![Блок виджета Почты России](/components/msrussianpost2/screenshots/msrp-block.png)

::: code-group

```fenom
<div class="msrp__wrapper" data-msrp-widget>
    {'msrpLexiconScript' | snippet}
    {'msRussianPost2' | snippet}
    {'tplRussianPostStatus' | chunk}
    {'tplRussianPostMethods' | chunk}
</div>
```

```modx
<div class="msrp__wrapper" data-msrp-widget>
    [[!msrpLexiconScript]]
    [[!msRussianPost2]]
    [[$tplRussianPostStatus]]
    [[$tplRussianPostMethods]]
</div>
```

:::

::: tip Fenom и `auto_escape`
При включённом **auto_escape** выводите сниппеты как сырой HTML (`{raw ...}` или эквивалент в вашей версии Fenom), иначе скрипты могут экранироваться.
:::

**Не** оборачивайте чанки в лишние блоки с классами `.msrp__status` или `.msrp__methods`: эти классы уже заданы внутри `tplRussianPostStatus` и `tplRussianPostMethods`.

Параметры сниппета `msRussianPost2`: `connectorUrl`, `indexSelector`, `debug` — см. [msRussianPost2](snippets/msRussianPost2).

---

## Шаг 4: Проверка

1. Откройте страницу оформления заказа, выберите доставку «Почта России» — должен появиться блок виджета.
2. Введите корректный 6-значный индекс — должны загрузиться методы и цены.
3. В панели управления MODX откройте **Extras → Почта России**. При установленном **VueTools** должны открываться табы «Тестовый расчёт», «Журнал запросов», «Справочник объектов». Если VueTools нет, интерфейс раздела может быть недоступен. На витрину магазина это не влияет. Подробное описание вкладок — [Админка в MODX](admin-ui).

![Блок виджета Почты России](/components/msrussianpost2/screenshots/msrp-block.png)

При проблемах включите отладку: параметр сниппета `&debug=1` или параметр `?msrp_debug=1` в адресе страницы — см. раздел [Интеграция и кастомизация → Отладка](integration#отладка).

## Что дальше

- [Системные настройки](settings) — API, вес, габариты, кэш, логи
- [Админка в MODX](admin-ui) — тестовый расчёт, журнал, справочник кодов, кэш
- [Сниппеты](snippets/) — `msRussianPost2`, `msrpLexiconScript`
- [Подключение на сайте](frontend) — коннектор, чанки, стили, [msDadata2](frontend#msdadata2)
- [Интеграция и кастомизация](integration) — события, CSS-переменные, режимы API
- [FAQ и траблшутинг](faq) — частые ошибки и проверки
