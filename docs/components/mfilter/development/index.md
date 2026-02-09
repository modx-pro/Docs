# Разработка

Документация для разработчиков по расширению и кастомизации mFilter.

## Разделы

| Раздел | Описание |
|--------|----------|
| [JavaScript](javascript) | Архитектура фронтенда, подключение скриптов |
| [JS API](js-api) | Программное управление фильтрами |
| [Headless API](headless) | REST API для SPA-приложений |
| [Сервисы](services) | PHP сервисы и Dependency Injection |
| [Типы фильтров](filter-types) | Создание собственных типов фильтрации |
| [События](events) | Плагин и системные события |
| [Модели и БД](models) | Таблицы базы данных |

## Архитектура

```
┌─────────────────────────────────────────────────────────┐
│                      Фронтенд                           │
├─────────────────┬───────────────────────────────────────┤
│   SSR режим     │           Headless режим              │
│  (FilterUI)     │    (ApiClient + FilterAPI)            │
├─────────────────┴───────────────────────────────────────┤
│                    Hooks System                          │
│            beforeApply → apply → afterApply             │
├─────────────────────────────────────────────────────────┤
│                    REST API Router                       │
├─────────────────────────────────────────────────────────┤
│                     Controllers                          │
│              FilterController, SlugController           │
├─────────────────────────────────────────────────────────┤
│                       Services                           │
│   Filter │ FilterSet │ SlugManager │ UrlRouter │ SEO   │
├─────────────────────────────────────────────────────────┤
│                      Handlers                            │
│        FilterTypes │ Sources │ FilterHandler            │
├─────────────────────────────────────────────────────────┤
│                       Models                             │
│   FilterSet │ Slug │ Pattern │ WordForm │ SeoTemplate   │
└─────────────────────────────────────────────────────────┘
```

## Точки расширения

### 1. Фронтенд (JavaScript)

- **Hooks** — перехват операций фильтрации
- **События** — подписка на события UI
- **Кастомные слайдеры** — через MFilterSlider API

### 2. Бэкенд (PHP)

- **Типы фильтров** — свои алгоритмы фильтрации
- **Источники данных** — кастомные таблицы
- **События MODX** — OnMFilterInit, OnHandleRequest
- **DI замена сервисов** — через конфигурацию

### 3. Шаблоны

- **Чанки** — кастомные шаблоны фильтров
- **Fenom** — полный доступ к данным фильтров

## Быстрые примеры

### Программное управление фильтром

```javascript
const filter = mfilterGet('mfilter-form');
filter.setFilter('brand', ['apple', 'samsung']);
filter.submit();
```

### Хук на применение фильтров

```javascript
mfilterHooks.add('beforeApply', (ctx) => {
    console.log('Фильтры:', ctx.params.filters);
    // Можно модифицировать ctx.params
});
```

### Регистрация своего типа фильтра

```php
// В плагине на OnMFilterInit
$mfilter->getFilterTypeRegistry()->register('mytype', new MyFilterType($modx));
```

### Замена сервиса через DI

```php
// core/components/mfilter/config/services.php
return [
    'slugManager' => MyCustomSlugManager::class,
];
```
