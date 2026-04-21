# Разработка

Документация для разработчиков, которые хотят расширить или интегрировать ms3PromoCode в своё решение.

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
   └─→ ApplicationService (фасад)
         │
         ├─→ PromoCodeService    (CRUD + поиск + счётчик)
         ├─→ ValidationService   (lifecycle + min_order)
         ├─→ DiscountCalculator  (расчёт + распределение)
         ├─→ RuleEngine          (matching по правилам)
         │     └─→ Rule strategies (ProductIds, Vendors, ...)
         └─→ UsageTracker        (запись + откат + restore)
```

Все сервисы регистрируются в DI-контейнере MODX через [bootstrap.php](https://github.com/biz87/ms3PromoCode/blob/main/core/components/ms3promocode/bootstrap.php) и доступны через `$modx->services->get('ms3promocode_*')`.

## Архитектура JS-слоя

```
window.ms3PromoCode (headless)
   │
   ├─ Ms3PromoCodeApiClient  (fetch wrapper)
   ├─ Ms3PromoCodeAPI        (REST endpoints mapping)
   └─ ms3PromoCode           (singleton: state + events)
            ▲
            │
            └── Ms3PromoCodeUI (DOM-обёртка, опционально)
```

UI-слой использует только публичный API headless-ядра — не лезет напрямую в HTTP.

## Что можно расширить

| Расширение                           | Где                                                                  |
|--------------------------------------|----------------------------------------------------------------------|
| Свой тип правила                     | Добавить класс в `Rules/` + регистрация в `RuleEngine`               |
| Реакция на свои события              | Подписка на DOM `ms3promocode:*` или MS3 events                      |
| Кастомизация формы покупателя        | Override-папка для CSS/JS или собственный шаблон чанка               |
| Свои Manager API endpoints           | Добавить процессор в `src/Processors/Mgr/` + connector.php           |
| Кастомные системные настройки        | Добавить в `_build/elements/settings.php`                            |
