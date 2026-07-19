---
title: Совместимость
---

# Совместимость

ImageOptimizer рассчитан на MODX 3 с Filesystem media source, pdoTools, VueTools. MiniShop3 и генераторы превью подключаются без отдельного кода в пакете.

## Сводная таблица

| Пакет / компонент | Совместимость | Рекомендация |
| --- | --- | --- |
| **MODX 3** | Полная | MODX 2.x не поддерживается |
| **pdoTools** | Зависимость install | Установить до или вместе с ImageOptimizer |
| **[VueTools](/components/vuetools/) 1.1.2+** | Обязателен для админки | Без него: `vuetools_required` |
| **[MiniShop3](/components/minishop3/)** | Inject на витрине | Чанки товаров без `<picture>` |
| **Thumb3x** | Skip по URL | `imageoptimizer_skip_src_pattern=thumb3x` (default) |
| **pThumb / phpThumbOf** | Параллельно | Разные URL и файлы на диске |
| **Gallery / MIGX** | Зависит от разметки | Локальные `assets/` img: inject; внешние URL: skip |
| **Static HTML cache MODX** | Совместимо | Очистите кэш после bulk convert; учитывайте `html_cache` ImageOptimizer |

## Thumb3x

Thumb3x генерирует on-the-fly URL с сегментом `thumb3x`. ImageOptimizer не оборачивает такие `<img>`, чтобы не ломать цепочку pThumb и не дублировать responsive.

Если нужна оптимизация Thumb3x-картинок, используйте WebP в Thumb3x или отдайте статические `<img src="assets/...">` ImageOptimizer.

Настройка: `imageoptimizer_skip_src_pattern` — подстрока в `src`, не regex.

## pThumb / phpThumbOf

Генерируют производные файлы в cache-каталогах по query-параметрам. ImageOptimizer работает с исходниками в media source и статическими именами `{basename}.{width}.webp`.

Конфликта имён нет, если не менять `imageoptimizer_variant_pattern` на шаблон, совпадающий с pThumb.

## MiniShop3

Типичная схема:

1. В чанке товара: `<img src="[[+thumb]]" alt="[[+pagetitle]]">`
2. При upload в MS3 / File Manager: очередь ImageOptimizer
3. На `OnWebPagePrerender`: `<picture>` с WebP srcset

Плагины MS3 для галереи не требуют правки, если итоговый HTML содержит обычные `<img>` с путями в `assets/`.

## VueTools и PrimeVue

Админка собрана на Vite + Vue 3 + PrimeVue 4. VueTools подключает Pinia и общий shell менеджера.

После обновления VueTools проверьте **ImageOptimizer → Compatibility**. Пересборка `npm run build:mgr` нужна только при установке ImageOptimizer из исходников, не из ModStore.

## MODX 3 Media Sources

Поддерживаются только **Filesystem** sources. Inject перебирает все filesystem sources и ищет, в какой из них лежит файл по пути из `src`.

S3 / FTP без локального пути: preflight `NonFilesystemSource`, задачи в очереди получают `skipped`.

## Email и формы

`imageoptimizer_inject_email` в настройках есть, но код inject для писем не реализован. Многие почтовые клиенты плохо поддерживают `<picture>`; для email используйте обычные `<img>` или inline-картинки.

## Проверка в менеджере

Вкладка **Compatibility** в админке ImageOptimizer:

- статус VueTools
- подсказки по Thumb3x / MS3
- версии связанных extras (если установлены)

## Связанные разделы

- [Авто-inject и picture](frontend) — skip и inject
- [Системные настройки](settings) — `skip_src_pattern`
- [Админка](manager) — вкладка Server и энкодеры
