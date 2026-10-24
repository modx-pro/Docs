# Разработка

Для разработчиков, которые расширяют или интегрируют ms3PromoCode.

## Разделы

| Раздел                            | Описание                                                  |
|-----------------------------------|-----------------------------------------------------------|
| [События плагина](events)         | События MS3, на которые подписан компонент                |
| [Сервисы](services)               | Доменные PHP-сервисы и DI                                 |
| [Правила (Rules)](rules)          | Стратегии правил фильтрации и как добавить свою           |
| [Модели и БД](models)             | Структура таблиц и xPDO-моделей                           |

## Архитектура PHP-слоя

```
Controllers / Plugin
   │
   ├─→ ApplicationService (фасад)
   │     │
   │     ├─→ PromoCodeService    (CRUD + поиск + счётчик)
   │     ├─→ ValidationService   (lifecycle + min_order)
   │     ├─→ DiscountCalculator  (расчёт + распределение)
   │     └─→ RuleEngine          (matching по правилам)
   │           └─→ Rule strategies (ProductIds, Vendors, ...)
   │
   └─→ UsageTracker              (запись + откат + restore)
         └─→ PromoCodeService    (increment / decrement used_count)
```

Плагин MS3 вызывает `UsageTracker` напрямую на `msOnCreateOrder` и `msOnChangeOrderStatus` — в обход фасада, чтобы запись применения не зависела от повторного расчёта скидки.

Сервисы регистрируются в DI-контейнере MODX через [bootstrap.php](https://github.com/biz87/ms3PromoCode/blob/main/core/components/ms3promocode/bootstrap.php) и доступны через `$modx->services->get('ms3promocode_*')`.

## Архитектура JS-слоя

```
window.ms3PromoCode (headless singleton: state + events)
   ▲    │
   │    ├─ .client → Ms3PromoCodeApiClient  (fetch wrapper)
   │    └─ .api    → Ms3PromoCodeAPI        (REST endpoints mapping)
   │
   └── Ms3PromoCodeUI (DOM-обёртка, необязательна)
```

UI обращается только к `window.ms3PromoCode` — без прямых HTTP-запросов.

## Что можно расширить

| Расширение                           | Где                                                                  |
|--------------------------------------|----------------------------------------------------------------------|
| Свой тип правила                     | Добавить класс в `Rules/`, подменить сервис `ms3promocode_rule_engine` в DI с полным списком стратегий |
| Реакция на события                   | Подписка на DOM `ms3promocode:*` или события MS3                     |
| Своя форма покупателя                | Папка переопределений для CSS/JS или собственный шаблон чанка        |
| Свои методы Manager API              | Добавить процессор в `src/Processors/Mgr/` + connector.php           |
| Свои системные настройки             | Добавить в `_build/elements/settings.php`                            |
